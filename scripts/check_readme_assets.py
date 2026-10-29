#!/usr/bin/env python3
"""Verify every external asset and link referenced by README.md.

The profile README depends on several third-party SVG/PNG renderers. Those
services pause, get rate-limited or disappear without warning, and GitHub then
shows a broken image on the profile page. This checker fails loudly instead.

Checks performed
----------------
* Images (`![](url)`, `<img src>`):
    - HTTP 200
    - an image content type (`image/*`) or an `<svg` body
    - the body is not a service error card (readme-stats/trophy style)
* Links (`[text](url)`, `<a href>`):
    - HTTP status < 400
    - 403/429/999 to a bot are reported as "blocked", not as breakage
* Relative paths (e.g. `.github/assets/trophy.svg`): the file must exist.

Usage
-----
    python3 scripts/check_readme_assets.py            # full check
    python3 scripts/check_readme_assets.py --images   # images only, fast

Exit code is 1 when anything is actually broken, so it can gate CI.
"""

from __future__ import annotations

import argparse
import re
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from dataclasses import dataclass, field
from pathlib import Path

README = Path(__file__).resolve().parent.parent / "README.md"
ROOT = README.parent

USER_AGENT = (
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/124.0 Safari/537.36 readme-health/1.0"
)
TIMEOUT = 30
RETRIES = 2

# Substrings that indicate a service is up but refusing to render data.
ERROR_CARD_MARKERS = (
    "something went wrong",
    "deployment_paused",
    "deployment_disabled",
    "maximum retries exceeded",
    "downtime due to github api rate limiting",
    "rate limit exceeded",
)

# Statuses some sites return to non-browser clients. Not proof of breakage.
BOT_BLOCKED_STATUSES = {403, 429, 999}


@dataclass
class Result:
    kind: str
    target: str
    status: str
    detail: str
    ok: bool = True
    blocked: bool = False
    notes: list[str] = field(default_factory=list)


IMG_MD = re.compile(r"!\[[^\]]*\]\(\s*([^)\s]+)")
IMG_HTML = re.compile(r"<img\b[^>]*?\bsrc=[\"']([^\"']+)", re.IGNORECASE)
LINK_MD = re.compile(r"(?<!!)\[[^\]]*\]\(\s*([^)\s]+)")
LINK_HTML = re.compile(r"<a\b[^>]*?\bhref=[\"']([^\"']+)", re.IGNORECASE)


def collect(text: str) -> tuple[list[str], list[str]]:
    images: list[str] = []
    links: list[str] = []
    for pattern, bucket in ((IMG_MD, images), (IMG_HTML, images)):
        for m in pattern.finditer(text):
            bucket.append(m.group(1).strip())
    for pattern, bucket in ((LINK_MD, links), (LINK_HTML, links)):
        for m in pattern.finditer(text):
            bucket.append(m.group(1).strip())

    def clean(urls: list[str]) -> list[str]:
        seen, out = set(), []
        for url in urls:
            url = url.strip().rstrip(".,;")
            if url.startswith(("mailto:", "tel:", "#")):
                continue
            if url.startswith("http://"):
                url = "https://" + url[len("http://"):]
            if url not in seen:
                seen.add(url)
                out.append(url)
        return out

    return clean(images), clean(links)


def fetch(url: str) -> tuple[int, str, bytes]:
    request = urllib.request.Request(url, headers={"User-Agent": USER_AGENT,
                                                  "Accept": "*/*"})
    with urllib.request.urlopen(request, timeout=TIMEOUT) as response:
        body = response.read(200_000)
        return response.status, response.headers.get("Content-Type", ""), body


def check_url(url: str, kind: str) -> Result:
    if not url.startswith("http"):
        path = (ROOT / urllib.parse.unquote(url)).resolve()
        exists = path.is_file()
        size = f"{path.stat().st_size} bytes" if exists else "missing"
        return Result(kind, url, "LOCAL", size, ok=exists)

    last = "unknown error"
    for attempt in range(RETRIES + 1):
        try:
            status, ctype, body = fetch(url)
            low = body[:40_000].lower()
            marker = next((m for m in ERROR_CARD_MARKERS if m.encode() in low), None)
            detail = f"{ctype.split(';')[0] or 'unknown'} / {len(body)}B"
            if marker:
                return Result(kind, url, str(status), detail,
                              ok=False, notes=[f"error card: {marker!r}"])
            if kind == "image":
                looks_image = ctype.startswith("image/") or b"<svg" in body[:4000]
                if not looks_image:
                    return Result(kind, url, str(status), detail, ok=False,
                                  notes=["not an image response"])
            return Result(kind, url, str(status), detail, ok=True)

        except urllib.error.HTTPError as exc:
            status = exc.code
            if status in BOT_BLOCKED_STATUSES:
                return Result(kind, url, str(status), "bot-blocked",
                              ok=True, blocked=True)
            last = f"HTTP {status}"
        except Exception as exc:  # noqa: BLE001 - report anything as a failure
            last = f"{type(exc).__name__}: {exc}"
        if attempt < RETRIES:
            time.sleep(2 * (attempt + 1))

    return Result(kind, url, "-", last, ok=False)


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--images", action="store_true",
                        help="only verify image endpoints")
    parser.add_argument("--readme", default=str(README))
    args = parser.parse_args()

    text = Path(args.readme).read_text(encoding="utf-8")
    images, links = collect(text)
    targets = [(u, "image") for u in images]
    if not args.images:
        targets += [(u, "link") for u in links if u not in set(images)]

    print(f"Checking {len(targets)} targets from {Path(args.readme).name}\n")
    results = [check_url(url, kind) for url, kind in targets]

    icon = {"ok": "PASS", "blocked": "BLOCKED", "fail": "FAIL"}
    print(f"{'RESULT':<8} {'KIND':<6} {'STATUS':<8} TARGET")
    print("-" * 100)
    failures = 0
    for r in results:
        label = "ok" if r.ok and not r.blocked else ("blocked" if r.blocked else "fail")
        if label == "fail":
            failures += 1
        print(f"{icon[label]:<8} {r.kind:<6} {r.status:<8} {r.target}")
        if r.detail and r.status not in {"-"}:
            print(f"{'':<8} {'':<6} {'':<8} └ {r.detail}"
                  + (f"  [{'; '.join(r.notes)}]" if r.notes else ""))
        elif r.notes:
            print(f"{'':<8} {'':<6} {'':<8} └ {'; '.join(r.notes)}")

    summary = Path("/tmp/readme-health.md")
    lines = ["| Result | Kind | Status | Target |", "|---|---|---|---|"]
    for r in results:
        label = "blocked" if r.blocked else ("pass" if r.ok else "**FAIL**")
        lines.append(f"| {label} | {r.kind} | {r.status} | `{r.target}` |")
    lines.append("")
    lines.append(f"{len(results) - failures}/{len(results)} healthy, {failures} failing.")
    summary.write_text("\n".join(lines), encoding="utf-8")

    print(f"\n{len(results) - failures}/{len(results)} healthy, {failures} failing.")
    return 1 if failures else 0


if __name__ == "__main__":
    sys.exit(main())
