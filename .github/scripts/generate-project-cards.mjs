#!/usr/bin/env node
/**
 * Generates the profile README project cards as standalone SVG files.
 *
 * Why SVGs and not HTML: GitHub strips CSS from HTML in READMEs, so a
 * table of <div>s can never be given borders, gradients or padding. An
 * <img> pointing at a committed .svg renders exactly as drawn, and it
 * cannot 503 or get rate-limited the way a third-party card service can
 * (see the note in update-stats.yml about the paused stats deployment).
 *
 * Usage:
 *   node .github/scripts/generate-project-cards.mjs           # write assets
 *   node .github/scripts/generate-project-cards.mjs --check   # fail if stale
 *
 * --check is used by CI to catch a README that links to cards which no
 * longer match .github/data/projects.json.
 */

import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync, unlinkSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const DATA = join(ROOT, '.github/data/projects.json');
const OUT = join(ROOT, '.github/assets/cards');

/* ---------------------------------------------------------------- themes */

const THEMES = {
  dark: {
    bg: '#0d1117',
    gradient: ['#161b22', '#0d1117'],
    border: '#30363d',
    title: '#e6edf3',
    body: '#8b949e',
    label: '#6e7681',
    value: '#e6edf3',
    divider: '#21262d',
    button: '#1f6feb',
    buttonHover: '#388bfd',
    buttonText: '#ffffff',
    dots: '#1f6feb',
    dotsDim: '#0b3d91',
  },
  light: {
    bg: '#ffffff',
    gradient: ['#f6f8fa', '#ffffff'],
    border: '#d0d7de',
    title: '#1f2328',
    body: '#59636e',
    label: '#6e7781',
    value: '#1f2328',
    divider: '#d8dee4',
    button: '#0969da',
    buttonHover: '#0969da',
    buttonText: '#ffffff',
    dots: '#0969da',
    dotsDim: '#b6d3f7',
  },
};

/* --------------------------------------------------------------- geometry */

const W = 560;
const H = 376;   // CTA bottom + breathing room
const PAD = 24;
const INNER = W - PAD * 2;

/* Explicit vertical rhythm. Every y is derived from these, so text can
 * never drift into a divider or a neighbour's box. */
