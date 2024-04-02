interface Coordinate {
    lat: number;
    lng: number;
}

export const getMapCenter = (
    polygonCoords: Coordinate[]
): Coordinate | google.maps.LatLng => {
    if (!polygonCoords || polygonCoords.length === 0) {
        return { lat: 0, lng: 0 };
    }

    let minLat = polygonCoords[0].lat;
    let maxLat = polygonCoords[0].lat;
    let minLng = polygonCoords[0].lng;
    let maxLng = polygonCoords[0].lng;

    for (let i = 1; i < polygonCoords.length; i++) {
        const { lat, lng } = polygonCoords[i];
        minLat = Math.min(minLat, lat);
        maxLat = Math.max(maxLat, lat);
        minLng = Math.min(minLng, lng);
        maxLng = Math.max(maxLng, lng);
    }

    const centerLat = (maxLat + minLat) / 2;
    const centerLng = (maxLng + minLng) / 2;

    return { lat: centerLat, lng: centerLng };
};
