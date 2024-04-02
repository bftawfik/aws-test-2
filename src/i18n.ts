import { getRequestConfig } from 'next-intl/server';
import { DEFAULT_LOCALE } from './constants';

export default getRequestConfig(async ({ locale }) => ({
    messages: (await import(`./lang/${locale || DEFAULT_LOCALE}.json`)).default,
}));
