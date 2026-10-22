import type { PortfolioRepository } from "@/application/ports/portfolio-repository";
import type { Locale } from "@/domain/i18n/locale";
import { mailtoUrl, whatsappUrl } from "@/domain/portfolio/contact";
import type { Portfolio } from "@/domain/portfolio/portfolio";

export type ContactLinks = {
  /** Email with the subject prefilled, for the page's calls to action. */
  readonly mailto: string;
  /** Plain email link, for quiet places such as the footer. */
  readonly mailtoPlain: string;
  readonly whatsapp: string;
};

/** What the home page renders: the portfolio and its contact links. */
export type PortfolioPage = {
  readonly portfolio: Portfolio;
  readonly links: ContactLinks;
};

/** Assembles the home page, in one locale, from the portfolio repository. */
export class GetPortfolioPage {
  private readonly repository: PortfolioRepository;

  constructor(repository: PortfolioRepository) {
    this.repository = repository;
  }

  execute(locale: Locale): PortfolioPage {
    const portfolio = this.repository.getPortfolio(locale);
    const { contact } = portfolio.profile;
    return {
      portfolio,
      links: {
        mailto: mailtoUrl(contact),
        mailtoPlain: mailtoUrl(contact, { withSubject: false }),
        whatsapp: whatsappUrl(contact),
      },
    };
  }
}
