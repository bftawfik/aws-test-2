import { Amenity, UnitFeatures } from '@/types';

export interface MobileSearchProps {
    className: string;
    amenitiesList: Amenity[];
    unitFeaturesList: UnitFeatures[];
    residential: any[];
    commercial: any[];
    url?: string;
}
