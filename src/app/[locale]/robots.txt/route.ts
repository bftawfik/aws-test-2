export const GET = async () => {
    const robotsContent = `
      User-agent: *
      Disallow: /*?drawer_id=
      Sitemap: https://estatebook.com/sitemap.xml
  `;

    return new Response(robotsContent, {
        status: 200,
        headers: {
            'content-type': 'text/plain',
        },
    });
};
