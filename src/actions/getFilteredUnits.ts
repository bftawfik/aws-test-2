import { EN_LOCALE, REVALIDATE_SECONDS } from '@/constants';
import { Bounds } from '@/types';
export default async function getFilteredUnits(
    filters: any = [],
    page: number = 1,
    hits: number = 16,
    token?: string,
    lang: string = EN_LOCALE,
    bounds?: Bounds,
    query?: string,
    sort?: string,
    removeSoldOut?: boolean
) {
    removeSoldOut ? (filters = [['sold_out = 0'], ...filters]) : filters;

    const response = await fetch(`${process.env.BASE_URL}/search`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept-Language': lang,
            Authorization: `Bearer ${token || ''}`,
        },
        next: {
            revalidate: REVALIDATE_SECONDS,
        },
        method: 'POST',
        body: JSON.stringify({
            filters: filters,
            page: page,
            hitsPerPage: hits,
            q: query,
            platform: 'web',
            sort: sort !== 'default' && sort != null ? [sort] : null,
            ...bounds,
        }),
    });
    return await response.json();
}
