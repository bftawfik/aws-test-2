import { useQuery, QueryClient } from '@tanstack/react-query';
import { GET_DEVELOPERS_INNERS, REVALIDATE_SECONDS } from '@/constants';

export const getDevelopersInners = async (slug: string, lang: string) => {
    const response = await fetch(
        `${process.env.BASE_URL}/developers/${slug}?include=amenities,projects,projectsCount,units,units.project,units.state,units.unitType,units.agent,projects.unitTypes,projects.developer,projects.amenities,projects.location`,
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

export const useGetDevelopersInnersQuery = (slug: string, lang: string) =>
    useQuery<{
        logo: string;
        name: string;
        cover_image: string;
        description: string;
        id: number;
        projects: any[];
        units: any[];
    }>({
        queryKey: [GET_DEVELOPERS_INNERS, slug, lang],
        queryFn: () => getDevelopersInners(slug, lang),
    });

export const developersInnersPrefetch = async (
    queryClient: QueryClient,
    slug: string,
    lang: string
) => {
    await queryClient.prefetchQuery({
        queryKey: [GET_DEVELOPERS_INNERS],
        queryFn: () => getDevelopersInners(slug, lang),
    });
};
