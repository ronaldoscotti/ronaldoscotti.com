import { detectBrowserLanguage, getLanguagePath } from '../i18n/utils';
import type { Language } from '../i18n/types';

const LANGUAGE_KEY = 'preferredLanguage';

// Get stored language preference
function getStoredLanguage(): Language | null {
  if (typeof localStorage === 'undefined') return null;
  const stored = localStorage.getItem(LANGUAGE_KEY);
  return (stored === 'pt-BR' || stored === 'en') ? stored : null;
}

// Store language preference
function storeLanguage(lang: Language): void {
  if (typeof localStorage === 'undefined') return;
  localStorage.setItem(LANGUAGE_KEY, lang);
}

// Get current language from URL
function getCurrentLanguage(): Language {
  const path = window.location.pathname;
  return path.startsWith('/en') ? 'en' : 'pt-BR';
}

// Auto-redirect on first visit based on browser language
export function handleAutoRedirect(): void {
  // Skip if user already has a preference stored
  const stored = getStoredLanguage();
  if (stored) {
    // Store preference again to refresh timestamp
    storeLanguage(stored);
    return;
  }

  // Detect browser language
  const browserLang = detectBrowserLanguage();
  const currentLang = getCurrentLanguage();

  // Redirect if language mismatch
  if (browserLang !== currentLang) {
    const targetPath = getLanguagePath(browserLang);
    storeLanguage(browserLang);
    window.location.href = targetPath;
  } else {
    // Store current language as preference
    storeLanguage(currentLang);
  }
}

// Initialize on DOM load
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    handleAutoRedirect();
  });
}
