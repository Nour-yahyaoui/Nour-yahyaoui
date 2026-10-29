<h1 align="center">Hiiiii 👋, I'm Nour Yahyaoui</h1>

<p align="center">
  <i>"AI power with the perfect leadership"</i>
</p>

<div align="center">
  <p>
    <a href="https://user-badge.committers.top/tunisia/Nour-yahyaoui">
      <img src="https://user-badge.committers.top/tunisia/Nour-yahyaoui.svg" alt="committers.top Tunisia badge" />
    </a>
  </p>
  <p>
    <a href="https://www.star-history.com/nour-yahyaoui">
      <img src="https://api.star-history.com/badge?user=Nour-yahyaoui&year=2026" alt="Top Committer 2026" />
    </a>
  </p>
</div>

---

### 👨‍💻 About Me

🎓 19-year-old full-stack developer from Tunisia with **3 years of freelance/client experience**.
💻 I craft beautiful, secure, and scalable applications with modern technologies. From web and mobile to desktop, I turn complex problems into elegant solutions.

**My Journey:**
I began my coding journey with Python and web development fundamentals, and I've since progressed through JavaScript, React, and modern full-stack development with Next.js, React Native, and serverless architectures. I build production web apps end-to-end — frontend, backend, and deployment — and I'm currently expanding into **Rust (Actix Web / Axum & native systems)** to build performance-critical backend services and desktop software. What drives me is creating secure, scalable applications that solve real problems. Lately that also means building my own tooling from scratch: **RustPad**, a 3.16 MB zero-dependency pure-Rust desktop Word & PDF studio, and **nour-code**, a local AI coding agent that runs Qwen3 8B on Ollama and gives it audited, permission-checked access to real tools.

📌 Check my pinned repos below for what I actually build — that's a better signal than any project count.

---

### 📊 GitHub Stats & Rankings

<p align="center">
  <img height="170" src="https://github-readme-stats.vercel.app/api?username=Nour-yahyaoui&commits_year=2026&show_icons=true&theme=radical" alt="Nour's GitHub stats" />
  <img height="170" src="https://streak-stats.demolab.com?user=Nour-yahyaoui&theme=radical&timezone=Africa%2FTunis" alt="GitHub contribution streak" />
</p>

<p align="center">
  <img height="170" src="https://github-readme-stats.vercel.app/api/top-langs/?username=Nour-yahyaoui&layout=compact&langs_count=6&theme=radical" alt="Most used languages" />
  <img height="170" src="https://github-profile-summary-cards.vercel.app/api/cards/productive-time?username=Nour-yahyaoui&theme=radical&utcOffset=1" alt="Commits by hour of day" />
</p>

<p align="center">
  <img width="400" src=".github/assets/trophy.svg" alt="GitHub trophies" />
</p>

---

### 📄 Featured Project: RustPad

