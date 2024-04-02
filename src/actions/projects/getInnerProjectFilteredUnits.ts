import { REVALIDATE_SECONDS } from '@/constants';

export const getInnerProjectFilteredUnits = async (
    projectId: number,
    type: string,
    lang: string,
    token: string | undefined
): Promise<any> => {
    const response = await fetch(
        `${process.env.BASE_URL}/get-units?page=1&include=agent,project,developer,unitType&filter[sale_type]=${type}&filter[project.id]=${projectId}&sold_out=1`,
        {
            headers: {
                'Accept-Language': lang,
                Authorization: `Bearer ${token || ''}`,
            },
            next: {
                revalidate: REVALIDATE_SECONDS,
            },
        }
    );
    return await response.json();
};
