import { REVALIDATE_SECONDS, baseUrl } from '@/constants';
import { getCookie } from 'cookies-next';

export default async function getWishlistProjects(
    lang?: string,
    limit: number = 10,
    offset: number = 0
) {
    const response = await fetch(
        `${baseUrl}/my_fav_projects?include=developer,amenities,unitTypes`,
        {
            headers: {
                'Accept-Language': lang || '',
                Authorization: 'Bearer ' + getCookie('_token'),
            },
            next: {
                revalidate: REVALIDATE_SECONDS,
            },
        }
    );
    return await response.json();
}
