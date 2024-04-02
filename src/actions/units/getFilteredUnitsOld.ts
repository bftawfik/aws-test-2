import { REVALIDATE_SECONDS } from '@/constants';

export default async function getFilteredUnitsOld(
    token?: string,
    filters: [string, string | number] = ['', ''],
    lang?: string,
    page = 1,
    perPage = 10,
    getSoldOut = true
) {
    const GET_SOLD_OUT = getSoldOut ? '&sold_out=1' : '';
    const response = await fetch(
        `${process.env.BASE_URL}/get-units?page=${page}&include=agent,project,developer,unitType&filter[${filters[0]}]=${filters[1]}&per_page=${perPage}${GET_SOLD_OUT}`,
        {
            headers: {
                'Accept-Language': lang || '',
                Authorization: `Bearer ${token || ''}`,
            },
            next: { revalidate: REVALIDATE_SECONDS },
        }
    );
    return await response.json();
}
