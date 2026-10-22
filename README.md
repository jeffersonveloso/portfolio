# Jefferson Veloso — Portfolio

The personal portfolio of Jefferson Veloso, Full Stack Software Engineer & Tech Lead, built as an Apple-style product page for an engineer.

**Live:** https://jeffersonveloso.vercel.app, in English (`/en`) and Brazilian Portuguese (`/pt-BR`)

The hero is a 65% mechanical keyboard drawn entirely in CSS. It types the owner's name, presses the keys the visitor types on their own keyboard, and works as a real control: typing a section's name (`skills`, `work`, `process`, `experience`, `contact`; in Portuguese `habilidades`, `projetos`, `processo`, `carreira`, `contato`) moves the page there, while the space bar echoes what is typed so a typo can be seen and fixed.

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
│   ├── navigation/   TypedEntry: what a visitor types on the keyboard, and the section it spells.
│   └── i18n/         Locale: the languages the portfolio is told in.
├── application/      Use cases and ports.
│   ├── ports/        PortfolioRepository, SectionNavigator (interfaces).
│   └── get-portfolio-page.ts
├── infrastructure/   Adapters that implement the ports.
│   ├── content/      StaticPortfolioRepository and the portfolio's content, one file per locale.
│   ├── browser/      HashSectionNavigator (anchor-based navigation).
│   ├── http/         The locale a browser asks for in Accept-Language.
│   └── config/       Site URL from the environment.
├── presentation/     React components, receiving domain data through props.
│   ├── sections/     Hero, Meet, Under the hood, Work, Process, Experience, Contact, nav, footer.
│   ├── keyboard/     The keyboard render and its hooks (key presses, typed navigation).
│   ├── windows/      macOS windows: the code window and the screenshot viewer.
│   ├── navigation/   SectionNavigator context.
│   └── i18n/         The interface's own words (headings, labels, messages), one dictionary per locale.
├── app/              Next.js routes under [lang], and the composition root.
└── proxy.ts          Sends a path without a locale to the visitor's language.
```

**The dependency rule** points inward: `domain ← application ← infrastructure | presentation ← app`. ESLint enforces it (`no-restricted-imports` per layer in `eslint.config.mjs`), so an import in the wrong direction fails `npm run lint`. The domain cannot import React or Next.js.

**Composition root.** `src/app/composition-root.ts` is the only place that chooses concrete adapters: it builds `GetPortfolioPage` with `StaticPortfolioRepository`, which serves the portfolio in the locale a route asks for. Its browser half, `src/app/section-navigation.tsx`, provides `HashSectionNavigator` for the `SectionNavigator` port. Swapping the content source (a CMS, an API) means writing one new repository adapter.

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

## Content and languages

The site is told in English and Brazilian Portuguese. Every page lives under its locale, `/en` or `/pt-BR`, prerendered at build time. `src/proxy.ts` sends a path without one, such as `/`, to the language the browser asks for (any Portuguese reads `/pt-BR`, everything else `/en`), and fixes the case of a typed locale (`/pt-br`). The global nav and the footer link to the other language, and each page declares its alternates (`hreflang`) for search engines.

The portfolio's content lives in `src/infrastructure/content/locales/` (`en.ts`, `pt-br.ts`), typed by the domain's `Portfolio` aggregate. The interface's own words (headings, buttons, labels and messages) live in `src/presentation/i18n/` (`en.ts`, `pt-br.ts`), typed by `Dictionary`. A content-contract test checks, in every locale, the shapes the page relies on (five features per product keyset, single-word section names, a valid WhatsApp number, alt text on every screenshot), and that every locale tells the same facts: contacts, links, products, periods and screenshots.

To add a language, add its tag to `locales` in `src/domain/i18n/locale.ts`; TypeScript then asks for its content and its dictionary.

## Design

`DESIGN.md` documents the design system (tokens, keycap material, components, motion and accessibility rules); `PRODUCT.md` records the product context and the sources behind every claim on the page.
