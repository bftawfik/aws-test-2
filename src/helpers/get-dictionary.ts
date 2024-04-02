import 'server-only';
import { Locale, i18n } from '@/config/i18n-config';

const dictionaries = {
    ar: () => import('../lang/ar.json').then((module) => module.default),
    en: () => import('../lang/en.json').then((module) => module.default),
};

// @ts-ignore
export const getDictionary = async (locale: Locale) =>
    dictionaries[i18n.locales.includes(locale) ? locale : i18n.defaultLocale]();
