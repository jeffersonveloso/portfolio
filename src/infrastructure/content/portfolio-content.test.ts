import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { whatsappUrl } from "@/domain/portfolio/contact";
import { StaticPortfolioRepository } from "@/infrastructure/content/static-portfolio-repository";

// The content's contract with the page: shapes the renders and the
// type-to-jump keyboard rely on.
const portfolio = new StaticPortfolioRepository().getPortfolio();

describe("portfolio content", () => {
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
