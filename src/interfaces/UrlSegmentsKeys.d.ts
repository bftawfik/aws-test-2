type SaleTypeKey = 'satp';
type DeveloperKey = 'dev';
type ProjectKey = 'prj';
type LocationKey = 'loc';
type PropertyTypeKey = 'tp';
type FeaturesKey = 'feat';
type AreaInSquareMetersKey = 'sqm';
type BedsKey = 'bd';
type BathsKey = 'bth';
type PriceKey = 'pr';
type DownPaymentKey = 'dp';
type InstallmentKey = 'ins';
type AmenitiesKey = 'amn';
type ReadyToMoveKey = 'rtm';
type TextKey = 'txt';
type TypeKey = 'type';
type PageKey = 'pg';
type TabKey = 'tab';
type SortKey = 'sort';
type BoundsKey = 'bnd';
type ZoomKey = 'zoom';
type CenterKey = 'center';
type DrawerKey = 'drawer_id';

export type UrlSegmentKey =
    | SaleTypeKey
    | DeveloperKey
    | ProjectKey
    | LocationKey
    | PropertyTypeKey
    | FeaturesKey
    | AreaInSquareMetersKey
    | BedsKey
    | BathsKey
    | PriceKey
    | DownPaymentKey
    | InstallmentKey
    | AmenitiesKey
    | ReadyToMoveKey
    | TextKey
    | TypeKey
    | PageKey
    | TabKey
    | BOUNDS_SHORT
    | SortKey
    | BoundsKey
    | ZoomKey
    | CenterKey;
export type NameAndId = { name: string; id: number };
export type RangeKeys = { from: number; to: number };
export type ParsedObject = {
    [key: string]:
        | string[]
        | number[]
        | NameAndId[]
        | RangeKeys
        | boolean
        | string
        | number;
};
