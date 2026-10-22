import type { Locale } from "@/domain/i18n/locale";
import type { Dictionary } from "@/presentation/i18n/dictionary";
import { en } from "@/presentation/i18n/en";
import { ptBR } from "@/presentation/i18n/pt-br";

const dictionaries: Record<Locale, Dictionary> = { en, "pt-BR": ptBR };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
