import AmenitiesSection from '@/ui/search/home-search/filter-modal/amenities-section';
import FeaturesSection from '@/ui/search/home-search/filter-modal/features-section';
import React, { useState } from 'react';
import { Amenity, UnitFeatures } from '@/types';
import { useTempStore } from '@/store/temp-search';
import { useSearchStore } from '@/store/search';
import ReactModal from '@/ui/ReactModal/ReactModal';
import { FilterTogglerIcon, ResetIcon } from '@/ui/svg';
import { useRouter } from 'next/navigation';
import { useGenerateUrl } from '@/hooks/useGenerateUrl/useGenerateUrl';
import { DEFATULT_EMPTY_URL } from '@/constants';
import { sortArray } from '@/helpers/get-sorted-array';
import { useTranslations, useLocale } from 'next-intl';
import NotificationDot from '@/ui/notification-badge/brand-notification';

interface AdvancedSearchProps {
    amenitiesList: Amenity[];
    featuresList: UnitFeatures[];
}

const AdvancedSearch = ({
    amenitiesList,
    featuresList,
}: AdvancedSearchProps) => {
    // Read localization
    const locale = useLocale();

    // Read translations
    const tGlobal = useTranslations('global');

    const router = useRouter();
    const {
        tempAmenities,
        tempUnitFeatures,
        resetTempAmenities,
        resetTempFeatures,
    } = useTempStore();
    const {
        amenities,
        unitFeatures,
        setAmenities,
        setFeatures,
        resetAmenities,
        resetFeatures,
    } = useSearchStore();

    // MODAL STATE
    const [modalOpen, setModalOpen] = useState(false);

    const closeModal = () => {
        setModalOpen(false);
    };

    const amenitiesValues = tempAmenities ? tempAmenities : amenities;
    const featuresValues = tempUnitFeatures ? tempUnitFeatures : unitFeatures;
    const updatedUrl = useGenerateUrl({
        tempAmenities: sortArray([...amenitiesValues]),
        tempUnitFeatures: sortArray([...featuresValues]),
        tempPage: DEFATULT_EMPTY_URL.tempPage,
    });
    const resettingUrl = useGenerateUrl({
        tempAmenities: DEFATULT_EMPTY_URL.tempAmenities,
        tempUnitFeatures: DEFATULT_EMPTY_URL.tempUnitFeatures,
        tempPage: DEFATULT_EMPTY_URL.tempPage,
    });

    const apply = () => {
        // setAmenities(amenitiesValues);
        // setFeatures(featuresValues);
        router.push(updatedUrl);

        resetTempAmenities();
        resetTempFeatures();

        closeModal();
    };
    const reset = () => {
        resetTempAmenities();
        resetTempFeatures();
        // resetAmenities();
        // resetFeatures();
        router.push(resettingUrl);
    };

    //  Filter updated check
    const unitFeaturesUpdated = unitFeatures.length > 0;
    const amenitiesUpdated = amenities.length > 0;

    const updated = unitFeaturesUpdated || amenitiesUpdated;
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
                <FeaturesSection featuresData={featuresList} />
                <AmenitiesSection amenitiesList={amenitiesList} />

                <div className="mt-3 flex items-center justify-end gap-x-3 ">
                    <button
                        onClick={reset}
                        className="group inline-flex appearance-none items-center justify-center gap-2 rounded-lg border border-primary/60 bg-white px-3 py-2 text-xs font-medium capitalize hover:bg-primary hover:text-white"
                    >
                        <ResetIcon />
                        {tGlobal('reset_all')}
                    </button>
                    <button
                        onClick={apply}
                        className="inline-flex appearance-none items-center justify-center rounded-lg border border-emerald-500 bg-primary px-3 py-2 text-xs font-medium capitalize text-white  hover:bg-emerald-600"
                    >
                        {tGlobal('apply')}
                    </button>
                </div>
            </ReactModal>
        </>
    );
};

export default AdvancedSearch;
