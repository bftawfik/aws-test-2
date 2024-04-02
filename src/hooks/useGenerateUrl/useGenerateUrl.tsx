import { useMemo } from 'react';
import { useSearchStore } from '@/store/search';
import { useLocale } from 'next-intl';
import {
    SALE_TYPE_SHORT,
    DEVELOPER_SHORT,
    PROJECT_SHORT,
    LOCATION_SHORT,
    PROPERTY_TYPE_SHORT,
    FEATURES_SHORT,
    AREA_IN_SQUARE_METERS_SHORT,
    BEDS_SHORT,
    BATHS_SHORT,
    PRICE_SHORT,
    DOWN_PAYMENT_SHORT,
    INSTALLMENT_SHORT,
    AMENITIES_SHORT,
    READY_TO_MOVE_SHORT,
    TEXT_SHORT,
    TYPE_SHORT,
    PAGE_SHORT,
    TAB_SHORT,
    DEFAULT_LOCALE,
    BOUNDS_SHORT,
    SORT_BY,
    ZOOM_SHORT,
    CENTER_SHORT,
} from '@/constants';
import { stringifyUrl, stringifyUrl2 } from '@/helpers/url-segments';
import { usePageStore } from '@/store/global';
import { TempFiltersObject, SearchState } from '@/interfaces/search';
import { useSearchParams } from 'next/navigation';

interface UseGenerateUrlProps extends TempFiltersObject {}

export const useGenerateUrl = (props?: UseGenerateUrlProps) => {
    const {
        tempTab,
        tempText,
        tempReadyToMove,
        tempSaleType,
        tempType,
        tempUnitTypeList,
        tempArea,
        tempBeds,
        tempBaths,
        tempUnitFeatures,
        tempAmenities,
        tempDevelopers,
        tempProjects,
        tempLocations,
        tempPrice,
        tempDownPayment,
        tempInstallment,
        tempPage,
        tempBounds,
        tempSort,
    } = props || {};
    const searchParams = useSearchParams();
    const bounds = searchParams.get(BOUNDS_SHORT) || '';
    const zoom = searchParams.get(ZOOM_SHORT) || '';
    const center = searchParams.get(CENTER_SHORT) || '';

    const lang = useLocale();
    const {
        tab,
        text,
        amenities,
        unitFeatures,
        saleType,
        type,
        unitTypeList,
        area,
        beds,
        baths,
        price,
        downPayment,
        installment,
        developers,
        locations,
        projects,
        readyToMove,
        sortByValue,
    } = useSearchStore();
    const { currentPage } = usePageStore();
    const handleGeneratingUrl = (): string => {
        const storeDataObject = {
            [TEXT_SHORT]: tempText || text,
            [AMENITIES_SHORT]: tempAmenities || amenities,
            [FEATURES_SHORT]: tempUnitFeatures || unitFeatures,
            [SALE_TYPE_SHORT]: tempSaleType || saleType,
            [TYPE_SHORT]: typeof tempType !== 'string' ? type : tempType,
            [PROPERTY_TYPE_SHORT]: tempUnitTypeList || unitTypeList,
            [AREA_IN_SQUARE_METERS_SHORT]: tempArea || area,
            [BEDS_SHORT]: tempBeds || beds,
            [BATHS_SHORT]: tempBaths || baths,
            [PRICE_SHORT]: tempPrice || price,
            [DOWN_PAYMENT_SHORT]: tempDownPayment || downPayment,
            [INSTALLMENT_SHORT]: tempInstallment || installment,
            [DEVELOPER_SHORT]: tempDevelopers || developers,
            [LOCATION_SHORT]: tempLocations || locations,
            [PROJECT_SHORT]: tempProjects || projects,
            [READY_TO_MOVE_SHORT]:
                tempReadyToMove != null ? tempReadyToMove : readyToMove,
            [TAB_SHORT]: typeof tempTab !== 'string' ? tab : tempTab,
            [PAGE_SHORT]: tempPage || currentPage,
            [BOUNDS_SHORT]: tempBounds || bounds,
            [ZOOM_SHORT]: zoom,
            [CENTER_SHORT]: center,
            [SORT_BY]: tempSort || sortByValue,
        };

        return `${
            lang === DEFAULT_LOCALE ? '' : `/${lang}`
        }/discover/${stringifyUrl(storeDataObject)}`;
    };

    return useMemo(handleGeneratingUrl, [
        tempText,
        text,
        amenities,
        unitFeatures,
        saleType,
        type,
        unitTypeList,
        area,
        beds,
        baths,
        price,
        downPayment,
        installment,
        developers,
        locations,
        projects,
        readyToMove,
        tempTab,
        tempReadyToMove,
        tempSaleType,
        tempType,
        tempUnitTypeList,
        tempArea,
        tempBeds,
        tempBaths,
        tempUnitFeatures,
        tempAmenities,
        tempDevelopers,
        tempProjects,
        tempLocations,
        tempPrice,
        tempDownPayment,
        tempInstallment,
        tab,
        lang,
        currentPage,
        tempPage,
        tempBounds,
        bounds,
        sortByValue,
        tempSort,
        center,
        zoom,
    ]);
};

export const generateUrl = (
    searchState: SearchState,
    lang: string,
    replaceValues?: UseGenerateUrlProps
): string => {
    const {
        tempTab,
        tempText,
        tempReadyToMove,
        tempSaleType,
        tempType,
        tempUnitTypeList,
        tempArea,
        tempBeds,
        tempBaths,
        tempUnitFeatures,
        tempAmenities,
        tempDevelopers,
        tempProjects,
        tempLocations,
        tempPrice,
        tempDownPayment,
        tempInstallment,
        tempBounds,
        tempSort,
    } = replaceValues || {};

    const {
        tab,
        text,
        amenities,
        unitFeatures,
        saleType,
        type,
        unitTypeList,
        area,
        beds,
        baths,
        price,
        downPayment,
        installment,
        developers,
        locations,
        projects,
        readyToMove,
        bounds,
        sortByValue,
    } = searchState;

    const storeDataObject = {
        [TEXT_SHORT]: tempText || text,
        [AMENITIES_SHORT]: tempAmenities || amenities,
        [FEATURES_SHORT]: tempUnitFeatures || unitFeatures,
        [SALE_TYPE_SHORT]: tempSaleType || saleType,
        [TYPE_SHORT]: typeof tempType !== 'string' ? type : tempType,
        [PROPERTY_TYPE_SHORT]: tempUnitTypeList || unitTypeList,
        [AREA_IN_SQUARE_METERS_SHORT]: tempArea || area,
        [BEDS_SHORT]: tempBeds || beds,
        [BATHS_SHORT]: tempBaths || baths,
        [PRICE_SHORT]: tempPrice || price,
        [DOWN_PAYMENT_SHORT]: tempDownPayment || downPayment,
        [INSTALLMENT_SHORT]: tempInstallment || installment,
        [DEVELOPER_SHORT]: tempDevelopers || developers,
        [LOCATION_SHORT]: tempLocations || locations,
        [PROJECT_SHORT]: tempProjects || projects,
        [READY_TO_MOVE_SHORT]:
            tempReadyToMove != null ? tempReadyToMove : readyToMove,
        [TAB_SHORT]: typeof tempTab !== 'string' ? tab : tempTab,
        [BOUNDS_SHORT]: tempBounds || bounds,
        [SORT_BY]: tempSort || sortByValue,
    };

    return `${
        lang === DEFAULT_LOCALE ? '' : `/${lang}`
    }/discover/${stringifyUrl(storeDataObject)}`;
};
