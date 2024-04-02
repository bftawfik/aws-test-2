import { getInnerProjectFilteredUnits } from '@/actions/projects/getInnerProjectFilteredUnits';
import { Project, Unit } from '@/types';
import InnerSectionHeader from '@/ui/inners-section-header';
import { UnitCard } from '@/ui/units/unit-card-v2';
// import { getServerSession } from 'next-auth';
import { getTranslator } from 'next-intl/server';
import { headers } from 'next/headers';

interface DeveloperUnitsV2Props {
    project: Project;
    locale: string;
}

const DeveloperUnitsV2 = async ({ project, locale }: DeveloperUnitsV2Props) => {
    // Get Session
    // TODO: hide server session until solve forge problem
    // const session = await getServerSession(authOptions);

    // Read Trnaslation
    const tGlobal = await getTranslator(locale, 'global');
    const tUnitCard = await getTranslator(locale, 'unit_card');
    // Read Host
    const headersList = headers();
    const host = headersList.get('host');

    const { data: saleUnits } = await getInnerProjectFilteredUnits(
        project.id,
        'sale',
        locale,
        // session?.auth?.meta?.token
        undefined
    );
    return (
        <div>
            {saleUnits.length > 0 ? (
                <section className="mt-8 w-full md:mt-16">
                    <InnerSectionHeader title={tGlobal('developer_units')} />
                    <div className="mt-4 grid w-full grid-cols-1 gap-3 gap-x-4 lg:grid-cols-3">
                        {saleUnits?.map((unit: Unit) => (
                            <UnitCard
                                key={`unit-${unit.id}`}
                                unit={unit}
                                locale={locale}
                                host={host || ''}
                                tGlobal={tGlobal}
                                tUnitCard={tUnitCard}
                            />
                        ))}
                    </div>
                </section>
            ) : null}
        </div>
    );
};

export default DeveloperUnitsV2;
