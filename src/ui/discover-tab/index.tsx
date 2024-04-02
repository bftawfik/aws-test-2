'use client';
import { useMapStore, usePageStore } from '@/store/global';
import { useSearchStore } from '@/store/search';
import { generateUrl } from '@/hooks/useGenerateUrl/useGenerateUrl';
import { useRouter } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import {
    NEIGHBORHOODS_ZOOM_LEVEL,
    PROJECTS_ZOOM_LEVEL,
    UNITS_ZOOM_LEVEL,
} from '@/constants';
interface DiscoverTabProps {
    tab: string;
}
const DiscoverTab = ({ tab }: DiscoverTabProps) => {
    // Read localization
    const locale = useLocale();
    // Read translations
    const tGlobal = useTranslations('global');

    const {
        setTab,
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
        sortByValue,
    } = useSearchStore();
    const router = useRouter();
    const bounds = '';

    const { resetPageNumber } = usePageStore();

    const isProjects = tab === 'projects';
    const isNeighborhoods = tab === 'neighborhoods';
    const isUnits = tab === 'units';

    // update zoom level

    const { setZoomLevel, resetBounds, resetCenter } = useMapStore();
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
    const handleNeighbothoods = () => {
        const linkUrl = generateUrl(searchState, locale, {
            tempTab: 'neighborhoods',
        });
        setTab('neighborhoods');
        resetPageNumber();
        handleZoomLevel(NEIGHBORHOODS_ZOOM_LEVEL);
        resetCenter();
        resetBounds();
        router.push(linkUrl);
    };
    const handleProjects = () => {
        const linkUrl = generateUrl(searchState, locale, {
            tempTab: 'projects',
        });
        setTab('projects');
        resetPageNumber();
        handleZoomLevel(PROJECTS_ZOOM_LEVEL);
        resetCenter();
        resetBounds();
        router.push(linkUrl);
    };
    const handleUnits = () => {
        const linkUrl = generateUrl(searchState, locale, {
            tempTab: 'units',
        });
        setTab('units');
        resetPageNumber();
        handleZoomLevel(UNITS_ZOOM_LEVEL);
        resetCenter();
        resetBounds();
        router.push(linkUrl);
    };

    const handleZoomLevel = (zoomLevel: number) => {
        setZoomLevel(zoomLevel);
        resetBounds();
        resetCenter();
    };
    return (
        <div
            className="sticky top-0 z-30 inline-flex rounded-md shadow-sm"
            role="group"
        >
            <button
                type="button"
                className={`px-4 py-2 text-sm font-medium text-gray-900 hover:bg-[#4CB087] hover:text-white ltr:rounded-l-lg rtl:rounded-r-lg ${
                    isNeighborhoods ? 'bg-[#4CB087] text-white' : 'bg-slate-100'
                }`}
                onClick={handleNeighbothoods}
            >
                {tGlobal('neighborhoods')}
            </button>

            <button
                type="button"
                className={`px-4 py-2 text-sm font-medium text-gray-900 hover:bg-[#F0BC3CCC] hover:text-white ${
                    isProjects ? 'bg-[#F0BC3C] text-white' : 'bg-slate-100'
                }`}
                onClick={handleProjects}
            >
                {tGlobal('projects')}
            </button>
            <button
                type="button"
                className={`px-4 py-2 text-sm font-medium text-gray-900 hover:bg-[#7DAFFF] hover:text-white ltr:rounded-r-md rtl:rounded-l-md ${
                    isUnits ? 'bg-[#7DAFFF] text-white' : 'bg-slate-100'
                }`}
                onClick={handleUnits}
            >
                {tGlobal('specific_units')}
            </button>
        </div>
    );
};

export default DiscoverTab;
