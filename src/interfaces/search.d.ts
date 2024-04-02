import { Amenity, UnitFeatures } from '@/types';
import {
    AmenityItem,
    AreaType,
    DeveloperItem,
    LocationItem,
    ProjectItem,
    UnitFeatureItem,
    UnitTypeItem,
} from '@/interfaces/store/SearchStore';
import { Pricing } from '@/ui/search/home-search/search-price/search-price';

export interface FilterModalProps {
    amenitiesList: Amenity[];
    unitFeaturesList: UnitFeatures[];
    residential?: any[] | undefined;
    commercial?: any[] | undefined;
    handleFilterData?: (name: string, value: State) => void;
}

export interface ParsedObjectFromUrl {
    tempTab?: string;
    txt?: string[];
    rtm?: boolean | null;
    satp?: string[];
    type?: string;
    tp?: UnitTypeItem[];
    sqm?: AreaType | null;
    bd?: number[];
    bth?: number[];
    feat?: UnitFeatureItem[];
    amn?: AmenityItem[];
    dev?: DeveloperItem[];
    prj?: ProjectItem[];
    loc?: LocationItem[];
    pr?: Pricing;
    dp?: Pricing;
    ins?: Pricing;
    tempPage?: number;
    tab?: string;
    pg?: number;
    sort?: string;
}

export interface TempFiltersObject {
    tempTab?: string;
    tempText?: string[];
    tempReadyToMove?: boolean | null;
    tempSaleType?: string[];
    tempType?: string;
    tempUnitTypeList?: UnitTypeItem[];
    tempArea?: AreaType | null;
    tempBeds?: number[];
    tempBaths?: number[];
    tempUnitFeatures?: UnitFeatureItem[];
    tempAmenities?: AmenityItem[];
    tempDevelopers?: DeveloperItem[];
    tempProjects?: ProjectItem[];
    tempLocations?: LocationItem[];
    tempPrice?: Pricing;
    tempDownPayment?: Pricing;
    tempInstallment?: Pricing;
    tempPage?: number;
    tempBounds?: string;
    tempSort?: sort;
}

export interface SearchState {
    tab: string;
    text: string[];
    readyToMove: boolean;
    saleType: string[];
    type: string;
    unitTypeList: UnitTypeItem[];
    area: AreaType;
    beds: number[];
    baths: number[];
    unitFeatures: UnitFeatureItem[];
    amenities: AmenityItem[];
    developers: DeveloperItem[];
    projects: ProjectItem[];
    locations: LocationItem[];
    price: Pricing;
    downPayment: Pricing;
    installment: Pricing;
    bounds: string;
    sortByValue: string;
}
