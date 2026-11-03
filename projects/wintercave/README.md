# ❄️ WinterCave — Latency-Obsessed Local Text Editor

A text editor you run locally. One Rust binary serves the page, tokenizes and highlights the file, and reads and writes it through a path-confined file API — no Node, no npm, no bundler, no wasm shell, no `dist/`.

Live: [wintercave.vercel.app](https://wintercave.vercel.app)

[![Version](https://img.shields.io/badge/version-0.3.0-DEA584?style=for-the-badge)](https://github.com/Nour-yahyaoui/WinterCave)
[![Rust](https://img.shields.io/badge/Rust-000000?style=for-the-badge&logo=rust&logoColor=white)](https://github.com/Nour-yahyaoui/WinterCave)
[![Actix Web](https://img.shields.io/badge/Actix_Web-DB1D5F?style=for-the-badge)](https://github.com/Nour-yahyaoui/WinterCave)
[![No runtime deps](https://img.shields.io/badge/Node%2Fnpm_deps-0-2EA44F?style=for-the-badge)](https://github.com/Nour-yahyaoui/WinterCave)

## ✨ Highlights

- **Native-caret editing** — the surface is a plain `textarea`, so IME, clipboard, undo, selection, screen readers and caret movement are the browser's, not a reimplementation; `Mod+S` saves over `PUT /api/files`
- **12-language syntax highlighting** — the server tokenizes Rust, JavaScript/TypeScript, Python, shell, YAML, SQL, JSON, HTML, CSS, Markdown and plain text, with a 400 KB ceiling
- **Platform-neutral core** — `wintercave-core` has no filesystem, no DOM and no async runtime, so the same engine can drive a terminal or native window later
- **Path-confined, atomic file API** — every path stays inside `--root`, and writes use a temp file, `sync_all` and rename
- **Works with JavaScript disabled** — the editor page is server-rendered and a plain HTML form still saves files
- **One binary, nothing else** — quick open (`Mod+P`), folder browser, local completion, light/dark themes, `cargo build --release -p wintercave-server`

## 🔗 Links

- [Source](https://github.com/Nour-yahyaoui/WinterCave)
- [Landing page](https://wintercave.vercel.app)
