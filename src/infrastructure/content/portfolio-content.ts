import type { Portfolio } from "@/domain/portfolio/portfolio";

// The portfolio's content. Facts come from the LinkedIn export, the live
// project sites, the project repositories and the owner's notes; edit this
// file to update the page without touching the components.
export const portfolioContent: Portfolio = {
  profile: {
    name: "Jefferson Veloso",
    role: "Full Stack Software Engineer & Tech Lead",
    description:
      "Full Stack Software Engineer and Tech Lead with 9+ years building SaaS products and ERP/CRM integrations in TypeScript, Node.js, NestJS, Angular and Next.js. Open to remote roles.",
    summary:
      "9+ years connecting business systems in TypeScript, Node.js and NestJS. Based in Brazil (UTC−3), open to remote Full Stack and Software Engineer roles.",
    tagline: "Software that connects the systems a business already runs on.",
    bio: "I'm a Full Stack Software Engineer and Tech Lead with 9+ years of experience. Today I work as a Full Stack Software Engineer on Valueva, a valuation and value-based management SaaS with an embedded AI agent, and I deliver integration and automation projects for companies as a contractor.",
    availability: "Open to remote Full Stack and Software Engineer roles.",
    facts: { experience: "9+ years", basedIn: "Brazil · UTC−3", english: "B2 · studied in London" },
    location: { region: "Minas Gerais", country: "Brazil", countryCode: "BR", timezone: "UTC−3" },
    languages: [
      { name: "English", level: "B2", code: "en" },
      { name: "Portuguese", level: "native", code: "pt-BR" },
    ],
    // Cropped from the full-resolution original (docs/jefferson-original.jpg),
    // large enough for 2x screens.
    photo: { src: "/images/jefferson-veloso-portrait.jpg", width: 880, height: 1100 },
    cv: "/Jefferson_Veloso_CV.pdf",
    contact: {
      email: "jeffersonveloso_6@hotmail.com",
      emailSubject: "Remote role — let's talk",
      linkedin: "https://www.linkedin.com/in/jefferson-veloso-462195b1",
      github: "https://github.com/jeffersonveloso",
      whatsapp: {
        display: "+55 31 99381-8360",
        digits: "5531993818360",
        greeting: "Hi Jefferson, I saw your portfolio and would like to talk about a role.",
      },
    },
  },

  sections: [
    { id: "skills", label: "Skills" },
    { id: "work", label: "Work" },
    { id: "process", label: "Process" },
    { id: "experience", label: "Experience" },
    { id: "contact", label: "Contact" },
  ],

  // From the LinkedIn export's "Top Skills" and stack. The first five are
  // the core stack.
  topSkills: [
    "TypeScript",
    "Node.js",
    "NestJS",
    "Angular",
    "Next.js",
    "Python",
    "REST APIs",
    "Docker",
    "AI agents",
    "RAG / LLM integration",
    "Clean Architecture",
    "Omie ERP",
    "Zoho CRM",
    "Code review",
    "Communication",
  ],

  // Every skill, grouped for a quick scan. From the LinkedIn export, the
  // owner's notes and the project repositories (Bistrô: React, SQLite,
  // Vitest, Playwright; Conciliador: Keycloak).
  skills: [
    { group: "Programming", items: ["TypeScript", "JavaScript", "Python"] },
    { group: "Back end", items: ["Node.js", "NestJS", "Flask", "REST APIs", "Webhooks"] },
    { group: "Front end & mobile", items: ["Next.js", "React", "Angular", "Ionic", "PWA", "Tailwind CSS"] },
    { group: "AI", items: ["AI agents", "RAG", "LLM integration", "AI code review (CodeRabbit)"] },
    { group: "Data & infrastructure", items: ["SQLite", "Docker", "Keycloak"] },
    { group: "Integrations", items: ["Omie ERP", "Zoho CRM", "NF-e e-invoicing"] },
    { group: "Testing", items: ["Vitest", "Playwright"] },
    {
      group: "Practices",
      items: ["Clean Architecture", "Spec-driven development", "Code review", "Technical leadership", "Mentoring"],
    },
  ],

  capabilities: [
    {
      title: "System integrations",
      body: "I connect ERPs, CRMs and internal tools so data moves on its own. Most of my integration work runs between Omie ERP and Zoho CRM, with business rules kept in readable, tested code.",
      tools: ["REST APIs", "Webhooks", "Omie ERP", "Zoho CRM"],
    },
    {
      title: "Full stack products",
      body: "I build SaaS products and MVPs end to end in TypeScript, from the data model and API to the interface people use every day.",
      tools: ["Node.js", "NestJS", "Angular", "Next.js", "Python"],
    },
    {
      title: "Technical leadership",
      body: "I make architecture decisions, break work into clear tasks, review code and mentor other developers so the team ships with confidence.",
      tools: ["Architecture", "Code review", "Mentoring"],
    },
    {
      title: "AI-assisted delivery",
      body: "I run spec-driven development with AI at every step, and I build AI into products: Valueva ships with an agentic assistant grounded by RAG.",
      tools: ["AI agents", "RAG", "LLM integration", "CodeRabbit"],
    },
  ],

  projects: [
    {
      slug: "valueva",
      name: "Valueva",
      summary:
        "Valuation and value-based management SaaS with an embedded AI agent, for small and mid-sized companies.",
      body: "As a Full Stack Software Engineer, I build the platform: company valuation, monthly value tracking, goals and action plans for SMBs, financial BPOs and consultancies. It ships with Eva, an embedded agentic AI grounded by RAG on each company's data: she answers with cited evidence, proposes action plans that run only after the user approves them, and sends proactive and scheduled reports.",
      role: "Full Stack Software Engineer",
      stack: ["Next.js", "NestJS", "AI agent", "RAG"],
      period: { from: 2025 },
      stage: "Demo with real users",
      link: { href: "https://app.valueva.com.br", label: "Visit Valueva", note: "Site in Portuguese" },
      highlights: ["EVA", "RAG", "KPI", "AI agent", "Value"],
      accent: "green",
    },
    {
      slug: "conciliador",
      name: "Conciliador",
      summary:
        "Bank reconciliation for accounting firms: from bank statement to journal entry, with no spreadsheet in between.",
      body: "Imports OFX, CSV and PDF statements (with OCR), applies reusable rules to classify each transaction against the chart of accounts, and sends reviewed entries to the accounting system. Reviewers work from a single queue where every decision is traceable.",
      role: "Creator & Full Stack Engineer",
      stack: ["Next.js", "NestJS", "Keycloak", "OCR"],
      stage: "Live MVP",
      link: { href: "https://app.jfvsofthouse.com", label: "Visit Conciliador", note: "Site in Portuguese" },
      highlights: ["OFX", "CSV", "PDF", "OCR", "Rules"],
      accent: "purple",
    },
    {
      slug: "english-in-class",
      name: "English in Class",
      summary: "A ready-made English course for teachers, with a student app that works offline.",
      body: "Teachers get a digital book, printable PDFs, audio with transcripts, exercises and rubric grading. Students join with a class code, no email needed, and study on their phones even without a connection. The site is available in English, Portuguese and Spanish.",
      role: "Creator & Full Stack Engineer",
      stack: ["Next.js", "NestJS", "PWA", "i18n"],
      stage: "Live MVP",
      link: { href: "https://english.jfvsofthouse.com/en", label: "Visit English in Class" },
      highlights: ["EN", "PT", "ES", "PWA", "Offline"],
      accent: "yellow",
    },
  ],

  // Published with the client's permission. Results from the owner
  // (2026-10-21); stack and features from the project's README. The
  // screenshots have customer and waiter names blurred.
  caseStudy: {
    slug: "bistro",
    name: "Bistrô Orders Manager",
    summary: "No more paper, and meals ready in about 40% less time.",
    problem:
      "Bistrô Vó Ziluca, a daytime café, had just opened, with two kitchens preparing different dishes. The waiters' system printed each order on a single paper ticket, so during the daily rush the cooks pinned tickets to a board and crossed out the items that weren't theirs. Tickets got wet, were hard to read or went missing, and production in both kitchens suffered.",
    solution:
      "An order manager that receives orders from the waiters' system by webhook, maps every menu item to the kitchen that cooks it and splits each order into one ticket per kitchen. Tickets show who took the order, how long it has been waiting and notes that are easy to read. Each kitchen follows every dish in the order, its own and the other kitchen's, so the whole table is served at once, and the manager follows all kitchens on one board.",
    result:
      "Meal production time fell by about 40%, and orders are no longer printed. Dishes reach each table together, customer complaints have dropped considerably, and service runs calmer for the whole team.",
    role: "Creator & Full Stack Engineer",
    client: "Bistrô Vó Ziluca",
    stack: ["Next.js", "NestJS", "SQLite", "Webhooks"],
    stage: "In production",
    highlights: [
      ["Webhook", "Split", "Kitchen 1"],
      ["Kanban", "Notes", "Kitchen 2"],
    ],
    accent: "orange",
    screenshots: [
      {
        src: "/images/bistro/sync-board.png",
        width: 1339,
        height: 1150,
        title: "Sync board",
        alt: "The sync board: Kitchen 1 and Kitchen 2 side by side, each with In preparation and Ready columns of order tickets. Every ticket shows the order number, the waiter, the minutes since it arrived and the other kitchen's progress on the same order.",
      },
      {
        src: "/images/bistro/order-detail.png",
        width: 1273,
        height: 602,
        title: "Order detail",
        alt: "An order's detail in Kitchen 1: its own item, still in preparation, with a Mark ready button, beside the item Kitchen 2 has already finished for the same order.",
      },
    ],
    screenshotsCaption:
      "The sync board and one order's detail view. The interface is in Portuguese, and customer and waiter names are blurred.",
  },

  engagements: [
    {
      name: "Cryobras",
      body: "Built the full integration between Zoho CRM and Omie ERP: sales orders sync from Zoho to Omie, and payment settlements and NF-e (Brazilian electronic invoices) flow back to each order in Zoho. I also built the admin panel that adds the group's companies to the integration, updates module mappings and lists the records of every integrated module.",
      role: "Integration Developer",
    },
    {
      name: "VMI Security",
      body: "Proposal builder with machine configuration, integrated with Zoho CRM, replacing a spreadsheet-based process. I also reviewed the other developers' changes.",
      role: "Tech Lead & Full Stack Developer",
    },
    {
      name: "Omie record replication",
      body: "My own product, used by several companies, that replicates financial records across Omie accounts.",
      role: "Creator",
    },
  ],

  workflow: [
    {
      label: "PRD",
      title: "Define",
      body: "Write the product requirements: the problem, the users and what done looks like.",
    },
    {
      label: "Spec",
      title: "Design",
      body: "Turn the PRD into a technical spec: data model, APIs, edge cases and risks.",
    },
    {
      label: "Tasks",
      title: "Plan",
      body: "Break the spec into small tasks that can be built and reviewed on their own.",
    },
    {
      label: "Build",
      title: "Implement",
      body: "Implement each task with AI assistance, following Clean Architecture.",
    },
    {
      label: "Review",
      title: "Review",
      body: "AI code review on every pull request with CodeRabbit, plus review of other developers' changes.",
    },
    { label: "Ship", title: "Ship", body: "Release to real users and feed what we learn into the next PRD." },
  ],

  experience: [
    {
      company: "Valueva",
      role: "Full Stack Software Engineer",
      period: { from: 2025 },
      points: [
        "Turn business requirements into architecture and implementation decisions.",
        "Build and evolve the valuation, KPI, goal-setting and action-plan features.",
        "Develop Eva, the platform's embedded agentic AI, grounded by RAG on each company's data.",
        "Run spec-driven development with AI across planning, implementation and code review.",
      ],
    },
    {
      company: "JFV Softhouse",
      role: "Integration Developer & Tech Lead (Contractor)",
      period: { from: 2022 },
      points: [
        "System integrations focused on Omie ERP and Zoho CRM, plus financial and operational automation.",
        "Custom web applications, SaaS products and MVPs for clients.",
        "Technical leadership, project management and AI consulting for automation.",
      ],
    },
    {
      company: "Agruppa Soluções em BackOffice",
      role: "Full Stack Developer",
      period: { from: 2017, to: 2022 },
      points: [
        "Built and evolved the purchase order and quotation app, with a manager approval flow, as a mobile app and PWA in Ionic 5.",
        "Maintained and evolved the project's REST API in NestJS, integrated with Omie ERP.",
        "Maintained a Python API built with Flask for two years.",
      ],
    },
  ],

  education: [
    { title: "Computer Systems Technology", place: "Centro Universitário Una" },
    { title: "Clean Code, Clean Architecture and AI for Developers", place: "Branas.io" },
    { title: "General English Intensive, Oct 2024 — Jan 2025", place: "Stafford House International, London" },
  ],
};
