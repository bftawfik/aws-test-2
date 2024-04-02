import { Coord } from '@/types';
import { getTranslations } from 'next-intl/server';
import InnerMap from '../../inner-map';

interface NeighborhoodMapSectionProps {
    coords: Coord[];
    locale: string;
}
export const NeighborhoodMapSection = async ({
    locale,
    coords,
}: NeighborhoodMapSectionProps) => {
    // Read translations
    const tGlobal = await getTranslations('global');
    return coords ? (
        <div className="min-h-140 mt-8 w-full lg:mt-16">
            <h2 className="mb-2 text-xl  font-semibold  capitalize leading-none text-black lg:mb-5 lg:text-2xl">
                {tGlobal('location') || ''}
            </h2>
            <InnerMap coords={coords || []} zoom={10} />
        </div>
    ) : null;
};
