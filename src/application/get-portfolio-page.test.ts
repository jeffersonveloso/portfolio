import { describe, expect, it } from "vitest";
import { GetPortfolioPage } from "@/application/get-portfolio-page";
import type { PortfolioRepository } from "@/application/ports/portfolio-repository";
import type { Locale } from "@/domain/i18n/locale";
import type { Portfolio } from "@/domain/portfolio/portfolio";
import { aPortfolio } from "@/test/portfolio-fixture";

class InMemoryPortfolioRepository implements PortfolioRepository {
  constructor(private readonly portfolios: Partial<Record<Locale, Portfolio>> = { en: aPortfolio() }) {}
  getPortfolio(locale: Locale) {
    const portfolio = this.portfolios[locale];
    if (!portfolio) throw new Error(`No portfolio in ${locale}`);
    return portfolio;
  }
}

describe("GetPortfolioPage", () => {
  it("returns the repository's portfolio in the locale asked for", () => {
    const en = aPortfolio();
    const ptBR = { ...aPortfolio(), topSkills: ["Comunicação"] };
    const useCase = new GetPortfolioPage(new InMemoryPortfolioRepository({ en, "pt-BR": ptBR }));
    expect(useCase.execute("en").portfolio).toBe(en);
    expect(useCase.execute("pt-BR").portfolio).toBe(ptBR);
  });

  it("builds the contact links from the profile", () => {
    const { links } = new GetPortfolioPage(new InMemoryPortfolioRepository()).execute("en");
    expect(links).toEqual({
      mailto: "mailto:ada@example.com?subject=Remote%20role%20%E2%80%94%20let's%20talk",
      mailtoPlain: "mailto:ada@example.com",
      whatsapp: "https://wa.me/442079460000?text=Hi%20Ada%2C%20let's%20talk.",
    });
  });
});
