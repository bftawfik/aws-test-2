import React from 'react';
import getFilteredNeighborhoods from '@/actions/getFilteredNeighborhoods';
import NeighborhoodCard from '@/ui/neighbothoods/Card';
import { formatBoundsToBackend } from '@/helpers';
import NoResults from '@/ui/empty-states/no-search-results';
import { getTranslator } from 'next-intl/server';
import { Location } from '@/types';
import ContentsWrapper from '../discover-listing/ContentsWrapper/ContentsWrapper';

const pageSize = 16;

interface LocationsSectionProps {
    filters: (string | string[])[];
    queryString: string;
    locale: string;
    currentPage: number;
    bounds?: string;
    drawerId?: number;
    currentUrl?: string;
    cookieDiscoverView: string;
}

const LocationsSection = async ({
    filters,
    queryString,
    locale,
    currentPage,
    bounds,
    drawerId,
    currentUrl,
    cookieDiscoverView,
}: LocationsSectionProps) => {
    // Read translations
    const tGlobal = await getTranslator(locale, 'global');
    const tEmptyState = await getTranslator(locale, 'empty_state');

    const boundsAsNumbers =
        bounds?.split('-').map((value) => Number(value)) || [];
    const formattedBounds = formatBoundsToBackend(boundsAsNumbers);
    const neighborhoodsData = await getFilteredNeighborhoods(
        filters,
        currentPage,
        pageSize,
        locale,
        formattedBounds,
        queryString
    );
    const { data: locations, meta } = neighborhoodsData || {};

    return (
        <ContentsWrapper cookieDiscoverView={cookieDiscoverView}>
            {locations?.length ? (
                (locations as Location[])?.map((location, idx: number) => (
                    <NeighborhoodCard
                        key={`location-${idx + 1}`}
                        className="h-64"
                        location={location}
                        shouldPreventRouting
                        locale={locale}
                        isDrawerOpen={location.id === drawerId ? true : false}
                        currentUrl={currentUrl}
                        tGlobal={tGlobal}
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
    );
};

export default LocationsSection;
