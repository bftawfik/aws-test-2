import { baseUrl } from '@/constants';

interface SendOtpForm {
    code: string;
}
export default async function SendOtp(form: SendOtpForm) {
    const response = await fetch(`${baseUrl}/forgot-password/code/check`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        next: {
            revalidate: 10,
        },
        body: JSON.stringify(form),
    });
    return await response;
}
