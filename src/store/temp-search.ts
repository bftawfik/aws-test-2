import { create } from 'zustand';
import { Pricing } from '@/ui/search/home-search/search-price/search-price';
import { LocationItem, ProjectItem } from '@/interfaces/store/SearchStore';
import { sortStringArray } from '@/helpers/get-sorted-array';
import {
    DEFAULT_MAX_AREA,
    DEFAULT_MIN_AREA,
    DEFAULT_SALE_TYPE_VALUE,
} from '@/constants';
export interface DeveloperItem {
    id: number;
    name: string;
}
interface AreaType {
    from: number;
    to: number;
}
interface FeatureType {
    id: number;
    name: string;
}
interface AmenityType {
    id: number;
    name: string;
}
interface UnitType {
    id: number;
    name: string;
}
interface State {
    //tempTextValue
    tempText: string | null;
    //unit type
    tempType: string | null;
    tempUnitTypeList: UnitType[] | null;
    //area
    tempArea: AreaType | null;
    //beds
    tempBeds: number[] | null;
    //baths
    tempBaths: number[] | null;
    //features
    tempUnitFeatures: FeatureType[] | null;
    //amenitites
    tempAmenities: AmenityType[] | null;
    //price
    tempPrice: Pricing | null;
    //downPayment
    tempDownPayment: Pricing | null;
    //installment
    tempInstallment: Pricing | null;
    // ready to move
    tempReadyToMove: boolean;
    // sale type
    tempSaleType: string[];
    // temp developers
    tempDevelopers: DeveloperItem[];
    // temp projects
    tempProjects: ProjectItem[];
    // temp locations
    tempLocations: LocationItem[];
    // temp text list
    tempTextList: string[];
}

interface Action {
    resetTempStore: () => void;
    resetAlltempStore: () => void;
    setTempType: (type: string) => void;
    resetTempType: () => void;
    setTempUnitTypeList: (unit: UnitType) => void;
    setAllTempList: (list: UnitType[]) => void;
    resetTempTypeList: () => void;
    setTempArea: (newArea: AreaType) => void;
    resetTempArea: () => void;
    setTempBeds: (bedsNum: number) => void;
    setTempBaths: (bathsNum: number) => void;
    setAllTempBaths: (baths: number[]) => void;
    setAllTempBeds: (beds: number[]) => void;
    resetTempBeds: () => void;
    resetTempBaths: () => void;
    setTempPrice: (newValue: Pricing) => void;
    setTempInstallment: (newValue: Pricing) => void;
    setTempDownPayment: (newValue: Pricing) => void;
    resetTempPricingValues: () => void;
    setTempFeatures: (newFeatures: FeatureType) => void;
    setAllTempFeatures: (feature: FeatureType[]) => void;
    resetTempFeatures: () => void;
    setTempAmenities: (newAmenities: AmenityType) => void;
    setAllAmenities: (amenities: AmenityType[]) => void;
    resetTempAmenities: () => void;
    resetHomeModalValues: () => void;
    setTempText: (text: string) => void;
    resetTempText: () => void;
    setTempReadyToMove: (reayToMove: boolean) => void;
    setTempSaleType: (saleType: string[]) => void;
    setTempDevelopers: (developers: DeveloperItem[]) => void;
    setTempProjects: (projects: ProjectItem[]) => void;
    setTempLocations: (locations: LocationItem[]) => void;
    setTempTextList: (list: string[]) => void;
}
const initialState = {
    //tempText
    tempText: null,
    //unit type state
    tempType: null,
    tempUnitTypeList: null,
    //area
    tempArea: null,
    //beds
    tempBeds: null,
    //baths
    tempBaths: null,
    //features
    tempUnitFeatures: null,
    // amenities
    tempAmenities: null,
    //price
    tempPrice: null,
    //installment
    tempInstallment: null,
    //downPayment
    tempDownPayment: null,
    //ready to move
    tempReadyToMove: false,
    // sale type
    tempSaleType: [],
    // developers
    tempDevelopers: [],
    // projects
    tempProjects: [],
    // developers
    tempLocations: [],
    // text list
    tempTextList: [],
};

