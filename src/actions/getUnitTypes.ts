import { REVALIDATE_SECONDS } from '@/constants';

export default async function getUnitTypes(
    limit: number = 100,
    offset: number = 0
) {
    const response = await fetch(
        `${process.env.MILISEARCH_URL}/unit_types/documents?limit=${limit}&offset=${offset}`,
        {
            headers: {
                Authorization: `Bearer ${process.env.MILISEARCH_TOKEN}`,
            },
            next: {
                revalidate: REVALIDATE_SECONDS,
            },
        }
    );
    return await response.json();
}
