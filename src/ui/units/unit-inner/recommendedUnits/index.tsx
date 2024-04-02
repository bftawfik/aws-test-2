import React from 'react';
import { getUnitWithFilters } from '@/actions/useGetUnitWithFiltersQuery';
import { useLocale } from 'next-intl';
import { UnitCard } from '../../unit-card-v2';
import { headers } from 'next/headers';
import { getTranslator } from 'next-intl/server';

interface RecommendedUnitsProps {
    locale: string;
}
const RecommendedUnits = async ({ locale }: RecommendedUnitsProps) => {
    const tGlobal = await getTranslator(locale, 'global');
    const tUnitCard = await getTranslator(locale, 'unit_card');

    var abortController = new AbortController();

    const data = await getUnitWithFilters(locale, abortController.signal);
    const headersList = headers();
    const host = headersList.get('host');

    return !data ? null : (
        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {data?.map((unit: any) => (
                <UnitCard
                    host={host || ''}
                    locale={locale}
                    key={unit.id}
                    unit={unit}
                    tGlobal={tGlobal}
                    tUnitCard={tUnitCard}
                />
            ))}
        </div>
    );
};

export default RecommendedUnits;
