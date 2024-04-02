import { Unit } from '@/types';
import getFilteredUnitsOld from '@/actions/units/getFilteredUnitsOld';
import MainClientSwiperWrapper from './MainClientSwiperWrapper/MainClientSwiperWrapper';
import { UnitCard } from '../unit-card-v2';
import SwiperArrow from '@/ui/swiper-arrow';
import { headers } from 'next/headers';
import { getTranslations } from 'next-intl/server';
import CustomShowAllLink from '@/ui/custom-show-all-link';
import { DISCOVER_RESALE_UNITS_LINK } from '@/constants';
// import { getServerSession } from 'next-auth';

export default async function UnitsSlider({ locale }: { locale: string }) {
    const tGlobal = await getTranslations('global');
    const tUnitCard = await getTranslations('unit_card');

    // slider arrows classes
    const next = 'resale-unit-image-swiper-button-next';
    const prev = 'resale-unit-image-swiper-button-prev';

    // TODO: hide server session until solve forge problem
    // const session = await getServerSession();

    const headersList = headers();
    const host = headersList.get('host');
    const GET_SOLD_OUT = false;

    const data = await getFilteredUnitsOld(
        // session?.auth?.meta?.token,
        undefined,
        ['sale_type', 'resale'],
        locale,
        undefined,
        undefined,
        GET_SOLD_OUT
    );

    return (
        <>
            {data?.data?.length ? (
                <>
                    <section className="py-8">
                        <div className="flex items-center justify-between">
                            <p className="text-lg font-semibold capitalize leading-none text-black lg:text-xl">
                                {tGlobal('resale_units')}
                            </p>
                            <CustomShowAllLink
                                hrefUrl={DISCOVER_RESALE_UNITS_LINK}
                            />
                        </div>
                    </section>
                    <div className="relative">
                        <SwiperArrow prev={prev} next={next} />

                        <MainClientSwiperWrapper prev={prev} next={next}>
                            {data?.data?.map((unit: Unit) => (
                                <UnitCard
                                    host={host || ''}
                                    locale={locale}
                                    shouldPreventRouting={false}
                                    unit={unit}
                                    key={unit.id}
                                    tGlobal={tGlobal}
                                    tUnitCard={tUnitCard}
                                />
                            ))}
                        </MainClientSwiperWrapper>
                    </div>
                </>
            ) : null}
        </>
    );
}
