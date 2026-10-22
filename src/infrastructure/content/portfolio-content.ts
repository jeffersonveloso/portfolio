import type { Locale } from "@/domain/i18n/locale";
import type { Portfolio } from "@/domain/portfolio/portfolio";
import { en } from "@/infrastructure/content/locales/en";
import { ptBR } from "@/infrastructure/content/locales/pt-br";

/** The portfolio's content in every locale the site is told in. */
export const portfolioContent: Record<Locale, Portfolio> = {
  en,
  "pt-BR": ptBR,
};
