import { NameAndId, RangeKeys } from '@/interfaces/UrlSegmentsKeys';
import {
    AmenityItem,
    AreaType,
    LocationItem,
    ProjectItem,
    UnitFeatureItem,
    UnitTypeItem,
} from '@/interfaces/store/SearchStore';
import { DeveloperItem } from '@/store/temp-search';
import { Pricing } from '@/ui/search/home-search/search-price/search-price';
import { stringifyFromTo, stringifyNameAndId } from './url-segments';

export const createSearchSectionFromStrings = (st: string[], prefix: string) =>
    st.map((stItem) => `${prefix} = ${stItem}`);

export const createSearchSectionFromNumbers = (num: number[], prefix: string) =>
    num.map((numItem) => `${prefix}${numItem == 5 ? ' >= ' : ' = '}${numItem}`);
export const createSearchSectionFromObjects = (
    st: { id: number; name: string }[],
    prefix: string
) => st.map((stItem) => `${prefix} = ${stItem.id}`);
export const createSingleProjectsSearchString = (
    st: { id: number; name: string }[],
    prefix0: string,
    prefix1: string
) =>
    st.reduce((accu: string[], stItem) => {
        return [
            ...accu,
            `${prefix0} = ${stItem.id}`,
            `${prefix1} = ${stItem.id}`,
        ];
    }, []);
export const createSearchString = (data: string, prefix: string) =>
    data && `${prefix} = ${data}`;
export const createSearchSectionFromTo = (
    from: number,
    to: number,
    prefix: string
) => {
    const result = [];
    from && result.push(`${prefix} >= ${from}`);
    to && result.push(`${prefix} <= ${to}`);

    return result;
};
export const createSearchQueryStrings = (
    str: string[],
    prefix: string,
    rdm?: boolean
) => (rdm ? `${prefix} ${str.join(' ')}` : str.join(' '));

export const generateSearchBody = (
    searchPrefixes: { [key: string]: string },
    text: string[],
    saleType: string[],
    amenities: AmenityItem[],
    unitFeatures: UnitFeatureItem[],
    type: string,
    unitTypeList: UnitTypeItem[],
    area: AreaType,
    beds: number[],
    baths: number[],
    price: Pricing,
    downPayment: Pricing,
    installment: Pricing,
    developers: DeveloperItem[],
    locations: LocationItem[],
    projects: ProjectItem[],
    readyToMove: boolean
) => {
    const st = createSearchSectionFromStrings(
        saleType,
        searchPrefixes.SALE_TYPE
    );
    const pro = createSingleProjectsSearchString(
        projects,
        searchPrefixes.PROJECT,
        searchPrefixes.PROJECT_PARENT
    );
    const dev = createSearchSectionFromObjects(
        developers,
        searchPrefixes.DEVELOPER
    );
    const location = createSearchSectionFromObjects(
        locations,
        searchPrefixes.LOCATION
    );
    const typesList = createSearchSectionFromObjects(
        unitTypeList,
        searchPrefixes.UNIT_TYPE
    );

    const UnitType = createSearchString(type, searchPrefixes.TYPE);
    const bedsList = createSearchSectionFromNumbers(beds, searchPrefixes.BEDS);
    const bathsList = createSearchSectionFromNumbers(
        baths,
        searchPrefixes.BATHS
    );
    const amenititesList = createSearchSectionFromObjects(
        amenities,
        searchPrefixes.AMENITIES
    );
    const featuresList = createSearchSectionFromObjects(
        unitFeatures,
        searchPrefixes.FEATURES
    );
    const areaValues = createSearchSectionFromTo(
        area.from,
        area.to,
        searchPrefixes.AREA
    );
    const priceValues = createSearchSectionFromTo(
        price.from,
        price.to,
        searchPrefixes.PRICE
    );
    const downPaymentValues = createSearchSectionFromTo(
        downPayment.from,
        downPayment.to,
        searchPrefixes.DOWNPAYMENT
    );
    const installmentsValues = createSearchSectionFromTo(
        installment.from,
        installment.to,
        searchPrefixes.INSTALLMENT
    );
    const searchQuery = createSearchQueryStrings(
        text,
        searchPrefixes.READY,
        readyToMove
    );

    return {
        filters: [
            st,
            pro,
            dev,
            location,
            typesList,
            bedsList,
            bathsList,
            amenititesList,
            featuresList,
            // UnitType,
            ...priceValues,
            ...downPaymentValues,
            ...installmentsValues,
            ...areaValues,
        ].filter((item) => item.length !== 0),
        queryString: searchQuery,
    };
};

export const arrayOfObjectsNotEqual = (a: NameAndId[], b: NameAndId[]) => {
    return (
        a.map(stringifyNameAndId).join() !== b.map(stringifyNameAndId).join()
    );
};
export const stringsOrBooleanNotEqual = (
    a: string | boolean,
    b: string | boolean
) => a !== b;
export const arrayOfStringsNotEqual = (
    a: string[] | number[],
    b: string[] | number[]
) => a.join() !== b.join();
export const objectsOfFromToNotEqual = (a: RangeKeys, b: RangeKeys) =>
    stringifyFromTo(a) !== stringifyFromTo(b);