[![Version](https://img.shields.io/badge/version-2.1.0-DEA584?style=for-the-badge)](https://github.com/Nour-yahyaoui/rustpad/releases/tag/v2.1.0)
[![Rust](https://img.shields.io/badge/Rust-100%25_pure-000000?style=for-the-badge&logo=rust&logoColor=white)](https://github.com/Nour-yahyaoui/rustpad)
[![Windows](https://img.shields.io/badge/Windows-3.16_MB_.exe-0078D4?style=for-the-badge&logo=windows&logoColor=white)](https://github.com/Nour-yahyaoui/rustpad/releases/download/v1.2.0/rustpad-v1.2.0-windows-x86_64.exe)
[![Linux](https://img.shields.io/badge/Linux-3.18_MB_x64-FCC624?style=for-the-badge&logo=linux&logoColor=black)](https://github.com/Nour-yahyaoui/rustpad/releases/download/v1.2.0/rustpad-v1.2.0-linux-x86_64)
[![Dependencies](https://img.shields.io/badge/crates.io_deps-0-2EA44F?style=for-the-badge)](https://github.com/Nour-yahyaoui/rustpad)

**RustPad** is a native desktop Microsoft Word (`.docx`) and vector PDF (`.pdf`) studio written in **14,280 lines of zero-dependency Rust** across 9 workspace crates. Instead of shipping a 400 MB Chromium/WebView wrapper, it compiles its own DEFLATE/PKZIP archiver, ECMA-376 OpenXML engine, ISO 32000 PDF 1.7 engine, TrueType glyph rasterizer, and native Win32/X11 window backend into a single **3.16 MB** standalone executable that cold-starts in under 100 ms.

- **Full `.docx` & `.pdf` studio in one binary:** paginated A4/Letter Word authoring (headings, lists, tables, images, find/replace, starter templates), inline vector PDF text editing, highlights, sticky notes, freehand ink signatures, true text-purging redaction, page merge/split/rotate, and a 50/50 split workspace with a 49-action `Ctrl+K` command palette.
- **Zero `crates.io` dependencies, air-gapped builds:** all 9 crates (`rustpad_zip`, `docx_io`, `pdf_create`, `pdf_engine`, `doc_model`, `power_tools`, `rustpad_render`, `rustpad_window`, `app`) build and pass tests completely offline with standard `rustc` + `cargo` — loading `libX11.so.6` dynamically on Linux and linking Win32 `user32`/`gdi32`/`comdlg32` directly on Windows.
- **Headless CLI & local Time-Machine:** run `rustpad convert`, `inspect`, `merge`, and `ocr` in CI or scripts without a display server, while interactive sessions keep compressed local snapshots for instant version rollback with zero telemetry or cloud accounts.

🔗 [Source and releases](https://github.com/Nour-yahyaoui/rustpad) · [Live showcase](https://rustpad-studio.vercel.app) · [Windows `.exe` (3.16 MB)](https://github.com/Nour-yahyaoui/rustpad/releases/download/v1.2.0/rustpad-v1.2.0-windows-x86_64.exe) · [Linux `x64` (3.18 MB)](https://github.com/Nour-yahyaoui/rustpad/releases/download/v1.2.0/rustpad-v1.2.0-linux-x86_64)

---

### 🚀 Featured Project: VexOS Desktop

[![Version](https://img.shields.io/badge/version-2.2.1-E95420?style=for-the-badge)](https://github.com/Nour-yahyaoui/vexos/releases)
[![Debian](https://img.shields.io/badge/Debian-trixie-A81D33?style=for-the-badge&logo=debian&logoColor=white)](https://github.com/Nour-yahyaoui/vexos)
[![Status](https://img.shields.io/badge/status-release_candidate-orange?style=for-the-badge)](https://github.com/Nour-yahyaoui/vexos)

**VexOS Desktop** is a live Linux desktop built from Debian trixie for web and software development. Boot one ISO in VirtualBox and you get XFCE, Firefox ESR, Python 3, Node.js with npm, Rust with cargo, gcc, git, and **VexOS DevStudio**: a browser-based IDE with a code editor, a Run button, a live preview, and an AI assistant that uses your own Groq key, which stays on your machine.

- **Built from source:** the image is made with live-build, and every package list is a plain text file in the repo.
- **Clean by design:** the live session runs in RAM, so a reboot restores the system to its starting state.
- **Ready to code:** the compilers, runtimes, and the IDE are already set up when it boots.

🔗 [Source and downloads](https://github.com/Nour-yahyaoui/vexos) · [Website](https://vexos-omega.vercel.app) · [Documentation](https://vexos-omega.vercel.app/docs/)

---

### 🤖 Featured Project: nour-code

[![Version](https://img.shields.io/badge/version-1.3.0-3776AB?style=for-the-badge)](https://github.com/Nour-yahyaoui/nour-code)
[![Python](https://img.shields.io/badge/Python-3.11%2B-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://github.com/Nour-yahyaoui/nour-code)
[![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://github.com/Nour-yahyaoui/nour-code)
[![Docker](https://img.shields.io/badge/Docker-ready-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://github.com/Nour-yahyaoui/nour-code)
[![Tests](https://img.shields.io/badge/tests-265_passing-2EA44F?style=for-the-badge&logo=pytest&logoColor=white)](https://github.com/Nour-yahyaoui/nour-code)

**nour-code** is a production-grade **local** AI coding agent. It puts a **Qwen3 8B** model running on [Ollama](https://ollama.com) behind a FastAPI server and gives it *controlled* access to your filesystem, your shell and an extensible set of Python **skills**. Nothing leaves your machine except the traffic you explicitly allow.

- **Real tools, real guardrails:** `read_file`, `write_file`, `list_directory`, `search_files`, `run_shell`, `apply_patch`, `delete_file` — every path is validated against `permissions.yaml`, symlink escapes are rejected, shell commands run against an allow/deny list with timeouts, and every call is written to a JSONL audit trail.
- **Hot-reloadable skills:** drop a Python file into the skills directory (or `POST /skills/reload`) and its tools join the model's tool list. Two ship in the box — `security_skill` (secret scanning, dangerous patterns, dependency CVEs) and `production_skill` (logging, error handling, input validation, Dockerfile, CI pipeline).
- **Production-Ready Mode:** ask to *"make it production ready"* and the agent hardens every file it touches, refuses to hand back TODO stubs, and appends a readiness checklist.
- **Built like a service, not a script:** SSE token streaming, 2-hour sessions that survive restarts, rotating JSON logs, optional Prometheus metrics, async I/O end to end, and a 265-test offline suite.

🔗 [Source and documentation](https://github.com/Nour-yahyaoui/nour-code)

---

### 🧰 Tech Stack

#### 🖥️ Frontend
*Building responsive, interactive UIs with modern frameworks*

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)
![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)

#### ⚙️ Backend
*Scalable serverless APIs and database architecture*

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

#### 🤖 AI & Agents
*Local inference, tool-using agents and the guardrails around them*

![Ollama](https://img.shields.io/badge/Ollama-000000?style=for-the-badge&logo=ollama&logoColor=white)
![Qwen](https://img.shields.io/badge/Qwen3-615CED?style=for-the-badge&logo=alibabacloud&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![SSE](https://img.shields.io/badge/SSE_streaming-0A0A0A?style=for-the-badge&logo=sse&logoColor=white)
![Prometheus](https://img.shields.io/badge/Prometheus-E6522C?style=for-the-badge&logo=prometheus&logoColor=white)
![pytest](https://img.shields.io/badge/pytest-0A9EDC?style=for-the-badge&logo=pytest&logoColor=white)
![Ruff](https://img.shields.io/badge/Ruff-D7FF64?style=for-the-badge&logo=ruff&logoColor=black)

#### 📱 Mobile
*Native and cross-platform mobile applications*

![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)
![Android](https://img.shields.io/badge/Android-3DDC84?style=for
