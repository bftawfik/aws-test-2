import { baseUrl } from '@/constants';

interface signUpForm {
    name: string;
    email: string;
    token: string | number;
    platform: string;
}
export default async function socialLogin(form: signUpForm) {
    const response = await fetch(`${baseUrl}/client-social`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        next: {
            revalidate: 10,
        },
        body: JSON.stringify(form),
    });
    return await response.json();
}
