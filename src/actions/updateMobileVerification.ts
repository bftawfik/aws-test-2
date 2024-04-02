import { REVALIDATE_SECONDS, baseUrl } from '@/constants';

export default async function UpdateMobileVerification() {
    const response = await fetch(`${baseUrl}/update-verified-account-mobile`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        next: {
            revalidate: REVALIDATE_SECONDS,
        },
        // body: JSON.stringify(form),
    });
    return await response.json();
}
