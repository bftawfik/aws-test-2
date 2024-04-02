import { EN_LOCALE, REVALIDATE_SECONDS } from '@/constants';
import { Bounds } from '@/types';

export default async function getFilteredNeighborhoods(
    filters: any = [],
    page: number = 1,
    hits: number = 10,
    lang: string = EN_LOCALE,
    bounds?: Bounds,
    query?: string
) {
    const response = await fetch(
        `${process.env.BASE_URL}/get-neighbourhood-by-unit-meilisearch-criteria?include=projects`,
        {
            headers: {
                'Content-Type': 'application/json',
                'Accept-Language': lang,
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
                ...bounds,
            }),
        }
    );
    return await response.json();
}
