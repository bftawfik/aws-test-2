import { useQuery, QueryClient } from '@tanstack/react-query';
import { GET_UNIT_WITH_FILTERS, REVALIDATE_SECONDS } from '@/constants';

export const getUnitWithFilters = async (
    locale: string,
    signal: AbortSignal
) => {
    let response: any = undefined;
    try {
        response = await fetch(
            `${process.env.BASE_URL}/get-units?filter[flag]=premium&include=developer,project,unitType&per_page=10`,
            {
                headers: {
                    'Accept-Language': locale,
                },
                next: {
                    revalidate: REVALIDATE_SECONDS,
                },
                signal: signal,
            }
        );
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Cancelled previous request or fetching error', error);
    }

    const res = await response.json();
    return res.data;
};

export const getUnitWithFilters2 = async (
    locale: string,
    signal: AbortSignal
): Promise<{ data: any[] }> => {
    const response = await fetch(
        `${process.env.BASE_URL}/get-units?filter[flag]=premium&include=developer,project,unitType&per_page=10`,
        {
            headers: {
                'Accept-Language': locale,
            },
            next: {
                revalidate: REVALIDATE_SECONDS,
            },
            signal: signal,
        }
    );
    return await response.json();
};

export const useGetUnitWithFiltersQuery = (
    locale: string,
    signal: AbortSignal
) =>
    useQuery<
        {
            id: number;
            sale_type: string;
            UnitType: { name: string };
        }[]
    >({
        queryKey: [GET_UNIT_WITH_FILTERS, locale, signal],
        queryFn: () => getUnitWithFilters(locale, signal),
    });
