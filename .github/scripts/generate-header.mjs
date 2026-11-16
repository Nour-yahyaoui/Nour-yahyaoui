#!/usr/bin/env node
/**
 * Generates the animated profile README hero banner and spectrum divider
 * as self-contained dark/light SVG files.
 *
 * Why committed SVGs: GitHub strips inline styles and scripts from README
 * Markdown, and third-party banner services can 503 or rate-limit behind
 * GitHub's camo proxy. Pure native SVG with CSS keyframes + SMIL animations
 * renders crisply at any DPR, respects light/dark mode via <picture>, and
 * stays 100% self-contained in the repository.
 *
 * Usage:
 *   node .github/scripts/generate-header.mjs           # write assets
 *   node .github/scripts/generate-header.mjs --check   # fail if stale
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const OUT = join(ROOT, '.github/assets');

const SANS =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Inter, Roboto, Helvetica, Arial, 'DejaVu Sans', sans-serif";
const MONO =
  "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, 'DejaVu Sans Mono', monospace";

/* ---------------------------------------------------------------- content */

const PROFILE = {
  status: 'OPEN FOR FREELANCE  ·  TUNISIA',
  coords: '36.8°N · 10.2°E',
  name: 'NOUR YAHYAOUI',
  rolePrefix: 'Full-Stack & ',
  roleAccent: 'AI Systems Engineer',
  roleSuffix: '  ·  3+ yrs shipping end-to-end',
  quote: '“AI power with the perfect leadership.”',
  terminalLines: [
    { text: 'Pure-Rust native apps & zero-dep systems', tag: 'RUSTPAD', accent: 'rust' },
    { text: 'Local AI coding agents on Ollama & Qwen3', tag: 'NOUR-CODE', accent: 'violet' },
    { text: 'Multi-tenant platforms · Next.js & NestJS', tag: 'AGENCYOS', accent: 'cyan' },
    { text: 'Top Committer · Tunisia #2 · Global #101', tag: 'TOP #101', accent: 'magenta' },
  ],
  chips: [
    { label: 'Rust', width: 68, dot: '#DEA584' },
    { label: 'Next.js', width: 88, dot: 'ink' },
    { label: 'React Native', width: 124, dot: '#61DAFB' },
    { label: 'Ollama · Qwen3', width: 140, dot: '#c084fc' },
    { label: 'Supabase', width: 96, dot: '#3ECF8E' },
  ],
};

/* ----------------------------------------------------------------- themes */