const HEAD_ROW_Y = 40;      // top title / updated baseline
const HEAD_DIV_Y = 56;      // divider under the header row
const PANEL_Y = 66;         // top panel rect
const PANEL_H = 112;
const PANEL_BOT = PANEL_Y + PANEL_H;   // 178
const MID_DIV_Y = 192;      // divider between the two panels
const BLURB_Y = 218;        // first blurb baseline
const BLURB_LH = 20;        // blurb line height
const STAT_LABEL_Y = 272;
const STAT_VALUE_Y = 294;
const CTA_DIV_Y = 312;
const CTA_Y = 322;
const CTA_H = 34;
// Derived bottom guard: H must clear CTA_Y + CTA_H (356) with margin.
if (H < CTA_Y + CTA_H + 16) throw new Error('H too small for the CTA');

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const escAttr = (s) => esc(s).replace(/"/g, '&quot;');

// Single quotes throughout: this string is embedded inside double-quoted
// SVG attributes, and a literal `"` here invalidates the attribute.
const MONO =
  "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, 'DejaVu Sans Mono', monospace";

const textWidth = (str, size) => str.length * size * 0.6;

/** Greedy wrap at a character budget derived from the measured advance. */
function wrap(str, size, maxWidth, maxLines = 3) {
  const perChar = size * 0.6;
  const maxChars = Math.max(12, Math.floor(maxWidth / perChar));
  const words = String(str).split(/\s+/);
  const lines = [];
  let cur = '';
  for (const w of words) {
    const next = cur ? `${cur} ${w}` : w;
    if (next.length > maxChars && cur) {
      lines.push(cur);
      cur = w;
      if (lines.length === maxLines) break;
    } else {
      cur = next;
    }
  }
  if (cur && lines.length < maxLines) lines.push(cur);
  const used = lines.join(' ').split(/\s+/).length;
  if (used < words.length) {
    let last = lines[lines.length - 1];
    while (last.length > 1 && textWidth(`${last}…`, size) > maxWidth) last = last.slice(0, -1);
    lines[lines.length - 1] = `${last.trimEnd()}…`;
  }
  return lines;
}

/* ------------------------------------------------------------- decorative */

/**
 * Faint dot field standing in for a language-commits chart, confined to the
 * right of the title block so it can never sit under text. Values are
 * deterministic (hashed from the key) so regenerating never reshuffles art.
 */
function dotGrid(key, t, { x, y, w, h, cols = 26, rows = 5 }) {
  let seed = 0;
  for (let i = 0; i < key.length; i += 1) seed = (seed * 31 + key.charCodeAt(i)) % 100000;
  const rnd = () => {
    seed = (seed * 1103515245 + 12345) % 2147483648;
    return seed / 2147483648;
  };
  const cw = cols > 1 ? w / (cols - 1) : 0;
  const ch = rows > 1 ? h / (rows - 1) : 0;
  const out = [];
  for (let c = 0; c < cols; c += 1) {
    for (let r = 0; r < rows; r += 1) {
      const v = rnd();
      if (v < 0.55) continue;
      const size = v > 0.93 ? 5 : v > 0.8 ? 3.6 : 2.6;
      const fill = v > 0.8 ? t.dots : t.dotsDim;
      out.push(
        `<rect x="${(x + c * cw).toFixed(1)}" y="${(y + r * ch).toFixed(1)}" width="${size}" height="${size}" rx="0.8" fill="${fill}" opacity="${(0.3 + v * 0.5).toFixed(2)}"/>`
      );
    }
  }
  return out.join('');
}

/* ------------------------------------------------------------------ card */

function card(p, t) {
  const title = esc(p.display);
  const owner = esc(p.owner.toUpperCase());

  // Dot field lives only in the right-hand area of the panel.
  const dotsX = PAD + 190;
  const dotsY = PANEL_Y + 74;
  const dotsW = INNER - 200;
  const dotsH = 26;
  const dots = dotGrid(p.key, t, { x: dotsX, y: dotsY, w: dotsW, h: dotsH });

  const blurbLines = wrap(p.blurb, 13.5, INNER, 2);

  // Three equal stat columns with dividers between them.
  const colW = INNER / 3;
  const cxs = [PAD + 4, PAD + colW + 4, PAD + colW * 2 + 4];
  const labels = ['LANGUAGE', 'STARS', 'UPDATED'];
  const values = [esc(p.language), String(p.stars), esc(p.updated)];

  const ctaW = 220;
  const ctaX = (W - ctaW) / 2;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="${escAttr(p.display)} — ${escAttr(p.blurb)}">
  <defs>
    <linearGradient id="g-${p.key}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${t.gradient[0]}"/>
      <stop offset="1" stop-color="${t.gradient[1]}"/>
    </linearGradient>
    <clipPath id="c-${p.key}"><rect x="0" y="0" width="${W}" height="${H}" rx="12"/></clipPath>
  </defs>
  <g clip-path="url(#c-${p.key})">
    <rect width="${W}" height="${H}" fill="${t.bg}"/>

    <text x="${PAD}" y="${HEAD_ROW_Y}" font-family="${MONO}" font-size="17" font-weight="700" fill="${t.title}">${title}</text>
    <text x="${W - PAD}" y="${HEAD_ROW_Y}" text-anchor="end" font-family="${MONO}" font-size="12" fill="${t.label}">updated ${esc(p.updated)}</text>
    <line x1="0" y1="${HEAD_DIV_Y}" x2="${W}" y2="${HEAD_DIV_Y}" stroke="${t.divider}" stroke-width="1"/>

    <rect x="${PAD}" y="${PANEL_Y}" width="${INNER}" height="${PANEL_H}" rx="8" fill="url(#g-${p.key})"/>
    ${dots}
    <text x="${PAD + 16}" y="${PANEL_Y + 26}" font-family="${MONO}" font-size="9.5" letter-spacing="1.6" fill="${t.label}">${owner}</text>
    <text x="${PAD + 16}" y="${PANEL_Y + 62}" font-family="${MONO}" font-size="24" font-weight="700" fill="${t.title}">${title}</text>
    <text x="${PAD + 16}" y="${PANEL_Y + 86}" font-family="${MONO}" font-size="13" fill="${t.body}">${esc(p.language)}</text>

    <line x1="0" y1="${MID_DIV_Y}" x2="${W}" y2="${MID_DIV_Y}" stroke="${t.border}" stroke-width="1"/>

    ${blurbLines
      .map(
        (ln, i) =>
          `<text x="${PAD}" y="${BLURB_Y + i * BLURB_LH}" font-family="${MONO}" font-size="13.5" fill="${t.body}">${esc(ln)}</text>`
      )
      .join('\n    ')}

    ${cxs
      .map(
        (cx, i) => `<text x="${cx}" y="${STAT_LABEL_Y}" font-family="${MONO}" font-size="9.5" letter-spacing="1.3" fill="${t.label}">${labels[i]}</text>
    <text x="${cx}" y="${STAT_VALUE_Y}" font-family="${MONO}" font-size="14" font-weight="700" fill="${t.value}">${values[i]}</text>`
      )
      .join('\n    ')}
    ${cxs
      .slice(1)
      .map(
        (cx) =>
          `<line x1="${cx - 16}" y1="${STAT_LABEL_Y - 12}" x2="${cx - 16}" y2="${STAT_VALUE_Y + 4}" stroke="${t.divider}" stroke-width="1"/>`
      )
      .join('')}

    <line x1="0" y1="${CTA_DIV_Y}" x2="${W}" y2="${CTA_DIV_Y}" stroke="${t.border}" stroke-width="1"/>
    <a href="https://github.com/${p.owner}/${p.repo}" target="_blank">
      <rect x="${ctaX}" y="${CTA_Y}" width="${ctaW}" height="${CTA_H}" rx="6" fill="${t.button}"/>
      <text x="${W / 2}" y="${CTA_Y + 22}" text-anchor="middle" font-family="${MONO}" font-size="12.5" font-weight="700" letter-spacing="1.1" fill="${t.buttonText}">VISIT PROJECT</text>
    </a>
  </g>
  <rect x="0.5" y="0.5" width="${W - 1}" height="${H - 1}" rx="12" fill="none" stroke="${t.border}" stroke-width="1"/>
</svg>
`;
}

/* ------------------------------------------------------------------ main */

const { projects } = JSON.parse(readFileSync(DATA, 'utf8'));
if (!Array.isArray(projects) || projects.length === 0) {
  console.error('projects.json has no projects');
  process.exit(1);
}

const check = process.argv.includes('--check');
if (!existsSync(OUT) && !check) mkdirSync(OUT, { recursive: true });

let stale = 0;
for (const p of projects) {
  for (const themeName of Object.keys(THEMES)) {
    const file = join(OUT, `${p.key}-${themeName}.svg`);
    const svg = card(p, THEMES[themeName]);
    if (check) {
      const current = existsSync(file) ? readFileSync(file, 'utf8') : '';
      if (current !== svg) {
        console.error(`stale: ${file}`);
        stale += 1;
      }
    } else {
      writeFileSync(file, svg);
    }
  }
  if (!p.repo || !p.display || !p.blurb || p.language == null || p.stars == null || !p.updated) {
    console.error(`incomplete project entry: ${JSON.stringify(p.key)}`);
    process.exit(1);
  }
}

if (check) {
  if (stale > 0) {
    console.error(`\n${stale} card(s) out of date — run: node .github/scripts/generate-project-cards.mjs`);
    process.exit(1);
  }
  console.log('all project cards up to date');
} else {
  // Remove orphaned cards so deleted projects don't leave stale files.
  const expected = new Set(
    projects.flatMap((p) => Object.keys(THEMES).map((t) => `${p.key}-${t}.svg`))
  );
  for (const f of readdirSync(OUT)) {
    if (f.endsWith('.svg') && !expected.has(f)) {
      // Delete, don't just log: a card left behind for a project that is no
      // longer in projects.json is dead weight and can be linked to by mistake.
      unlinkSync(join(OUT, f));
      console.log(`removed orphaned card ${f}`);
    }
  }
  console.log(`wrote ${projects.length * Object.keys(THEMES).length} cards to .github/assets/cards`);
}
