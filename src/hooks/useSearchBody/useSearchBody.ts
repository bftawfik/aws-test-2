import { searchPrefixes } from '@/constants';
import { generateSearchBody } from '@/helpers/search';
import { useSearchStore } from '@/store/search';
import { useMemo } from 'react';

export const useSearchBody = () => {
    const {
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

    const getFilters = () => {
        return generateSearchBody(
            searchPrefixes,
            text,
            saleType,
            amenities,
            unitFeatures,
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
            readyToMove
        );
    };
    return useMemo(getFilters, [
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
    ]);
};
