export default async function getOffer(unitId: number) {
    const response = await fetch(
        `${process.env.BASE_URL}/unit_sales_offer/${unitId}`,
        {
            next: { revalidate: 120 },
        }
    );
    return await response.json();
}
