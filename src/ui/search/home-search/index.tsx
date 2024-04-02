'use client';
import { HomeSearchProps } from '@/ui/search/home-search/home-search';
import { MobileSearch } from '@/ui/search/mobile-search';
import React from 'react';
import SearchBar from './search-bar/index';
import { Locale } from '@/config/i18n-config';
import FilterModal from './filter-modal';
import SearchType from './search-type';
import SearchPrice from './search-price';
import getUnitTypes from '@/actions/unit-types/get-unit-types';
import { useQueries } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import getAmenities from '@/actions/amenities/get-amenities';
import { Amenity, UnitFeatures, UnitType } from '@/types';
import getUnitFeatures from '@/actions/unit-features/get-unit-features';
import PropertyType from './property-type';
import SearchButton from './searchButton/searchButton';
import { useLocale } from 'next-intl';
import { useSearchStore } from '@/store/search';
import { useTempStore } from '@/store/temp-search';

const HomeSearch = () => {
    const { data: session } = useSession();

    const locale = useLocale();

    const {
        resetTypeList,
        resetPricingValues,
        setPrice,
        setDownPayment,
        setInstallment,
        setType,
        setUnitTypeList,
    } = useSearchStore();
    const {
        resetTempTypeList,
        resetTempPricingValues,
        tempPrice,
        tempDownPayment,
        tempInstallment,
        tempType,
        tempUnitTypeList,
    } = useTempStore();

    let [{ data: unit_types }, { data: amenities }, { data: unitFeatures }] =
        useQueries({
            queries: [
                {
                    queryKey: ['unit_types'],
                    queryFn: () =>
                        getUnitTypes(session?.auth?.meta?.token, locale),
                },
                {
                    queryKey: ['amenities'],
                    queryFn: () =>
                        getAmenities(session?.auth?.meta?.token, locale),
                },
                {
                    queryKey: ['unit_features'],
                    queryFn: () => getUnitFeatures(locale),
                },
            ],
        });

    unit_types = unit_types?.data as UnitType[];
    amenities = amenities?.data as Amenity[];
    unitFeatures = unitFeatures?.data as UnitFeatures[];

    const residential = (unit_types as UnitType[])?.filter(
        (unit) => unit.is_residentail
    );
    const commercial = (unit_types as UnitType[])?.filter(
        (unit) => unit.is_commercial
    );
    const handleSearchTypeReset = () => {
        resetTempTypeList();
        resetTypeList();
    };
    const handleSearchPriceReset = () => {
        resetTempPricingValues();
        resetPricingValues();
    };
    const handlePriceApply = () => {
        tempPrice && setPrice(tempPrice);
        tempDownPayment && setDownPayment(tempDownPayment);
        tempInstallment && setInstallment(tempInstallment);
    };
    const handleSearchTypeApply = () => {
        tempType && setType(tempType);
        tempUnitTypeList && setUnitTypeList(tempUnitTypeList);
    };

    return (
        <>
            <div className="drop-shadow-xl  hidden h-16 w-full items-center rounded-lg bg-white ring-1 ring-gray-100 lg:flex">
                <div className="flex h-16 cursor-pointer items-center border-e border-gray-100">
                    <PropertyType />
                </div>
                {/* <!-- Search --> */}

                <div className="group flex h-16 flex-auto items-center border-e border-gray-100">
                    <SearchBar />
                </div>

                {/* <!-- Unit types --> */}
                <div className="relative">
                    <SearchType
                        residential={residential}
                        commercial={commercial}
                        handleReset={handleSearchTypeReset}
                        handleApply={handleSearchTypeApply}
                    />
                </div>

                {/* <!-- Price --> */}
                <div className="relative">
                    <SearchPrice
                        handleReset={handleSearchPriceReset}
                        handleApply={handlePriceApply}
                    />
                </div>

                {/* <!-- Modal --> */}
                <div className="flex h-16 items-center gap-x-3 rounded-e-xl p-4">
                    <FilterModal
                        amenitiesList={amenities}
                        unitFeaturesList={unitFeatures}
                    />

                    <SearchButton />
                </div>
            </div>

            <MobileSearch
                amenitiesList={amenities}
                unitFeaturesList={unitFeatures}
                residential={residential}
                commercial={commercial}
                className="flex w-full lg:hidden"
            />
        </>
    );
};

export default HomeSearch;
