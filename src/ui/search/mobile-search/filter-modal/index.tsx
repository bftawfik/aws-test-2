import React, { useMemo, useState } from 'react';
import ContainerComponent from '../contianer';
import AreaSection from '../../home-search/filter-modal/area-section';
import RoomsSection from '../../home-search/filter-modal/rooms-section';
import BathsSection from '../../home-search/filter-modal/baths-section';
import FeaturesSection from '../../home-search/filter-modal/features-section';
import AmenitiesSection from '../../home-search/filter-modal/amenities-section';
import Tabs from '@/ui/tabs';
import BorderedCheckbox from '@/ui/bordered-checkbox';
import Price from '../../home-search/search-price/price';
import DownPayment from '../../home-search/search-price/down-payment';
import Installments from '../../home-search/search-price/installments';
import { UniquList, getLangkey } from '@/helpers';
import { useTempStore } from '@/store/temp-search';
import { useSearchStore } from '@/store/search';
import { FilterModalProps } from '@/interfaces/search';
import { FilterTogglerIcon, ResetIcon } from '@/ui/svg';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { generateUrl } from '@/hooks/useGenerateUrl/useGenerateUrl';
import {
    BOUNDS_SHORT,
    DEFATULT_EMPTY_URL,
    DEFAULT_SALE_TYPE_VALUE,
} from '@/constants';
import { sortArray, sortStringArray } from '@/helpers/get-sorted-array';
import { useTranslations, useLocale } from 'next-intl';
import NotificationDot from '@/ui/notification-badge/brand-notification';
import MobileReadyToMove from '../MobileReadyToMove';
import MobileProperityTypes from '../MobileProperityTypes';

