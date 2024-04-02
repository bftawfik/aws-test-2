export default async function getUnitTypes(
    token: string | undefined,
    lang: string
) {
    const response = await fetch(`${process.env.BASE_URL}/get-unit-types`, {
        headers: {
            'Accept-Language': lang || ''
        },
    });

    return await response.json();
}
