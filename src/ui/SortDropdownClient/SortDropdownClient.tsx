'use client';

import { generateUrl } from '@/hooks/useGenerateUrl/useGenerateUrl';
import { useSearchStore } from '@/store/search';
import { useRouter } from 'next/navigation';
import SortDropdown from '../SortDropdown/SortDropdown';
interface SortDropdownClientProps {
    locale: string;
}
const SortDropdownClientWrapper = ({ locale }: SortDropdownClientProps) => {
    const router = useRouter();
    const { sortByValue } = useSearchStore();
    const bounds = '';

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
    const handleSortBy = (value: string) => {
        const url = generateUrl(searchState, locale, {
            tempSort: value,
        });
        router.push(url);
    };

    return (
        <div className="mb-2 flex w-full justify-end lg:hidden">
            <SortDropdown
                sortCurrentValue={sortByValue}
                handleSortBy={handleSortBy}
                isMobile={true}
            />
        </div>
    );
};

export default SortDropdownClientWrapper;
