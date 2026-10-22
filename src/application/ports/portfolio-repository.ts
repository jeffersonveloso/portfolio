import type { Locale } from "@/domain/i18n/locale";
import type { Portfolio } from "@/domain/portfolio/portfolio";

/** Where the portfolio's content comes from, told in each locale. */
export interface PortfolioRepository {
  getPortfolio(locale: Locale): Portfolio;
}
