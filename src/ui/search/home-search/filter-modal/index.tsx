import React, { useState } from 'react';
import { FilterModalProps } from '@/interfaces/search';
import PropertyTypesComp from './property-types';
import RoomsSection from './rooms-section';
import BathsSection from './baths-section';
import AreaSection from './area-section';
import FeaturesSection from './features-section';
import AmenitiesSection from './amenities-section';
import ReadyToMove from './ready-to-move';
import { useSearchStore } from '@/store/search';
import { useTempStore } from '@/store/temp-search';
import { FilterTogglerIcon, ResetIcon } from '@/ui/svg';
import ReactModal from '@/ui/ReactModal/ReactModal';
import { useTranslations, useLocale } from 'next-intl';
import { DEFAULT_SALE_TYPE_VALUE } from '@/constants/store';
import NotificationDot from '@/ui/notification-badge/brand-notification';

const FilterModal = ({ amenitiesList, unitFeaturesList }: FilterModalProps) => {
    // Read translations
    const tGlobal = useTranslations('global');

    // MODAL STATE
    const [modalOpen, setModalOpen] = useState(false);

    const closeModal = () => {
        setModalOpen(false);
    };

    const {
        homeModalApply,
        homeModalReset,
        setReady,
        readyToMove,
        saleType,
        beds,
        baths,
        amenities,
        unitFeatures,
        area,
    } = useSearchStore();
    const {
        tempAmenities,
        tempArea,
        tempBaths,
        tempBeds,
        tempUnitFeatures,
        resetHomeModalValues,
    } = useTempStore();
    const { resetSaleType, setSaleTypeList } = useSearchStore();

    const applyData = () => {
        homeModalApply(
            tempArea || { from: 0, to: 0 },
            tempBeds || [],
            tempBaths || [],
            tempUnitFeatures || [],
            tempAmenities || []
        );
        resetHomeModalValues();
        closeModal();
    };
    const handleReset = () => {
        homeModalReset();
        resetSaleType();
        setSaleTypeList(DEFAULT_SALE_TYPE_VALUE);
        resetHomeModalValues();
    };
    const handleReadyToMoveChange = () => {
        setReady(!readyToMove);
    };

    //  Filter updated check
    const saleTypeUpdated =
        JSON.stringify(saleType) === JSON.stringify(DEFAULT_SALE_TYPE_VALUE);
    const readyToMoveUpdated = readyToMove === true;
    const areaUpdated = Object.values(area).every((v) => v !== 0);
    const bedsUpdated = beds.length > 0;
    const bathsUpdated = baths.length > 0;
    const unitFeaturesUpdated = unitFeatures.length > 0;
    const amenitiesUpdated = amenities.length > 0;

    const updated =
        saleTypeUpdated ||
        readyToMoveUpdated ||
        areaUpdated ||
        bedsUpdated ||
        bathsUpdated ||
        unitFeaturesUpdated ||
        amenitiesUpdated;

    return (
        <>
            <button
                onClick={() => {
                    setModalOpen(true);
                }}
                className="relative inline-flex appearance-none items-center justify-center rounded-lg border border-emerald-500 bg-white p-2"
            >
                {updated && <NotificationDot classes="z-50 -end-1 -top-1" />}
                <FilterTogglerIcon className="h-5 w-5 fill-current text-emerald-500" />
            </button>
            <ReactModal
                isOpen={modalOpen}
                closeModalHandler={closeModal}
                classes="max-w-[800px] w-[800px]"
                header={`${tGlobal('filter_by')}`}
            >
                <div className="border-t"></div>

                <div className="max-h-[500px] overflow-y-auto">
                    <div className="relative flex items-center justify-between  py-2">
                        <PropertyTypesComp />
                        <div className="inline-flex w-1/2 self-end py-3">
                            <ReadyToMove
                                handleChange={handleReadyToMoveChange}
                            />
                        </div>
                    </div>
                    <AreaSection />
                    <div className="grid w-full grid-cols-2 justify-between gap-2   border-t p-2">
                        <RoomsSection />
                        <BathsSection />
                    </div>
                    <FeaturesSection featuresData={unitFeaturesList} />
                    <AmenitiesSection amenitiesList={amenitiesList} />
                </div>
                <div className="mt-3 flex items-center justify-end gap-x-3 ">
                    <button
                        onClick={handleReset}
                        className="group inline-flex appearance-none items-center justify-center gap-2 rounded-lg border border-primary/60 bg-white px-3 py-2 text-xs font-medium capitalize hover:bg-primary hover:text-white"
                    >
                        <ResetIcon />
                        {tGlobal('reset_all')}
                    </button>
                    <button
                        onClick={applyData}
                        className="inline-flex appearance-none items-center justify-center rounded-lg border border-emerald-500 bg-primary px-3 py-2 text-xs font-medium capitalize text-white  hover:bg-emerald-600"
                    >
                        {tGlobal('apply')}
                    </button>
                </div>
            </ReactModal>
        </>
    );
};

export default FilterModal;
