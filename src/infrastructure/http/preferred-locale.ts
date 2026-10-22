import { defaultLocale, locales, type Locale } from "@/domain/i18n/locale";

const language = (tag: string) => tag.split("-")[0];

/**
 * The locale a browser asks for in its Accept-Language header: the most
 * wanted language the portfolio is told in, matched by language alone, so
 * pt-PT and plain pt read the Brazilian Portuguese page. Without a match,
 * the default locale.
 */
export function preferredLocale(acceptLanguage: string | null): Locale {
  const wanted = (acceptLanguage ?? "")
    .split(",")
    .map((entry, order) => {
      const [tag, ...params] = entry.trim().toLowerCase().split(";");
      const weight = params.map((param) => param.trim()).find((param) => param.startsWith("q="));
      return { tag: tag.trim(), q: weight ? Number(weight.slice(2)) : 1, order };
    })
    .filter(({ tag, q }) => tag && q > 0)
    .sort((a, b) => b.q - a.q || a.order - b.order);

  for (const { tag } of wanted) {
    const match = locales.find((locale) => language(locale.toLowerCase()) === language(tag));
    if (match) return match;
  }
  return defaultLocale;
}
