import { REVALIDATE_SECONDS, baseUrl } from '@/constants';

export default async function ResendVerification() {
    const response = await fetch(`${baseUrl}/resend-verification-code`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        next: {
            revalidate: REVALIDATE_SECONDS,
        },
        // body: JSON.stringify(form),
    });
    return await response.json();
}
