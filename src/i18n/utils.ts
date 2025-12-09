import type { Language } from './types';
import { translations } from './translations';

export function getTranslations(lang: Language) {
  return translations[lang] || translations['pt-BR'];
}

export function getAlternateLanguage(lang: Language): Language {
  return lang === 'pt-BR' ? 'en' : 'pt-BR';
}

export function getLanguagePath(lang: Language): string {
  return lang === 'pt-BR' ? '/' : '/en';
}

export function detectBrowserLanguage(): Language {
  if (typeof window === 'undefined') return 'pt-BR';

  const browserLang = navigator.language || (navigator as any).userLanguage;

  // Check for English
  if (browserLang.startsWith('en')) return 'en';

  // Default to Portuguese
  return 'pt-BR';
}
