export default async function getAmenities(
    token: string | undefined,
    lang: string
) {
    const response = await fetch(
        `${process.env.BASE_URL}/get-amenities?filter[is_filterable]=1`,
        {
            headers: {
                'Accept-Language': lang || ''
            },
        }
    );

    return await response.json();
}
