import { describe, expect, it } from "vitest";
import { GetPortfolioPage } from "@/application/get-portfolio-page";
import type { PortfolioRepository } from "@/application/ports/portfolio-repository";
import { aPortfolio } from "@/test/portfolio-fixture";

class InMemoryPortfolioRepository implements PortfolioRepository {
  constructor(private readonly portfolio = aPortfolio()) {}
  getPortfolio() {
    return this.portfolio;
  }
}

describe("GetPortfolioPage", () => {
  it("returns the repository's portfolio unchanged", () => {
    const portfolio = aPortfolio();
    const page = new GetPortfolioPage(new InMemoryPortfolioRepository(portfolio)).execute();
    expect(page.portfolio).toBe(portfolio);
  });

  it("builds the contact links from the profile", () => {
    const { links } = new GetPortfolioPage(new InMemoryPortfolioRepository()).execute();
    expect(links).toEqual({
      mailto: "mailto:ada@example.com?subject=Remote%20role%20%E2%80%94%20let's%20talk",
      mailtoPlain: "mailto:ada@example.com",
      whatsapp: "https://wa.me/442079460000?text=Hi%20Ada%2C%20let's%20talk.",
    });
  });
});
