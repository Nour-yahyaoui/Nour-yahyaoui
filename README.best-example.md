<h1 align="center">Hi 👋, I'm <b>Nour Yahyaoui</b></h1>

<p align="center">
  <b>Full-Stack Developer</b> · Tunisia · 3+ years freelance · <b>Rust</b> · <b>Next.js</b> · <b>React Native</b> · <b>Ollama</b> · <b>Qwen</b> · <b>Supabase</b>
</p>

<p align="center">
  <i>"AI power with the perfect leadership"</i>
</p>

<div align="center">
  <a href="https://user-badge.committers.top/tunisia/Nour-yahyaoui">
    <img src="https://user-badge.committers.top/tunisia/Nour-yahyaoui.svg" alt="Top Committer Tunisia" />
  </a>
  &nbsp;
  <a href="https://www.star-history.com/nour-yahyaoui">
    <img src="https://api.star-history.com/badge?user=Nour-yahyaoui&year=2026" alt="Top Committer 2026" />
  </a>
</div>

<details open>
<summary>📑 Table of Contents</summary>

- [About Me](#about-me)
- [GitHub Stats & Rankings](#github-stats--rankings)
- [Featured Projects](#featured-projects)
- [Tech Stack](#tech-stack)
- [Currently & Open To](#currently--open-to)
- [Connect](#connect)

</details>

---

## 👨‍💻 About Me

I'm **Nour Yahyaoui**, a 19-year-old full-stack developer from **Tunisia** with **3+ years of freelance and client experience**. I build beautiful, secure, and scalable applications — from web and mobile to desktop — turning complex problems into elegant solutions.

**My journey:** I started with Python and web fundamentals, moved through JavaScript, React, and modern full-stack development with Next.js, React Native, and serverless architectures. Today I'm expanding into **Rust (Actix Web / Axum & native systems)** to build performance-critical backend services and desktop software.

**What I build:** production web apps end-to-end (frontend, backend, deployment), plus my own tooling from scratch:
- 🦀 **RustPad** — a 4.96 MB zero-dependency pure-Rust desktop Word & PDF studio
- 🤖 **nour-code** — a local AI coding agent running Qwen3 8B on Ollama with audited, permission-checked tool access

📌 My pinned repos show what I actually build — that's a better signal than any project count.

---

## 📊 GitHub Stats & Rankings

<p align="center">
  <img height="160" src=".github/assets/stats.svg" alt="Nour's GitHub stats" />
  <img height="160" src="https://streak-stats.demolab.com?user=Nour-yahyaoui&theme=radical&timezone=Africa%2FTunis" alt="Contribution streak" />
</p>

<p align="center">
  <img height="160" src=".github/assets/top-langs.svg" alt="Most used languages" />
  <img height="160" src="https://github-profile-summary-cards.vercel.app/api/cards/productive-time?username=Nour-yahyaoui&theme=radical&utcOffset=1" alt="Commits by hour" />
</p>

<p align="center">
  <img width="420" src=".github/assets/trophy.svg" alt="GitHub trophies" />
</p>

<sup>*Stats cards are regenerated weekly from live GitHub data via GitHub Actions and committed locally — no external hotlinks that can pause or 503.*</sup>

---

## 🚀 Featured Projects

### 🦀 RustPad — Desktop Word & PDF Studio

[![Version](https://img.shields.io/badge/version-3.0.0-DEA584?style=for-the-badge)](https://github.com/Nour-yahyaoui/rustpad/releases/tag/v3.0.0)
[![Rust](https://img.shields.io/badge/Rust-100%25_pure-000000?style=for-the-badge&logo=rust&logoColor=white)](https://github.com/Nour-yahyaoui/rustpad)
[![Windows 4.96 MB](https://img.shields.io/badge/Windows-4.96_MB_.exe-0078D4?style=for-the-badge&logo=windows&logoColor=white)](https://github.com/Nour-yahyaoui/rustpad/releases/download/v3.0.0/rustpad-v3.0.0-windows-x86_64.exe)
[![Linux 4.53 MB](https://img.shields.io/badge/Linux-4.53_MB_x64-FCC624?style=for-the-badge&logo=linux&logoColor=black)](https://github.com/Nour-yahyaoui/rustpad/releases/download/v3.0.0/rustpad-v3.0.0-linux-x86_64)
[![Zero crates.io deps](https://img.shields.io/badge/crates.io_deps-0-2EA44F?style=for-the-badge)](https://github.com/Nour-yahyaoui/rustpad)

A 60–120Hz native desktop Microsoft Word (`.docx`) and vector PDF (`.pdf`) studio written in **39,358 lines of zero-dependency Rust** across 9 workspace crates. No 400 MB Chromium/WebView wrapper — it compiles its own DEFLATE/PKZIP archiver, ECMA-376 OpenXML engine, ISO 32000 PDF engine, PNG/JPEG/BMP codecs, TrueType rasterizer, and native Win32/X11 window backend into a single **4.96 MB** executable that cold-starts in under 100 ms.

- **Full `.docx` & `.pdf` studio + 3-mode Dark Studio** — paginated authoring, tables, figures, footnotes, Track Changes, 3-way merge, PII redaction, 102-action `Ctrl+K` palette
- **Zero `crates.io` dependencies, air-gapped builds** — all 9 crates build and pass tests completely offline
- **19-command headless CLI** — validate, repair, compare, redline, merge, redact `--pii`, convert, inspect, ocr, batch

🔗 [Case study](https://nour-yahyaoui.vercel.app/projects/rustpad) · [Source & releases](https://github.com/Nour-yahyaoui/rustpad) · [Live showcase](https://rustpad-studio.vercel.app)

---

### 🖥️ VexOS Desktop — Live Linux Dev Environment

[![Version](https://img.shields.io/badge/version-2.2.1-E95420?style=for-the-badge)](https://github.com/Nour-yahyaoui/vexos/releases)
[![Debian trixie](https://img.shields.io/badge/Debian-trixie-A81D33?style=for-the-badge&logo=debian&logoColor=white)](https://github.com/Nour-yahyaoui/vexos)
[![Release candidate](https://img.shields.io/badge/status-release_candidate-orange?style=for-the-badge)](https://github.com/Nour-yahyaoui/vexos)

A live Linux desktop built from Debian trixie for web and software development. Boot one ISO in VirtualBox and you get XFCE, Firefox ESR, Python 3, Node.js/npm, Rust/cargo, gcc, git, and **VexOS DevStudio** — a browser-based IDE with editor, Run button, live preview, and an AI assistant that uses your own Groq key (stays on your machine).

- **Built from source** with live-build; every package list is a plain text file
- **Clean by design** — live session runs in RAM; reboot restores the starting state
- **Ready to code** — compilers, runtimes, and IDE pre-configured on boot

🔗 [Source & downloads](https://github.com/Nour-yahyaoui/vexos) · [Website](https://vexos-omega.vercel.app) · [Docs](https://vexos-omega.vercel.app/docs/)

---

### 🤖 nour-code — Local AI Coding Agent

[![Version](https://img.shields.io/badge/version-1.3.0-3776AB?style=for-the-badge)](https://github.com/Nour-yahyaoui/nour-code)
[![Python 3.11+](https://img.shields.io/badge/Python-3.11%2B-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://github.com/Nour-yahyaoui/nour-code)
[![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://github.com/Nour-yahyaoui/nour-code)
[![Docker ready](https://img.shields.io/badge/Docker-ready-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://github.com/Nour-yahyaoui/nour-code)
[![265 tests passing](https://img.shields.io/badge/tests-265_passing-2EA44F?style=for-the-badge&logo=pytest&logoColor=white)](https://github.com/Nour-yahyaoui/nour-code)

A production-grade **local** AI coding agent. Qwen3 8B on Ollama behind a FastAPI server with controlled access to your filesystem, shell, and extensible Python skills. Nothing leaves your machine except traffic you explicitly allow.

- **Real tools, real guardrails** — `read_file`, `write_file`, `run_shell`, `apply_patch`, `delete_file` with `permissions.yaml` validation, allow/deny lists, timeouts, JSONL audit trail
- **Hot-reloadable skills** — `security_skill` and `production_skill` ship in the box
- **Production-Ready Mode** — hardens every file, refuses TODO stubs, appends readiness checklist
- **Built like a service** — SSE streaming, 2-hour sessions, Prometheus metrics, 265-test offline suite

🔗 [Source & documentation](https://github.com/Nour-yahyaoui/nour-code)

---

## 🧰 Tech Stack

### 🖥️ Frontend
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3176AB?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)
![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)

### ⚙️ Backend
![Rust](https://img.shields.io/badge/Rust-000000?style=for-the-badge&logo=rust&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![PHP](https://img.shields.io/badge/PHP-777BB4?style=for-the-badge&logo=php&logoColor=white)
![REST APIs](https://img.shields.io/badge/REST_API-FF6C37?style=for-the-badge&logo=postman&logoColor=white)
![WebSocket](https://img.shields.io/badge/WebSocket-010101?style=for-the-badge&logo=socket.io&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Neon DB](https://img.shields.io/badge/Neon-00BFFF?style=for-the-badge&logo=neon&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)

### 🤖 AI & Agents
![Ollama](https://img.shields.io/badge/Ollama-000000?style=for-the-badge&logo=ollama&logoColor=white)
![Qwen3](https://img.shields.io/badge/Qwen3-615CED?style=for-the-badge&logo=alibabacloud&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![SSE streaming](https://img.shields.io/badge/SSE_streaming-0A0A0A?style=for-the-badge&logo=sse&logoColor=white)
![Prometheus](https://img.shields.io/badge/Prometheus-E6522C?style=for-the-badge&logo=prometheus&logoColor=white)
![pytest](https://img.shields.io/badge/pytest-0A9EDC?style=for-the-badge&logo=pytest&logoColor=white)
![Ruff](https://img.shields.io/badge/Ruff-D7FF64?style=for-the-badge&logo=ruff&logoColor=black)

### 📱 Mobile
![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)
![Android](https://img.shields.io/badge/Android-3DDC84?style=for-the-badge&logo=android&logoColor=white)

---

## 🔭 Currently & Open To

- **Currently learning:** Rust native systems, Actix Web / Axum, local LLM agents
- **Building:** RustPad, nour-code, VexOS Desktop
- **Open to:** freelance projects, client work, collaborative open-source

---

## 📫 Connect

<p align="center">
  <a href="https://github.com/Nour-yahyaoui">
    <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" />
  </a>
  &nbsp;
  <a href="https://nour-yahyaoui.vercel.app">
    <img src="https://img.shields.io/badge/Portfolio-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Portfolio" />
  </a>
</p>

---

<p align="center">
  <i>Thanks for visiting my profile! 🚀</i>
</p>
