import { REVALIDATE_SECONDS } from '@/constants';
import { Developer, ResponseMeta } from '@/types';

const getDevelopers = async (
    perPage?: number,
    page?: number,
    lang?: string,
    search?: string,
    signal?: any
) => {
    if (search && search.length > 0) {
        const response = await fetch(
            `${process.env.BASE_URL}/get-developers?filter[name]=${search}`,
            {
                headers: {
                    'Accept-Language': lang || '',
                },
                next: {
                    revalidate: REVALIDATE_SECONDS,
                },
                signal,
            }
        );
        return (await response.json()) as {
            data: Developer[];
            meta: ResponseMeta;
        };
    } else {
        const response = await fetch(
            `${process.env.BASE_URL}/get-developers?include=projects&page=${page}&per_page=${perPage}`,
            {
                headers: {
                    'Accept-Language': lang || '',
                },
                next: {
                    revalidate: REVALIDATE_SECONDS,
                },
            }
        );
        return (await response.json()) as {
            data: Developer[];
            meta: ResponseMeta;
        };
    }
};
export default getDevelopers;
