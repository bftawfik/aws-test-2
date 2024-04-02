import { GET_PROJECT_UNITS, REVALIDATE_SECONDS } from '@/constants';
import { ResponseMeta, Unit } from '@/types';
import { useQuery } from '@tanstack/react-query';

export const getFilteredUnits = async (
    projectId: number,
    type: string,
    lang: string,
    token: string | undefined,
    page: number,
    perPage: number
) => {
    const response = await fetch(
        `${process.env.BASE_URL}/get-units?include=agent,project,developer,unitType&filter[sale_type]=${type}&filter[project.id]=${projectId}&page=${page}&per_page=${perPage}`,
        {
            headers: {
                'accept-language': lang,
                Authorization: `Bearer ${token || ''}`,
            },
            next: {
                revalidate: REVALIDATE_SECONDS,
            },
        }
    );
    return await response.json();
};

export const useGetProjectDrawerUnitsQuery = (
    projectId: number,
    type: string,
    lang: string,
    token: string | undefined,
    page: number,
    perPage: number
) =>
    useQuery<{ data: Unit[]; meta: ResponseMeta }>({
        queryKey: [`${GET_PROJECT_UNITS}${type}`, lang, page],
        queryFn: () =>
            getFilteredUnits(projectId, type, lang, token, page, perPage),
    });
