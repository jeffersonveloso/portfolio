import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { defaultLocale, locales } from "@/domain/i18n/locale";
import { whatsappUrl } from "@/domain/portfolio/contact";
import type { Portfolio } from "@/domain/portfolio/portfolio";
import { StaticPortfolioRepository } from "@/infrastructure/content/static-portfolio-repository";

const repository = new StaticPortfolioRepository();

// The content's contract with the page: shapes the renders and the
// type-to-jump keyboard rely on, in every locale.
describe.each(locales)("portfolio content in %s", (locale) => {
  const portfolio = repository.getPortfolio(locale);

  it("gives every product the five features its keyset prints", () => {
    for (const project of portfolio.projects) expect(project.highlights, project.name).toHaveLength(5);
  });

  it("gives the case study two groups of three features, one per kitchen", () => {
    expect(portfolio.caseStudy.highlights.map((group) => group.length)).toEqual([3, 3]);
  });

  it("names sections with distinct single words, so they can be typed", () => {
    const names = portfolio.sections.map((section) => section.label.toLowerCase());
    for (const name of names) expect(name).toMatch(/^[a-z]+$/);
    expect(new Set(names).size).toBe(names.length);
    expect(new Set(portfolio.sections.map((section) => section.id)).size).toBe(names.length);
  });

  it("has a WhatsApp number wa.me accepts", () => {
    expect(() => whatsappUrl(portfolio.profile.contact)).not.toThrow();
  });

  // docs/ stays local, so the CV the page links to must be its copy in public/.
  it("publishes the CV the page links to", () => {
    expect(existsSync(join("public", portfolio.profile.cv))).toBe(true);
  });

  it("describes every screenshot for people who cannot see it", () => {
    for (const shot of portfolio.caseStudy.screenshots) expect(shot.alt.length, shot.title).toBeGreaterThan(20);
  });
});

// What reads the same in every language: who the owner is, how to reach
// them, and what the page shows and links to. Only the words around it change.
function facts({ profile, ...portfolio }: Portfolio) {
  const { contact, location } = profile;
  return {
    name: profile.name,
    role: profile.role,
    location: [location.region, location.countryCode, location.timezone],
    languages: profile.languages.map((language) => language.code),
    photo: profile.photo,
    contact: [contact.email, contact.linkedin, contact.github, contact.whatsapp.display, contact.whatsapp.digits],
    sections: portfolio.sections.map((section) => section.id),
    projects: portfolio.projects.map((project) => ({
      slug: project.slug,
      period: project.period,
      accent: project.accent,
      site: project.link && new URL(project.link.href).host,
    })),
    caseStudy: {
      slug: portfolio.caseStudy.slug,
      client: portfolio.caseStudy.client,
      accent: portfolio.caseStudy.accent,
      screenshots: portfolio.caseStudy.screenshots.map(({ src, width, height }) => ({ src, width, height })),
    },
    engagements: portfolio.engagements.length,
    workflow: portfolio.workflow.length,
    experience: portfolio.experience.map((job) => ({ company: job.company, period: job.period })),
    education: portfolio.education.map((item) => item.place.split(",")[0]),
  };
}

describe("portfolio content across locales", () => {
  const original = facts(repository.getPortfolio(defaultLocale));

  it.each(locales.filter((locale) => locale !== defaultLocale))("tells the same facts in %s", (locale) => {
    expect(facts(repository.getPortfolio(locale))).toEqual(original);
  });
});
