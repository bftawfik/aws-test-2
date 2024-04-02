import React, { useEffect, useState } from 'react';
import CustomInputField from '@/ui/custom-input-field';
import { useTempStore } from '@/store/temp-search';
import { useSearchStore } from '@/store/search';
import { DEFAULT_MIN_AREA, DEFAULT_MAX_AREA } from '@/constants';
import { useTranslations } from 'next-intl';
import { toast } from 'react-toastify';

const AreaSection = () => {
    // Read translations
    const tGlobal = useTranslations('global');

    const { tempArea, setTempArea } = useTempStore();
    const { area } = useSearchStore();

    const areaValue = tempArea ? tempArea : area;

    const [minIsLargerThanMax, setMinIsLargerThanMax] = useState(false);
    const [maxIsLargerThanDefault, setMaxIsLargerThanDefault] = useState(false);

    const handleFrom = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = parseInt(event.target.value, 10);
        setTempArea({ ...areaValue, from: inputValue });
    };

    const handleFromBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = parseInt(event.target.value);
        // set to to from when greater than from
        if (inputValue >= areaValue.to && inputValue <= DEFAULT_MAX_AREA) {
            setTempArea({ from: areaValue.to, to: areaValue.to });
        } else {
            const fromValue =
                !isNaN(inputValue) &&
                inputValue >= DEFAULT_MIN_AREA &&
                inputValue <= DEFAULT_MAX_AREA
                    ? inputValue
                    : DEFAULT_MIN_AREA;

            setTempArea({ from: fromValue, to: areaValue.to });
        }
        // toast message
        setMinIsLargerThanMax(false);
        areaValue.to < areaValue.from &&
            toast.error(tGlobal('value_entered_in_the_to_field'));
    };

    const handleTo = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newMaxValue = Math.min(parseInt(event.target.value));
        newMaxValue > DEFAULT_MAX_AREA
            ? setMaxIsLargerThanDefault(true)
            : setMaxIsLargerThanDefault(false);

        setTempArea({ ...areaValue, to: newMaxValue });
    };
    const handleToBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = parseInt(event.target.value);

        if (inputValue < areaValue.from && inputValue < DEFAULT_MAX_AREA) {
            setTempArea({ from: areaValue.from, to: areaValue.from });
        } else {
            const toValue =
                !isNaN(inputValue) && inputValue <= DEFAULT_MAX_AREA
                    ? inputValue
                    : DEFAULT_MAX_AREA;
            setTempArea({ from: areaValue.from, to: toValue });
        }

        // toast message
        areaValue.to < areaValue.from &&
            areaValue.to < DEFAULT_MAX_AREA &&
            toast.error(tGlobal('value_entered_in_the_from_field'));
        setMaxIsLargerThanDefault(false);
    };

    const initialMin = tempArea ? tempArea.from : area.from;
    const initialMax = tempArea ? tempArea.to : area.to;

    useEffect(() => {
        setTempArea({
            from: area.from || DEFAULT_MIN_AREA,
            to: area.to || DEFAULT_MAX_AREA,
        });
    }, []);

    return (
        <div className="w-full justify-start self-start border-t py-2 lg:p-2">
            <div className="my-2 flex items-center gap-3">
                <p className="text-sm font-semibold capitalize">
                    {tGlobal('property_area')} ({tGlobal('meter')}
                    2)
                </p>
            </div>
            <div className="flex items-center justify-start gap-1 py-3 lg:gap-4">
                <CustomInputField
                    className={
                        minIsLargerThanMax
                            ? 'border-red-500'
                            : 'border-gray-200'
                    }
                    value={initialMin}
                    type="from"
                    onChange={handleFrom}
                    label={`${tGlobal('from')}`}
                    onBlur={handleFromBlur}
                />
                <CustomInputField
                    className={
                        maxIsLargerThanDefault
                            ? 'border-red-500'
                            : 'border-gray-200'
                    }
                    value={initialMax}
                    type="to"
                    onChange={handleTo}
                    label={`${tGlobal('to')}`}
                    onBlur={handleToBlur}
                />
            </div>
            {minIsLargerThanMax ? (
                <p className="mb-2 text-[10px] text-red-500">
                    {tGlobal('from_input_validation')}
                </p>
            ) : null}
            {maxIsLargerThanDefault ? (
                <p className="mb-2 text-[10px] text-red-500">
                    {`${tGlobal(
                        'to_input_validation'
                    )} ${DEFAULT_MAX_AREA} ${tGlobal('meter')}`}
                    <sup>2</sup>
                </p>
            ) : null}
        </div>
    );
};

export default AreaSection;
