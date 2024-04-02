import { REVALIDATE_SECONDS } from '@/constants';

export default async function getProjects(
    token?: string,
    lang?: string,
    limit: number = 10,
    offset: number = 0,
    getSoldOut: boolean = true
) {
    const GET_SOLD_OUT = getSoldOut ? '&sold_out=1' : '';

    // ?include=developer,developerCount,location,locationCount,amenities,amenitiesCount,unitTypes,unitTypesCount,units,unitsCount,landmarks,roads&page=1&per_page=${limit}&filter[status]=active
    const response = await fetch(
        `${process.env.BASE_URL}/get-projects?include=amenities,unitTypes,location,developer,developerCount${GET_SOLD_OUT}`,
        {
            headers: {
                'Accept-Language': lang || '',
                Authorization: `Bearer ${token || ''}`,
            },
            next: {
                revalidate: REVALIDATE_SECONDS,
            },
        }
    );
    return await response.json();
}
