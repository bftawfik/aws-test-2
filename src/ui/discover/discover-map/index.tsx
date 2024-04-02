'use client';

import { classNames, formatMapBounds } from '@/helpers';
import MapWrapper from '@/ui/google-maps/index';
import mapStyle from '@/ui/google-maps/map-style';
import { useCallback, useEffect, useMemo, useState } from 'react';
import DiscoverMapUnits from '../discover-map-views/units';
import DiscoverMapProjects from '../discover-map-views/projects';
import DiscoverMapNeighborhoods from '../discover-map-views/neighborhoods';
import { useMapStore } from '@/store/global';
import React from 'react';
import MapZoomControl from '../map-zoom-control';
import { useSearchStore } from '@/store/search';
import {
    NEIGHBORHOODS_ZOOM_LEVEL,
    PROJECTS_ZOOM_LEVEL,
    UNITS_ZOOM_LEVEL,
    BOUNDS_SHORT,
    ZOOM_SHORT,
    CENTER_SHORT,
} from '@/constants';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { addKeyToSearchParams } from '@/helpers/addKeyToSearchParams';

const compareOriginalValues = (
    newCenter: { lat: number; lng: number },
    zoomLevel?: number
) =>
    newCenter.lat === 30.0074 &&
    newCenter.lng === 31.4913 &&
    (zoomLevel === NEIGHBORHOODS_ZOOM_LEVEL ||
        zoomLevel === PROJECTS_ZOOM_LEVEL ||
        zoomLevel === UNITS_ZOOM_LEVEL);

const addBndsToParams = (
    key: string,
    bndsArr: number[],
    searchParams: URLSearchParams
) => {
    return addKeyToSearchParams(key, bndsArr.join('-'), searchParams);
};
const addZoomToParams = (
    key: string,
    zoomLevel: number | undefined,
    searchParams: URLSearchParams
) => {
    return addKeyToSearchParams(key, String(zoomLevel), searchParams);
};
const addCenterToParams = (
    key: string,
    center: CenterType,
    searchParams: URLSearchParams
) => {
    return addKeyToSearchParams(
        key,

        `${center.lat}-${center.lng}`,
        searchParams
    );
};

interface DiscovermapProps {
    drawerId?: number;
    bounds?: string;
    urlZoom?: string;
    urlCenter?: string;
}
interface CenterType {
    lat: number;
    lng: number;
}
const Discovermap = ({
    bounds,
    urlZoom,
    urlCenter,
    drawerId,
}: DiscovermapProps) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const newSearchParams = useMemo(
        () => new URLSearchParams(searchParams as unknown as URLSearchParams),
        [searchParams]
    );

    const { zoomLevel, setZoomLevel, setBounds, center, setCenter } =
        useMapStore();
    // get current view
    const { tab } = useSearchStore();
    const isProjects = tab === 'projects';
    const isNeighborhoods = tab === 'neighborhoods';

    // get map ref
    const [mapRef, setMapRef] = useState<google.maps.Map | null>(null);
    const onLoad = useCallback((map: any) => setMapRef(map), []);

    const onBoundsChanged = useCallback(() => {
        if (!mapRef) return;
        const mapCenter = mapRef.getCenter();
        const zoomLevel = mapRef.getZoom();
        const mapBounds = mapRef.getBounds();
        const formatedBounds = formatMapBounds(mapBounds);
        setBounds(formatedBounds);
        if (mapCenter) {
            const newCenter = { lat: mapCenter.lat(), lng: mapCenter.lng() };
            const isOriginalValues = compareOriginalValues(
                newCenter,
                zoomLevel
            );
            if (isOriginalValues) return;
            setCenter(newCenter);
            addCenterToParams(CENTER_SHORT, newCenter, newSearchParams);
        }
        addBndsToParams(BOUNDS_SHORT, formatedBounds, newSearchParams);
        addZoomToParams(ZOOM_SHORT, zoomLevel, newSearchParams);

        router.push(`${pathname}?${newSearchParams}`);
    }, [mapRef, setBounds, newSearchParams, router, pathname, setCenter]); // Added setCenter to the dependency array

    const onZoomChange = useCallback(() => {
        if (!mapRef) return;
        const mapBounds = mapRef.getBounds();
        const mapCenter = mapRef.getCenter();
        const zoomLevel = mapRef.getZoom();
        if (mapCenter) {
            const newCenter = { lat: mapCenter.lat(), lng: mapCenter.lng() };
            const isOriginalValues = compareOriginalValues(
                newCenter,
                zoomLevel
            );
            if (isOriginalValues) return;
        }
        const formatedBounds = formatMapBounds(mapBounds);
        setBounds(formatedBounds);
        // map center
        if (mapCenter) {
            const newCenter = { lat: mapCenter.lat(), lng: mapCenter.lng() };
            setCenter(newCenter);
            addCenterToParams(CENTER_SHORT, newCenter, newSearchParams);
        }
        // zoom level
        setZoomLevel(zoomLevel);

        // add to search params
        addBndsToParams(BOUNDS_SHORT, formatedBounds, newSearchParams);
        addZoomToParams(ZOOM_SHORT, zoomLevel, newSearchParams);

        router.push(`${pathname}?${newSearchParams}`);
    }, [
        mapRef,
        setBounds,
        setZoomLevel,
        newSearchParams,
        router,
        pathname,
        setCenter,
    ]);

    // center update
    const urlCenterAsNumbers =
        urlCenter?.split('-').map((value) => Number(value)) || null;

    const { lat: storeCenterLat, lng: storeCenterLng } = center;
    const [urlCenterLat, urlCenterLng] = urlCenterAsNumbers || [];

    useEffect(() => {
        if (zoomLevel !== Number(urlZoom) && urlZoom)
            setZoomLevel(Number(urlZoom));

        // center
        if (
            urlCenterLat &&
            urlCenterLng &&
            (urlCenterLat !== storeCenterLat || urlCenterLng !== storeCenterLng)
        ) {
            setCenter({
                lat: urlCenterLat,
                lng: urlCenterLng,
            });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div
            className={classNames(
                'relative transition-all duration-200 ease-in-out',
                'flex-1',
                'list'
            )}
        >
            <MapZoomControl className="absolute top-12 z-30 ltr:right-2 rtl:left-2" />

            <MapWrapper
                zoom={zoomLevel}
                mapContainerStyle={{
                    width: '100%',
                    height: '100vh',
                }}
                onLoad={onLoad}
                onDragEnd={onBoundsChanged}
                onZoomChanged={onZoomChange}
                center={center}
                options={{
                    streetViewControl: false,
                    mapTypeControl: false,
                    styles: mapStyle.styles,
                }}
            >
                {isNeighborhoods ? (
                    <DiscoverMapNeighborhoods
                        drawerId={drawerId}
                        bounds={bounds}
                    />
                ) : isProjects ? (
                    <DiscoverMapProjects drawerId={drawerId} bounds={bounds} />
                ) : (
                    <DiscoverMapUnits drawerId={drawerId} bounds={bounds} />
                )}
            </MapWrapper>
        </div>
    );
};

export default React.memo(Discovermap);
