import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/domain/i18n/locale";

/** The locale a route's `[lang]` segment names; any other value is a 404. */
export async function localeOf(params: Promise<{ lang: string }>): Promise<Locale> {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return lang;
}
