import {
    AMENITIES_SHORT,
    AREA_IN_SQUARE_METERS_SHORT,
    BATHS_SHORT,
    BEDS_SHORT,
    DEVELOPER_SHORT,
    DOWN_PAYMENT_SHORT,
    FEATURES_SHORT,
    INSTALLMENT_SHORT,
    LOCATION_SHORT,
    PRICE_SHORT,
    PROJECT_SHORT,
    PROPERTY_TYPE_SHORT,
    READY_TO_MOVE_SHORT,
    SALE_TYPE_SHORT,
    TAB_SHORT,
    TEXT_SHORT,
    TYPE_SHORT,
    PAGE_SHORT,
    DEFATULT_EMPTY_URL,
    BOUNDS_SHORT,
    SORT_BY,
    ZOOM_SHORT,
    CENTER_SHORT,
} from '@/constants';
import { DEFAULT_SALE_TYPE_VALUE } from '@/constants/store';
import {
    NameAndId,
    ParsedObject,
    RangeKeys,
    UrlSegmentKey,
} from '@/interfaces/UrlSegmentsKeys';
import { sortStringArray } from './get-sorted-array';
// Defining the order of prefixes used in URL segments
const prefixes: UrlSegmentKey[] = [
    TAB_SHORT,
    PAGE_SHORT,
    SALE_TYPE_SHORT,
    DEVELOPER_SHORT,
    LOCATION_SHORT,
    PROJECT_SHORT,
    PROPERTY_TYPE_SHORT,
    AREA_IN_SQUARE_METERS_SHORT,
    BEDS_SHORT,
    BATHS_SHORT,
    PRICE_SHORT,
    DOWN_PAYMENT_SHORT,
    INSTALLMENT_SHORT,
    READY_TO_MOVE_SHORT,
    FEATURES_SHORT,
    AMENITIES_SHORT,
    TEXT_SHORT,
    TYPE_SHORT,
    BOUNDS_SHORT,
    ZOOM_SHORT,
    CENTER_SHORT,
    SORT_BY,
];
// Helper Functions
export const stringifyNameAndId = (obj: NameAndId): string => {
    return `${obj.name.split(' ').join('')}_${obj.id}`;
};
export const stringifyFromTo = (obj: RangeKeys): string => {
    return `${obj.from}_${obj.to}`;
};
const handleSimpleArraySegment = (
    prefix: UrlSegmentKey,
    values: string[]
): string => {
    return `${prefix}-${values.join('--')}`;
};
const handleSaleTypeSegment = (
    prefix: UrlSegmentKey,
    values: string[],
    defaultValues: string[]
): string =>
    JSON.stringify(values) === JSON.stringify(defaultValues)
        ? ''
        : handleSimpleArraySegment(prefix, values);

const handleNameAndIdArraySegment = (
    prefix: UrlSegmentKey,
    values: NameAndId[]
): string => {
    return `${prefix}-${values.map(stringifyNameAndId).join('--')}`;
};
const handleRangeSegment = (
    prefix: UrlSegmentKey,
    values: RangeKeys
): string => {
    const range = values;
    return range && range.from === 0 && range.to === 0
        ? ''
        : `${prefix}-${stringifyFromTo(range)}`;
};
const handleSimpleStringSegment = (
    prefix: UrlSegmentKey,
    values: string
): string => {
    return `${prefix}-${values}`;
};
const handleTabSegment = (
    prefix: UrlSegmentKey,
    value: string,
    defaultValue: string
): string =>
    value === defaultValue ? '' : handleSimpleStringSegment(prefix, value);

const handleSimpleNumberSegment = (
    prefix: UrlSegmentKey,
    values: number
): string => {
    return `${prefix}-${values}`;
};
const handlePageNumberSegment = (
    prefix: UrlSegmentKey,
    values: number,
    defaultValues: number
): string =>
    values === defaultValues ? '' : handleSimpleNumberSegment(prefix, values);

