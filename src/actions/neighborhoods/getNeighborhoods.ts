import { REVALIDATE_SECONDS } from '@/constants';

export default async function getNeighborhoods(
    token: string | undefined,
    lang: string
) {
    const response = await fetch(`${process.env.BASE_URL}/get-locations`, {
        headers: {
            'Accept-Language': lang,
        },
        next: {
            revalidate: REVALIDATE_SECONDS,
        },
    });

    return await response.json();
}
