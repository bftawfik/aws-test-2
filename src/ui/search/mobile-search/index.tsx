import { useCallback, useEffect } from 'react';
import { Locale } from '../../../config/i18n-config';
import BuyRent from './buy-rent';
import MobileFilterModal from './filter-modal';
import { MobileSearchProps } from './mobile-search';
import SearchBarModal from './search-bar-modal';
import { parseUrl } from '@/helpers/url-segments';
import { DEFATULT_EMPTY_URL } from '@/constants';
import { useSearchStore } from '@/store/search';
import { usePageStore } from '@/store/global';
import {
    arrayOfObjectsNotEqual,
    arrayOfStringsNotEqual,
    objectsOfFromToNotEqual,
    stringsOrBooleanNotEqual,
} from '@/helpers/search';
import {
    NameAndId,
    ParsedObject,
    RangeKeys,
} from '@/interfaces/UrlSegmentsKeys';
export const MobileSearch = ({
    className,
    amenitiesList,
    unitFeaturesList,
    residential,
    commercial,
    url,
}: Partial<MobileSearchProps>) => {
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
        ]
    );

    useEffect(() => {
        if (url) {
            const parsedObjectFromUrl = parseUrl(url);
            setParsedValuesToStore(parsedObjectFromUrl);
        }
    }, [url, setParsedValuesToStore]);

    return (
        <div className="flex w-full flex-col gap-y-4">
            <BuyRent />
            <div className={`mx-auto h-16 w-full text-center ${className}`}>
                <div className="flex h-full w-full items-center justify-between gap-1 rounded-xl border border-gray-200 bg-white p-2 shadow-md ">
                    <SearchBarModal />
                    <MobileFilterModal
                        residential={residential}
                        unitFeaturesList={unitFeaturesList!}
                        commercial={commercial}
                        amenitiesList={amenitiesList!}
                    />
                </div>
            </div>
        </div>
    );
};
