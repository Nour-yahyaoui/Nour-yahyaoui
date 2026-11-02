# 🦀 RustPad — Native Desktop Word & PDF Studio

A 60–120Hz native desktop Microsoft Word (`.docx`) and vector PDF (`.pdf`) studio written in **39,358 lines of zero-dependency Rust** across 9 workspace crates. Instead of shipping a 400 MB Chromium/WebView wrapper, RustPad compiles its own DEFLATE/PKZIP streaming archiver, ECMA-376 OpenXML engine, ISO 32000 PDF 1.7 engine, PNG/JPEG/BMP codecs, TrueType glyph rasterizer, and native Win32/X11 window backend into a single **4.96 MB** standalone executable that cold-starts in under 100 ms.

[![Version](https://img.shields.io/badge/version-3.0.0-DEA584?style=for-the-badge)](https://github.com/Nour-yahyaoui/rustpad/releases/tag/v3.0.0)
[![Rust](https://img.shields.io/badge/Rust-100%25_pure-000000?style=for-the-badge&logo=rust&logoColor=white)](https://github.com/Nour-yahyaoui/rustpad)
[![Windows 4.96 MB](https://img.shields.io/badge/Windows-4.96_MB_.exe-0078D4?style=for-the-badge&logo=windows&logoColor=white)](https://github.com/Nour-yahyaoui/rustpad/releases/download/v3.0.0/rustpad-v3.0.0-windows-x86_64.exe)
[![Linux 4.53 MB](https://img.shields.io/badge/Linux-4.53_MB_x64-FCC624?style=for-the-badge&logo=linux&logoColor=black)](https://github.com/Nour-yahyaoui/rustpad/releases/download/v3.0.0/rustpad-v3.0.0-linux-x86_64)
[![Zero crates.io deps](https://img.shields.io/badge/crates.io_deps-0-2EA44F?style=for-the-badge)](https://github.com/Nour-yahyaoui/rustpad)

## ✨ Highlights

- **Full `.docx` & `.pdf` studio + 3-mode Dark Studio** — paginated A4/Letter Word authoring (headings, lists, tables, figures, footnotes/endnotes, section breaks, Track Changes redlining, 3-way `.docx` merge, starter templates), 3-mode `Ctrl+Shift+D` Dark Studio (`Daylight`, `Midnight`, `HybridDarkDesk`), vector PDF editing, highlights, sticky notes, ink signatures, PII redaction, 102-action `Ctrl+K` command palette
- **Zero `crates.io` dependencies, air-gapped builds** — all 9 crates build and pass tests completely offline with standard `rustc` + `cargo`
- **19-command headless CLI** — `validate`, `repair`, `compare`, `redline`, `merge`, `redact --pii`, `clean-meta`, `convert`, `inspect`, `ocr`, `batch` — run in CI or scripts without a display server

## 🔗 Links

- [Source and releases](https://github.com/Nour-yahyaoui/rustpad)
- [Live showcase](https://rustpad-studio.vercel.app)
- [Windows `.exe` (4.96 MB)](https://github.com/Nour-yahyaoui/rustpad/releases/download/v3.0.0/rustpad-v3.0.0-windows-x86_64.exe)
- [Linux `x64` (4.53 MB)](https://github.com/Nour-yahyaoui/rustpad/releases/download/v3.0.0/rustpad-v3.0.0-linux-x86_64)
- [Case study](https://nour-yahyaoui.vercel.app/projects/rustpad)
