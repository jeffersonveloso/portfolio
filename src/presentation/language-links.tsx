import { locales, type Locale } from "@/domain/i18n/locale";
import { getDictionary } from "@/presentation/i18n/dictionaries";

// Links to the page in every other locale, each named in its own language so
// a visitor can find theirs without reading the current one.
export function LanguageLinks({ current, className }: { current: Locale; className?: string }) {
  return (
    <>
      {locales
        .filter((locale) => locale !== current)
        .map((locale) => {
          const { language, switchLanguage } = getDictionary(locale);
          return (
            <a
              key={locale}
              href={`/${locale}`}
              hrefLang={locale}
              lang={locale}
              aria-label={switchLanguage}
              className={className}
            >
              {language}
            </a>
          );
        })}
    </>
  );
}
