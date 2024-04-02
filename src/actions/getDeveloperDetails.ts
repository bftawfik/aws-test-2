import { REVALIDATE_SECONDS } from '@/constants';

export const getDeveloperDetails = async (slug: string, lang: string) => {
    const response = await fetch(
        `${process.env.BASE_URL}/developers/${slug}?include=amenities`,
        {
            headers: { 'accept-language': lang },
            next: {
                revalidate: REVALIDATE_SECONDS,
            },
        }
    );
    const res = await response.json();
    return res.data;
};
