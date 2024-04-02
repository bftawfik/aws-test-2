import { REVALIDATE_SECONDS, baseUrl } from '@/constants';
interface ResendOtpForm {
    mobile?: string;
    email?: string;
}
export default async function setResendOtp(form: ResendOtpForm) {
    const response = await fetch(`${baseUrl}/resend-verification-code`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        next: {
            revalidate: REVALIDATE_SECONDS,
        },
        body: JSON.stringify(form),
    });
    return await response;
}
