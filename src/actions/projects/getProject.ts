import { REVALIDATE_SECONDS } from '@/constants';

export default async function getProject(slug: string) {
    const response = await fetch(`${process.env.BASE_URL}/projects/${slug}`, {
        next: {
            revalidate: REVALIDATE_SECONDS,
        },
    });
    return await response.json();
}
