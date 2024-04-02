import { sortStringArray } from '@/helpers/get-sorted-array';

export const SALE_TYPES = {
    RENT: 'rental',
    PRIMARY: 'sale',
    RESALE: 'resale',
};
export const DEFAULT_SALE_TYPE_VALUE = [SALE_TYPES.PRIMARY, SALE_TYPES.RESALE];
export const DEFAULT_ALL_SALE_TYPE = sortStringArray([
    SALE_TYPES.PRIMARY,
    SALE_TYPES.RESALE,
    SALE_TYPES.RENT,
]);
