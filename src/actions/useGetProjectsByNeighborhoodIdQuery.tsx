import { useQuery } from '@tanstack/react-query';
import { GET_LOCATION_PROJECTS, REVALIDATE_SECONDS } from '@/constants';
import { ResponseMeta, Project } from '@/types';

export const getProjectsByNeighborhoodId = async (
    lang: string,
    locationId: number | undefined,
    perPage: number,
    page: number
) => {
    const response = await fetch(
        `${process.env.BASE_URL}/get-projects?filter[location_id]=${locationId}&page=${page}&per_page=${perPage}&include=unitTypes,developer,amenities,location`,
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
};

export const useGetProjectsByNeighborhoodIdQuery = (
    lang: string,
    locationId: number | undefined,
    perPage: number,
    page: number,
    enabled?: boolean
) =>
    useQuery<{ data: Project[]; meta: ResponseMeta }>({
        queryKey: [GET_LOCATION_PROJECTS, lang, locationId, perPage, page],
        queryFn: () =>
            getProjectsByNeighborhoodId(lang, locationId, perPage, page),
    });
