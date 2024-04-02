const getGeneralSiteMap = async (fileId?: string): Promise<string> => {
    const response = await fetch(
        `${process.env.BASE_URL}/get_general_site_map${
            fileId ? `/${fileId}` : ''
        }`,
        { cache: 'no-cache' }
    );
    return response.text();
};

export { getGeneralSiteMap };
