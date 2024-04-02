import { getSingleLocation } from '@/actions/useGetNeighborhoodsInnersQuery';
import React from 'react';
interface HeaderSectionProps {
    slug: string;
    lang: string;
}
export const HeaderSection = async ({ slug, lang }: HeaderSectionProps) => {
    const neighborhood = await getSingleLocation(slug, lang);

    return neighborhood ? (
        <div className="mt-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold capitalize leading-none text-black lg:text-2xl">
                {neighborhood?.name}
            </h2>
        </div>
    ) : null;
};
