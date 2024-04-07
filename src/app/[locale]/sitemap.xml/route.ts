import { getGeneralSiteMap } from '@/actions/sitemap/getGeneralSiteMap';

export const GET = async () => {
    const sitemap = await getGeneralSiteMap();
    return new Response(sitemap, {
        status: 200,
        headers: {
            'content-type': 'application/xml',
        },
    });
};
