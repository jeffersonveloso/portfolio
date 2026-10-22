# Product

<!-- impeccable:product-schema 1 -->

> Source: the owner's LinkedIn export (`docs/Profile.pdf`) and their written brief. The owner asked for the work to proceed without an interview round, so facts marked *(inferred)* were derived from the brief and still need the owner's confirmation.

## Platform

web

## Users

- **Primary:** international recruiters and hiring managers filling remote Full Stack / Software Engineer roles. They screen many candidates, usually on a desktop at work, and give a portfolio well under two minutes before deciding whether to reach out. *(inferred from the brief: "foco em recrutadores internacionais")*
- **Secondary:** engineers on the hiring panel who open the portfolio before or after an interview to check depth: architecture choices, code, how the candidate explains trade-offs. *(inferred)*

## Product Purpose

A personal portfolio site for Jefferson Veloso that turns a recruiter's first visit into a conversation: an email, a LinkedIn message, or an interview invite for a remote role. Success is a hiring contact from an international company.

## Positioning

Jefferson is a Full Stack Software Engineer and Tech Lead with 9+ years of experience whose specialty is connecting business systems and removing manual work: ERP ⇄ CRM integrations (Omie, Zoho), financial and operational automation, and SaaS products taken from idea to real users. He runs AI-assisted, Spec-Driven Development (PRD → Tech Spec → tasks → implementation → AI code review). He works on Valueva as a Full Stack Software Engineer.

## Operating Context

- Visitors arrive from LinkedIn, job applications, and recruiter outreach.
- The site is read in English. *(inferred: international audience)*
- Projects are added later; the first version may ship with clearly marked demo projects. *(from the brief)*

## Capabilities and Constraints

- Stack: Next.js 16 (App Router, Cache Components) + Tailwind CSS v4, TypeScript. Already scaffolded.
- Static content; no backend required. The contact path is email and LinkedIn links. *(inferred)*
- The CV is a PDF in `public/`, downloadable from the hero, Contact and the footer.
- Open decisions: custom domain, the years Conciliador and English in Class started, and a higher-resolution portrait (the current source is 400 × 400).

## Brand Commitments

