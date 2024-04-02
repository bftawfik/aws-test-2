import { baseUrl } from '@/constants';

interface ResetPasswordForm {
    token: string;
    password: string | number;
    password_confirmation: string | number;
}
export default async function setResetPassword(form: ResetPasswordForm) {
    const response = await fetch(`${baseUrl}/forgot-password/reset`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        next: {
            revalidate: 10,
        },
        body: JSON.stringify(form),
    });
    return await response;
}
