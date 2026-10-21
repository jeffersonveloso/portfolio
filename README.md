# Jefferson Veloso — Portfolio

The personal portfolio of Jefferson Veloso, Full Stack Software Engineer & Tech Lead, built as an Apple-style product page for an engineer.

**Live:** https://jeffersonveloso.vercel.app

The hero is a 65% mechanical keyboard drawn entirely in CSS. It types the owner's name, presses the keys the visitor types on their own keyboard, and works as a real control: typing a section's name (`skills`, `work`, `process`, `experience`, `contact`) moves the page there, while the space bar echoes what is typed so a typo can be seen and fixed.

## Stack

- Next.js 16 (App Router, static prerendering) and React 19
- TypeScript, strict
- Tailwind CSS v4
- Vitest for unit tests, ESLint (with architecture boundaries), Prettier
- Deployed on Vercel

## Architecture

The code follows Clean Architecture with a small DDD domain, sized to what a portfolio needs.

```
src/
├── domain/           Entities, value objects and rules. Plain TypeScript, no framework.
│   ├── portfolio/    Profile, Contact, Project, CaseStudy, Job, SkillGroup, Section, Period…
│   └── navigation/   TypedEntry: what a visitor types on the keyboard, and the section it spells.
├── application/      Use cases and ports.
│   ├── ports/        PortfolioRepository, SectionNavigator (interfaces).
│   └── get-portfolio-page.ts
├── infrastructure/   Adapters that implement the ports.
│   ├── content/      StaticPortfolioRepository and the portfolio's content.
│   ├── browser/      HashSectionNavigator (anchor-based navigation).
│   └── config/       Site URL from the environment.
├── presentation/     React components, receiving domain data through props.
│   ├── sections/     Hero, Meet, Under the hood, Work, Process, Experience, Contact, nav, footer.
│   ├── keyboard/     The keyboard render and its hooks (key presses, typed navigation).
│   ├── windows/      macOS windows: the code window and the screenshot viewer.
│   └── navigation/   SectionNavigator context.
└── app/              Next.js routes and the composition root.
```

**The dependency rule** points inward: `domain ← application ← infrastructure | presentation ← app`. ESLint enforces it (`no-restricted-imports` per layer in `eslint.config.mjs`), so an import in the wrong direction fails `npm run lint`. The domain cannot import React or Next.js.

**Composition root.** `src/app/composition-root.ts` is the only place that chooses concrete adapters: it builds `GetPortfolioPage` with `StaticPortfolioRepository`. Its browser half, `src/app/section-navigation.tsx`, provides `HashSectionNavigator` for the `SectionNavigator` port. Swapping the content source (a CMS, an API) means writing one new repository adapter.

**SOLID in practice**

- *Single responsibility:* the keyboard is split into a renderer, `useKeyPresses` (visual key travel and glow), `useInViewFlag`, `useTypedNavigation` (typing → navigation) and `JumpHint`.
- *Open/closed and Liskov:* new content sources or navigation strategies plug in as implementations of the ports without changing their callers.
- *Interface segregation:* each port has one job (`PortfolioRepository` reads, `SectionNavigator` moves).
- *Dependency inversion:* components and use cases depend on ports and domain types, never on adapters; the app layer wires them.

## Scripts

```bash
npm install
cp .env.example .env.local   # optional: every variable has a default
npm run dev     # http://localhost:3000
npm test        # unit tests (domain rules, use case, content contract)
npm run lint    # ESLint, including the architecture boundaries
npm run build   # production build
```

## Content

All text lives in `src/infrastructure/content/portfolio-content.ts`, typed by the domain's `Portfolio` aggregate. A content-contract test checks the shapes the page relies on (five features per product keyset, single-word section names, a valid WhatsApp number, alt text on every screenshot).

## Design

`DESIGN.md` documents the design system (tokens, keycap material, components, motion and accessibility rules); `PRODUCT.md` records the product context and the sources behind every claim on the page.
