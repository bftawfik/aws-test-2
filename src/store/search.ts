import { create } from 'zustand';
import { sortArray, sortStringArray } from '@/helpers/get-sorted-array';
import { State, Action } from '@/interfaces/store/SearchStore';
import { DEFAULT_SALE_TYPE_VALUE } from '@/constants/store';

const initialState = {
    tab: '',
    //text
    text: [],
    //ready to move
    readyToMove: false,
    //sale type state
    saleType: sortStringArray(DEFAULT_SALE_TYPE_VALUE),
    //unit type state
    type: '',
    unitTypeList: [],
    //area
    area: { from: 0, to: 0 },
    //beds
    beds: [],
    //baths
    baths: [],
    //features
    unitFeatures: [],
    // amenities
    amenities: [],
    //price
    price: { from: 0, to: 0 },
    //installment
    installment: { from: 0, to: 0 },
    //downPayment
    downPayment: { from: 0, to: 0 },
    //locations
    locations: [],
    //projects
    projects: [],
    //developers
    developers: [],
    sortByValue: 'default',
};

export const useSearchStore = create<State & Action>()((set) => ({
    ...initialState,
    //reset
    reset: () => {
        set(initialState);
    },

    //ready to move
    setReady: (newValue) => set({ readyToMove: newValue }),

    //sale type methods
    setSaleTypeList: (saleTypeArr) =>
        set(() => ({ saleType: sortStringArray(saleTypeArr) })),
    updateSaleType: (saleType) => {
        return set((state) =>
            state.saleType.includes(saleType.toLowerCase())
                ? {
                      saleType: state.saleType.filter(
                          (type) =>
                              type.toLowerCase() !== saleType.toLowerCase()
                      ),
                  }
                : {
                      saleType: sortStringArray([
                          ...state.saleType,
                          saleType.toLowerCase(),
                      ]),
                  }
        );
    },
    resetSaleType: () => set(() => ({ saleType: [] })),
    //unit type update function
    setType: (type) => set(() => ({ type: type, unitTypeList: [] })),
    setUnitTypeList: (units) =>
        set(() => ({ unitTypeList: sortArray([...units]) })),
    resetTypeList: () => set(() => ({ type: '', unitTypeList: [] })),
    //area
    setArea: (newArea) => set(() => ({ area: newArea })),
    resetArea: () => set(() => ({ area: { from: 0, to: 0 } })),
    //beds
    setBeds: (newBeds) => set(() => ({ beds: newBeds.sort() })),
    resetBeds: () =>
        set(() => ({
            beds: [],
        })),
    //baths
    setBaths: (newBaths) => set(() => ({ baths: newBaths.sort() })),
    resetBaths: () =>
        set(() => ({
            baths: [],
        })),
    //Developers
    setAllDevelopers: (developers) => {
        const sortedDevelopers = sortArray([...developers]);
        set({ developers: sortedDevelopers });
    },
    setDevelopers: (developer) =>
        set((state) =>
            state.developers.filter((dev) => dev.id === developer.id).length > 0
                ? {}
                : { developers: sortArray([...state.developers, developer]) }
        ),
    removeDeveloper: (developer) =>
        set((state) => ({
            developers: state.developers.filter(
                (item) => item.id !== developer.id
            ),
        })),
    // Locations methods
    setAllLocations: (locations) => {
        const sortedLocations = sortArray([...locations]);
        set({ locations: sortedLocations });
    },

    setLocations: (location) =>
        set((state) =>
            state.locations.some((item) => item.id === location.id)
                ? {}
                : { locations: sortArray([...state.locations, location]) }
        ),
    removeLocation: (location) =>
        set((state) => ({
            locations: state.locations.filter(
                (item) => item.id !== location.id
            ),
        })),
    // Projects methods

    setAllProjects: (projects) => {
        const sortedProjects = sortArray([...projects]);
        set({ projects: sortedProjects });
    },
    setProjects: (project) =>
        set((state) =>
            state.projects.some((item) => item.id === project.id)
                ? {}
                : { projects: sortArray([...state.projects, project]) }
        ),
    removeProject: (project) =>
        set((state) => ({
            projects: state.projects.filter((item) => item.id !== project.id),
        })),
    setText: (text) =>
        set((state) =>
            state.text.includes(text)
                ? {}
                : { text: [...state.text, text].sort() }
        ),
    setTextList: (textList) => set(() => ({ text: sortStringArray(textList) })),
    removeText: (text) =>
        set((state) => ({ text: state.text.filter((item) => item !== text) })),
    resetText: () => set({ text: [] }),
    //pricing
    setPrice: (newValue) => set({ price: newValue }),
    //downPayment
    setDownPayment: (newValue) => set({ downPayment: newValue }),
    //installments
    setInstallment: (newValue) => set({ installment: newValue }),

    //resetPricig
    resetPricingValues: () =>
        set({
            price: { from: 0, to: 0 },
            downPayment: { from: 0, to: 0 },
            installment: { from: 0, to: 0 },
        }),
    //features
    setFeatures: (newFeatures) => {
        const sortedFeatures = sortArray([...newFeatures]);
        set({ unitFeatures: sortedFeatures });
    },
    resetFeatures: () => set({ unitFeatures: [] }),
    //amenities
    setAmenities: (newAmenities) => {
        const sortedAmenities = sortArray([...newAmenities]);
        set({ amenities: sortedAmenities });
    },
    resetAmenities: () => set({ amenities: [] }),
    homeModalApply: (area, beds, baths, features, ameniteis) =>
        set({
            area: area,
            beds: beds,
            baths: baths,
            unitFeatures: features,
            amenities: ameniteis,
        }),
    homeModalReset: () =>
        set({
            area: { from: 0, to: 0 },
            beds: [],
            baths: [],
            unitFeatures: [],
            amenities: [],
            readyToMove: false,
            saleType: ['primary', 'resale'],
        }),
    mobileModalApply: (
        type,
        unitTypeList,
        area,
        beds,
        baths,
        price,
        downPayment,
        installment,
        features,
        amenties
    ) =>
        set({
            type: type,
            unitTypeList: unitTypeList,
            area: area,
            beds: beds,
            baths: baths,
            price: price,
            downPayment: downPayment,
            installment: installment,
            unitFeatures: features,
            amenities: amenties,
        }),
    mobileModalReset: () =>
        set({
            type: 'residential',
            unitTypeList: [],
            area: { from: 0, to: 0 },
            beds: [],
            baths: [],
            unitFeatures: [],
            amenities: [],
            readyToMove: false,
            saleType: sortStringArray(DEFAULT_SALE_TYPE_VALUE),
        }),
    setTab: (activeTab) => set({ tab: activeTab }),
    setAllStore: (newStoreData) => set({ ...newStoreData }),
    setSortBy: (newValue) => set({ sortByValue: newValue }),
}));
