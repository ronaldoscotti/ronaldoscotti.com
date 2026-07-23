import type { Language } from "./types";
import { translations } from "./translations";

export function getTranslations(lang: Language) {
  return translations[lang] || translations.en;
}

export function getAlternateLanguage(lang: Language): Language {
  return lang === "en" ? "pt-BR" : "en";
}

export function getLanguagePath(lang: Language): string {
  return lang === "en" ? "/" : "/pt";
}

export function getHtmlLang(lang: Language): string {
  return lang === "en" ? "en" : "pt-BR";
}

export function getOgLocale(lang: Language): string {
  return lang === "en" ? "en_US" : "pt_BR";
}
