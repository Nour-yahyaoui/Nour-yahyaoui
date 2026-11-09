# 🏢 AgencyOS — Multi-Tenant Agency Operations Platform

One workspace for the business and delivery of digital agency work. AgencyOS brings clients, projects, Kanban delivery, a scoped client portal, support tickets, documents, Stripe-backed billing, real-data analytics and an honest AI assistant together in a multi-tenant Next.js + NestJS platform.

Live: [agencyos-web-beryl.vercel.app](https://agencyos-web-beryl.vercel.app)

[![Live Web App](https://img.shields.io/badge/Live-Web_App-14624F?style=for-the-badge&logo=vercel&logoColor=white)](https://agencyos-web-beryl.vercel.app)
[![Next.js 15](https://img.shields.io/badge/Next.js_15-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://github.com/Nour-yahyaoui/agencyos)
[![NestJS 11](https://img.shields.io/badge/NestJS_11-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)](https://github.com/Nour-yahyaoui/agencyos)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://github.com/Nour-yahyaoui/agencyos)
[![PostgreSQL + Prisma](https://img.shields.io/badge/PostgreSQL_%2B_Prisma-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://github.com/Nour-yahyaoui/agencyos)

## ✨ Highlights

- **Strict multi-tenancy & 5-role RBAC** — `SUPER_ADMIN`, `OWNER`, `MANAGER`, `DEVELOPER` and `CLIENT` roles with organization switching, server-side `organizationId` + role scoping on every query, and composite tenant foreign keys across 23 Prisma models
- **End-to-end agency delivery** — client CRM with onboarding checklists, projects and milestones, drag-and-drop Kanban board, cycle-checked task dependencies ("cannot complete before prerequisites"), workload and timeline views
- **Scoped client portal & support** — clients sign into the same application and get a scoped view of their board, projects, threaded support tickets, documents and invoices
- **Billing, documents & notifications** — server-calculated invoice totals, Stripe Checkout test payments with signature-verified idempotent webhooks, MIME-validated document uploads (local disk or S3), and deduped deadline reminders
- **Real-data analytics & honest AI assistant** — dashboard KPIs and 6-month revenue computed directly from PostgreSQL rows, plus 6 grounded OpenAI analyses that return `503 AI_UNAVAILABLE` rather than fabricating output when unconfigured
- **Hardened auth & verified test suite** — cookie sessions with refresh-token family rotation, reuse revocation and double-submit CSRF protection; verified across unit, real-PostgreSQL integration and Playwright E2E suites

## 🔗 Links

- [Source and documentation](https://github.com/Nour-yahyaoui/agencyos)
- [Live web app](https://agencyos-web-beryl.vercel.app)
- [API documentation (Swagger)](https://agencyos-api-kappa.vercel.app/api/docs)
- [Architecture guide](https://github.com/Nour-yahyaoui/agencyos/blob/master/agencyos/docs/ARCHITECTURE.md)
