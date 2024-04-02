import { useQuery, QueryClient } from '@tanstack/react-query';
import { GET_LOCATION_INNER, REVALIDATE_SECONDS } from '@/constants';
import { Coord } from '@/types';

export const getSingleLocation = async (slug: string, lang: string) => {
    const response = await fetch(
        `${process.env.BASE_URL}/locations/${slug}
        `,
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

export const useGetSingleLocationQuery = (slug: string, lang: string) =>
    useQuery<{
        id: number;
        name: string;
        images: string[];
        image: string;
        coords: Coord[];
    }>({
        queryKey: [GET_LOCATION_INNER, slug, lang],
        queryFn: () => getSingleLocation(slug, lang),
    });

export const getSingleLocationPrefetch = async (
    queryClient: QueryClient,
    slug: string,
    lang: string
) => {
    await queryClient.prefetchQuery({
        queryKey: [GET_LOCATION_INNER],
        queryFn: () => getSingleLocation(slug, lang),
    });
};
