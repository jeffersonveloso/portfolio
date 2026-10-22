import { GetPortfolioPage } from "@/application/get-portfolio-page";
import type { Locale } from "@/domain/i18n/locale";
import { StaticPortfolioRepository } from "@/infrastructure/content/static-portfolio-repository";

// The one place that picks concrete adapters for the application's ports.
// Routes read the page from here; nothing below the app layer knows which
// repository is in use.
const getPortfolioPage = new GetPortfolioPage(new StaticPortfolioRepository());

export const portfolioPage = (locale: Locale) => getPortfolioPage.execute(locale);

export { siteUrl } from "@/infrastructure/config/site-url";
