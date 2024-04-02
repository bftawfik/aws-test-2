import InnerSectionHeader from '@/ui/inners-section-header';
import { getTranslator } from 'next-intl/server';
import { Unit } from '@/types';
import { UnitCard } from '@/ui/units/unit-card-v2';
import { headers } from 'next/headers';
import { DEVELOPER_SHORT } from '@/constants';
import { converSlugToUrlName } from '@/helpers';

interface DeveloperUnitsSectionProps {
    locale: string;
    developerUnits: Unit[];
    developerId: number;
    developerSlug: string;
}

const DeveloperUnitsSection = async ({
    locale,
    developerUnits,
    developerId,
    developerSlug,
}: DeveloperUnitsSectionProps) => {
    // Read translations
    const tGlobal = await getTranslator(locale, 'global');
    const tUnitCard = await getTranslator(locale, 'unit_card');
    const headersList = headers();
    const host = headersList.get('host');

    const UNITS_LINK = `/discover/${DEVELOPER_SHORT}-${converSlugToUrlName(
        developerSlug
    )}_${developerId}`;

    return (
        <div className="mt-8 w-full lg:mt-16">
            <InnerSectionHeader
                title={tGlobal('developer_units')}
                href={UNITS_LINK}
            />
            <div className="mt-4 grid w-full grid-cols-1 gap-3 gap-x-4 md:grid-cols-2 lg:grid-cols-3">
                {developerUnits?.map((unit: Unit) => (
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
        </div>
    );
};
export default DeveloperUnitsSection;
