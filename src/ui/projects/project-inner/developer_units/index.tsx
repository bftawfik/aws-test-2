'use client';
import InnerSectionHeader from '@/ui/inners-section-header';
import { UnitCard } from '@/ui/units/unit-card';
import React, { useEffect, useState } from 'react';
import { DeveloperUnitsProps } from './developer_units';
import { useTranslations, useLocale } from 'next-intl';
import { REVALIDATE_SECONDS } from '@/constants';

const DeveloperUnitsComponent = ({ project }: DeveloperUnitsProps) => {
    // Read localization
    const locale = useLocale();

    // Read translations
    const tGlobal = useTranslations('global');

    const [saleUnits, setSaleUnits] = useState([]);
    const [resaleUnits, setResaleUnits] = useState([]);
    const getDevloperUnits = async (
        projectId: number,
        type: string,
        lang: string
    ): Promise<any> => {
        const response = await fetch(
            `${process.env.BASE_URL}/get-units?page=1&include=agent,project,developer,unitType&filter[sale_type]=${type}&filter[project.id]=${projectId}`,
            {
                headers: { 'accept-language': lang },
                next: {
                    revalidate: REVALIDATE_SECONDS,
                },
            }
        );
        return await response.json();
    };
    useEffect(() => {
        (async () => {
            const { data: sale } = await getDevloperUnits(
                project.id,
                'sale',
                locale
            );
            const { data: resale } = await getDevloperUnits(
                project.id,
                'resale',
                locale
            );
            setSaleUnits(sale);

            setResaleUnits(resale);
        })();
    }, [locale, project]);
    if (saleUnits.length <= 0 && resaleUnits.length <= 0) return null;
    return (
        <>
            <section className="mt-8 w-full md:mt-16">
                <InnerSectionHeader title={tGlobal('developer_units')} />
                <div className="mt-4 grid w-full grid-cols-1 gap-3 gap-x-4 lg:grid-cols-3">
                    {saleUnits?.map((unit: any) => (
                        <UnitCard key={unit.id} unit={unit} />
                    ))}
                </div>
            </section>
            {resaleUnits.length > 0 && (
                <section className="mt-8 w-full md:mt-16">
                    <InnerSectionHeader title={tGlobal('resale_units')} />
                    <div className="mt-4 grid w-full grid-cols-1 gap-3 gap-x-4 lg:grid-cols-3">
                        {resaleUnits?.map((unit: any) => (
                            <UnitCard key={unit.id} unit={unit} />
                        ))}
                    </div>
                </section>
            )}
        </>
    );
};

export default DeveloperUnitsComponent;
