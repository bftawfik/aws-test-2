import {
    DISCOVER_VIEW_SESSION_STORAGE_KEY,
    GRID_VIEW,
    LARGEST_SCREEN_SIZE,
    LIST_VIEW,
    WISHLIST_SECTIONS_KEYS,
} from '@/constants';
import { CompareItemType, Name, Project, Unit, UnitType } from '@/types';
import { useWindowSize } from 'react-use';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface FormData {
    name: string;
    email: string;
    phoneNumber: string;
    password: string;
    password_confirmation: string;
}
interface ModalState {
    modalIsOpen: boolean;
    modalName: string;
    formData: FormData;
    openModal: (newVal: boolean) => void;
    setdata: (newData: FormData) => void;
    setModalName: (newVal: string) => void;
}
export const useStore = create<ModalState>()((set) => ({
    modalIsOpen: false,
    modalName: '',
    formData: {
        name: '',
        email: '',
        phoneNumber: '',
        password: '',
        password_confirmation: '',
    },
    openModal: (newVal: boolean) => set(() => ({ modalIsOpen: newVal })),
    setdata: (newData: FormData) => set(() => ({ formData: newData })),
    setModalName: (newVal: string) => set(() => ({ modalName: newVal })),
}));

// drawer component
interface DrawerState {
    drawerIsOpen: boolean;
    drawerName: string;
    openDrawer: (newVal: boolean) => void;
    setDrawerName: (newVal: string) => void;
}

export const useDrawerStore = create<DrawerState>()((set) => ({
    drawerIsOpen: false,
    drawerName: '',
    openDrawer: (newVal: boolean) => set(() => ({ drawerIsOpen: newVal })),
    setDrawerName: (newVal: string) => set(() => ({ drawerName: newVal })),
}));

// compare store
interface CompareState {
    compare_type: string;
    compare_items: CompareItemType[];
    setCompareType: (newVal: string) => void;
    setCompareItems: (newVal: CompareItemType[]) => void;
}

export const useCompareStore = create<CompareState>()((set) => ({
    compare_type: '',
    compare_items: [],
    setCompareType: (newVal: string) => set(() => ({ compare_type: newVal })),
    setCompareItems: (newVal: CompareItemType[]) =>
        set(() => ({ compare_items: newVal })),
}));

// wishlist store
export interface WishlistItem extends Partial<Project> {
    type?: string;
    id?: number;
    main_image?: string;
    name?: Name;
    slug?: string;
    status?: string;
    icon?: string;
    is_residentail?: boolean;
    is_commercial?: boolean;
}
interface WishlistState {
    wishlist: WishlistItem[];
    setWishlist: (newVal: WishlistItem) => void;
}

export const useWishlistStore = create<WishlistState>()(
    persist<WishlistState>(
        (set) => ({
            wishlist: [],

            setWishlist: (newVal: WishlistItem) =>
                set((state) => {
                    const newValue = state.wishlist.some(
                        (val) => val.id === newVal.id
                    )
                        ? state.wishlist.filter((item) => item.id !== newVal.id)
                        : [...state.wishlist, newVal];
                    return { wishlist: newValue };
                }),
        }),
        {
            name: 'wishlist',
            storage: createJSONStorage(() => localStorage),
            partialize: (state) =>
                ({
                    wishlist: state.wishlist,
                } as WishlistState),
        }
    )
);

// wishlist store
interface DiscoverState {
    discoverView?: string;
    discoverUnits: Unit[];
    discoverProjects: Project[];
    discoverNeighborhoods: Location[];
    setDiscoverView: (newVal: string) => void;
    setDiscoverUnits: (newVal: Unit[]) => void;
    setDiscoverProjects: (newVal: Project[]) => void;
    setDiscoverNeighborhoods: (newVal: Location[]) => void;
}
interface DiscoverViewSS {
    state: {
        discoverView: string;
    };
}

