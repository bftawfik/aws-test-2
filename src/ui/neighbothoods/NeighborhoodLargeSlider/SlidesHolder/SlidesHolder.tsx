'use server';
import { Location } from '@/types';
import React from 'react';
import NeighborhoodCard from '../../Card';
import { useLocale } from 'next-intl';
import { getTranslations } from 'next-intl/server';

const SlidesHolder = async ({ data }: { data: Location[] }) => {
    const locale = useLocale();
    const tGlobal = await getTranslations('global');

    return data?.map((location, i) => (
        <div
            key={location.id}
            className={`h-full w-full rounded-xl ${
                i % 3 === 0 ? 'md:row-span-2' : ''
            }`}
        >
            <NeighborhoodCard
                className="h-full"
                locale={locale}
                location={location}
                key={i}
                tGlobal={tGlobal}
            />
        </div>
    ));
};

export default SlidesHolder;
