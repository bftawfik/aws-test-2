import InnerMap from '../inner-map';
import { getSingleLocation } from '@/actions/useGetNeighborhoodsInnersQuery';
import { getTranslator } from 'next-intl/server';

interface MapSectionProps {
    lang: string;
    slug: string;
}
export const MapSection = async ({ lang, slug }: MapSectionProps) => {
    // Read translations
    const tGlobal = await getTranslator(lang, 'global');

    const neighborhood = await getSingleLocation(slug, lang);

    return neighborhood ? (
        <div className="min-h-140 mt-8 w-full lg:mt-16">
            <h2 className="mb-2 text-xl  font-semibold  capitalize leading-none text-black lg:mb-5 lg:text-2xl">
                {tGlobal('location') || ''}
            </h2>
            <InnerMap coords={neighborhood?.coords || []} zoom={10} />
        </div>
    ) : null;
};
