import { REVALIDATE_SECONDS } from '@/constants';
import { cookies } from 'next/headers';

export default async function getUnits(limit: number = 10, offset: number = 0) {
    const response = await fetch(
        `${process.env.MILISEARCH_URL}/units/documents?limit=${limit}&offset=${offset}`,
        {
            headers: {
                Authorization: cookies().get('next-auth.session-token')?.value
                    ? 'Bearer ' + cookies().get('_token')?.value
                    : '',
            },
            next: {
                revalidate: REVALIDATE_SECONDS,
            },
        }
    );
    return await response.json();
}
