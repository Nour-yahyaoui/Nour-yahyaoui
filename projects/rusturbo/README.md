# ⚡ RustTurbo (`rusturbo`) — Extreme Rust Compilation Accelerator

An extreme Rust compilation accelerator designed to make `cargo run` and `cargo build` dramatically faster — especially the *first* build on a new project with a familiar dependency graph. Rather than just flipping Cargo flags, `rusturbo` analyzes your dependency graph, fingerprints it, schedules builds against your CPU and RAM, reuses compiled dependency artifacts across projects, drives `mold`/`lld` + `sccache`, and measures cold/warm results with real benchmarks.

[![npm](https://img.shields.io/npm/v/rusturbo?style=for-the-badge&logo=npm&logoColor=white&color=CB3837)](https://www.npmjs.com/package/rusturbo)
[![Rust](https://img.shields.io/badge/Rust-1.74%2B-000000?style=for-the-badge&logo=rust&logoColor=white)](https://github.com/the-golden-army/Rusturbo)
[![MIT License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)](https://github.com/the-golden-army/Rusturbo/blob/main/LICENSE)

## 📦 Install

```bash
npm install -g rusturbo
# or run directly
npx rusturbo --help
```

The npm package installs a lightweight shim and downloads the matching native binary (`Linux`, `macOS`, `Windows` on `x64`/`arm64`) from GitHub Releases, falling back to `cargo install --git` if needed. You can also install directly with Cargo:

```bash
cargo install --git https://github.com/the-golden-army/Rusturbo --locked
```

## ✨ Highlights

- **Dependency fingerprinting & cross-project cache** — keys artifacts on `rustc -vV`, target triple, profile, resolved crate graph + features, `RUSTFLAGS`, and build environment so identical dependency graphs reuse compiled artifacts across different projects
- **Two reuse strategies** — shared `CARGO_TARGET_DIR` (default) for instant Cargo freshness hits, plus hard-linked portable cache snapshots when a project needs its own `target/`
- **Graph & hardware scheduling** — computes the critical path, concurrent build waves, widest graph width vs. CPU/RAM (avoiding LLVM swap thrashing), duplicate crate versions, and over-broad features
- **Fast linker & Actix Web presets** — auto-detects `mold`, `lld`, and `sccache`; `rusturbo init` generates `rusturbo.toml` with Actix Web presets when detected
- **Honest benchmarking** — `rusturbo benchmark` measures real cold/warm scenarios and writes JSON + Markdown reports (`bench/report.md`)

## 🔗 Links

- [npm package](https://www.npmjs.com/package/rusturbo)
- [Source & documentation](https://github.com/the-golden-army/Rusturbo)
- [Architecture & design doc](https://github.com/the-golden-army/Rusturbo/blob/main/docs/DESIGN.md)