const THEMES = {
  dark: {
    bgTop: '#040711',
    bgMid: '#0a1126',
    bgBot: '#0d1117',
    auroraBlue: '#2563eb',
    auroraCyan: '#06b6d4',
    auroraViolet: '#7c3aed',
    auroraMagenta: '#fe428e',
    auroraRust: '#ea580c',
    auroraOpacity: { blue: 0.56, violet: 0.52, cyan: 0.38, rust: 0.30 },
    ribbonOpacity: 0.44,
    glassFlareOpacity: 0.085,
    gridColor: '#7dd3fc',
    gridOpacity: 0.15,
    starColor: '#e0f2fe',
    circuitBase: '#38bdf8',
    circuitBaseOpacity: 0.18,
    circuitPulse: '#a9fef7',
    pillBg: '#0b1224',
    pillBgOpacity: 0.80,
    pillStroke: '#38bdf8',
    pillStrokeOpacity: 0.38,
    pillText: '#dbeafe',
    coordsText: '#7c8ea6',
    onlineDot: '#34d399',
    nameStops: ['#ffffff', '#f1f5f9', '#a9fef7', '#ffffff', '#e0f2fe', '#ffffff'],
    nameGlow: '#38bdf8',
    nameGlowOpacity: 0.44,
    roleText: '#d1dce8',
    roleMuted: '#8b949e',
    roleAccentA: '#a9fef7',
    roleAccentB: '#818cf8',
    roleAccentC: '#fe428e',
    termBg: '#060a14',
    termBgOpacity: 0.84,
    termStroke: '#38bdf8',
    termStrokeOpacity: 0.32,
    termTopLine: '#a9fef7',
    termTopLineOpacity: 0.42,
    termPrompt: '#38bdf8',
    termText: '#eef4fb',
    termProgressA: '#38bdf8',
    termProgressB: '#a9fef7',
    termProgressC: '#fe428e',
    tagBgOpacity: 0.18,
    tagStrokeOpacity: 0.52,
    accents: {
      rust: { fg: '#f4b895', bg: '#DEA584', stroke: '#DEA584' },
      violet: { fg: '#d8b4fe', bg: '#a855f7', stroke: '#c084fc' },
      cyan: { fg: '#a9fef7', bg: '#06b6d4', stroke: '#38bdf8' },
      magenta: { fg: '#ff85b3', bg: '#fe428e', stroke: '#fe428e' },
    },
    chipBg: '#0d1528',
    chipBgOpacity: 0.76,
    chipStroke: '#94a3b8',
    chipStrokeOpacity: 0.28,
    chipText: '#e6edf3',
    chipInkDot: '#f8fafc',
    quoteDiamond: '#a9fef7',
    quoteText: '#94a3b8',
    orbitStroke: '#7dd3fc',
    orbitDashOpacity: 0.36,
    orbitEllipseOpacity: 0.28,
    cometA: '#a9fef7',
    cometB: '#fe428e',
    hexFillA: '#162240',
    hexFillB: '#080d1b',
    hexFillOpacity: 0.90,
    hexInnerFill: '#0e1830',
    hexFacetFill: '#ffffff',
    hexFacetOpacity: 0.11,
    monogramA: '#ffffff',
    monogramB: '#a9fef7',
    monogramC: '#fe428e',
    satBg: '#091020',
    satBgOpacity: 0.88,
    satStrokeOpacity: 0.46,
    satText: '#e6edf3',
    sheenColor: '#ffffff',
    sheenOpacity: 0.13,
    rimHighlightOpacity: 0.92,
    bottomGlowOpacity: 0.52,
    borderA: '#a9fef7',
    borderB: '#818cf8',
    borderC: '#fe428e',
    borderD: '#334155',
    borderOpacity: 0.60,
    cornerColor: '#a9fef7',
    cornerOpacity: 0.62,
    dividerA: '#1f6feb',
    dividerB: '#a9fef7',
    dividerC: '#fe428e',
    dividerPulse: '#ffffff',
  },
  light: {
    bgTop: '#f5f9ff',
    bgMid: '#eaf2ff',
    bgBot: '#ffffff',
    auroraBlue: '#3b82f6',
    auroraCyan: '#06b6d4',
    auroraViolet: '#8b5cf6',
    auroraMagenta: '#ec4899',
    auroraRust: '#f97316',
    auroraOpacity: { blue: 0.28, violet: 0.26, cyan: 0.24, rust: 0.18 },
    ribbonOpacity: 0.30,
    glassFlareOpacity: 0.26,
    gridColor: '#1d4ed8',
    gridOpacity: 0.09,
    starColor: '#2563eb',
    circuitBase: '#2563eb',
    circuitBaseOpacity: 0.16,
    circuitPulse: '#0284c7',
    pillBg: '#ffffff',
    pillBgOpacity: 0.88,
    pillStroke: '#3b82f6',
    pillStrokeOpacity: 0.34,
    pillText: '#1e293b',
    coordsText: '#64748b',
    onlineDot: '#10b981',
    nameStops: ['#0f172a', '#1e293b', '#0284c7', '#0f172a', '#1e3a8a', '#0f172a'],
    nameGlow: '#38bdf8',
    nameGlowOpacity: 0.18,
    roleText: '#1e293b',
    roleMuted: '#64748b',
    roleAccentA: '#0284c7',
    roleAccentB: '#6366f1',
    roleAccentC: '#db2777',
    termBg: '#0f172a',
    termBgOpacity: 0.94,
    termStroke: '#3b82f6',
    termStrokeOpacity: 0.38,
    termTopLine: '#7dd3fc',
    termTopLineOpacity: 0.48,
    termPrompt: '#38bdf8',
    termText: '#f1f5f9',
    termProgressA: '#38bdf8',
    termProgressB: '#818cf8',
    termProgressC: '#f472b6',
    tagBgOpacity: 0.22,
    tagStrokeOpacity: 0.55,
    accents: {
      rust: { fg: '#fdba74', bg: '#ea580c', stroke: '#fb923c' },
      violet: { fg: '#e9d5ff', bg: '#9333ea', stroke: '#c084fc' },
      cyan: { fg: '#a5f3fc', bg: '#0891b2', stroke: '#38bdf8' },
      magenta: { fg: '#fbcfe8', bg: '#db2777', stroke: '#f472b6' },
    },
    chipBg: '#ffffff',
    chipBgOpacity: 0.90,
    chipStroke: '#94a3b8',
    chipStrokeOpacity: 0.42,
    chipText: '#0f172a',
    chipInkDot: '#0f172a',
    quoteDiamond: '#2563eb',
    quoteText: '#475569',
    orbitStroke: '#2563eb',
    orbitDashOpacity: 0.30,
    orbitEllipseOpacity: 0.26,
    cometA: '#0284c7',
    cometB: '#db2777',
    hexFillA: '#ffffff',
    hexFillB: '#dceaff',
    hexFillOpacity: 0.94,
    hexInnerFill: '#f1f6ff',
    hexFacetFill: '#3b82f6',
    hexFacetOpacity: 0.09,
    monogramA: '#0f172a',
    monogramB: '#0284c7',
    monogramC: '#7c3aed',
    satBg: '#ffffff',
    satBgOpacity: 0.94,
    satStrokeOpacity: 0.42,
    satText: '#0f172a',
    sheenColor: '#ffffff',
    sheenOpacity: 0.60,
    rimHighlightOpacity: 0.95,
    bottomGlowOpacity: 0.40,
    borderA: '#38bdf8',
    borderB: '#818cf8',
    borderC: '#f472b6',
    borderD: '#cbd5e1',
    borderOpacity: 0.72,
    cornerColor: '#2563eb',
    cornerOpacity: 0.48,
    dividerA: '#2563eb',
    dividerB: '#06b6d4',
    dividerC: '#db2777',
    dividerPulse: '#0284c7',
  },
};

/* ---------------------------------------------------------------- helpers */

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function hexPoints(cx, cy, r) {
  const pts = [];
  for (let i = 0; i < 6; i += 1) {
    const a = ((i * 60 - 90) * Math.PI) / 180;
    pts.push(`${(cx + r * Math.cos(a)).toFixed(2)},${(cy + r * Math.sin(a)).toFixed(2)}`);
  }
  return pts.join(' ');
}

function sparklePath(cx, cy, r) {
  return `M ${cx} ${(cy - r).toFixed(1)} Q ${cx} ${cy} ${(cx + r).toFixed(1)} ${cy} Q ${cx} ${cy} ${cx} ${(cy + r).toFixed(1)} Q ${cx} ${cy} ${(cx - r).toFixed(1)} ${cy} Q ${cx} ${cy} ${cx} ${(cy - r).toFixed(1)} Z`;
}

