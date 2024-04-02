export const getProjectInner = async (
    slug: string,
    locale: string,
    token: string | undefined
): Promise<any> => {
    const response = await fetch(
        `${process.env.BASE_URL}/projects/${slug}?include=developer,developerCount,location,locationCount,amenities,amenitiesCount,unitTypes,unitTypesCount,units,unitsCount,landmarks,roads,children`,
        {
            headers: {
                'Accept-Language': locale,
                Authorization: `Bearer ${token || ''}`,
            },
            next: { revalidate: 10 } 
        }
    );

    return await response.json();  
};
