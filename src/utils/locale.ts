import messages_en from '../i18n/en.json';
import messages_de from '../i18n/de.json';
import messages_zh from '../i18n/zh.json';

export const LOCALES = {
  ENGLISH: 'en',
  GERMAN: 'de',
  CHINESE: 'zh',
};

export const messages = {
  [LOCALES.ENGLISH]: messages_en,
  [LOCALES.GERMAN]: messages_de,
  [LOCALES.CHINESE]: messages_zh,
};

interface ILocaleInfo {
  /**
   * example: 'en-US'
   */
  localeRaw: string;
  /**
   * example: 'en'
   */
  languageRaw: string;
  /**
   * Locale for the translations. Currently we use Language
   */
  locale: string;
  /**
   * direction based on locale
   */
  direction: 'ltr' | 'rtl';
}

function getRawLocale(locale?: string): string {
  return locale || window.navigator.language || LOCALES.ENGLISH;
}

function getRawLanguage(locale?: string): string {
  const loc = getRawLocale(locale);
  return loc.split('-')[0].toLowerCase();
}

/**
 * Obtains information to display UI in accordance with Locale
 * @param locale locale/language string
 * @returns Locale information
 */
export function getLocaleInfo(locale?: string): ILocaleInfo {
  const localeRaw = getRawLocale(locale);
  const languageRaw = getRawLanguage(locale);
  const loc = Object.values(LOCALES).includes(languageRaw) ? languageRaw : LOCALES.ENGLISH;

  return Object.freeze({
    localeRaw: localeRaw,
    languageRaw: languageRaw,
    locale: loc,
    direction: 'ltr',
  });
}
