'use client';
import DiscoverMap from '@/ui/discover/discover-map';

const MAP_POSTFIX = 'map_';

interface MapPageProps {
    searchParams: { [key: string]: string };
}
export default function MapPage({ searchParams }: MapPageProps) {
    const { bnd, zoom, center, drawer_id } = searchParams || {};
    const isMapDrawer = drawer_id?.indexOf(MAP_POSTFIX) !== -1;
    const [_, drawerItemId] = drawer_id ? drawer_id.split('_') : [];
    const drawerItemIdNo = Number(drawerItemId);
    return (
        <DiscoverMap
            bounds={bnd as string}
            urlZoom={zoom as string}
            urlCenter={center as string}
            drawerId={
                isMapDrawer && !isNaN(drawerItemIdNo)
                    ? drawerItemIdNo
                    : undefined
            }
        />
    );
}