export const useDiscoverStore = create<DiscoverState>()(
    persist<DiscoverState>(
        (set) => {
            const width = typeof window !== 'undefined' ? window.innerWidth : 0;
            const isInfinity = !isFinite(width);
            const discoverViewStrSS =
                typeof window !== 'undefined'
                    ? sessionStorage.getItem(DISCOVER_VIEW_SESSION_STORAGE_KEY)
                    : undefined;
            const discoverViewObjSS = discoverViewStrSS
                ? (JSON.parse(discoverViewStrSS as string) as DiscoverViewSS)
                : undefined;
            const discoverViewSS = discoverViewObjSS?.state.discoverView;

            const defaultDiscoverView = GRID_VIEW;
            const defaultDiscoverViewMobile = LIST_VIEW;

            const isSmallScreen = width < LARGEST_SCREEN_SIZE;
            const discoverView = isInfinity
                ? undefined
                : discoverViewSS
                ? isSmallScreen
                    ? discoverViewSS === GRID_VIEW
                        ? defaultDiscoverViewMobile
                        : discoverViewSS
                    : discoverViewSS
                : isSmallScreen
                ? defaultDiscoverViewMobile
                : defaultDiscoverView;
            return {
                discoverView: discoverView,
                discoverUnits: [],
                discoverProjects: [],
                discoverNeighborhoods: [],
                setDiscoverView: (newVal: string) => {
                    set(() => ({ discoverView: newVal }));
                },
                setDiscoverUnits: (newVal: Unit[]) =>
                    set(() => ({ discoverUnits: newVal })),
                setDiscoverProjects: (newVal: Project[]) =>
                    set(() => ({ discoverProjects: newVal })),
                setDiscoverNeighborhoods: (newVal: Location[]) =>
                    set(() => ({ discoverNeighborhoods: newVal })),
            };
        },
        {
            name: DISCOVER_VIEW_SESSION_STORAGE_KEY,
            storage: createJSONStorage(() => sessionStorage),
            partialize: (state) =>
                ({
                    discoverView: state.discoverView,
                } as DiscoverState),
        }
    )
);

// map store

export interface latlng {
    lat: number;
    lng: number;
}
interface MapStore {
    zoomLevel: number | undefined;
    setZoomLevel: (newVal: number | undefined) => void;
    resetZoomLevel: () => void;
    bounds: number[];
    setBounds: (newVal: number[]) => void;
    center: latlng;
    setCenter: (newVal: latlng) => void;
    resetCenter: () => void;
    resetBounds: () => void;
}

export const useMapStore = create<MapStore>()((set) => ({
    zoomLevel: 13,
    setZoomLevel: (newVal: number | undefined) =>
        set(() => ({ zoomLevel: newVal })),
    resetZoomLevel: () => set(() => ({ zoomLevel: 13 })),
    bounds: [],
    setBounds: (newVal: number[]) => set(() => ({ bounds: newVal })),
    center: { lat: 30.0074, lng: 31.4913 },
    setCenter: (newVal: latlng) => set(() => ({ center: newVal })),
    resetCenter: () => set(() => ({ center: { lat: 30.0074, lng: 31.4913 } })),
    resetBounds: () => set(() => ({ bounds: [] })),
}));
// verification store
interface LoginInfo {
    email: string;
    password: string | number;
}
interface VerificationState {
    verificationView: string;
    setVerificationView: (newVal: string) => void;
    verificationToken: string;
    setVerificationToken: (newVal: string) => void;
    loginInfo: LoginInfo;
    setLoginInfo: (key: string, value: string | number) => void;
    otpEmail: string;
    setOtpEmail: (newVal: string) => void;
}

export const useVerificationStore = create<VerificationState>()((set) => ({
    verificationView: 'verify-with-otp',
    setVerificationView: (newVal: string) =>
        set(() => ({ verificationView: newVal })),
    verificationToken: '',
    setVerificationToken: (newVal: string) =>
        set(() => ({ verificationToken: newVal })),
    loginInfo: {
        email: '',
        password: '',
    },
    setLoginInfo: (key, value) => {
        set((state) => ({
            loginInfo: {
                ...state.loginInfo, // Preserve the existing keys
                [key]: value, // Set the new key-value pair
            },
        }));
    },
    otpEmail: '',
    setOtpEmail: (newVal: string) => set(() => ({ otpEmail: newVal })),
}));

interface PageState {
    currentPage: number;
    setPageNumber: (PageNum: number) => void;
    resetPageNumber: () => void;
}
export const usePageStore = create<PageState>()((set) => ({
    currentPage: 1,
    setPageNumber: (PageNum) => set({ currentPage: PageNum }),
    resetPageNumber: () => set({ currentPage: 1 }),
}));
interface DevelopersSearchState {
    searchTerm: string;
    setSearchTerm: (value: string) => void;
    resetSearchTerm: () => void;
}
export const useDevelopersSearchStore = create<DevelopersSearchState>()(
    (set) => ({
        searchTerm: '',
        setSearchTerm: (value) => set({ searchTerm: value }),
        resetSearchTerm: () => set({ searchTerm: '' }),
    })
);