- Name: **Jefferson Veloso**.
- Headline from LinkedIn: "Full Stack Software Engineer | Tech Lead | TypeScript · Node.js · NestJS · Angular · Next.js | System Integrations & SaaS | AI-Assisted, Spec-Driven Development | English B2".
- Brief-pinned aesthetic: colorful, modern, animated, futuristic. *(from the brief: "mais bonita e com cor, com uma visão moderna, animada e futurista")*
- Chosen direction (2026-10-21, owner's choice after three proposal rounds): the **mechanical keyboard**, steered toward software development.
- Owner-pinned design language: **`DESIGN-APPLE.md`** (Apple product-page language: alternating white/parchment/near-black tiles, a single Action Blue accent, SF Pro with Inter as the off-platform substitute, pill CTAs, one product shadow). It is binding for all UI chrome.
- Owner-requested elements: a macOS-style code window with "details about me" written as code, and the top skills shown as chips (both borrowed from the category-standard card).

## Evidence on Hand

From `docs/Profile.pdf`:

- **Valueva**: June 2025 to present. The portfolio shows the role as Full Stack Software Engineer, a development role, and never presents him as an owner of Valueva, whatever older sources such as the Profile.pdf say (owner, 2026-10-21). SaaS for valuation and Value-Based Management for SMBs, financial BPOs and consultancies. Live at https://app.valueva.com.br (MVP).
- **JFV SOFTHOUSE**: Integration Developer & Tech Lead (contractor), May 2022 to present. Cryobras (control panel for the Zoho CRM ⇄ Omie ERP integration; owner, 2026-10-21: he built the whole integration, syncing sales orders from Zoho CRM to Omie ERP and sending payment settlement records ("baixa") and NF-e back to the order in Zoho; he also built the admin panel that adds new group companies to the integration, updates module mappings and lists the records of the integrated modules); VMI Security (Tech Lead on a proposal builder with machine configuration, integrated with Zoho CRM, replacing spreadsheets, plus code review of other developers); an own product used by several companies to replicate financial records across Omie accounts; a financial reconciliation tool (MVP) that extracts transactions from PDF bank statements and maps them to charts of accounts (https://app.jfvsofthouse.com).
- **Agruppa Soluções em BackOffice**: Programmer, then Mobile Engineer, July 2017 to June 2022. Mobile app for purchase orders and quotations with a manager approval workflow; REST API integrated with Omie ERP. The portfolio shows the role as Full Stack Developer (owner, 2026-10-21): the app and PWA were built in Ionic 5, the REST API in NestJS, and he maintained a Python API in Flask for two years.
- English learning platform, MVP: https://english.jfvsofthouse.com (owner-provided).
- Valueva's embedded agentic AI and RAG (owner-provided, 2026-10-21), confirmed in the Valueva frontend (`valueva-frontend/src/modules/ai`, its PRODUCT.md): the agent "Eva" answers with cited evidence, proposes action plans that run only after the user approves them, and produces proactive and scheduled reports; a RAG grounds her in each company's data. Valueva is in use by real users (owner).
- "Validate and evolve the MVP with real users" (Valueva role, `docs/Profile.pdf` p.2): source of the "Demo with real users" stage label (owner's wording, 2026-10-21).
- **Bistrô Orders Manager** (owner-provided, 2026-10-21), a client case study: built for Bistrô Vó Ziluca, a newly opened café that serves during the day, with two kitchens preparing different dishes (owner, 2026-10-21). Before: the waiters' system printed each order on one paper ticket; cooks pinned tickets to a board and crossed out items that weren't theirs; tickets got wet, were hard to read or went missing. The app maps each menu item to its kitchen, integrates with the waiters' system, splits each order per kitchen, shows the waiter and the item notes, gives the manager a view of all kitchens and lets each kitchen follow every dish of the order (its own and the other kitchen's) so the table is served together. Results (owner): meal production time down about 40%, no printed orders, dishes reach the table together, considerably fewer customer complaints, a calmer team. Stack and features confirmed in the project's README (`react/bistro-orders-manager`): Next.js 16, React 19, SQLite, a webhook from the waiters' ordering system plus scheduled reconciliation, Kanban board by kitchen, domain kept apart from the order provider. https://bistro.valueva.com.br opens a staff login (`/access`), so the portfolio does not link it. The site never names the ordering provider the waiters use (owner, 2026-10-21); it is "the waiters' system". The client authorized naming Bistrô Vó Ziluca and publishing the results (owner, 2026-10-21). Screenshots: `docs/sync-board.png` and `docs/board.png` (owner-provided); the published copies in `public/images/bistro/` have the customer and waiter names blurred. They also confirm elapsed minutes on each ticket.
- From the live sites, checked 2026-10-21 (public landing pages only, no login):
  - Conciliador: imports OFX, CSV and PDF statements with OCR; reusable rules; a single review queue with traceable decisions; delivers entries to the accounting system (OneFlow); Keycloak sign-in; built with Next.js. Site in Portuguese only.
  - English in Class: digital book, printable PDFs, audio with transcripts, exercises and rubric grading; students join with a class code and study offline on their phones (PWA); site in English, Portuguese and Spanish; built with Next.js.
  - Valueva: valuation, EVA and value-based management for SMBs; built with Next.js and Tailwind CSS. Site in Portuguese only.
- NestJS in every project's stack (owner, 2026-10-21): Valueva, Conciliador, English in Class and Bistrô Orders Manager. Confirmed locally for the Valueva backend (`node-projects/valueva-backend`) and the Conciliador backend (`node-projects/bank-conciliator/backend`); the local Bistrô repository runs its API on Next.js route handlers, and no English in Class repository was found.
- Portrait photo: `docs/1789075050883.jpeg` (owner-provided, 400 × 400), cropped for the site to `public/images/jefferson-veloso.jpg`.
- Stack: TypeScript, JavaScript, Node.js, NestJS, Angular, Next.js, Python, Flask, Ionic, Docker, REST APIs, RAG / LLM integration.
- Education: Centro Universitário Una (Computer Systems Technology); Clean Code, Clean Architecture and AI for Developers (Branas.io); General English Intensive, Stafford House International, London (Oct 2024 to Jan 2025). English B2.
- Location: Minas Gerais, Brazil. Open to remote Full Stack / Software Engineer roles.
- Contact: jeffersonveloso_6@hotmail.com (owner, 2026-10-22, matching the CV); GitHub https://github.com/jeffersonveloso (owner's account, 2026-10-21); WhatsApp +55 31 99381-8360 (https://wa.me/5531993818360, owner, 2026-10-21); https://www.linkedin.com/in/jefferson-veloso-462195b1

Absences that must not be fabricated: client logos, testimonials, user counts, revenue, performance benchmarks, GitHub stars. No metrics exist for any project yet.

## Product Principles

1. **Proof over adjectives.** Every claim on the page points to a real project, role, or artifact.
2. **Recruiter speed.** Role, seniority, stack, location/timezone, and how to reach him are clear within the first viewport.
3. **Honest stage labels.** MVPs are called MVPs; demo content is labelled as demo.
4. **English first.** Clear, plain international English; no idioms that trip non-native readers.

## Accessibility & Inclusion

WCAG 2.2 AA. Animation respects `prefers-reduced-motion`. *(inferred baseline)*