const replaceSpecialCharsInUrlToUnifyQPWithSegments = (
    inputUrl: string
): string => {
    const replacements: { [key: string]: string } = {
        '&': '/',
        '?': '/',
        '=': '-',
    };
    return inputUrl.replace(/[&=?]/g, (match) => replacements[match] || match);
};
// Main function to stringify a ParsedObject into a URL string
export const stringifyUrl = (parsedObject: ParsedObject): string => {
    // Initialization
    const pathSegments: string[] = [];
    const queryParameters: string[] = [];
    // Loop through prefixes
    prefixes.forEach((prefix) => {
        const values = parsedObject[prefix];
        // Handling true values
        if (values === true) {
            pathSegments.push(`${prefix}-true`);
            return;
        }
        // Handling other values
        if (
            (!Array.isArray(values) || !values.length) &&
            (typeof values !== 'object' || Object.keys(values).length === 0) &&
            (typeof values !== 'string' || !values.length) &&
            (typeof values !== 'number' || !values)
        ) {
            return;
        }
        let segment = '';
        // Determine how to handle each prefix
        switch (prefix) {
            // Handle simple array segments
            case SALE_TYPE_SHORT:
                segment = handleSaleTypeSegment(
                    prefix,
                    values as string[],
                    sortStringArray(DEFAULT_SALE_TYPE_VALUE)
                );
                break;
            case TEXT_SHORT:
            case BEDS_SHORT:
            case BATHS_SHORT:
                segment = handleSimpleArraySegment(prefix, values as string[]);
                break;
            // Handle array of NameAndId segments
            case DEVELOPER_SHORT:
            case PROJECT_SHORT:
            case LOCATION_SHORT:
            case PROPERTY_TYPE_SHORT:
            case AMENITIES_SHORT:
            case FEATURES_SHORT:
                segment = handleNameAndIdArraySegment(
                    prefix,
                    values as NameAndId[]
                );
                break;
            // Handle range segments
            case AREA_IN_SQUARE_METERS_SHORT:
            case PRICE_SHORT:
            case DOWN_PAYMENT_SHORT:
            case INSTALLMENT_SHORT:
                segment = handleRangeSegment(prefix, values as RangeKeys);
                break;
            case TAB_SHORT:
                segment = handleTabSegment(
                    prefix,
                    values as string,
                    DEFATULT_EMPTY_URL.tempTab as string
                );
                break;
            case BOUNDS_SHORT:
            case ZOOM_SHORT:
            case CENTER_SHORT:
            case TYPE_SHORT:
                segment = handleSimpleStringSegment(prefix, values as string);
                break;

            case SORT_BY:
                if (values !== 'default') {
                    segment = handleSimpleStringSegment(
                        prefix,
                        values as string
                    );
                }
                break;
            case PAGE_SHORT:
                segment = handlePageNumberSegment(
                    prefix,
                    values as number,
                    DEFATULT_EMPTY_URL.tempPage || 1
                );
                break;
        }
        // Add segment to path or query parameters
        if (segment) {
            // Add segment to query parameters for 'feat', 'amn', and 'txt' prefixes
            prefix === FEATURES_SHORT ||
            prefix === AMENITIES_SHORT ||
            prefix === TEXT_SHORT ||
            prefix === ZOOM_SHORT ||
            prefix === CENTER_SHORT ||
            prefix === BOUNDS_SHORT
                ? queryParameters.push(segment.replace('-', '='))
                : pathSegments.push(segment);
        }
    });
    // Construct and return the final URL string
    return `${pathSegments.join('/')}${
        queryParameters.length ? '?' + queryParameters.join('&') : ''
    }`;
};
export const stringifyUrl2 = (
    parsedObject: ParsedObject,
    searchParams: URLSearchParams
): string => {
    // Initialization
    const pathSegments: string[] = [];
    const queryParameters: string[] = [];
    // Loop through prefixes
    prefixes.forEach((prefix) => {
        const values = parsedObject[prefix];
        // Handling true values
        if (values === true) {
            pathSegments.push(`${prefix}-true`);
            return;
        }
        // Handling other values
        if (
            (!Array.isArray(values) || !values.length) &&
            (typeof values !== 'object' || Object.keys(values).length === 0) &&
            (typeof values !== 'string' || !values.length) &&
            (typeof values !== 'number' || !values)
        ) {
            return;
        }
        let segment = '';
        // Determine how to handle each prefix
        switch (prefix) {
            // Handle simple array segments
            case SALE_TYPE_SHORT:
                segment = handleSaleTypeSegment(
                    prefix,
                    values as string[],
                    sortStringArray(DEFAULT_SALE_TYPE_VALUE)
                );
                break;
            case TEXT_SHORT:
            case BEDS_SHORT:
            case BATHS_SHORT:
                segment = handleSimpleArraySegment(prefix, values as string[]);
                break;
            // Handle array of NameAndId segments
            case DEVELOPER_SHORT:
            case PROJECT_SHORT:
            case LOCATION_SHORT:
            case PROPERTY_TYPE_SHORT:
            case AMENITIES_SHORT:
            case FEATURES_SHORT:
                segment = handleNameAndIdArraySegment(
                    prefix,
                    values as NameAndId[]
                );
                break;
            // Handle range segments
            case AREA_IN_SQUARE_METERS_SHORT:
            case PRICE_SHORT:
            case DOWN_PAYMENT_SHORT:
            case INSTALLMENT_SHORT:
                segment = handleRangeSegment(prefix, values as RangeKeys);
                break;
            case TAB_SHORT:
                segment = handleTabSegment(
                    prefix,
                    values as string,
                    DEFATULT_EMPTY_URL.tempTab as string
                );
                break;
            case TYPE_SHORT:
                segment = handleSimpleStringSegment(prefix, values as string);
                break;
            case PAGE_SHORT:
                segment = handlePageNumberSegment(
                    prefix,
                    values as number,
                    DEFATULT_EMPTY_URL.tempPage || 1
                );
                break;
        }
        // Add segment to path or query parameters
        if (segment) {
            // Add segment to query parameters for 'feat', 'amn', and 'txt' prefixes
            // prefix === FEATURES_SHORT ||
            // prefix === AMENITIES_SHORT ||
            // prefix === TEXT_SHORT
            //     ? queryParameters.push(segment.replace('-', '='))
            //     : pathSegments.push(segment);
            prefix === FEATURES_SHORT ||
            prefix === AMENITIES_SHORT ||
            prefix === TEXT_SHORT
                ? searchParams.append(prefix, segment.replace('-', '='))
                : pathSegments.push(segment);
        }
    });
    // Construct and return the final URL string
    return `${pathSegments.join('/')}${
        queryParameters.length ? '?' + searchParams.toString() : ''
    }`;
};
// Helper function to parse a name and ID string into a NameAndId object
const parseNameAndId = (value: string): NameAndId => {
    const [name, id] = value.split('_');
    return { name, id: Number(id) };
};
// Helper function to parse a from-to range string into a RangeKeys object
const parseFromTo = (value: string): RangeKeys => {
    const [from, to] = value.split('_').map(Number);
    return { from, to };
};
// Helper function to parse a URL segment into a ParsedObject
const parseUrlSegment = (segment: string): ParsedObject => {
    const regex = /^([a-z]+)-(.+)$/;
    const match = segment.match(regex);
    if (match) {
        const key = match[1] as UrlSegmentKey;
        const values = match[2].split('--');
        switch (key) {
            // Case of normal strings
            case SALE_TYPE_SHORT:
            case TEXT_SHORT:
                return { [key]: values };

            case TAB_SHORT:
            case TYPE_SHORT:
                return { [key]: values[0] };
            case PAGE_SHORT:
                const pageNum = Number(values[0]);
                return { [key]: pageNum };

            // Case of beds and baths as numbers
            case BEDS_SHORT:
            case BATHS_SHORT:
                const numericValues: number[] = values.map((item) =>
                    Number(item)
                );
                return { [key]: numericValues };
            // Case of name , id values
            case DEVELOPER_SHORT:
            case PROJECT_SHORT:
            case LOCATION_SHORT:
            case PROPERTY_TYPE_SHORT:
            case AMENITIES_SHORT:
            case FEATURES_SHORT:
                const parsedValues: NameAndId[] = values.map(parseNameAndId);
                return { [key]: parsedValues };
            // Case of min , max values
            case AREA_IN_SQUARE_METERS_SHORT:
            case PRICE_SHORT:
            case DOWN_PAYMENT_SHORT:
            case INSTALLMENT_SHORT:
                const parsedFromTo = parseFromTo(values[0]);
                // If both parsedFromTo values are 0, return an empty object
                return parsedFromTo.from === 0 && parsedFromTo.to === 0
                    ? {}
                    : { [key]: parsedFromTo };
            // Case of ready to move to pass it as true
            case READY_TO_MOVE_SHORT:
                return { [key]: true };
            case SORT_BY:
                return { [key]: values[0] };
            default:
                return {};
        }
    }
    return {};
};
// Main function to parse a URL string into a ParsedObject
export const parseUrl = (url: string): ParsedObject => {
    const modifiedUrl = replaceSpecialCharsInUrlToUnifyQPWithSegments(url);
    const segments = modifiedUrl.split('/');
    const parsedObjects: ParsedObject = segments
        .filter((segment) => !!segment?.length)
        .reduce((accumulator, segment) => {
            const parsedSegment = parseUrlSegment(segment);
            return Object.assign(accumulator, parsedSegment);
        }, {});
    return parsedObjects;
};
