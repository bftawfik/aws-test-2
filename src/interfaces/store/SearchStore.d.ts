import { Pricing } from '@/ui/search/home-search/search-price/search-price';

export interface DeveloperItem {
    id: number;
    name: string;
}
export interface UnitFeatureItem {
    id: number;
    name: string;
}
export interface UnitTypeItem {
    id: number;
    name: string;
}
export interface AmenityItem {
    id: number;
    name: string;
}
export interface ProjectItem {
    id: number;
    name: string;
}
export interface LocationItem {
    id: number;
    name: string;
}
export interface AreaType {
    from: number;
    to: number;
}

export interface State {
    //tab
    tab: string;
    //search text
    text: string[];
    //ready to move;
    readyToMove: boolean;
    // sale type
    saleType: string[];
    //unit type [Resential , commercial]
    type: string;
    //unit types
    unitTypeList: UnitTypeItem[];
    //area
    area: AreaType;
    //beds
    beds: number[];
    //baths
    baths: number[];
    //features
    unitFeatures: UnitfeatureItem[];
    //amenitites
    amenities: AmenityItem[];
    //developers
    developers: DeveloperItem[];
    //projects
    projects: ProjectItem[];
    //locations
    locations: LocationItem[];
    //price
    price: Pricing;
    //downPayment
    downPayment: Pricing;
    //installment
    installment: Pricing;
    sortByValue: string;
}

export interface Action {
    // Reset all
    reset: () => void;
    // ready to move
    setReady: (newValue: boolean) => void;
    // saleType
    setSaleTypeList: (saleTypeArr: string[]) => void;
    updateSaleType: (saleType: string) => void;
    resetSaleType: () => void;
    // Properity Type
    setType: (type: State['type']) => void;
    setUnitTypeList: (unitTypeList: UnitTypeItem[]) => void;
    resetTypeList: () => void;
    // Area
    setArea: (newArea: AreaType) => void;
    resetArea: () => void;
    // Beds
    setBeds: (bedsNum: number[]) => void;
    resetBeds: () => void;
    // Baths
    setBaths: (bathsNum: number[]) => void;
    resetBaths: () => void;
    // Developers
    setAllDevelopers: (developers: DeveloperItem[]) => void;
    setDevelopers: (developers: DeveloperItem) => void;
    removeDeveloper: (developers: DeveloperItem) => void;
    // Projects
    setAllProjects: (projects: ProjectItem[]) => void;
    setProjects: (project: ProjectItem) => void;
    removeProject: (project: ProjectItem) => void;
    // Locations
    setAllLocations: (locations: LocationItem[]) => void;
    setLocations: (location: LocationItem) => void;
    removeLocation: (location: LocationItem) => void;
    // Text
    setTextList: (textList: string[]) => void;
    setText: (text: string) => void;
    removeText: (text: string) => void;
    resetText: () => void;
    // Price
    setPrice: (newValue: Pricing) => void;
    // Installment
    setInstallment: (newValue: Pricing) => void;
    // Down payment
    setDownPayment: (newValue: Pricing) => void;
    // Features
    resetPricingValues: () => void;
    setFeatures: (newFeatures: UnitFeatureItem[]) => void;
    resetFeatures: () => void;
    // Amenties
    setAmenities: (newAmenities: AmenityItem[]) => void;
    resetAmenities: () => void;
    //set all action from home modal
    homeModalApply: (
        area: AreaType,
        beds: number[],
        baths: number[],
        features: UnitFeatureItem[],
        ameniteis: AmenityItem[]
    ) => void;
    homeModalReset: () => void;
    mobileModalApply: (
        type: string,
        unitTypeList: UnitTypeItem[],
        area: AreaType,
        beds: number[],
        baths: number[],
        price: Pricing,
        downPayment: Pricing,
        installment: Priceing,
        features: UnitFeatureItem[],
        amenties: AmenityItem[]
    ) => void;
    mobileModalReset: () => void;
    setTab: (tab: string) => void;
    setAllStore: (newStoreData: State) => void;
    setSortBy: (newValue: string) => void;
}
