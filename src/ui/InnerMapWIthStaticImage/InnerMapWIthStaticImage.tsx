'use client';
import React, { useState } from 'react';
import { Marker, Polygon } from '@react-google-maps/api';
import { getMapCenter } from '@/helpers/get-map-center';
import MapWrapper from '@/ui/google-maps';
import mapStyle from '@/ui/google-maps/map-style';
import ReactModal from '@/ui/ReactModal/ReactModal';
import Image from 'next/image';
import { Coord } from '@/types';
import { useTranslations } from 'next-intl';

interface InnerMapWIthStaticImageProps {
    coords?: Coord[];
    marker?: Coord;
    staticImage: string;
    zoom?: number;
}
export const InnerMapWIthStaticImage = ({
    coords,
    marker,
    staticImage,
    zoom = 14,
}: InnerMapWIthStaticImageProps) => {
    // Read translations
    const tGlobal = useTranslations('global');

    const [isOpen, setIsOpen] = useState(false);
    interface Coordinate {
        lat: number;
        lng: number;
    }
    let center: Coordinate | google.maps.LatLng = {
        lat: 30.0444,
        lng: 31.2358,
    };
    if (marker) {
        center = marker;
    } else if (coords) {
        center = getMapCenter(coords);
    }

    const openMapModal = () => {
        setIsOpen(true);
    };

    return (
        <div className="relative h-[440px] w-full">
            <div onClick={openMapModal} className="cursor-pointer">
                {staticImage ? (
                    <Image
                        fill
                        alt="unit location"
                        className="object-cover"
                        src={staticImage}
                    />
                ) : (
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
                                position={marker}
                                icon={{
                                    url: '/images/marker.svg',
                                    scaledSize: window.google
                                        ? new window.google.maps.Size(25, 30)
                                        : undefined,
                                    anchor: window.google
                                        ? new window.google.maps.Point(40, 40)
                                        : undefined,
                                }}
                                title="Custom Marker"
                            ></Marker>
                        )}
                    </MapWrapper>
                )}
            </div>
            <ReactModal
                isOpen={isOpen}
                closeModalHandler={() => setIsOpen(false)}
                header={tGlobal('location_on_map')}
                classes={'max-w-2xl'}
                aditionalOverlayClasses="!z-[101]"
            >
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
            </ReactModal>
        </div>
    );
};
