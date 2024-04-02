'use client';
import React from 'react';
import { Marker, Polygon } from '@react-google-maps/api';
import { getMapCenter } from '@/helpers/get-map-center';
import MapWrapper from '../../google-maps/index';
import mapStyle from '@/ui/google-maps/map-style';
import { usePathname } from 'next/navigation';
import { Coord } from '@/types';
// import CustomIcon from '../../../../public/images/marker.ico';
interface InnerMapProps {
    coords: Coord[];
    marker?: Coord;
    zoom?: number;
}
const InnerMap = ({ coords, marker, zoom = 14 }: InnerMapProps) => {
    const pathname = usePathname();

    const center = marker
        ? marker
        : getMapCenter(coords) || { lat: 30.0444, lng: 31.2358 };
    return (
        <MapWrapper
            zoom={zoom}
            mapContainerStyle={{ width: '100%', height: '440px' }}
            center={center}
            options={{
                streetViewControl: false,
                mapTypeControl: false,
                styles: mapStyle.styles,
            }}
        >
            {coords && (
                <Polygon
                    options={{
                        fillColor: '#4CB087',
                        strokeColor: '#4CB087',
                    }}
                    paths={coords}
                />
            )}
            {marker && (
                <Marker
                    // icon="../../../../public/images/marker.ico"
                    position={marker}
                />
            )}
        </MapWrapper>
    );
};

export default InnerMap;
