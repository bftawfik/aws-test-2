'use client';
import { MobileSearch } from '@/ui/search/mobile-search';
import SearchBar from '../../search/home-search/search-bar';
import SearchPrice from '../../search/home-search/search-price';
import { useCallback, useEffect, useMemo } from 'react';
import SearchBeds from '../../search/home-search/search-beds';
import CustomDropdown from '@/ui/custom-dropdown';
import SearchType from '@/ui/search/home-search/search-type';
import AdvancedSearch from './advanced-search';
import PropertyTypesComp from '@/ui/search/home-search/filter-modal/property-types';
import ReadyToMove from '@/ui/search/home-search/filter-modal/ready-to-move';
import AreaComponent from '@/ui/discover/discover-search/area';
import { useQueries } from '@tanstack/react-query';
import getUnitFeatures from '@/actions/unit-features/get-unit-features';
import { Amenity, UnitFeatures, UnitType } from '@/types';
import { useSearchStore } from '@/store/search';
import { HomeBorderedIcon } from '@/ui/svg';
import { parseUrl } from '@/helpers/url-segments';
import {
    NameAndId,
    ParsedObject,
    RangeKeys,
} from '@/interfaces/UrlSegmentsKeys';

import {
    arrayOfObjectsNotEqual,
    arrayOfStringsNotEqual,
    objectsOfFromToNotEqual,
    stringsOrBooleanNotEqual,
} from '@/helpers/search';
import DiscoverSearchButton from './searchButton';
import getUnitTypes from '@/actions/unit-types/get-unit-types';
import getAmenities from '@/actions/amenities/get-amenities';
import {
    BOUNDS_SHORT,
    DEFATULT_EMPTY_URL,
    GRID_VIEW,
    LIST_VIEW,
} from '@/constants';
import ResetButton from './resetButton/resetButton';
import { useDiscoverStore, usePageStore } from '@/store/global';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';
import {
    generateUrl,
    useGenerateUrl,
} from '@/hooks/useGenerateUrl/useGenerateUrl';
import { useTempStore } from '@/store/temp-search';
import { sortArray } from '@/helpers/get-sorted-array';
import NotificationDot from '@/ui/notification-badge/brand-notification';
import SortDropdown from '@/ui/SortDropdown/SortDropdown';
interface DiscoverSearchProps {
    url: string;
}
function DiscoverSearch({ url }: DiscoverSearchProps) {
    // Read localization
    const locale = useLocale();
    const searchParams = useSearchParams();
    const bounds = searchParams.get(BOUNDS_SHORT) || '';

    // Read translations
    const tGlobal = useTranslations('global');
    const { sortByValue, setSortBy } = useSearchStore();
    const router = useRouter();

    let [{ data: unitType }, { data: amenitiesList }, { data: featuresList }] =
        useQueries({
            queries: [
                {
                    queryKey: ['unit_types'],
                    queryFn: () => getUnitTypes('', locale),
                },
                {
                    queryKey: ['amenities'],
                    queryFn: () => getAmenities('', locale),
                },
                {
                    queryKey: ['unit_features'],
                    queryFn: () => getUnitFeatures(locale),
                },
            ],
        });

    unitType = unitType?.data as UnitType[];
    amenitiesList = amenitiesList?.data as Amenity[];
    featuresList = featuresList?.data as UnitFeatures[];

    const residential = unitType?.filter((unit: any) => unit.is_residentail);
    const commercial = unitType?.filter((unit: any) => unit.is_commercial);

    const {
        setSaleTypeList,
        setUnitTypeList,
        setAllDevelopers,
        setAllLocations,
        setAllProjects,
        setArea,
        setBeds,
        setBaths,
        setPrice,
        setDownPayment,
        setInstallment,
        setReady,
        setFeatures,
        setAmenities: setCurrentAmn,
        setTextList,
        setType,
        setTab,
        reset,
    } = useSearchStore();
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
    } = useSearchStore();
    const {
        resetTempPricingValues,
        tempPrice,
        tempDownPayment,
        tempInstallment,
        tempType,
        tempUnitTypeList,
        resetTempTypeList,
        resetTempStore,
    } = useTempStore();
    const { setPageNumber, currentPage } = usePageStore();
    const setParsedValuesToStore = useCallback(
        (currentStoreData: ParsedObject) => {
            //setting sale type array to store

            const saleTypeUpdatable = arrayOfStringsNotEqual(
                (currentStoreData?.satp ||
                    DEFATULT_EMPTY_URL.tempSaleType) as string[],
                saleType
            );
            saleTypeUpdatable &&
                setSaleTypeList(
                    (currentStoreData.satp ||
                        DEFATULT_EMPTY_URL.tempSaleType) as string[]
                );

            //setting developers to store

            const developerUpdatable = arrayOfObjectsNotEqual(
                (currentStoreData.dev ||
                    DEFATULT_EMPTY_URL.tempDevelopers) as NameAndId[],
                developers
            );
            developerUpdatable &&
                setAllDevelopers(
                    (currentStoreData.dev ||
                        DEFATULT_EMPTY_URL.tempDevelopers) as NameAndId[]
                );

            //setting location to store

            const locationUpdatable = arrayOfObjectsNotEqual(
                (currentStoreData.loc ||
                    DEFATULT_EMPTY_URL.tempLocations) as NameAndId[],
                locations
            );
            locationUpdatable &&
                setAllLocations(
                    (currentStoreData.loc ||
                        DEFATULT_EMPTY_URL.tempLocations) as NameAndId[]
                );

            //setting projects to store

            const projectUpdatable = arrayOfObjectsNotEqual(
                (currentStoreData.prj ||
                    DEFATULT_EMPTY_URL.tempProjects) as NameAndId[],
                projects
            );
            projectUpdatable &&
                setAllProjects(
                    (currentStoreData.prj ||
                        DEFATULT_EMPTY_URL.tempProjects) as NameAndId[]
                );

            //setting type and unit type list to store
            const typUpdatable = stringsOrBooleanNotEqual(
                (currentStoreData.type ||
                    DEFATULT_EMPTY_URL.tempType) as string,
                type
            );

            typUpdatable &&
                setType(
                    (currentStoreData.type ||
                        DEFATULT_EMPTY_URL.tempType) as string
                );

            const uniTypeUpdatable = arrayOfObjectsNotEqual(
                (currentStoreData.tp ||
                    DEFATULT_EMPTY_URL.tempUnitTypeList) as NameAndId[],
                unitTypeList
            );
            uniTypeUpdatable &&
                setUnitTypeList(
                    (currentStoreData.tp ||
                        DEFATULT_EMPTY_URL.tempUnitTypeList) as NameAndId[]
                );
            //setting area to store

            const areaUpdatable = objectsOfFromToNotEqual(
                (currentStoreData.sqm ||
                    DEFATULT_EMPTY_URL.tempArea) as RangeKeys,
                area
            );
            areaUpdatable &&
                setArea(
                    (currentStoreData.sqm ||
                        DEFATULT_EMPTY_URL.tempArea) as RangeKeys
                );
            //update beds list
            const bedsListUpdatable = arrayOfStringsNotEqual(
                (currentStoreData.bd ||
                    DEFATULT_EMPTY_URL.tempBeds) as number[],
                beds
            );
            bedsListUpdatable &&
                setBeds(
                    (currentStoreData.bd ||
                        DEFATULT_EMPTY_URL.tempBeds) as number[]
                );
            //update baths list to store

            const bathsListUpdatable = arrayOfStringsNotEqual(
                (currentStoreData.bth ||
                    DEFATULT_EMPTY_URL.tempBeds) as number[],
                baths
            );
            bathsListUpdatable &&
                setBaths(
                    (currentStoreData.bth ||
                        DEFATULT_EMPTY_URL.tempBeds) as number[]
                );
            const pricListUpdatable = objectsOfFromToNotEqual(
                (currentStoreData.pr ||
                    DEFATULT_EMPTY_URL.tempPrice) as RangeKeys,
                price
            );
            pricListUpdatable &&
                setPrice(
                    (currentStoreData.pr ||
                        DEFATULT_EMPTY_URL.tempPrice) as RangeKeys
                );

            //down paymant setting to store
            const downPaymentUpdatabel = objectsOfFromToNotEqual(
                (currentStoreData.dp ||
                    DEFATULT_EMPTY_URL.tempDownPayment) as RangeKeys,
                downPayment
            );

            downPaymentUpdatabel &&
                setDownPayment(
                    (currentStoreData.dp ||
                        DEFATULT_EMPTY_URL.tempDownPayment) as RangeKeys
                );

            const installmentUpdatable = objectsOfFromToNotEqual(
                (currentStoreData.ins ||
                    DEFATULT_EMPTY_URL.tempInstallment) as RangeKeys,
                installment
            );
            installmentUpdatable &&
                setInstallment(
                    (currentStoreData.ins ||
                        DEFATULT_EMPTY_URL.tempInstallment) as RangeKeys
                );
            const readyUpdatable = stringsOrBooleanNotEqual(
                (currentStoreData.rtm ||
                    DEFATULT_EMPTY_URL.tempReadyToMove) as boolean,
                readyToMove
            );
            readyUpdatable &&
                setReady(
                    (currentStoreData.rtm ||
                        DEFATULT_EMPTY_URL.tempReadyToMove) as boolean
                );

            //amenities list setting to store
            const amenitiesUpdatabel = arrayOfObjectsNotEqual(
                (currentStoreData.amn ||
                    DEFATULT_EMPTY_URL.tempAmenities) as NameAndId[],
                amenities
            );
            amenitiesUpdatabel &&
                setCurrentAmn(
                    (currentStoreData.amn ||
                        DEFATULT_EMPTY_URL.tempAmenities) as NameAndId[]
                );
            //features list setting to store
            const feautesUpdatable = arrayOfObjectsNotEqual(
                (currentStoreData.feat ||
                    DEFATULT_EMPTY_URL.tempUnitFeatures) as NameAndId[],
                unitFeatures
            );

            feautesUpdatable &&
                setFeatures(
                    (currentStoreData.feat ||
                        DEFATULT_EMPTY_URL.tempUnitFeatures) as NameAndId[]
                );

            const textUpdatable = arrayOfStringsNotEqual(
                (currentStoreData.txt ||
                    DEFATULT_EMPTY_URL.tempText) as string[],
                text
            );
            textUpdatable &&
                setTextList(
                    (currentStoreData.txt ||
                        DEFATULT_EMPTY_URL.tempText) as string[]
                );
            const currentTabEditable = stringsOrBooleanNotEqual(
                (currentStoreData.tab || DEFATULT_EMPTY_URL.tempTab) as string,
                tab
            );
            currentTabEditable &&
                setTab(
                    (currentStoreData.tab ||
                        DEFATULT_EMPTY_URL.tempTab) as string
                );
            const pageNumberEditable = currentStoreData.pg !== currentPage;
            pageNumberEditable &&
                setPageNumber((currentStoreData.pg || 1) as number);

            const sortByEditable = currentStoreData.sort !== sortByValue;
            sortByEditable &&
                setSortBy((currentStoreData.sort || 'default') as string);
        },

        [
            amenities,
            unitFeatures,
            area,
            beds,
            developers,
            baths,
            downPayment,
            locations,
            price,
            installment,
            projects,
            readyToMove,
            saleType,
            tab,
            text,
            type,
            unitTypeList,
            setAllLocations,
            setBaths,
            setAllProjects,
            setAllDevelopers,
            setArea,
            setBeds,
            setCurrentAmn,
            setDownPayment,
            setPrice,
            setReady,
            setTab,
            setSaleTypeList,
            setInstallment,
            setFeatures,
            setTextList,
            setUnitTypeList,
            setType,
            setPageNumber,
            currentPage,
            sortByValue,
            setSortBy,
        ]
    );
    const searchState = {
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
    };

    const handleReadyToMoveChange = () => {
        const readyToMoveChangeUrl = generateUrl(searchState, locale, {
            tempReadyToMove: !readyToMove,
            tempPage: DEFATULT_EMPTY_URL.tempPage,
        });
        router.push(readyToMoveChangeUrl);
    };

    const searchTypeResetUrl = useGenerateUrl({
        tempType: '',
        tempUnitTypeList: [],
        tempPage: DEFATULT_EMPTY_URL.tempPage,
    });
    const handlSearchTypeReset = () => {
        router.push(searchTypeResetUrl);
        resetTempTypeList();
    };
    const resetingSearchPriceUrl = useGenerateUrl({
        tempPrice: DEFATULT_EMPTY_URL.tempPrice,
        tempDownPayment: DEFATULT_EMPTY_URL.tempDownPayment,
        tempInstallment: DEFATULT_EMPTY_URL.tempInstallment,
        tempPage: DEFATULT_EMPTY_URL.tempPage,
    });
    const handleSearchPriceReset = () => {
        resetTempPricingValues();
        router.push(resetingSearchPriceUrl);
    };
    const handlePriceApply = () => {
        const priceUpdatedUrl = generateUrl(searchState, locale, {
            tempPrice: tempPrice || undefined,
            tempInstallment: tempInstallment || undefined,
            tempDownPayment: tempDownPayment || undefined,
            tempPage: DEFATULT_EMPTY_URL.tempPage,
        });
        router.push(priceUpdatedUrl);
        resetTempPricingValues();
    };
    const searchTypeUrl = useGenerateUrl({
        tempType: !tempType ? type : tempType,
        tempUnitTypeList: !tempUnitTypeList
            ? unitTypeList
            : sortArray([...tempUnitTypeList]),
        tempPage: DEFATULT_EMPTY_URL.tempPage,
    });
    const handleSearchTypeApply = () => {
        router.push(searchTypeUrl);
        resetTempTypeList();
    };

    useEffect(() => {
        const parsedObjectFromUrl = parseUrl(url);
        setParsedValuesToStore(parsedObjectFromUrl);
        return () => {
            // reset();
            // resetTempStore();
        };
    }, [url, setParsedValuesToStore, resetTempStore, reset]);

    const { discoverView } = useDiscoverStore();

    const handleSortBy = (value: string) => {
        const url = generateUrl(searchState, locale, {
            tempSort: value,
        });
        router.push(url);
    };
    // Filter updated check
    const areaUpdated = Object.values(area).every((v) => v !== 0);
    const ableToSort =
        tab === 'units' &&
        (discoverView === GRID_VIEW || discoverView === LIST_VIEW);
    return (
        <>
            <div className="z-40 hidden h-16 w-full items-center border-b border-gray-100 bg-white lg:flex">
                {/* Search bar*/}
                <div className="group flex h-16 flex-auto items-center border-e border-gray-100">
                    <SearchBar />
                </div>

                {/* Unit types */}
                <SearchType
                    commercial={commercial}
                    residential={residential}
                    handleReset={handlSearchTypeReset}
                    handleApply={handleSearchTypeApply}
                />

                {/* Area */}
                <div className="group flex h-16 cursor-pointer items-center border-e border-gray-100 transition-colors hover:bg-gray-50">
                    <div className="relative inline-block h-16">
                        {areaUpdated && (
                            <NotificationDot classes="z-50 end-0 -top-1" />
                        )}

                        <CustomDropdown
                            icon={<HomeBorderedIcon />}
                            label={`${tGlobal('area')} ( ${tGlobal(
                                'meter_square'
                            )})`}
                        >
                            <div className="p-3">
                                <AreaComponent />
                            </div>
                        </CustomDropdown>
                    </div>
                </div>

                {/* <!-- Beds and baths --> */}

                <SearchBeds />

                {/* <!-- Price --> */}

                <SearchPrice
                    handleReset={handleSearchPriceReset}
                    handleApply={handlePriceApply}
                />

                {/* Actions */}

                <div className="flex h-16 items-center gap-x-3 rounded-e-xl p-4">
                    <AdvancedSearch
                        amenitiesList={amenitiesList}
                        featuresList={featuresList}
                    />
                    <DiscoverSearchButton />
                </div>
            </div>
            <div className="hidden items-center justify-between border-b px-3 lg:flex">
                <div className="flex items-center justify-between">
                    <PropertyTypesComp withHeader={false} isDiscover={true} />
                    <div className="inline-flex w-56 self-center ">
                        <ReadyToMove handleChange={handleReadyToMoveChange} />
                    </div>
                </div>
                {/* Sort by button will use it when its API is ready  */}
                <div className="flex w-auto items-center gap-4">
                    {ableToSort ? (
                        <SortDropdown
                            sortCurrentValue={sortByValue}
                            handleSortBy={handleSortBy}
                        />
                    ) : null}
                    <ResetButton />
                </div>
            </div>
            <div className="es-container">
                <MobileSearch
                    url={url}
                    className="flex w-full lg:hidden"
                    amenitiesList={amenitiesList}
                    unitFeaturesList={featuresList}
                    commercial={commercial}
                    residential={residential}
                />
            </div>
        </>
    );
}

export default DiscoverSearch;
