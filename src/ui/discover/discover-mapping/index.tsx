import React from 'react';

import MapWrapper from '@/ui/google-maps/index';
import mapStyle from '@/ui/google-maps/map-style';
interface DiscoverMapping {}
const DiscoverMapping = () => {
    return (
        <MapWrapper
            zoom={12}
            mapContainerStyle={{
                width: '100%',
                height: '100%',
            }}
            center={{ lat: 30.0074, lng: 31.4913 }}
            options={{
                streetViewControl: false,
                mapTypeControl: false,
                styles: mapStyle.styles,
            }}
        ></MapWrapper>
    );
};

export default DiscoverMapping;
