<h1 align="center">Hiiiii 👋, I'm Nour Yahyaoui</h1>

<p align="center">
  <i>"AI power with the perfect leadership"</i>
</p>

[![Top Committer](https://api.star-history.com/badge?user=Nour-yahyaoui&year=2026)](https://www.star-history.com/nour-yahyaoui)


### 👨‍💻 About Me

🎓 19-year-old full-stack developer from Tunisia with **3 years of freelance/client experience**.
💻 I craft beautiful, secure, and scalable applications with modern technologies. From web and mobile to desktop, I turn complex problems into elegant solutions.

**My Journey:**
I began my coding journey with Python and web development fundamentals, and I've since progressed through JavaScript, React, and modern full-stack development with Next.js, React Native, and serverless architectures. I build production web apps end-to-end — frontend, backend, and deployment — and I'm currently expanding into **Rust (Actix Web / Axum)** to work on performance-critical backend services. What drives me is creating secure, scalable applications that solve real problems. Lately that also means building my own tooling: **nour-code**, a local AI coding agent that runs Qwen3 8B on Ollama and gives it audited, permission-checked access to real tools.

📌 Check my pinned repos below for what I actually build — that's a better signal than any project count.

---

### 📊 GitHub Stats

<p align="center">
  <img height="170" src="https://github-readme-stats.vercel.app/api?username=Nour-yahyaoui&commits_year=2026&show_icons=true&theme=radical" alt="Nour's GitHub stats" />
  <img height="170" src="https://streak-stats.demolab.com?user=Nour-yahyaoui&theme=radical&timezone=Africa%2FTunis" alt="GitHub contribution streak" />
</p>

<p align="center">
  <img height="170" src="https://github-readme-stats.vercel.app/api/top-langs/?username=Nour-yahyaoui&layout=compact&langs_count=6&theme=radical" alt="Most used languages" />
  <img height="170" src="https://github-profile-summary-cards.vercel.app/api/cards/productive-time?username=Nour-yahyaoui&theme=radical&utcOffset=1" alt="Commits by hour of day" />
</p>

<p align="center">
  <img src="https://github-profile-trophy.vercel.app/?username=Nour-yahyaoui&theme=radical" alt="GitHub trophies" />
</p>

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
![Android](https://img.shields.io/badge/Android-3DDC84?style=for-the-badge&logo=android&logoColor=white)

#### 🖥️ Desktop
*Cross-platform desktop applications*

![Python](https://img.shields.io/badge/Python_(Tkinter/PyQt)-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Linux](https://img.shields.io/badge/Linux_(Debian)-FCC624?style=for-the-badge&logo=linux&logoColor=black)

#### 🔄 State Management
*Efficient state management for complex applications*

![Zustand](https://img.shields.io/badge/Zustand-20232A?style=for-the-badge&logo=react&logoColor=white)
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-764ABC?style=for-the-badge&logo=redux&logoColor=white)
![React Context](https://img.shields.io/badge/React_Context-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)

#### 🛡️ Security & Architecture
*Secure, scalable, and maintainable system design*

![Rate Limiting](https://img.shields.io/badge/Rate_Limiting-000000?style=for-the-badge&logo=shield&logoColor=white)
![XSS Prevention](https://img.shields.io/badge/XSS_Prevention-000000?style=for-the-badge&logo=shield&logoColor=white)
![CSRF Protection](https://img.shields.io/badge/CSRF_Protection-000000?style=for-the-badge&logo=shield&logoColor=white)

#### 🎨 Design
*Beautiful, user-centered design experiences*

![UI/UX Design](https://img.shields.io/badge/UI%2FUX_Design-F24E1E?style=for-the-badge&logo=figma&logoColor=white)
![Figma](https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white)
![Responsive Design](https://img.shields.io/badge/Responsive_Design-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

#### 🛠️ DevOps & Tools
*Streamlined development and deployment workflows*

![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![CI/CD](https://img.shields.io/badge/CI%2FCD-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)
![Debian](https://img.shields.io/badge/Debian-A81D33?style=for-the-badge&logo=debian&logoColor=white)
![live-build](https://img.shields.io/badge/live--build-555555?style=for-the-badge&logo=linux&logoColor=white)
![CLI](https://img.shields.io/badge/CLI-4EAA25?style=for-the-badge&logo=gnubash&logoColor=white)
![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)

---

### 🛡️ Security-First Development

I prioritize security in every project. From implementing rate limiting and CSRF protection to preventing XSS and SQL injection attacks. My code follows SOLID principles and clean architecture patterns, ensuring maintainable, scalable, and secure applications.

🛡️ Rate Limiting | 🛡️ XSS Prevention | 🛡️ CSRF Protection | 🛡️ SQL Injection Prevention | 🛡️ JWT Authentication | 🛡️ Path Traversal Protection | 🛡️ Sandboxed Shell Execution | 🛡️ Secret Scanning

---

### 📫 Let's Connect

📧 [nourryahyaoui@gmail.com](mailto:nourryahyaoui@gmail.com)  
🔗 [Portfolio Website](https://nour-yahyaoui.vercel.app)  

---

<p align="center">
  © 2026 Nour Yahyaoui. All rights reserved.
</p>
