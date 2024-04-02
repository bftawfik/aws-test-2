import Link from 'next/link';
import { Polygon } from '@react-google-maps/api';
import { useQuery } from '@tanstack/react-query';
import { MultiArrowsIcon } from '@/ui/svg/MultiArrowsIcon';
import { LocationContent } from '../drawers-content/LocationContent';
import { formatBoundsToBackend } from '@/helpers';
import getFilteredNeighborhoods from '@/actions/getFilteredNeighborhoods';
import { useSearchBody } from '@/hooks/useSearchBody/useSearchBody';
import { useMapStore, usePageStore } from '@/store/global';
// Any import from interfaces or types
import { Location } from '@/types';
import { useTranslations, useLocale } from 'next-intl';
import { getUrlLocaleSegment } from '@/helpers/getUrlLocaleSegment';
import {
    LIST_DEFAULT_PAGE_SIZE,
    PROJECTS_MAP_DEFAULT_PAGE_SIZE,
} from '@/constants/store';
import { useRouter } from 'next/navigation';
import { MAP_VIEW } from '@/constants';
import { addDrawerIdToUrl } from '@/helpers/drawersUrlUtils';
import DrawerSSR from '@/ui/DrawerSSR/DrawerSSR';
import { useGenerateUrl } from '@/hooks/useGenerateUrl/useGenerateUrl';

interface DiscoverMapNeighborhoodsProps {
    drawerId?: number;
    bounds?: string;
}
const DiscoverMapNeighborhoods = ({
    drawerId,
    bounds,
}: DiscoverMapNeighborhoodsProps) => {
    const router = useRouter();
    const locale = useLocale();
    const tGlobal = useTranslations('global');
    const urlLocaleSegment = getUrlLocaleSegment(locale);
    const { currentPage } = usePageStore();
    const { filters, queryString } = useSearchBody();
    const { zoomLevel } = useMapStore();
    const boundsAsNumbers =
        bounds?.split('-').map((value) => Number(value)) || [];
    const formattedBounds = formatBoundsToBackend(boundsAsNumbers);
    const mapCurrentPage = Math.ceil(
        (currentPage * LIST_DEFAULT_PAGE_SIZE) / PROJECTS_MAP_DEFAULT_PAGE_SIZE
    );
    let { data: neighborhoodsData } = useQuery(
        ['get-discover-map-neighborhoods', currentPage, bounds, zoomLevel], // queryKey
        () =>
            getFilteredNeighborhoods(
                filters,
                mapCurrentPage,
                PROJECTS_MAP_DEFAULT_PAGE_SIZE,
                locale,
                formattedBounds,
                queryString
            ) // queryFn
    );
    neighborhoodsData = neighborhoodsData?.data;

    const currentUrlFromUrl = useGenerateUrl();

    const handleLocationClick = (neighborhood: Location) => {
        const addDrawerIdToCurrentUrl = addDrawerIdToUrl(
            currentUrlFromUrl,
            MAP_VIEW,
            neighborhood?.id
        );
        router.push(addDrawerIdToCurrentUrl);
    };

    return (
        <>
            {(neighborhoodsData as Location[])?.map(
                (neighborhood, index: number) => (
                    <div key={index}>
                        <Polygon
                            key={neighborhood.id}
                            options={{
                                fillColor: '#4CB087',
                                strokeColor: '#4CB087',
                            }}
                            paths={neighborhood.coords}
                            onClick={() => handleLocationClick(neighborhood)}
                        />
                        {drawerId && drawerId === neighborhood.id && (
                            <DrawerSSR
                                isOpen={
                                    drawerId === neighborhood.id ? true : false
                                }
                                currentUrl={currentUrlFromUrl}
                                headerElemnt={
                                    <Link
                                        prefetch={false}
                                        href={`${urlLocaleSegment}/neighborhoods/${neighborhood?.slug}`}
                                        target="_blank"
                                        className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#B3B3B3] px-3 py-2 text-xs capitalize text-[#5F5F5F] transition-colors duration-150 hover:bg-gray-200"
                                    >
                                        <MultiArrowsIcon className="h-4 w-4 text-custom-grey" />
                                        {tGlobal('view_details')}
                                    </Link>
                                }
                            >
                                <LocationContent neighborhood={neighborhood} />
                            </DrawerSSR>
                        )}
                    </div>
                )
            )}
        </>
    );
};

export default DiscoverMapNeighborhoods;
