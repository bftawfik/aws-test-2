import { EN_LOCALE, REVALIDATE_SECONDS } from '@/constants';
import { Bounds } from '@/types';

export default async function getFilteredProjects(
    filters: unknown = [],
    page: number = 1,
    hits: number = 10,
    token?: string,
    lang: string = EN_LOCALE,
    bounds?: Bounds,
    query?: string
) {
    const response = await fetch(
        `${process.env.BASE_URL}/get-projects-by-unit-meilisearch-criteria?include=developer,amenities,unitTypes,location`,
        {
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
                platform: 'web',
                q: query,
                ...bounds,
            }),
        }
    );
    return await response.json();
}
