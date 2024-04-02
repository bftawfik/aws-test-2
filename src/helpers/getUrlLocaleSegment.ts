import { DEFAULT_LOCALE } from '@/constants';

export const getUrlLocaleSegment = (locale: string) => {
    return locale === DEFAULT_LOCALE ? '' : `/${locale}`;
};
