import { baseUrl } from '@/constants';
interface signUpForm {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}
export default async function setSignUp(form: signUpForm) {
    const response = await fetch(`${baseUrl}/client-register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        next: {
            revalidate: 10,
        },
        body: JSON.stringify(form),
    });
    return await response.json();
}
