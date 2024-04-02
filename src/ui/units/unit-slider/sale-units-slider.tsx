// import required modules
import { Unit } from '@/types';
import SwiperArrow from '../../swiper-arrow';
import getFilteredUnitsOld from '@/actions/units/getFilteredUnitsOld';
import MainClientSwiperWrapper from './MainClientSwiperWrapper/MainClientSwiperWrapper';
import { UnitCard } from '../unit-card-v2';
import { headers } from 'next/headers';
import { getTranslations } from 'next-intl/server';
// import { getServerSession } from 'next-auth';

export default async function UnitsSlider({ locale }: { locale: string }) {
    const tGlobal = await getTranslations('global');
    const tUnitCard = await getTranslations('unit_card');
    // slider arrows classes
    const next = 'sale-unit-image-swiper-button-next';
    const prev = 'sale-unit-image-swiper-button-prev';

    // TODO: hide server session until solve forge problem
    // const session = await getServerSession();

    const headersList = headers();
    const host = headersList.get('host');
    const GET_SOLD_OUT = false;

    let data = await getFilteredUnitsOld(
        // session?.auth?.meta?.token,
        undefined,
        ['sale_type', 'sale'],
        locale,
        undefined,
        undefined,
        GET_SOLD_OUT
    );

    return (
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
    );
}
