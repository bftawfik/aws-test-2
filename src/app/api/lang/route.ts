import { DEFAULT_LOCALE } from '@/constants';
import { cookies } from 'next/headers';
export async function GET(request: Request) {
    const cookieStore = cookies();
    const language = cookieStore.get('lang')?.value;
    const response = {
        language: language || DEFAULT_LOCALE,
    };
    return new Response(JSON.stringify(response));
}
