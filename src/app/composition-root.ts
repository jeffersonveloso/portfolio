import { GetPortfolioPage } from "@/application/get-portfolio-page";
import { StaticPortfolioRepository } from "@/infrastructure/content/static-portfolio-repository";

// The one place that picks concrete adapters for the application's ports.
// Routes read the page from here; nothing below the app layer knows which
// repository is in use.
export const portfolioPage = new GetPortfolioPage(new StaticPortfolioRepository()).execute();

export { siteUrl } from "@/infrastructure/config/site-url";
