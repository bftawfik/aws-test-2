import { REVALIDATE_SECONDS, baseUrl } from '@/constants';

interface verifyType {
    phone: string;
    code: number;
}
export default async function VerifyAccount(form: verifyType) {
    const response = await fetch(`${baseUrl}/verify-account`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        next: {
            revalidate: REVALIDATE_SECONDS,
        },
        body: JSON.stringify(form),
    });
    return await response.json();
}
