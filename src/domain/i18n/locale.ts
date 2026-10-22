/** The languages the portfolio is told in, as BCP 47 tags. The first is the default. */
export const locales = ["en", "pt-BR"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = locales[0];

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
