# 🌐 bidi-kit — Zero-Dependency Bidirectional Text Toolkit

Right-to-left text that behaves: Arabic words inside English sentences, French quotations inside Arabic paragraphs, phone numbers, punctuation, diacritics, and font stacks that go with them — without stylesheet flips or bidi glitches.

[![npm](https://img.shields.io/npm/v/bidi-kit?style=for-the-badge&logo=npm&logoColor=white&color=CB3837)](https://www.npmjs.com/package/bidi-kit)
[![TypeScript](https://img.shields.io/badge/TypeScript-ESM_%2B_CJS-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://github.com/Nour-yahyaoui/ui-storm/tree/main/packages/bidi-kit)
[![Zero Dependencies](https://img.shields.io/badge/dependencies-0-2EA44F?style=for-the-badge)](https://www.npmjs.com/package/bidi-kit)
[![MIT License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)](https://github.com/Nour-yahyaoui/ui-storm/blob/main/LICENSE)

## 📦 Install

```bash
npm install bidi-kit
```

Zero runtime dependencies, no bundled fonts, full TypeScript types, ESM + CommonJS — runs in browsers, Node, and edge workers.

## ✨ Highlights

- **Isolated mixed-script runs** — `paragraph()`, `bdi()`, and `apply()` wrap directional runs in `<bdi>` with explicit `dir` and `lang` attributes so neutral punctuation (`.`, `,`, quotes) never jumps to the wrong side
- **Explicit run segmentation** — `segments()` keeps phone numbers (`+216 71 123 456`) and numeric tokens intact as LTR runs inside RTL text, and keeps Arabic-Indic digits & Arabic punctuation with their Arabic run
- **Direction detection helpers** — `detectDirection()`, `resolveDirection()`, `hasRtl()`, `hasArabic()`, and `isRtlCodePoint()` for deterministic, testable direction handling instead of heuristic `dir="auto"` guesswork
- **Typography & CSS primitives** — `CSS`, `ROOT_CSS`, `FONT_STACKS`, and `ARABIC_FEATURES` isolate `[dir]`/`[lang]` elements, align logically, and apply an Arabic system font stack with raised line-height so diacritics aren't clipped
- **Bidi security auditing** — `stripBidiControls()` and `audit()` detect and remove invisible bidi control characters (`U+202E`, etc.) that can spoof filenames or fields

## 🔗 Links

- [npm package](https://www.npmjs.com/package/bidi-kit)
- [Source & documentation](https://github.com/Nour-yahyaoui/ui-storm/tree/main/packages/bidi-kit)
- [ui-storm monorepo](https://github.com/Nour-yahyaoui/ui-storm)
