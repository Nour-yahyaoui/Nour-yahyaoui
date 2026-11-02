# 🤖 nour-code — Local AI Coding Agent

A production-grade **local** AI coding agent. It puts a **Qwen3 8B** model running on [Ollama](https://ollama.com) behind a FastAPI server and gives it *controlled* access to your filesystem, your shell, and an extensible set of Python **skills**. Nothing leaves your machine except the traffic you explicitly allow.

[![Version](https://img.shields.io/badge/version-1.3.0-3776AB?style=for-the-badge)](https://github.com/Nour-yahyaoui/nour-code)
[![Python 3.11+](https://img.shields.io/badge/Python-3.11%2B-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://github.com/Nour-yahyaoui/nour-code)
[![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://github.com/Nour-yahyaoui/nour-code)
[![Docker ready](https://img.shields.io/badge/Docker-ready-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://github.com/Nour-yahyaoui/nour-code)
[![265 tests passing](https://img.shields.io/badge/tests-265_passing-2EA44F?style=for-the-badge&logo=pytest&logoColor=white)](https://github.com/Nour-yahyaoui/nour-code)

## ✨ Highlights

- **Real tools, real guardrails** — `read_file`, `write_file`, `list_directory`, `search_files`, `run_shell`, `apply_patch`, `delete_file` — every path validated against `permissions.yaml`, symlink escapes rejected, shell commands on an allow/deny list with timeouts, every call written to a JSONL audit trail
- **Hot-reloadable skills** — drop a Python file into the skills directory (or `POST /skills/reload`) and its tools join the model's tool list. Two ship in the box: `security_skill` and `production_skill`
- **Production-Ready Mode** — ask to *make it production ready* and the agent hardens every file it touches, refuses TODO stubs, and appends a readiness checklist
- **Built like a service** — SSE token streaming, 2-hour sessions that survive restarts, rotating JSON logs, optional Prometheus metrics, async I/O end to end, 265-test offline suite

## 🔗 Links

- [Source and documentation](https://github.com/Nour-yahyaoui/nour-code)
