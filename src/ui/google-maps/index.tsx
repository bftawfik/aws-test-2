'use client';
import React from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { GoogleMapExtendedProps } from './google-maps';
const MapWrapper = (props: GoogleMapExtendedProps) => {
    const { isLoaded } = useJsApiLoader({
        id: process.env.NEXT_PUBLIC_GOOGLE_MAP_ID ?? '',
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY ?? '',
    });

    return (
        <div className={props.containerClassName}>
            {isLoaded && <GoogleMap {...props}>{props.children}</GoogleMap>}
        </div>
    );
};

export default React.memo(MapWrapper);
