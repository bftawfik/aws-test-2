import { AR_LOCALE, DEFAULT_LOCALE, EN_LOCALE } from '@/constants';

export const i18n = {
    defaultLocale: DEFAULT_LOCALE,
    locales: [EN_LOCALE, AR_LOCALE],
} as const;

export type Locale = (typeof i18n)['locales'][number];
