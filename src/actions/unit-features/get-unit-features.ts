import { EN_LOCALE } from '@/constants';

export default async function getUnitFeatures(lang: string = EN_LOCALE) {
    const response = await fetch(`${process.env.BASE_URL}/unit_features`, {
        headers: {
            'Accept-Language': lang,
        },
    });

    return await response.json();
}
