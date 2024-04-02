'use client';
import React from 'react';
import { useGetDevelopersInnersQuery } from '@/actions/useGetDevelopersInnersQuery';
import InnerSectionHeader from '@/ui/inners-section-header';
import { UnitCard } from '@/ui/units/unit-card';
import { useTranslations } from 'next-intl';
import { UNITS_LINK } from '@/constants';

interface DeveloperUnitsProps {
    slug: any;
    lang: any;
}

const DeveloperUnits = ({ slug, lang }: DeveloperUnitsProps) => {
    // Read translations
    const tGlobal = useTranslations('global');

    const { data: developer, isFetching } = useGetDevelopersInnersQuery(
        slug,
        lang
    );

    return !developer ? null : (
        <div className="mt-8 w-full lg:mt-16">
            <InnerSectionHeader
                title={tGlobal('developer_units')}
                href={UNITS_LINK}
            />
            <div className="mt-4 grid w-full grid-cols-1 gap-3 gap-x-4 lg:grid-cols-3">
                {developer.units?.map((unit: any) => (
                    <UnitCard key={unit?.id} unit={unit} />
                ))}
            </div>
        </div>
    );
};
export default DeveloperUnits;
