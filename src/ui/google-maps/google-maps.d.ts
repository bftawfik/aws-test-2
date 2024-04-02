import { PolygonProps, GoogleMapProps } from '@react-google-maps/api';

interface GoogleMapExtendedProps extends GoogleMapProps {
    containerClassName?: string | undefined;
}