/** Deterministic PRNG for twinkling stars so regeneration never churns diffs. */
function buildStars(t, W, H) {
  let seed = 20261116;
  const rnd = () => {
    seed = (seed * 1103515245 + 12345) % 2147483648;
    return seed / 2147483648;
  };
  const stars = [];
  for (let i = 0; i < 36; i += 1) {
    const x = 24 + rnd() * (W - 48);
    const y = 20 + rnd() * (H - 40);
    // Keep stars completely clear of the left typography/chip zone & top-right coords
    if (x < 612 && y > 55 && y < 292) continue;
    if (x > 800 && y < 44) continue;
    const r = (0.8 + rnd() * 1.3).toFixed(1);
    const delay = (rnd() * 4.5).toFixed(2);
    const dur = (2.6 + rnd() * 3.0).toFixed(2);
    const baseOp = (0.30 + rnd() * 0.55).toFixed(2);
    stars.push(
      `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r}" fill="${t.starColor}" opacity="${baseOp}" class="twinkle" style="animation-delay:${delay}s;animation-duration:${dur}s"/>`
    );
  }
  // 4 curated 4-point diamond glints in open focal zones
  const glints = [
    { x: 586, y: 40, r: 7.5, delay: '0.2s' },
    { x: 916, y: 126, r: 6.5, delay: '1.6s' },
    { x: 632, y: 304, r: 7.0, delay: '2.8s' },
    { x: 462, y: 42, r: 5.5, delay: '3.7s' },
  ];
  for (const g of glints) {
    stars.push(
      `<path d="${sparklePath(g.x, g.y, g.r)}" fill="${t.starColor}" opacity="0.78" class="sparkle" style="animation-delay:${g.delay}"/>`
    );
  }
  return stars.join('\n      ');
}

/* ----------------------------------------------------------- hero builder */

