import React, { useMemo } from 'react';
import { useSearchStore } from '@/store/search';
import { BOUNDS_SHORT, DEFATULT_EMPTY_URL } from '@/constants';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTempStore } from '@/store/temp-search';
import { BigSearchIcon } from '@/ui/svg';
import { generateUrl } from '@/hooks/useGenerateUrl/useGenerateUrl';
import { useLocale } from 'next-intl';

const SearchButton = () => {
    const searchParams = useSearchParams();
    const bounds = searchParams.get(BOUNDS_SHORT) || '';

    const router = useRouter();
    const locale = useLocale();
    const { resetTempStore } = useTempStore();
    const {
        text,
        developers,
        projects,
        locations,
        tab,
        readyToMove,
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
        sortByValue,
    } = useSearchStore();

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

    const goToDiscover = () => {
        const searchUrl = generateUrl(searchState, locale, {
            tempTab: 'units',
        });
        router.push(searchUrl);
        resetTempStore();
    };
    return (
        <button
            onClick={goToDiscover}
            className="inline-flex appearance-none items-center justify-center rounded-lg border border-emerald-500 bg-emerald-500 p-2 shadow-md transition-colors hover:bg-emerald-600"
        >
            <BigSearchIcon />
        </button>
    );
};

export default SearchButton;
