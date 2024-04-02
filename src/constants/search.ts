import { DEFAULT_SALE_TYPE_VALUE } from './store';
import { sortStringArray } from '@/helpers/get-sorted-array';
import { TempFiltersObject } from '@/interfaces/search';

export const DEFAULT_MIN_AREA = 0;
export const DEFAULT_MAX_AREA = 2000;
export const searchPrefixes = {
    SALE_TYPE: 'sale_type',
    DEVELOPER: 'developer_id',
    LOCATION: 'state_id',
    PROJECT: 'project_id',
    PROJECT_PARENT: 'project.parent_id',
    TYPE: 'type',
    UNIT_TYPE: 'unit_type_id',
    BEDS: 'bedroom',
    BATHS: 'bathroom',
    AMENITIES: 'amenities.id',
    FEATURES: 'unit_features.id',
    AREA: 'area',
    PRICE: 'price',
    DOWNPAYMENT: 'min_down_payment',
    INSTALLMENT: 'min_month_payment',
    READY: 'ready to move',
    SORT: 'sort',
};
export const DEFATULT_EMPTY_URL: TempFiltersObject = {
    tempTab: 'units',
    tempPage: 1,
    tempText: [],
    tempReadyToMove: false,
    tempSaleType: sortStringArray(DEFAULT_SALE_TYPE_VALUE),
    tempType: '',
    tempUnitTypeList: [],
    tempArea: { from: 0, to: 0 },
    tempBeds: [],
    tempBaths: [],
    tempUnitFeatures: [],
    tempAmenities: [],
    tempDevelopers: [],
    tempProjects: [],
    tempLocations: [],
    tempPrice: { from: 0, to: 0 },
    tempDownPayment: { from: 0, to: 0 },
    tempInstallment: { from: 0, to: 0 },
    tempSort: 'default',
};
