import type { PortfolioRepository } from "@/application/ports/portfolio-repository";
import type { Portfolio } from "@/domain/portfolio/portfolio";
import { portfolioContent } from "@/infrastructure/content/portfolio-content";

/** Serves the portfolio from the content bundled with the site. */
export class StaticPortfolioRepository implements PortfolioRepository {
  getPortfolio(): Portfolio {
    return portfolioContent;
  }
}
