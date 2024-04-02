import { generateSearchBody } from '@/helpers/search';
import { parseUrl } from '@/helpers/url-segments';
import { searchPrefixes } from '@/constants';
import { DEFATULT_EMPTY_URL } from '@/constants';
import { ParsedObjectFromUrl } from '@/interfaces/search';
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

export const getFiltersAndQueryString = (url: string) => {
    const parsedObjectFromUrl: ParsedObjectFromUrl = parseUrl(url);
    return {
        ...generateSearchBody(
            searchPrefixes,
            (parsedObjectFromUrl.txt ||
                DEFATULT_EMPTY_URL.tempText) as string[],
            (parsedObjectFromUrl.satp ||
                DEFATULT_EMPTY_URL.tempSaleType) as string[],
            (parsedObjectFromUrl.amn ||
                DEFATULT_EMPTY_URL.tempAmenities) as AmenityItem[],
            (parsedObjectFromUrl.feat ||
                DEFATULT_EMPTY_URL.tempUnitFeatures) as UnitFeatureItem[],
            (parsedObjectFromUrl.type || DEFATULT_EMPTY_URL.tempType) as string,
            (parsedObjectFromUrl.tp ||
                DEFATULT_EMPTY_URL.tempUnitTypeList) as UnitTypeItem[],
            (parsedObjectFromUrl.sqm ||
                DEFATULT_EMPTY_URL.tempArea) as AreaType,
            (parsedObjectFromUrl.bd || DEFATULT_EMPTY_URL.tempBeds) as number[],
            (parsedObjectFromUrl.bth ||
                DEFATULT_EMPTY_URL.tempBaths) as number[],
            (parsedObjectFromUrl.pr || DEFATULT_EMPTY_URL.tempPrice) as Pricing,
            (parsedObjectFromUrl.dp ||
                DEFATULT_EMPTY_URL.tempDownPayment) as Pricing,
            (parsedObjectFromUrl.ins ||
                DEFATULT_EMPTY_URL.tempInstallment) as Pricing,
            (parsedObjectFromUrl.dev ||
                DEFATULT_EMPTY_URL.tempDevelopers) as DeveloperItem[],
            (parsedObjectFromUrl.loc ||
                DEFATULT_EMPTY_URL.tempLocations) as LocationItem[],
            (parsedObjectFromUrl.prj ||
                DEFATULT_EMPTY_URL.tempProjects) as ProjectItem[],
            (parsedObjectFromUrl.rtm ||
                DEFATULT_EMPTY_URL.tempReadyToMove) as boolean
        ),
        tab: (parsedObjectFromUrl.tab || DEFATULT_EMPTY_URL.tempTab) as string,
        currentPage: (parsedObjectFromUrl.pg ||
            DEFATULT_EMPTY_URL.tempPage) as number,
        sortBy:
            parsedObjectFromUrl.sort || (DEFATULT_EMPTY_URL.tempSort as string),
    };
};
