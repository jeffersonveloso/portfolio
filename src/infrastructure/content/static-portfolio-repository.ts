import type { PortfolioRepository } from "@/application/ports/portfolio-repository";
import type { Locale } from "@/domain/i18n/locale";
import type { Portfolio } from "@/domain/portfolio/portfolio";
import { portfolioContent } from "@/infrastructure/content/portfolio-content";

/** Serves the portfolio from the content bundled with the site. */
export class StaticPortfolioRepository implements PortfolioRepository {
  getPortfolio(locale: Locale): Portfolio {
    return portfolioContent[locale];
  }
}
