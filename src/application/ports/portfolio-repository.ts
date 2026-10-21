import type { Portfolio } from "@/domain/portfolio/portfolio";

/** Where the portfolio's content comes from. */
export interface PortfolioRepository {
  getPortfolio(): Portfolio;
}
