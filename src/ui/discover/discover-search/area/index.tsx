import DropdownAction from '@/ui/dropdown-action';
import RangeSlider from './range-slider-component';
import { useSearchStore } from '@/store/search';
import { useTempStore } from '@/store/temp-search';
import {
    DEFAULT_MIN_AREA,
    DEFAULT_MAX_AREA,
    DEFATULT_EMPTY_URL,
} from '@/constants';
import { useGenerateUrl } from '@/hooks/useGenerateUrl/useGenerateUrl';
import { useRouter } from 'next/navigation';

const AreaComponent = () => {
    const router = useRouter();
    const { tempArea, resetTempArea, setTempArea } = useTempStore();
    const { area, setArea, resetArea } = useSearchStore();
    const areaValue = tempArea ? tempArea : area;
    const updatedAreaUrl = useGenerateUrl({
        tempArea: tempArea,
        tempPage: DEFATULT_EMPTY_URL.tempPage,
    });

    const handleApply = () => {
        resetTempArea();
        router.push(updatedAreaUrl);
    };
    const resettedAreaUrl = useGenerateUrl({
        tempArea: DEFATULT_EMPTY_URL.tempArea,
        tempPage: DEFATULT_EMPTY_URL.tempPage,
    });
    const handleReset = () => {
        setTempArea({ from: DEFAULT_MIN_AREA, to: DEFAULT_MAX_AREA });
        router.push(resettedAreaUrl);
    };

    return (
        <>
            <RangeSlider step={50} areaGap={50} />
            <div
                className={`${
                    areaValue.from < DEFAULT_MIN_AREA ||
                    areaValue.to > DEFAULT_MAX_AREA
                        ? 'pointer-events-none'
                        : ''
                }`}
            >
                <DropdownAction apply={handleApply} reset={handleReset} />
            </div>
        </>
    );
};

export default AreaComponent;
