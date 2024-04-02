import { REVALIDATE_SECONDS } from '@/constants';

export default async function getNeighborhoods(lang: string) {
    const response = await fetch(`${process.env.BASE_URL}/get-locations`, {
        headers: {
            accept_language: lang,
        },
        next: {
            revalidate: REVALIDATE_SECONDS,
        },
    });

    return await response.json();
}
