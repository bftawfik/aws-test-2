import { useSession } from 'next-auth/react';
import React, { useEffect, useRef, useState } from 'react';
import StatePagination from '@/ui/StatePagination/StatePagination';
import CustomShowAllLink from '@/ui/custom-show-all-link';
import { useGetProjectDrawerUnitsQuery } from '@/actions/units/useGetFilteredUnitsQuery';
import { Unit } from '@/types';
import { useLocale, useTranslations } from 'next-intl';
import { UnitsSkeleton } from '@/ui/loaders/units-card-skeleton';
import { LIST_DEFAULT_PAGE_SIZE, UNITS_LINK } from '@/constants';
import { UnitCard } from '@/ui/units/unit-card-v2';
import { getOrigin } from '@/helpers/getOrigin';

interface FilteredUnitsSectionProps {
    type: string;
    projectId: number;
    title: string;
    isDrawerContent?: boolean;
}

const FilteredUnitsSection = ({
    type,
    projectId,
    title,
    isDrawerContent = false,
}: FilteredUnitsSectionProps) => {
    const locale = useLocale();
    const { data: session } = useSession();
    const [currentPage, setCurrentPage] = useState(1);
    const tGlobal = useTranslations('global');
    const tUnitCard = useTranslations('unit_card');

    const host = getOrigin();

    const unitsRef = useRef<HTMLDivElement>(null);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    // fetch resale units query
    const { data, isFetching } = useGetProjectDrawerUnitsQuery(
        projectId,
        type,
        locale,
        session?.auth?.meta?.token,
        currentPage,
        LIST_DEFAULT_PAGE_SIZE
    );

    useEffect(() => {
        unitsRef?.current?.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentPage]);

    return isFetching ? (
        <div className="grid min-h-screen grid-cols-1 gap-4 md:grid-cols-2">
            {Array.from(Array(LIST_DEFAULT_PAGE_SIZE), (e, i) => {
                return <UnitsSkeleton key={i} />;
            })}
        </div>
    ) : data?.data?.length ? (
        <div ref={unitsRef} className="mt-8 w-full lg:mt-16">
            <div className="mb-3 flex items-center justify-between lg:mb-5">
                <h2 className=" text-xl font-semibold  capitalize leading-none text-black  lg:text-2xl">
                    {title}
                </h2>
                <CustomShowAllLink hrefUrl={UNITS_LINK} />
            </div>
            <>
                <div
                    className={`grid w-full grid-cols-1 gap-3 gap-x-4 file:grid md:grid-cols-2 ${
                        isDrawerContent
                            ? 'lg:grid-cols-1 xl:grid-cols-2'
                            : 'lg:grid-cols-2'
                    }`}
                >
                    {data?.data?.map((unit: Unit) => (
                        <UnitCard
                            key={unit.id}
                            unit={unit}
                            locale={locale}
                            host={host}
                            tGlobal={tGlobal}
                            tUnitCard={tUnitCard}
                            isDrawerContent={isDrawerContent}
                        />
                    ))}
                </div>
                <div className="w-full">
                    <StatePagination
                        currentPage={currentPage}
                        pages={data?.meta?.last_page || 1}
                        pageSize={LIST_DEFAULT_PAGE_SIZE}
                        onPageChange={handlePageChange}
                    />
                </div>
            </>
        </div>
    ) : null;
};

export default FilteredUnitsSection;
