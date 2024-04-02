import getFilteredUnits from '@/actions/getFilteredUnits';
import { formatBoundsToBackend } from '@/helpers';
import { useSearchBody } from '@/hooks/useSearchBody/useSearchBody';
import { useMapStore, usePageStore } from '@/store/global';
import { Unit } from '@/types';
import {
    MarkerClusterer,
    OverlayView,
    OverlayViewF,
} from '@react-google-maps/api';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import UnitContent from '../drawers-content/UnitContent';
import { MultiArrowsIcon } from '@/ui/svg/MultiArrowsIcon';
import { useTranslations, useLocale } from 'next-intl';
import { getUrlLocaleSegment } from '@/helpers/getUrlLocaleSegment';
import {
    UNITS_MAP_DEFAULT_PAGE_SIZE,
    LIST_DEFAULT_PAGE_SIZE,
} from '@/constants/store';
import PriceMarker from '@/ui/PriceMarker/PriceMarker';
import { useRouter } from 'next/navigation';
import { addDrawerIdToUrl } from '@/helpers/drawersUrlUtils';
import { MAP_VIEW } from '@/constants';
import DrawerSSR from '@/ui/DrawerSSR/DrawerSSR';
import { useGenerateUrl } from '@/hooks/useGenerateUrl/useGenerateUrl';

interface DiscoverMapUnitsProps {
    drawerId?: number;
    bounds?: string;
}

const DiscoverMapUnits = ({ drawerId, bounds }: DiscoverMapUnitsProps) => {
    const router = useRouter();
    const locale = useLocale();

    // Read translations
    const tGlobal = useTranslations('global');
    const urlLocaleSegment = getUrlLocaleSegment(locale);

    const { currentPage } = usePageStore();
    const { data: session } = useSession();
    // bounds
    const { zoomLevel } = useMapStore();
    const boundsAsNumbers =
        bounds?.split('-').map((value) => Number(value)) || [];
    const formattedBounds = formatBoundsToBackend(boundsAsNumbers);

    const { filters, queryString } = useSearchBody();
    const REMOVE_SOLD_OUT = true;

    const mapCurrentPage = Math.ceil(
        (currentPage * LIST_DEFAULT_PAGE_SIZE) / UNITS_MAP_DEFAULT_PAGE_SIZE
    );
    let { data: unitsData } = useQuery(
        [
            'get-discover-map-units',
            currentPage,
            bounds,
            locale,
            filters,
            queryString,
            zoomLevel,
        ], // queryKey
        () =>
            getFilteredUnits(
                filters,
                mapCurrentPage,
                UNITS_MAP_DEFAULT_PAGE_SIZE,
                session?.auth?.meta?.token,
                locale,
                formattedBounds,
                queryString,
                undefined,
                REMOVE_SOLD_OUT
            ) // queryFn
    );
    unitsData = unitsData?.data;

    const currentUrlFromUrl = useGenerateUrl();

    const handleUnitClick = (unit: Unit) => {
        const addDrawerIdToCurrentUrl = addDrawerIdToUrl(
            currentUrlFromUrl,
            MAP_VIEW,
            unit?.id
        );
        router.push(addDrawerIdToCurrentUrl);
    };

    return (
        <>
            <MarkerClusterer>
                {(clusterer) => (
                    <div>
                        {(unitsData as Unit[])?.map((unit, index: number) => (
                            <>
                                <OverlayViewF
                                    key={unit.id}
                                    position={{
                                        lat: +unit.lat,
                                        lng: +unit.lng,
                                    }}
                                    mapPaneName={
                                        OverlayView.OVERLAY_MOUSE_TARGET
                                    }
                                >
                                    <div
                                        style={{
                                            transform: 'translate(-50%,-127%)',
                                        }}
                                        onClick={() => handleUnitClick(unit)}
                                    >
                                        <PriceMarker price={unit?.price} />
                                    </div>
                                </OverlayViewF>

                                {drawerId && drawerId === unit.id && (
                                    <DrawerSSR
                                        isOpen={
                                            drawerId === unit.id ? true : false
                                        }
                                        currentUrl={currentUrlFromUrl}
                                        headerElemnt={
                                            <Link
                                                prefetch={false}
                                                href={`${urlLocaleSegment}/units/${unit?.slug}`}
                                                target="_blank"
                                                className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#B3B3B3] px-3 py-2 text-xs capitalize text-[#5F5F5F] transition-colors duration-150 hover:bg-gray-200"
                                            >
                                                <MultiArrowsIcon className="h-4 w-4 text-custom-grey" />
                                                {tGlobal('view_details')}
                                            </Link>
                                        }
                                    >
                                        <UnitContent unit={unit} />
                                    </DrawerSSR>
                                )}
                            </>
                        ))}
                    </div>
                )}
            </MarkerClusterer>
        </>
    );
};

export default DiscoverMapUnits;
