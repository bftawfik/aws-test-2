const mapStyle = {
    styles: [
        {
            featureType: 'administrative',
            elementType: 'labels.text.fill',
            stylers: [
                {
                    color: '#444444',
                },
            ],
        },
        {
            featureType: 'administrative',
            elementType: 'labels.text.stroke',
            stylers: [
                {
                    visibility: 'off',
                },
            ],
        },
        {
            featureType: 'landscape',
            elementType: 'all',
            stylers: [
                {
                    color: '#f2f2f2',
                },
            ],
        },
        {
            featureType: 'poi',
            elementType: 'all',
            stylers: [
                {
                    visibility: 'off',
                },
            ],
        },
        {
            featureType: 'poi.business',
            elementType: 'geometry.fill',
            stylers: [
                {
                    visibility: 'on',
                },
            ],
        },
        {
            featureType: 'road',
            elementType: 'all',
            stylers: [
                {
                    saturation: -100,
                },
                {
                    lightness: 45,
                },
            ],
        },
        {
            featureType: 'road.highway',
            elementType: 'all',
            stylers: [
                {
                    visibility: 'simplified',
                },
            ],
        },
        {
            featureType: 'road.arterial',
            elementType: 'labels.icon',
            stylers: [
                {
                    visibility: 'off',
                },
            ],
        },
        {
            featureType: 'transit',
            elementType: 'all',
            stylers: [
                {
                    visibility: 'off',
                },
            ],
        },
        {
            featureType: 'water',
            elementType: 'all',
            stylers: [
                {
                    color: '#b4d4e1',
                },
                {
                    visibility: 'on',
                },
            ],
        },
        {
            featureType: 'poi.park',
            elementType: 'geometry.fill',
            stylers: [
                {
                    color: '#f00',
                },
            ],
        },
    ],
};
export default mapStyle;
