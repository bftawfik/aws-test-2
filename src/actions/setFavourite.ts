import { REVALIDATE_SECONDS } from '@/constants';

interface favouriteForm {
    favorite: boolean;
    id: number;
    type: string;
}
export default async function setFavourite(form: favouriteForm, token: string) {
    const response = await fetch(`${process.env.BASE_URL}/favorite`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token || ''}`,
        },
        next: {
            revalidate: REVALIDATE_SECONDS,
        },
        body: JSON.stringify(form),
    });
    return await response.json();
}