const defaultTempData = {
    //tempText
    tempText: '',
    //unit type state
    tempType: '',
    tempUnitTypeList: [],
    //area
    tempArea: { from: DEFAULT_MIN_AREA, to: DEFAULT_MAX_AREA },
    //beds
    tempBeds: [],
    //baths
    tempBaths: [],
    //features
    tempUnitFeatures: [],
    // amenities
    tempAmenities: [],
    //price
    tempPrice: { from: 0, to: 0 },
    //installment
    tempInstallment: { from: 0, to: 0 },
    //downPayment
    tempDownPayment: { from: 0, to: 0 },
    //ready to move
    tempReadyToMove: false,
    // sale type
    tempSaleType: sortStringArray(DEFAULT_SALE_TYPE_VALUE),
    // developers
    tempDevelopers: [],
    // projects
    tempProjects: [],
    // developers
    tempLocations: [],
    // text list
    tempTextList: [],
};
export const useTempStore = create<State & Action>()((set) => ({
    ...initialState,
    //reset
    resetTempStore: () => {
        set(initialState);
    },
    resetAlltempStore: () => {
        set(defaultTempData);
    },
    //unit type update function
    setTempType: (type) =>
        set(() => ({ tempType: type, tempUnitTypeList: [] })),
    resetTempType: () => set({ tempType: null }),

    setTempUnitTypeList: (unit) =>
        set((state) => {
            const tempUnitList = state.tempUnitTypeList || [];
            const unitExists = tempUnitList.some((item) => unit.id === item.id);
            if (unitExists) {
                return {
                    tempUnitTypeList: tempUnitList.filter(
                        (item) => item.id !== unit.id
                    ),
                };
            } else {
                return {
                    tempUnitTypeList: [...tempUnitList, unit],
                };
            }
        }),
    setAllTempList: (list) => set(() => ({ tempUnitTypeList: list })),
    resetTempTypeList: () =>
        set(() => ({ tempUnitTypeList: null, tempType: null })),
    //area
    setTempArea: (newArea) => set(() => ({ tempArea: newArea })),
    resetTempArea: () => set(() => ({ tempArea: null })),
    //beds
    setTempBeds: (bedsNum) =>
        set((state) => {
            const actualValue = state.tempBeds?.includes(bedsNum)
                ? state.tempBeds.filter((bed) => bed !== bedsNum)
                : [...(state.tempBeds || []), bedsNum];
            if (actualValue.length >= 5) {
                return { tempBeds: [] };
            } else {
                return { tempBeds: actualValue };
            }
        }),
    setAllTempBeds: (beds) => set({ tempBeds: beds.length >= 5 ? [] : beds }),
    resetTempBeds: () => set(() => ({ tempBeds: null })),
    //baths
    setTempBaths: (bathNum) =>
        set((state) => {
            const bathsValue = state.tempBaths?.includes(bathNum)
                ? state.tempBaths.filter((bed) => bed !== bathNum)
                : [...(state.tempBaths || []), bathNum];

            if (bathsValue.length >= 5) {
                return { tempBaths: [] };
            } else {
                return {
                    tempBaths: bathsValue,
                };
            }
        }),
    resetTempBaths: () => set(() => ({ tempBaths: null })),
    setAllTempBaths: (baths) =>
        set({ tempBaths: baths.length >= 5 ? [] : baths }),

    //pricing
    setTempPrice: (newValue) => set({ tempPrice: newValue }),
    //downPayment
    setTempDownPayment: (newValue) => set({ tempDownPayment: newValue }),
    //installments
    setTempInstallment: (newValue) => set({ tempInstallment: newValue }),

    resetTempPricingValues: () =>
        set({
            tempPrice: null,
            tempDownPayment: null,
            tempInstallment: null,
        }),
    //features
    setTempFeatures: (newFeature) =>
        set((state) => {
            const tempFeatures = state.tempUnitFeatures || [];
            const featureExists = tempFeatures.some(
                (feature) => feature.id === newFeature.id
            );

            if (featureExists) {
                return {
                    tempUnitFeatures: tempFeatures.filter(
                        (feature) => feature.id !== newFeature.id
                    ),
                };
            } else {
                return {
                    tempUnitFeatures: [...tempFeatures, newFeature],
                };
            }
        }),
    setAllTempFeatures: (features) => set({ tempUnitFeatures: features }),
    resetTempFeatures: () => set({ tempUnitFeatures: null }),
    //amenities
    setTempAmenities: (newAmenity) =>
        set((state) => {
            const tempAmenities = state.tempAmenities || [];

            const amenityExists = tempAmenities.some(
                (amenity) => amenity.id === newAmenity.id
            );

            if (amenityExists) {
                return {
                    tempAmenities: tempAmenities.filter(
                        (amenity) => amenity.id !== newAmenity.id
                    ),
                };
            } else {
                return {
                    tempAmenities: [...tempAmenities, newAmenity],
                };
            }
        }),
    setAllAmenities: (ameniteis) => set({ tempAmenities: ameniteis }),
    resetTempAmenities: () => set({ tempAmenities: null }),
    resetHomeModalValues: () =>
        set({
            tempArea: null,
            tempAmenities: null,
            tempBaths: null,
            tempBeds: null,
            tempUnitFeatures: null,
        }),
    setTempText: (text) => set({ tempText: text }),
    resetTempText: () => set({ tempText: '' }),

    setTempReadyToMove: (reayToMove) => set({ tempReadyToMove: reayToMove }),
    setTempSaleType: (saleType) => set({ tempSaleType: saleType }),
    setTempDevelopers: (developers) => set({ tempDevelopers: developers }),
    setTempProjects: (projects) => set({ tempProjects: projects }),
    setTempLocations: (locations) => set({ tempLocations: locations }),
    setTempTextList: (list) => set({ tempTextList: list }),
}));
