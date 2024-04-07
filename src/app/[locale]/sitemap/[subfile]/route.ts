import { getGeneralSiteMap } from '@/actions/sitemap/getGeneralSiteMap';

export const GET = async (request: Request) => {
    const { url } = request;
    const fileId = url.slice(url.lastIndexOf('/') + 1, url.lastIndexOf('.xml'));
    const sitemap = await getGeneralSiteMap(fileId);

    return new Response(sitemap, {
        status: 200,
        headers: {
            'content-type': 'application/xml',
        },
    });
};
