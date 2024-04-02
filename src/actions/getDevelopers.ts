import { REVALIDATE_SECONDS } from '@/constants';
import { Developer, Response } from '@/types';

export default async function getDevelopers(
    perPage: number,
    page: number
): Promise<Response<Developer[]>> {
    const response = await fetch(
        `${process.env.BASE_URL}/get-developers?include=projects&page=${page}&per_page=${perPage}`,
        {
            next: {
                revalidate: REVALIDATE_SECONDS,
            },
        }
    );
    return await response.json();
}