function buildHeader(themeName) {
  const t = THEMES[themeName];
  const W = 960;
  const H = 350;
  const RX = 18;
  const CX = 772;
  const CY = 176;

  // Chip row layout (generous, uniform left/right padding on every chip)
  let chipX = 48;
  const chipY = 248;
  const chipH = 28;
  const chipGap = 7;
  const chipsSvg = PROFILE.chips
    .map((c) => {
      const x = chipX;
      chipX += c.width + chipGap;
      const dotColor = c.dot === 'ink' ? t.chipInkDot : c.dot;
      return `<g transform="translate(${x}, ${chipY})">
        <rect width="${c.width}" height="${chipH}" rx="14" fill="${t.chipBg}" fill-opacity="${t.chipBgOpacity}" stroke="${t.chipStroke}" stroke-opacity="${t.chipStrokeOpacity}" stroke-width="1"/>
        <circle cx="14" cy="14" r="3.3" fill="${dotColor}"/>
        <text x="24" y="17.8" font-family="${MONO}" font-size="11" font-weight="600" fill="${t.chipText}">${esc(c.label)}</text>
      </g>`;
    })
    .join('\n      ');
  const chipsEndX = chipX - chipGap; // 598

  // Cycling terminal lines (4 lines, 16s loop; line 0 visible at t=0 for static renders)
  const termLinesSvg = PROFILE.terminalLines
    .map((line, i) => {
      const acc = t.accents[line.accent];
      return `<g class="term-line term-line-${i}">
        <text x="86" y="205.5" font-family="${MONO}" font-size="12.5" fill="${t.termText}">${esc(line.text)}</text>
        <rect x="466" y="188.5" width="84" height="24" rx="6" fill="${acc.bg}" fill-opacity="${t.tagBgOpacity}" stroke="${acc.stroke}" stroke-opacity="${t.tagStrokeOpacity}" stroke-width="1"/>
        <text x="508" y="204" text-anchor="middle" font-family="${MONO}" font-size="9.5" font-weight="700" letter-spacing="0.8" fill="${acc.fg}">${esc(line.tag)}</text>
      </g>`;
    })
    .join('\n      ');

  const outerHex = hexPoints(CX, CY, 53);
  const innerHex = hexPoints(CX, CY, 42);
  const hexFacet = `${CX},${CY - 52} ${(CX + 45).toFixed(1)},${(CY - 26).toFixed(1)} ${CX},${CY} ${(CX - 45).toFixed(1)},${(CY - 26).toFixed(1)}`;

  // 3 floating architectural satellite chips around the orbital core
  const satellites = [
    { x: 604, y: 48, w: 112, label: 'FULL-STACK', dot: '#38bdf8', stroke: '#38bdf8' },
    { x: 846, y: 58, w: 72, label: 'RUST', dot: '#DEA584', stroke: '#DEA584' },
    { x: 814, y: 288, w: 108, label: 'AI AGENTS', dot: '#fe428e', stroke: '#fe428e' },
  ];
  const satellitesSvg = satellites
    .map(
      (s) => `<g transform="translate(${s.x}, ${s.y})">
        <rect width="${s.w}" height="24" rx="12" fill="${t.satBg}" fill-opacity="${t.satBgOpacity}" stroke="${s.stroke}" stroke-opacity="${t.satStrokeOpacity}" stroke-width="1"/>
        <circle cx="13" cy="12" r="3" fill="${s.dot}"/>
        <text x="23" y="15.5" font-family="${MONO}" font-size="9.5" font-weight="700" letter-spacing="0.9" fill="${t.satText}">${esc(s.label)}</text>
      </g>`
    )
    .join('\n      ');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" fill="none" role="img" aria-label="Nour Yahyaoui — Full-Stack and AI Systems Engineer">
  <title>Nour Yahyaoui — Full-Stack &amp; AI Systems Engineer</title>
  <defs>
    <clipPath id="card-clip">
      <rect x="0" y="0" width="${W}" height="${H}" rx="${RX}"/>
    </clipPath>
    <clipPath id="term-clip">
      <rect x="78" y="179" width="480" height="44" rx="6"/>
    </clipPath>
    <clipPath id="term-box-clip">
      <rect x="48" y="176" width="516" height="50" rx="11"/>
    </clipPath>

    <!-- Base obsidian / pearl backdrop -->
    <linearGradient id="bg-grad" x1="0" y1="0" x2="${W}" y2="${H}" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="${t.bgTop}"/>
      <stop offset="50%" stop-color="${t.bgMid}"/>
      <stop offset="100%" stop-color="${t.bgBot}"/>
    </linearGradient>

    <!-- Overhead specular sapphire glass sheen (permanent subtle studio reflection) -->
    <linearGradient id="glass-flare" x1="0%" y1="0%" x2="55%" y2="85%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="${t.glassFlareOpacity}"/>
      <stop offset="42%" stop-color="${t.auroraCyan}" stop-opacity="${(t.glassFlareOpacity * 0.45).toFixed(3)}"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </linearGradient>

    <!-- Aurora luminous radial glows -->
    <radialGradient id="orb-blue" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${t.auroraBlue}" stop-opacity="${t.auroraOpacity.blue}"/>
      <stop offset="52%" stop-color="${t.auroraCyan}" stop-opacity="${(t.auroraOpacity.blue * 0.42).toFixed(2)}"/>
      <stop offset="100%" stop-color="${t.auroraBlue}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="orb-violet" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${t.auroraViolet}" stop-opacity="${t.auroraOpacity.violet}"/>
      <stop offset="50%" stop-color="${t.auroraMagenta}" stop-opacity="${(t.auroraOpacity.violet * 0.50).toFixed(2)}"/>
      <stop offset="100%" stop-color="${t.auroraViolet}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="orb-cyan" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${t.auroraCyan}" stop-opacity="${t.auroraOpacity.cyan}"/>
      <stop offset="100%" stop-color="${t.auroraCyan}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="orb-rust" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${t.auroraRust}" stop-opacity="${t.auroraOpacity.rust}"/>
      <stop offset="100%" stop-color="${t.auroraRust}" stop-opacity="0"/>
    </radialGradient>

    <!-- Liquid-aurora silk ribbons -->
    <linearGradient id="ribbon-a" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${t.auroraBlue}" stop-opacity="0"/>
      <stop offset="25%" stop-color="${t.auroraCyan}" stop-opacity="0.9"/>
      <stop offset="62%" stop-color="${t.auroraViolet}" stop-opacity="0.92"/>
      <stop offset="100%" stop-color="${t.auroraMagenta}" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="ribbon-b" x1="0%" y1="100%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${t.auroraViolet}" stop-opacity="0"/>
      <stop offset="32%" stop-color="${t.auroraMagenta}" stop-opacity="0.78"/>
      <stop offset="70%" stop-color="${t.auroraCyan}" stop-opacity="0.88"/>
      <stop offset="100%" stop-color="${t.auroraRust}" stop-opacity="0"/>
    </linearGradient>

    <!-- Animated liquid-chrome metallic shimmer across hero name -->
    <linearGradient id="name-chrome" x1="-100%" y1="0%" x2="100%" y2="0%" spreadMethod="repeat">
      <stop offset="0%" stop-color="${t.nameStops[0]}"/>
      <stop offset="26%" stop-color="${t.nameStops[1]}"/>
      <stop offset="38%" stop-color="${t.nameStops[2]}"/>
      <stop offset="48%" stop-color="${t.nameStops[3]}"/>
      <stop offset="72%" stop-color="${t.nameStops[4]}"/>
      <stop offset="100%" stop-color="${t.nameStops[5]}"/>
      <animateTransform attributeName="gradientTransform" type="translate" from="0 0" to="1 0" dur="5.2s" repeatCount="indefinite"/>
    </linearGradient>

    <!-- Role & terminal scan gradients -->
    <linearGradient id="role-grad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${t.roleAccentA}"/>
      <stop offset="52%" stop-color="${t.roleAccentB}"/>
      <stop offset="100%" stop-color="${t.roleAccentC}"/>
    </linearGradient>
    <linearGradient id="term-progress" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${t.termProgressA}" stop-opacity="0"/>
      <stop offset="65%" stop-color="${t.termProgressB}" stop-opacity="0.95"/>
      <stop offset="100%" stop-color="${t.termProgressC}" stop-opacity="1"/>
    </linearGradient>

    <!-- Orbital luminous arc gradients -->
    <linearGradient id="arc-neon" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${t.auroraCyan}"/>
      <stop offset="55%" stop-color="${t.auroraViolet}"/>
      <stop offset="100%" stop-color="${t.auroraMagenta}"/>
    </linearGradient>
    <linearGradient id="arc-rust" x1="0%" y1="100%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#DEA584"/>
      <stop offset="60%" stop-color="#f97316"/>
      <stop offset="100%" stop-color="${t.auroraMagenta}"/>
    </linearGradient>

    <!-- Core hexagon glass & monogram -->
    <linearGradient id="hex-bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${t.hexFillA}"/>
      <stop offset="100%" stop-color="${t.hexFillB}"/>
    </linearGradient>
    <linearGradient id="monogram-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${t.monogramA}"/>
      <stop offset="50%" stop-color="${t.monogramB}"/>
      <stop offset="100%" stop-color="${t.monogramC}"/>
    </linearGradient>

    <!-- Specular rim lights & diagonal glass sheen -->
    <linearGradient id="rim-light" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0"/>
      <stop offset="20%" stop-color="${t.auroraCyan}" stop-opacity="0.65"/>
      <stop offset="50%" stop-color="#ffffff" stop-opacity="${t.rimHighlightOpacity}"/>
      <stop offset="80%" stop-color="${t.auroraMagenta}" stop-opacity="0.65"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="bottom-rim" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${t.auroraCyan}" stop-opacity="0"/>
      <stop offset="50%" stop-color="${t.auroraCyan}" stop-opacity="${t.bottomGlowOpacity}"/>
      <stop offset="82%" stop-color="${t.auroraMagenta}" stop-opacity="${(t.bottomGlowOpacity * 0.85).toFixed(2)}"/>
      <stop offset="100%" stop-color="${t.auroraMagenta}" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="glass-sheen" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${t.sheenColor}" stop-opacity="0"/>
      <stop offset="42%" stop-color="${t.sheenColor}" stop-opacity="${t.sheenOpacity}"/>
      <stop offset="50%" stop-color="${t.auroraCyan}" stop-opacity="${(t.sheenOpacity * 1.2).toFixed(2)}"/>
      <stop offset="58%" stop-color="${t.sheenColor}" stop-opacity="${t.sheenOpacity}"/>
      <stop offset="100%" stop-color="${t.sheenColor}" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="border-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${t.borderA}" stop-opacity="${t.borderOpacity}"/>
      <stop offset="36%" stop-color="${t.borderB}" stop-opacity="${(t.borderOpacity * 0.78).toFixed(2)}"/>
      <stop offset="70%" stop-color="${t.borderC}" stop-opacity="${(t.borderOpacity * 0.72).toFixed(2)}"/>
      <stop offset="100%" stop-color="${t.borderD}" stop-opacity="${(t.borderOpacity * 0.85).toFixed(2)}"/>
    </linearGradient>

    <!-- Architectural micro-grid pattern with spotlight fade mask -->
    <pattern id="grid-pat" width="32" height="32" patternUnits="userSpaceOnUse">
      <path d="M 32 0 L 0 0 0 32" fill="none" stroke="${t.gridColor}" stroke-width="0.7" stroke-opacity="${t.gridOpacity}"/>
      <circle cx="0" cy="0" r="1.1" fill="${t.gridColor}" fill-opacity="${(t.gridOpacity * 1.85).toFixed(2)}"/>
    </pattern>
    <radialGradient id="grid-fade" cx="62%" cy="46%" r="58%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="1"/>
      <stop offset="62%" stop-color="#ffffff" stop-opacity="0.48"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </radialGradient>
    <mask id="grid-mask">
      <rect width="${W}" height="${H}" fill="url(#grid-fade)"/>
    </mask>

    <!-- Soft glow filters -->
    <filter id="aurora-blur" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="28"/>
    </filter>
    <filter id="ribbon-blur" x="-15%" y="-40%" width="130%" height="180%">
      <feGaussianBlur stdDeviation="11"/>
    </filter>
    <filter id="soft-glow" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="4.2" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    <filter id="text-glow" x="-15%" y="-35%" width="130%" height="170%">
      <feGaussianBlur stdDeviation="8" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>

  <style>
    @keyframes driftA {
      0%, 100% { transform: translate(0px, 0px); }
      50% { transform: translate(24px, 14px); }
    }
    @keyframes driftB {
      0%, 100% { transform: translate(0px, 0px); }
      50% { transform: translate(-22px, -16px); }
    }
    @keyframes ping {
      0% { transform: scale(1); opacity: 0.85; }
      75%, 100% { transform: scale(2.6); opacity: 0; }
    }
    @keyframes twinkle {
      0%, 100% { opacity: 0.22; }
      50% { opacity: 0.94; }
    }
    @keyframes sparklePulse {
      0%, 100% { opacity: 0.28; }
      50% { opacity: 0.98; }
    }
    @keyframes pulseLine {
      0% { stroke-dashoffset: 320; opacity: 0; }
      15% { opacity: 0.95; }
      80% { opacity: 0.85; }
      100% { stroke-dashoffset: -120; opacity: 0; }
    }
    /* 4-line seamless terminal cycle (16s total). Line 0 visible at 0% for static previews. */
    @keyframes cycle0 {
      0%, 20% { opacity: 1; transform: translateY(0px); }
      25%, 95% { opacity: 0; transform: translateY(-10px); }
      96% { opacity: 0; transform: translateY(10px); }
      100% { opacity: 1; transform: translateY(0px); }
    }
    @keyframes cycle1 {
      0%, 21% { opacity: 0; transform: translateY(10px); }
      25%, 45% { opacity: 1; transform: translateY(0px); }
      50%, 100% { opacity: 0; transform: translateY(-10px); }
    }
    @keyframes cycle2 {
      0%, 46% { opacity: 0; transform: translateY(10px); }
      50%, 70% { opacity: 1; transform: translateY(0px); }
      75%, 100% { opacity: 0; transform: translateY(-10px); }
    }
    @keyframes cycle3 {
      0%, 71% { opacity: 0; transform: translateY(10px); }
      75%, 95% { opacity: 1; transform: translateY(0px); }
      100% { opacity: 0; transform: translateY(-10px); }
    }

    .aurora-a { animation: driftA 12s ease-in-out infinite; }
    .aurora-b { animation: driftB 15s ease-in-out infinite; }
    .ping-ring { transform-box: fill-box; transform-origin: center; animation: ping 2.4s cubic-bezier(0, 0, 0.2, 1) infinite; }
    .twinkle { animation: twinkle 3.6s ease-in-out infinite; }
    .sparkle { animation: sparklePulse 4.2s ease-in-out infinite; }
    .circuit-pulse-1 { stroke-dasharray: 44 276; animation: pulseLine 4.6s linear infinite; }
    .circuit-pulse-2 { stroke-dasharray: 38 282; animation: pulseLine 5.8s linear 1.9s infinite; }
    .circuit-pulse-3 { stroke-dasharray: 32 288; animation: pulseLine 6.4s linear 3.2s infinite; }
    .term-line { will-change: opacity, transform; }
    .term-line-0 { opacity: 1; animation: cycle0 16s ease-in-out infinite; }
    .term-line-1 { opacity: 0; animation: cycle1 16s ease-in-out infinite; }
    .term-line-2 { opacity: 0; animation: cycle2 16s ease-in-out infinite; }
    .term-line-3 { opacity: 0; animation: cycle3 16s ease-in-out infinite; }

    @media (prefers-reduced-motion: reduce) {
      .aurora-a, .aurora-b, .ping-ring, .twinkle, .sparkle,
      .circuit-pulse-1, .circuit-pulse-2, .circuit-pulse-3,
      .term-line-0, .term-line-1, .term-line-2, .term-line-3 {
        animation: none;
      }
      .term-line-0 { opacity: 1; }
      .term-line-1, .term-line-2, .term-line-3 { opacity: 0; }
    }
  </style>

  <g clip-path="url(#card-clip)">
    <!-- Layer 1: Base canvas, shiny aurora mesh & studio glass reflection -->
    <rect width="${W}" height="${H}" fill="url(#bg-grad)"/>

    <g filter="url(#aurora-blur)">
      <ellipse class="aurora-a" cx="220" cy="60" rx="300" ry="165" fill="url(#orb-blue)"/>
      <ellipse class="aurora-b" cx="${CX}" cy="${CY}" rx="245" ry="190" fill="url(#orb-violet)"/>
      <ellipse class="aurora-a" cx="555" cy="316" rx="280" ry="140" fill="url(#orb-cyan)"/>
      <ellipse class="aurora-b" cx="${CX + 26}" cy="${CY + 24}" rx="130" ry="108" fill="url(#orb-rust)"/>
    </g>

    <!-- Iridescent silk light ribbons -->
    <g filter="url(#ribbon-blur)" opacity="${t.ribbonOpacity}">
      <path d="M -40 278 C 190 198, 410 310, 660 156 C 790 76, 890 112, 1000 68" stroke="url(#ribbon-a)" stroke-width="28" stroke-linecap="round"/>
      <path d="M -30 96 C 210 154, 445 36, 705 210 C 815 284, 905 244, 1000 220" stroke="url(#ribbon-b)" stroke-width="20" stroke-linecap="round"/>
    </g>

    <!-- Permanent subtle overhead studio glass flare (soft feathered edge) -->
    <polygon points="0,0 590,0 320,350 0,350" fill="url(#glass-flare)" filter="url(#ribbon-blur)"/>

    <!-- Layer 2: Precision micro-grid, circuit fiber trails & stars -->
    <rect width="${W}" height="${H}" fill="url(#grid-pat)" mask="url(#grid-mask)"/>

    <g opacity="0.92">
      <!-- Base subtle circuit paths connecting left identity to right core -->
      <path d="M 564 198 L 624 198 L 646 176 L 676 176" stroke="${t.circuitBase}" stroke-opacity="${t.circuitBaseOpacity}" stroke-width="1.2"/>
      <path d="M ${chipsEndX + 10} 262 L 642 262 L 674 224 L 698 224" stroke="${t.circuitBase}" stroke-opacity="${t.circuitBaseOpacity}" stroke-width="1.2"/>
      <path d="M 326 47 L 548 47 L 598 97 L 682 97" stroke="${t.circuitBase}" stroke-opacity="${t.circuitBaseOpacity}" stroke-width="1.1"/>
      <!-- Glowing animated data pulses traveling along the circuits -->
      <path d="M 564 198 L 624 198 L 646 176 L 676 176" stroke="${t.circuitPulse}" stroke-width="1.9" stroke-linecap="round" class="circuit-pulse-1" filter="url(#soft-glow)"/>
      <path d="M ${chipsEndX + 10} 262 L 642 262 L 674 224 L 698 224" stroke="${t.auroraMagenta}" stroke-width="1.9" stroke-linecap="round" class="circuit-pulse-2" filter="url(#soft-glow)"/>
      <path d="M 326 47 L 548 47 L 598 97 L 682 97" stroke="${t.circuitPulse}" stroke-width="1.6" stroke-linecap="round" class="circuit-pulse-3" filter="url(#soft-glow)"/>
      <!-- Circuit terminal micro-nodes -->
      <circle cx="676" cy="176" r="2.6" fill="${t.circuitPulse}" opacity="0.85"/>
      <circle cx="698" cy="224" r="2.4" fill="${t.auroraMagenta}" opacity="0.8"/>
      <circle cx="682" cy="97" r="2.2" fill="${t.circuitPulse}" opacity="0.75"/>
    </g>

    <!-- Twinkling starfield & specular glints -->
    <g>
      ${buildStars(t, W, H)}
    </g>

    <!-- Layer 3: Left Executive Identity & Live Terminal -->
    <!-- Top-right telemetry coordinates -->
    <text x="${W - 34}" y="30" text-anchor="end" font-family="${MONO}" font-size="9.5" letter-spacing="1.4" fill="${t.coordsText}" opacity="0.9">${esc(PROFILE.coords)}</text>

    <!-- Availability status glass pill -->
    <g transform="translate(48, 34)">
      <rect width="268" height="26" rx="13" fill="${t.pillBg}" fill-opacity="${t.pillBgOpacity}" stroke="${t.pillStroke}" stroke-opacity="${t.pillStrokeOpacity}" stroke-width="1"/>
      <circle cx="16" cy="13" r="4.2" fill="${t.onlineDot}" opacity="0.55" class="ping-ring"/>
      <circle cx="16" cy="13" r="3.6" fill="${t.onlineDot}"/>
      <text x="29" y="16.8" font-family="${MONO}" font-size="10.2" font-weight="600" letter-spacing="1.15" fill="${t.pillText}">${esc(PROFILE.status)}</text>
    </g>

    <!-- Hero Display Name with luminous glow + animated chrome shimmer -->
    <text x="48" y="118" font-family="${SANS}" font-size="46" font-weight="800" letter-spacing="-0.6" fill="${t.nameGlow}" opacity="${t.nameGlowOpacity}" filter="url(#text-glow)">${esc(PROFILE.name)}</text>
    <text x="48" y="118" font-family="${SANS}" font-size="46" font-weight="800" letter-spacing="-0.6" fill="url(#name-chrome)">${esc(PROFILE.name)}</text>

    <!-- Commanding role & tenure subtitle -->
    <text x="49" y="152" font-family="${SANS}" font-size="16" font-weight="600" fill="${t.roleText}">${esc(PROFILE.rolePrefix)}<tspan fill="url(#role-grad)" font-weight="700">${esc(PROFILE.roleAccent)}</tspan><tspan fill="${t.roleMuted}" font-weight="500" font-size="14">${esc(PROFILE.roleSuffix)}</tspan></text>

    <!-- Special Piece #1: Live Animated Glass Terminal Bar -->
    <g>
      <rect x="48" y="176" width="516" height="50" rx="11" fill="${t.termBg}" fill-opacity="${t.termBgOpacity}" stroke="${t.termStroke}" stroke-opacity="${t.termStrokeOpacity}" stroke-width="1"/>
      <!-- Top inner glass reflection on terminal -->
      <line x1="62" y1="177" x2="550" y2="177" stroke="${t.termTopLine}" stroke-opacity="${t.termTopLineOpacity}" stroke-width="1"/>
      <!-- Prompt chevron -->
      <text x="64" y="205.5" font-family="${MONO}" font-size="14" font-weight="700" fill="${t.termPrompt}">❯</text>
      <!-- Cycling status lines -->
      <g clip-path="url(#term-clip)">
        ${termLinesSvg}
      </g>
      <!-- Animated neon cycle progress scan bar along bottom bevel of terminal -->
      <g clip-path="url(#term-box-clip)">
        <rect x="48" y="224" width="160" height="2" fill="url(#term-progress)" filter="url(#soft-glow)">
          <animate attributeName="width" values="18; 516" dur="4s" repeatCount="indefinite"/>
        </rect>
      </g>
    </g>

    <!-- Tech Stack Glass Chips -->
    <g>
      ${chipsSvg}
    </g>

    <!-- Signature Motto Line -->
    <g transform="translate(49, 313)">
      <path d="M 4 -8 L 8 -4 L 4 0 L 0 -4 Z" fill="${t.quoteDiamond}" opacity="0.92"/>
      <text x="16" y="-0.5" font-family="${MONO}" font-size="11.5" font-style="italic" letter-spacing="0.3" fill="${t.quoteText}">${esc(PROFILE.quote)}</text>
    </g>

    <!-- Layer 4: Special Piece #2 — Luminous Animated Quantum Systems Core -->
    <g>
      <!-- Outer precision telemetry ring (clockwise slow rotation) -->
      <g>
        <animateTransform attributeName="transform" type="rotate" from="0 ${CX} ${CY}" to="360 ${CX} ${CY}" dur="48s" repeatCount="indefinite"/>
        <circle cx="${CX}" cy="${CY}" r="110" stroke="${t.orbitStroke}" stroke-opacity="${t.orbitDashOpacity}" stroke-width="1" stroke-dasharray="3 7"/>
        <line x1="${CX}" y1="${CY - 117}" x2="${CX}" y2="${CY - 104}" stroke="${t.orbitStroke}" stroke-opacity="0.6" stroke-width="1.4"/>
        <line x1="${CX}" y1="${CY + 104}" x2="${CX}" y2="${CY + 117}" stroke="${t.orbitStroke}" stroke-opacity="0.6" stroke-width="1.4"/>
        <line x1="${CX - 117}" y1="${CY}" x2="${CX - 104}" y2="${CY}" stroke="${t.orbitStroke}" stroke-opacity="0.6" stroke-width="1.4"/>
        <line x1="${CX + 104}" y1="${CY}" x2="${CX + 117}" y2="${CY}" stroke="${t.orbitStroke}" stroke-opacity="0.6" stroke-width="1.4"/>
      </g>

      <!-- Counter-rotating glowing neon energy arcs -->
      <g filter="url(#soft-glow)">
        <animateTransform attributeName="transform" type="rotate" from="360 ${CX} ${CY}" to="0 ${CX} ${CY}" dur="18s" repeatCount="indefinite"/>
        <circle cx="${CX}" cy="${CY}" r="91" stroke="url(#arc-neon)" stroke-width="2.4" stroke-linecap="round" stroke-dasharray="122 453"/>
        <circle cx="${CX}" cy="${CY}" r="91" stroke="url(#arc-rust)" stroke-width="2.4" stroke-linecap="round" stroke-dasharray="74 501" stroke-dashoffset="-285"/>
      </g>

      <!-- Tilted 3D Gyroscopic Orbit #1 (+32 deg) with glowing photon streak comet -->
      <g transform="translate(${CX} ${CY}) rotate(32) scale(1 0.36)">
        <circle cx="0" cy="0" r="114" stroke="${t.orbitStroke}" stroke-opacity="${t.orbitEllipseOpacity}" stroke-width="2"/>
        <g filter="url(#soft-glow)">
          <animateTransform attributeName="transform" type="rotate" from="18 0 0" to="378 0 0" dur="9.5s" repeatCount="indefinite"/>
          <circle cx="0" cy="0" r="114" stroke="${t.cometA}" stroke-width="4.2" stroke-linecap="round" stroke-dasharray="36 682"/>
          <circle cx="0" cy="0" r="114" stroke="#ffffff" stroke-width="2.6" stroke-linecap="round" stroke-dasharray="8 710" stroke-dashoffset="-28"/>
        </g>
      </g>

      <!-- Tilted 3D Gyroscopic Orbit #2 (-32 deg) with glowing magenta photon streak comet -->
      <g transform="translate(${CX} ${CY}) rotate(-32) scale(1 0.36)">
        <circle cx="0" cy="0" r="114" stroke="${t.auroraMagenta}" stroke-opacity="${t.orbitEllipseOpacity}" stroke-width="2"/>
        <g filter="url(#soft-glow)">
          <animateTransform attributeName="transform" type="rotate" from="202 0 0" to="-158 0 0" dur="12.5s" repeatCount="indefinite"/>
          <circle cx="0" cy="0" r="114" stroke="${t.cometB}" stroke-width="4.2" stroke-linecap="round" stroke-dasharray="36 682"/>
          <circle cx="0" cy="0" r="114" stroke="#ffffff" stroke-width="2.6" stroke-linecap="round" stroke-dasharray="8 710" stroke-dashoffset="-28"/>
        </g>
      </g>

      <!-- Inner faceted hexagonal sapphire crystal emblem -->
      <g>
        <polygon points="${outerHex}" fill="url(#hex-bg)" fill-opacity="${t.hexFillOpacity}" stroke="url(#arc-neon)" stroke-width="2" filter="url(#soft-glow)"/>
        <polygon points="${innerHex}" fill="${t.hexInnerFill}" fill-opacity="0.74" stroke="${t.orbitStroke}" stroke-opacity="0.34" stroke-width="1"/>
        <!-- Crystal specular top facet -->
        <polygon points="${hexFacet}" fill="${t.hexFacetFill}" fill-opacity="${t.hexFacetOpacity}"/>

        <!-- Custom razor-sharp geometric NY monogram (font-independent vector paths) -->
        <g transform="translate(${CX} ${CY})">
          <path d="M -20 14 L -20 -14 L -4 14 L -4 -14 M 5 -14 L 13 0 L 21 -14 M 13 0 L 13 14" stroke="url(#monogram-grad)" stroke-width="4.4" stroke-linecap="round" stroke-linejoin="round" opacity="0.50" filter="url(#soft-glow)"/>
          <path d="M -20 14 L -20 -14 L -4 14 L -4 -14 M 5 -14 L 13 0 L 21 -14 M 13 0 L 13 14" stroke="url(#monogram-grad)" stroke-width="3.7" stroke-linecap="round" stroke-linejoin="round"/>
        </g>
      </g>

      <!-- Floating Satellite Telemetry Chips -->
      ${satellitesSvg}
    </g>

    <!-- Layer 5: Specular Glass Sheen Sweep, Top/Bottom Rim Lights & Metallic Frame -->
    <g opacity="0.95">
      <g transform="skewX(-24)">
        <rect x="-260" y="0" width="230" height="${H}" fill="url(#glass-sheen)">
          <animateTransform attributeName="transform" type="translate" values="0 0; 1580 0; 1580 0" keyTimes="0; 0.34; 1" dur="7.5s" repeatCount="indefinite"/>
        </rect>
      </g>
    </g>

    <!-- Polished top & bottom edge specular reflections -->
    <rect x="64" y="0.8" width="${W - 128}" height="1.8" rx="0.9" fill="url(#rim-light)"/>
    <rect x="380" y="${H - 2.2}" width="520" height="1.6" rx="0.8" fill="url(#bottom-rim)"/>

    <!-- Subtle corner precision hardware brackets -->
    <g stroke="${t.cornerColor}" stroke-opacity="${t.cornerOpacity}" stroke-width="1.3" stroke-linecap="round">
      <path d="M 18 30 L 18 18 L 30 18"/>
      <path d="M ${W - 30} 18 L ${W - 18} 18 L ${W - 18} 30"/>
      <path d="M 18 ${H - 30} L 18 ${H - 18} L 30 ${H - 18}"/>
      <path d="M ${W - 30} ${H - 18} L ${W - 18} ${H - 18} L ${W - 18} ${H - 30}"/>
    </g>
  </g>

  <!-- Crisp iridescent outer glass border -->
  <rect x="0.75" y="0.75" width="${W - 1.5}" height="${H - 1.5}" rx="${RX}" stroke="url(#border-grad)" stroke-width="1.35"/>
</svg>
`;
}

/* -------------------------------------------------------- divider builder */

function buildDivider(themeName) {
  const t = THEMES[themeName];
  const W = 960;
  const H = 18;
  const MY = H / 2;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" fill="none" role="presentation" aria-hidden="true">
  <defs>
    <linearGradient id="div-line" x1="20" y1="0" x2="${W - 20}" y2="0" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="${t.dividerA}" stop-opacity="0"/>
      <stop offset="20%" stop-color="${t.dividerA}" stop-opacity="0.65"/>
      <stop offset="50%" stop-color="${t.dividerB}" stop-opacity="0.95"/>
      <stop offset="80%" stop-color="${t.dividerC}" stop-opacity="0.65"/>
      <stop offset="100%" stop-color="${t.dividerC}" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="div-beam" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${t.dividerPulse}" stop-opacity="0"/>
      <stop offset="50%" stop-color="${t.dividerPulse}" stop-opacity="0.95"/>
      <stop offset="100%" stop-color="${t.dividerPulse}" stop-opacity="0"/>
    </linearGradient>
    <filter id="div-glow" x="-20%" y="-200%" width="140%" height="500%">
      <feGaussianBlur stdDeviation="2.2" result="b"/>
      <feMerge>
        <feMergeNode in="b"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>

  <rect x="20" y="${(MY - 0.75).toFixed(2)}" width="${W - 40}" height="1.5" rx="0.75" fill="url(#div-line)"/>

  <!-- Gliding luminous pulse -->
  <rect x="-140" y="${MY - 1.1}" width="140" height="2.2" rx="1.1" fill="url(#div-beam)" filter="url(#div-glow)">
    <animate attributeName="x" values="-160; ${W + 20}; ${W + 20}" keyTimes="0; 0.55; 1" dur="5.2s" repeatCount="indefinite"/>
  </rect>

  <!-- Center crystal diamond -->
  <path d="M ${W / 2} ${MY - 5} L ${W / 2 + 5} ${MY} L ${W / 2} ${MY + 5} L ${W / 2 - 5} ${MY} Z" fill="${t.dividerB}" filter="url(#div-glow)"/>
</svg>
`;
}

/* ------------------------------------------------------------------- main */

const check = process.argv.includes('--check');
if (!existsSync(OUT) && !check) mkdirSync(OUT, { recursive: true });

const targets = [
  ['header-dark.svg', buildHeader('dark')],
  ['header-light.svg', buildHeader('light')],
  ['divider-dark.svg', buildDivider('dark')],
  ['divider-light.svg', buildDivider('light')],
];

let stale = 0;
for (const [name, svg] of targets) {
  const file = join(OUT, name);
  if (check) {
    const cur = existsSync(file) ? readFileSync(file, 'utf8') : '';
    if (cur !== svg) {
      console.error(`stale: ${file}`);
      stale += 1;
    }
  } else {
    writeFileSync(file, svg);
  }
}

if (check) {
  if (stale > 0) {
    console.error(`\n${stale} header asset(s) out of date — run: node .github/scripts/generate-header.mjs`);
    process.exit(1);
  }
  console.log('all header assets up to date');
} else {
  console.log(`wrote ${targets.length} header assets to .github/assets`);
}
