import { baseUrl } from '@/constants';

interface forgetPasswordForm {
    email: string;
}
export default async function setForgetPassword(form: forgetPasswordForm) {
    const response = await fetch(`${baseUrl}/forgot-password/email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        next: {
            revalidate: 10,
        },
        body: JSON.stringify(form),
    });
    return await response;
}
