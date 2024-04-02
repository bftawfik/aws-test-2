import { baseUrl } from '@/constants';
interface ContactFormData {
    name: string;
    email: string;
    message: string;
    mobile: string;
    interested_in?: string;
    model_id: number;
    model_type: string;
}

export default async function setContactUs(form: ContactFormData) {
    const response = await fetch(`${baseUrl}/contact-us`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
    });
    return response;
}
