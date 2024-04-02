import React from 'react';
import { useLocale } from 'next-intl';
import { UnitCard } from '../../unit-card-v2';
import { headers } from 'next/headers';
import { getTranslations } from 'next-intl/server';
import { REVALIDATE_SECONDS } from '@/constants';

interface FromTheDeveloperProps {
    developerId: number;
    locale: string;
}
const FromTheDeveloper = async ({
    developerId,
    locale,
}: FromTheDeveloperProps) => {
    // Read localization
    const tGlobal = await getTranslations('global');
    const tUnitCard = await getTranslations('unit_card');

    const response = await fetch(
        `${process.env.BASE_URL}/get-units?include=project,developer,unitType&filter[developer.id]=${developerId}&filter[sale_type]=sale&per_page=10
        `,
        {
            headers: { 'Accept-Language': locale },
            next: {
                revalidate: REVALIDATE_SECONDS,
            },
        }
    );
    const { data } = await response.json();
    const headersList = headers();
    const host = headersList.get('host');
    if (!data) return null;
    return (
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

export default FromTheDeveloper;
