import { REVALIDATE_SECONDS } from '@/constants';

export default async function getNewLaunches(
    lang: string,
    page: number = 1,
    perPage: number = 4
) {
    const response = await fetch(
        `${process.env.BASE_URL}/get-new-launches?include=developer&page=${page}&per_page=${perPage}`,
        {
            headers: {
                'accept-language': lang,
            },
            next: {
                revalidate: REVALIDATE_SECONDS,
            },
        }
    );
    return await response.json();
}
