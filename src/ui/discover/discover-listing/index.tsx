import React from 'react';
import LocationsSection from '@/ui/discover/locations-section';
import ProjectsSection from '@/ui/discover/projects-section';
import UnitsSection from '@/ui/discover/units-section';
import DiscoverTab from '@/ui/discover-tab';
import SortDropdownClientWrapper from '@/ui/SortDropdownClient/SortDropdownClient';
import { GRID_VIEW, LIST_VIEW } from '@/constants';
import Footer from '@/ui/footer';

interface DiscoverListingProps {
    filters: (string | string[])[];
    queryString: string;
    locale: string;
    tab: string;
    currentPage: number;
    host: string;
    bounds?: string;
    sortBy: string;
    drawerId?: number;
    url?: string;
    cookieDiscoverView?: string;
}
const DiscoverListing = async ({
    filters,
    queryString,
    locale,
    tab,
    currentPage,
    host,
    bounds,
    sortBy,
    drawerId,
    url,
    cookieDiscoverView = LIST_VIEW,
}: DiscoverListingProps) => {
    const isProjects = tab === 'projects';
    const isNeighborhoods = tab === 'neighborhoods';

    return (
        <div className="relative w-full">
            <div className="sticky top-0 z-30 mb-4">
                <DiscoverTab tab={tab} />
            </div>
            {!isProjects && !isNeighborhoods && (
                <SortDropdownClientWrapper locale={locale} />
            )}
            {isNeighborhoods ? (
                <LocationsSection
                    filters={filters}
                    queryString={queryString}
                    locale={locale}
                    currentPage={currentPage}
                    bounds={bounds}
                    drawerId={drawerId}
                    currentUrl={url}
                    cookieDiscoverView={cookieDiscoverView}
                />
            ) : isProjects ? (
                <ProjectsSection
                    filters={filters}
                    queryString={queryString}
                    locale={locale}
                    currentPage={currentPage}
                    bounds={bounds}
                    drawerId={drawerId}
                    currentUrl={url}
                    cookieDiscoverView={cookieDiscoverView}
                />
            ) : (
                <UnitsSection
                    filters={filters}
                    queryString={queryString}
                    locale={locale}
                    currentPage={currentPage}
                    host={host}
                    sortBy={sortBy}
                    bounds={bounds}
                    drawerId={drawerId}
                    currentUrl={url}
                    cookieDiscoverView={cookieDiscoverView}
                />
            )}
            {cookieDiscoverView === GRID_VIEW ? <Footer isGrid={true} /> : null}
        </div>
    );
};

export default DiscoverListing;
