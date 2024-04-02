import React from 'react';
import NextAuth from 'next-auth';

export type ObjectKey = string | number | symbol;

export type ObjectType = { [key: ObjectKey]: any };

export interface NextPage {
    params: Record<string, string>;
    searchParams: Record<string, string>;
}

export interface NextLayout extends Omit<NextPage, 'searchParams'> {
    children: React.ReactNode;
}

export interface ReactComponentProps<T extends HTMLElement = unknown>
    extends React.DetailedHTMLProps<React.HTMLAttributes<T>, T> {}

export type Platform = 'Windows' | 'Macintosh' | 'iPhone' | 'iPad';

export interface Response<T = unknown> {
    data: T;
    links: Links;
    meta: Meta;
    title: string;
    alias: string;
}

export interface Project {
    id: number;
    name: Name;
    slug: string;
    description: Description;
    address: Address;
    start_price: number;
    start_delivery: string;
    duration: string;
    min_down_payment: number;
    min_month_payment: number;
    flag: string;
    payment_method: string;
    installment_years: string | number;
    coords: Coord[];
    logo: string;
    images: string[];
    developer: Developer;
    location: Location;
    amenities: Amenity[];
    unit_types: UnitType[];
    videos: string[];
    status: string;
    slugs: Slug;
    favorite: boolean;
    full_images_data: FullImage[];
    master_layouts: any[];
    master_plans: any[];
    brochure: string;
    is_delivered: boolean;
    order_ranking: number;
    sdcs: any[];
    main_image: string;
    delivery_year: string;
    maintenance_fees: number;
    sold_out: boolean;
}

export interface Developer {
    id: number;
    main_image: string;
    name: Name;
    description: Description;
    slug: string;
    slugs: Slug;
    mobile: string;
    email: string;
    website: string;
    address: Address;
    status: string;
    order_ranking: number;
    projects_count: number;
    resale_count: number;
    logo: string;
    cover_image: string;
}

export interface Location {
    id: number;
    main_image: string;
    name: Name;
    slug: string;
    type: string;
    status: string;
    image: string;
    units_count: any;
    coords: Coord[];
    order_ranking: any;
    videos: string[];
    images: string[];
    min_down_payment: number;
    min_month_payment: number;
    min_start_price: number;
    projects_count: number;
}

export interface Amenity {
    id: number;
    main_image: string;
    name: Name;
    slug: Slug;
    description: Description;
    status: string;
    logo: string;
}

export interface UnitType {
    id: number;
    main_image: string;
    name: Name;
    slug: string;
    status: string;
    icon: string;
    is_residentail: boolean;
    is_commercial: boolean;
}

export interface Name extends Locale {}

export interface Description extends Locale {}

export interface Address extends Locale {}

export interface Slug extends Locale {}

export interface Locale {
    en: string;
    ar: string;
}

export interface Coord {
    lat: number;
    lng: number;
}

export interface FullImage {
    id: number;
    image: string;
}

export interface Unit {
    id: number;
    title: Name;
    address: Address;
    status: string;
    sale_type: string;
    flag: string;
    type: string;
    slug: string;
    description: string;
    short_description: string;
    bedroom: number;
    bathroom: number;
    area: number;
    price: number;
    lat: string;
    duration: string;
    min_down_payment: number;
    min_month_payment: number;
    keywords: string;
    creator_id: number;
    agent_id: number;
    project_id: number;
    developer_id: number;
    state_id: number;
    city_id: any;
    unit_type_id: number;
    contact_mobile: any;
    min_recurring_payment: any;
    installments_count: any;
    payment_type: string;
    slug_ar: string;
    slug_en: string;
    main_image: string;
    images: string[];
    images_webp: string[];
    project: Project;
    developer: Developer;
    creator: Creator;
    agent: Agent;
    state: State;
    city: any;
    amenities: Amenity[];
    videos: any[];
    landmarks: Landmark[];
    _geo: Geo;
    notes: any;
    order_ranking: any;
    UnitType: UnitType;
    lng: string;
    reference: number;
    static_image_map: string;
    sold_out: boolean;
}

export interface Medum {
    id: number;
    model_type: string;
    model_id: number;
    uuid: string;
    collection_name: string;
    name: string;
    file_name: string;
    mime_type: string;
    disk: string;
    conversions_disk: string;
    size: number;
    manipulations: any[];
    custom_properties: any[];
    generated_conversions: any;
    responsive_images: any[];
    order_column: number;
    created_at: string;
    updated_at: string;
    original_url: string;
    preview_url: string;
}

export interface Creator {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
    created_at: string;
    updated_at: string;
    mobile: any;
    social_token: any;
    social_platform: any;
    default_language: string;
}

export interface Agent {
    name: string;
    mobile: string;
    mail: string;
    whatsapp: string;
}

export interface Landmark {
    id: number;
    title: Title;
    lat: string;
    lng: string;
    created_at: string;
    updated_at: string;
    pivot: Pivot2;
}

export interface State {
    id: number;
    name: string;
    parent_id: any;
    slug: string;
    status: string;
    type: string;
    coords: Coord2[];
    order_ranking: any;
}

export interface Title {
    en: string;
}

export interface Pivot2 {
    landmarkable_id: number;
    landmark_id: number;
    landmarkable_type: string;
}

export interface Geo {
    lat: number;
    lng: number;
}
export interface NewLaunch {
    id: number;
    title: string;
    slug: string;
    description: string;
    status: string;
    main_image: string;
    developer: Developer;
}

export interface InvalidUser {
    message: string;
}

// auth types
type ErrorKey =
    | 'name'
    | 'email'
    | 'password'
    | 'password_confirmation'
    | 'token';

type CustomError = Record<ErrorKey, string[]>;

export interface Auth extends User {
    data: User | InvalidUser;
    meta: Meta;
    iat: number;
    exp: number;
    jti: string;
    message?: string;
    errors?: CustomError;
    failed?: string;
}

export interface User {
    id: number;
    name: string;
    email: string;
    platform: null;
    social_token: null;
    mobile: string;
    default_language: string;
    avatar: string;
    created_at: string;
    updated_at: string;
}

export interface Meta {
    token: string;
}

declare module 'next-auth' {
    interface Session {
        auth: Auth;
    }
}

// wishlist type
type WishlistItemType = Project | Unit;

// compare type
type CompareItemType = Project | Unit;
export interface Bounds {
    lat1?: number;
    lng1?: number;
    lat2?: number;
    lng2?: number;
}
export interface UnitFeatures {
    id: number;
    name: string;
    slug: string;
}
export interface ResponseMeta {
    curren_page: number;
    from: number;
    last_page: number;
    links: string[];
    path: string;
    per_page: number;
    to: number;
    total: number;
}

export interface Link {
    url: null | string;
    label: string;
    active: boolean;
}

export interface DeveloperDetailsResponse {
    id: number;
    name: string;
    description: string;
    meta_title: string;
    meta_description: string;
    slug: string;
    mobile: string;
    whatsapp: string;
    email: string;
    website: string;
    address: string;
    status: string;
    order_ranking: number;
    projects_count: number;
    resale_count: number;
    logo: string;
    cover_image: string;
    projects: Project[];
    amenities: Amenity[];
    units: Unit[];
    is_offer: boolean;
    offer_description: string;
}

type TranslationKeys = string;

export type NextIntlGetTranslatorFunction = <TargetKey extends TranslationKeys>(
    key: TargetKey,
    values?: Record<string, string>
) => string;
