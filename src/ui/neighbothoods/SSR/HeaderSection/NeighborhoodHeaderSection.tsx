interface NeighborhoodHeaderSectionProps {
    neighborhoodName: string;
}
export const NeighborhoodHeaderSection = async ({
    neighborhoodName,
}: NeighborhoodHeaderSectionProps) => {
    return neighborhoodName ? (
        <div className="mt-6 flex items-center justify-between">
            <h1 className="text-xl font-semibold capitalize leading-none text-black lg:text-2xl">
                {neighborhoodName}
            </h1>
        </div>
    ) : null;
};