const MobileFilterModal = ({
    amenitiesList,
    unitFeaturesList,
    residential,
    commercial,
}: FilterModalProps) => {
    // Read localization
    const locale = useLocale();
    const searchParams = useSearchParams();
    const bounds = searchParams.get(BOUNDS_SHORT) || '';

    // Read translations
    const tGlobal = useTranslations('global');

    const [open, setOpen] = useState(false);
    const router = useRouter();
    // check if reset button clicked
    const [resetIsClicked, setResetIsClicked] = useState(false);

    const pathname = usePathname();

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
        setReady,
        mobileModalReset,
        mobileModalApply,
        sortByValue,
    } = useSearchStore();
    const {
        tempType,
        tempUnitTypeList,
        tempArea,
        tempBeds,
        tempBaths,
        tempAmenities,
        tempDownPayment,
        tempInstallment,
        tempPrice,
        tempUnitFeatures,
        setTempType,
        setTempUnitTypeList,
        setAllTempList,
        resetTempStore,
        tempReadyToMove,
        tempSaleType,
        resetAlltempStore,
    } = useTempStore();
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

    const typeValue = tempType ? tempType : type;
    const listValue = tempUnitTypeList ? tempUnitTypeList : unitTypeList;

    // handle reset when close
    const resetUrl = generateUrl(searchState, locale, DEFATULT_EMPTY_URL);
    const handleOpen = () => {
        setOpen(!open);
        if (resetIsClicked) {
            router.push(resetUrl);
        }
    };

    const handleSelectingAction = (
        item: { id: number; name: string },
        unitType: string
    ) => {
        if (unitType !== typeValue) {
            setTempType(unitType);
        }
        tempUnitTypeList === null && unitType == unitType
            ? setAllTempList(UniquList(unitTypeList, item))
            : setTempUnitTypeList(item);
    };

    const handleApply = () => {
        const applyUrl = generateUrl(searchState, locale, {
            tempType: !tempType ? type : tempType,
            tempUnitTypeList: !tempUnitTypeList
                ? unitTypeList
                : sortArray([...tempUnitTypeList]),
            tempArea: tempArea || area,
            tempBeds: !tempBeds ? beds : tempBeds.sort(),
            tempBaths: !tempBaths ? baths : tempBaths.sort(),
            tempPrice: tempPrice || price,
            tempDownPayment: tempDownPayment || downPayment,
            tempInstallment: tempInstallment || installment,
            tempAmenities: sortArray([
                ...(tempAmenities ? tempAmenities : amenities),
            ]),
            tempUnitFeatures: sortArray([
                ...(tempUnitFeatures ? tempUnitFeatures : unitFeatures),
            ]),
            tempPage: DEFATULT_EMPTY_URL.tempPage,
            tempReadyToMove:
                tempReadyToMove || DEFATULT_EMPTY_URL.tempReadyToMove,
            tempSaleType: sortStringArray([...(tempSaleType || saleType)]),
        });
        handleOpen();
        router.push(applyUrl);
        resetTempStore();
    };

    const handleReset = () => {
        // resetTempStore();
        resetAlltempStore();
        setResetIsClicked(true);
    };

    const BorderedCheckboxClickHandler = (item: any, label: string) =>
        handleSelectingAction(
            {
                id: item.id,
                name: getLangkey(item.name, locale) || '',
            },
            label
        );
    const activeTab = (tempType || type) === 'commercial' ? 1 : 0;

    const tabs = {
        [tGlobal('residential')]: {
            value: 'residential',
            content: (
                <div className="">
                    <ul className="flex flex-wrap gap-3 lg:grid lg:grid-cols-2 lg:gap-4">
                        {residential?.map((item) => (
                            <BorderedCheckbox
                                onChange={() =>
                                    BorderedCheckboxClickHandler(
                                        item,
                                        'residential'
                                    )
                                }
                                id={`res-${item.id}`}
                                label={getLangkey(item.name, locale)}
                                value={getLangkey(item.name, locale)}
                                checked={
                                    listValue.filter((i) => item.id === i.id)
                                        .length > 0
                                }
                                key={item.id}
                            />
                        ))}
                    </ul>
                </div>
            ),
        },
        [tGlobal('Commercial')]: {
            value: 'commercial',
            content: (
                <div>
                    <ul className="flex flex-wrap gap-3 lg:grid lg:grid-cols-2 lg:gap-4">
                        {commercial?.map((item) => (
                            <BorderedCheckbox
                                id={`comm-${item.id}`}
                                onChange={() =>
                                    BorderedCheckboxClickHandler(
                                        item,
                                        'commercial'
                                    )
                                }
                                checked={
                                    listValue.filter((i) => item.id === i.id)
                                        .length > 0
                                }
                                label={getLangkey(item.name, locale)}
                                value={getLangkey(item.name, locale)}
                                key={item.id}
                            />
                        ))}
                    </ul>
                </div>
            ),
        },
    };

    // Work on handlers
    const pathSegments = pathname.split('/'); // Split the pathname into segments
    const isDiscover: boolean = pathSegments.some(
        (segment) => segment === 'discover'
    );

    //  Filter updated check
    const unitTypeListUpdated = unitTypeList.length > 0;
    const saleTypeUpdated =
        JSON.stringify(saleType) === JSON.stringify(DEFAULT_SALE_TYPE_VALUE);
    const readyToMoveUpdated = readyToMove === true;
    const areaUpdated = Object.values(area).every((v) => v !== 0);
    const bedsUpdated = beds.length > 0;
    const bathsUpdated = baths.length > 0;
    const unitFeaturesUpdated = unitFeatures.length > 0;
    const amenitiesUpdated = amenities.length > 0;
    const priceUpdated = Object.values(price).every((v) => v !== 0);
    const downPaymentUpdated = Object.values(downPayment).every((v) => v !== 0);
    const installmentUpdated = Object.values(installment).every((v) => v !== 0);

    const updated =
        unitTypeListUpdated ||
        saleTypeUpdated ||
        readyToMoveUpdated ||
        areaUpdated ||
        bedsUpdated ||
        bathsUpdated ||
        unitFeaturesUpdated ||
        amenitiesUpdated ||
        priceUpdated ||
        downPaymentUpdated ||
        installmentUpdated;

    return (
        <>
            <button
                onClick={handleOpen}
                className="relative inline-flex h-10 w-10 appearance-none items-center justify-center rounded-xl border border-emerald-500 bg-white p-2"
            >
                {updated && <NotificationDot classes="z-50 -end-1 -top-1" />}
                <FilterTogglerIcon className="h-6 w-6 fill-current text-emerald-500" />
            </button>

            <ContainerComponent open={open} close={handleOpen}>
                <div className="h-full w-full overflow-y-auto pb-[70px]">
                    <div className="my-1">
                        <div className="flex gap-2">
                            <p className="my-2 text-sm font-semibold">
                                {tGlobal('unit_type')}
                            </p>
                        </div>

                        <Tabs
                            classes="min-w-full"
                            activeTab={activeTab}
                            list={tabs}
                        />
                    </div>
                    <div>
                        <p className="my-2 text-sm font-semibold capitalize">
                            {tGlobal('status')}
                        </p>
                        <div className="relative items-center justify-between py-2 md:flex">
                            <MobileProperityTypes withHeader={false} />

                            <div className="inline-flex w-1/2 self-end py-3">
                                <MobileReadyToMove />
                            </div>
                        </div>
                    </div>

                    <AreaSection />
                    <div className="grid w-full grid-cols-1  justify-between gap-2 border-t   p-2 md:grid-cols-2">
                        <RoomsSection />
                        <BathsSection />
                    </div>
                    <div className="border-t py-2">
                        <div className="my-1">
                            <div className="flex gap-2">
                                <p className="my-2 text-sm font-semibold capitalize">
                                    {tGlobal('price')}
                                </p>
                            </div>
                            <Price />
                        </div>
                        <div className="my-1">
                            <div className="flex gap-2">
                                <p className="my-2 text-sm font-semibold capitalize">
                                    {tGlobal('down_payment')}
                                </p>
                            </div>
                            <DownPayment />
                        </div>
                        <div className="my-1">
                            <div className=" flex gap-2">
                                <p className="my-2 text-sm font-semibold capitalize">
                                    {tGlobal('installments')}
                                </p>
                            </div>
                            <Installments />
                        </div>
                    </div>
                    <FeaturesSection featuresData={unitFeaturesList} />
                    <AmenitiesSection amenitiesList={amenitiesList} />
                    <div className="fixed bottom-0 left-0 right-0 grid h-16 w-full grid-cols-2 items-center gap-2 bg-white p-3 capitalize">
                        <button
                            onClick={handleReset}
                            className="group inline-flex appearance-none items-center justify-center gap-2 rounded-lg border border-primary/60 bg-white px-3 py-2 text-xs capitalize lg:hover:bg-primary lg:hover:text-white"
                        >
                            <ResetIcon />
                            {tGlobal('reset_all')}
                        </button>
                        <button
                            onClick={handleApply}
                            className="inline-flex appearance-none items-center justify-center rounded-lg border border-emerald-500 bg-primary px-3 py-2 text-xs font-bold capitalize text-white  hover:bg-emerald-600"
                        >
                            {tGlobal('show_results')}
                        </button>
                    </div>
                </div>
            </ContainerComponent>
        </>
    );
};

export default MobileFilterModal;
