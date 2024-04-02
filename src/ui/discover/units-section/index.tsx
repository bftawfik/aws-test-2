import getFilteredUnits from '@/actions/getFilteredUnits';
import { Unit } from '@/types';
import { UnitCard } from '@/ui/units/unit-card-v2';
import React from 'react';
// import { useSession } from 'next-auth/react';
import { formatBoundsToBackend } from '@/helpers';
import NoResults from '@/ui/empty-states/no-search-results';
import { getTranslations } from 'next-intl/server';
import ContentsWrapper from '../discover-listing/ContentsWrapper/ContentsWrapper';
import SimplePagination from '@/ui/simplePagination';
import { headers } from 'next/headers';
import { LIST_DEFAULT_PAGE_SIZE } from '@/constants';

interface UnitsSectionProps {
    filters: (string | string[])[];
    queryString: string;
    locale: string;
    currentPage: number;
    host: string;
    bounds?: string;
    sortBy: string;
    drawerId?: number;
    currentUrl?: string;
    cookieDiscoverView: string;
}

const UnitsSection = async ({
    filters,
    queryString,
    locale,
    currentPage,
    host,
    bounds,
    sortBy,
    drawerId,
    currentUrl,
    cookieDiscoverView,
}: UnitsSectionProps) => {
    // Read translations
    const tEmptyState = await getTranslations('empty_state');
    const tGlobal = await getTranslations('global');
    const tUnitCard = await getTranslations('unit_card');

    const headersList = headers();
    const pathName = headersList.get('x-invoke-path') || '';
    const boundsAsNumbers =
        bounds?.split('-').map((value) => Number(value)) || [];
    const formattedBounds = formatBoundsToBackend(boundsAsNumbers);
    const REMOVE_SOLD_OUT = true;
    const unitsData = await getFilteredUnits(
        filters,
        currentPage,
        LIST_DEFAULT_PAGE_SIZE,
        undefined,
        locale,
        formattedBounds,
        queryString,
        sortBy,
        REMOVE_SOLD_OUT
    );
    const { data: units, meta } = unitsData || {};
    const totalPages =
        Math.ceil(meta?.totalHits / meta?.hitsPerPage) || meta?.totalPages;

    return (
        <>
            <ContentsWrapper cookieDiscoverView={cookieDiscoverView}>
                {units?.length ? (
                    (units as Unit[])?.map((unit, idx: number) => (
                        <UnitCard
                            unit={unit}
                            locale={locale}
                            host={host}
                            key={`item-${idx}`}
                            shouldPreventRouting
                            isDrawerOpen={unit.id === drawerId ? true : false}
                            currentUrl={currentUrl}
                            tGlobal={tGlobal}
                            tUnitCard={tUnitCard}
                        />
                    ))
                ) : (
                    <div className="col-span-2 space-y-6 py-5">
                        <NoResults />
                        <div className="mx-2 flex w-full flex-col items-center gap-3">
                            <h1 className="font-bold sm:text-lg  md:text-2xl md:font-extrabold">
                                {tEmptyState('no_results')}
                            </h1>
                            <p className="text-sm text-[#5F5F5F] sm:text-xs  md:text-sm">
                                {tEmptyState('try')}
                                <button className="pointer-cursor text-emerald-500">
                                    {tEmptyState('new_search')}
                                </button>
                                {tEmptyState('check')}
                            </p>
                        </div>
                    </div>
                )}
            </ContentsWrapper>
            {units?.length ? (
                <div className="w-full">
                    <SimplePagination
                        isDiscover={true}
                        pathName={pathName}
                        currentPage={currentPage}
                        totalPages={totalPages}
                        locale={locale}
                    />
                </div>
            ) : null}
        </>
    );
};
export default UnitsSection;
