import React, { useState, useEffect, useRef, ChangeEvent } from 'react';
import { RangeSliderProps } from './range-slider';
import CustomInputField from '../../../custom-input-field';
import { DEFAULT_MIN_AREA, DEFAULT_MAX_AREA, EN_LOCALE } from '@/constants';
import { useDebounce } from 'react-use';
import { useTempStore } from '@/store/temp-search';
import { useTranslations, useLocale } from 'next-intl';
import { toast } from 'react-toastify';
import { useSearchStore } from '@/store/search';

const MIN_VALIDATION_DELAY = 500;

const RangeSlider = ({ step, areaGap }: RangeSliderProps) => {
    // Read localization
    const locale = useLocale();

    // Read translations
    const tGlobal = useTranslations('global');

    const progressRef = useRef<HTMLDivElement | null>(null);
    const { setTempArea, tempArea } = useTempStore();
    const { area } = useSearchStore();

    const min = tempArea ? tempArea.from : area.from;
    const max = tempArea ? tempArea.to : area.to;

    const [debouncedMinValue, setDebouncedMinValue] = useState(min);
    const [debouncedMaxValue, setDebouncedMaxValue] = useState(max);
    const [userChangedValues, setUserChangedValues] = useState(false);
    const [minIsLargerThanMax, setMinIsLargerThanMax] = useState(false);
    const [maxIsLargerThanDefault, setMaxIsLargerThanDefault] = useState(false);
    const [timer, setTimer] = useState<null | NodeJS.Timeout>(null);

    const debounceDelay = 300;
    const [, cancel] = useDebounce(
        () => {
            setDebouncedMinValue(min);
            setDebouncedMaxValue(max);
        },
        debounceDelay,
        [min, max]
    );

    const handleMinChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newMinValue = parseInt(e.target.value) || DEFAULT_MIN_AREA;
        if (
            max - newMinValue >= areaGap &&
            newMinValue >= DEFAULT_MIN_AREA &&
            !isNaN(newMinValue)
        ) {
            setTempArea({ from: newMinValue, to: max });
            setUserChangedValues(true);
        }
    };

    const handleMaxChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newMaxValue = parseInt(e.target.value);
        if (newMaxValue - min >= areaGap && newMaxValue <= DEFAULT_MAX_AREA) {
            setTempArea({ from: min, to: newMaxValue });
            setUserChangedValues(true);
        }
    };
    // handle min input
    const handleMinInput = (e: ChangeEvent<HTMLInputElement>) => {
        const newMinValue = parseInt(e.target.value);
        setTempArea({ from: newMinValue, to: max });
        setUserChangedValues(true);

        if (timer !== null) {
            clearTimeout(timer);
        }
        const newTimer = setTimeout(() => {
            newMinValue < DEFAULT_MIN_AREA
                ? setMinIsLargerThanMax(true)
                : setMinIsLargerThanMax(false);
        }, MIN_VALIDATION_DELAY);
        setTimer(newTimer);
    };

    // handle min blur
    const handleBlurFrom = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = parseInt(event.target.value);
        // set to to from when greater than from
        if (inputValue >= max && inputValue <= DEFAULT_MAX_AREA) {
            setTempArea({ from: max, to: max });
        } else {
            const fromValue =
                !isNaN(inputValue) &&
                inputValue >= DEFAULT_MIN_AREA &&
                inputValue <= DEFAULT_MAX_AREA
                    ? inputValue
                    : DEFAULT_MIN_AREA;

            setTempArea({ from: fromValue, to: max });
        }
        // toast message
        setMinIsLargerThanMax(false);
        setUserChangedValues(true);
        max < min && toast.error(tGlobal('value_entered_in_the_to_field'));
    };

    // handle max
    const handleMaxInput = (e: ChangeEvent<HTMLInputElement>) => {
        const newMaxValue = Math.min(parseInt(e.target.value));
        newMaxValue > DEFAULT_MAX_AREA
            ? setMaxIsLargerThanDefault(true)
            : setMaxIsLargerThanDefault(false);

        setTempArea({ from: min, to: newMaxValue });
        setUserChangedValues(true);
    };

    const handleBlurTo = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = parseInt(event.target.value);

        if (inputValue < min && inputValue < DEFAULT_MAX_AREA) {
            setTempArea({ from: min, to: min });
        } else {
            const toValue =
                !isNaN(inputValue) && inputValue <= DEFAULT_MAX_AREA
                    ? inputValue
                    : DEFAULT_MAX_AREA;
            setTempArea({ from: min, to: toValue });
        }

        // toast message
        max < min &&
            max < DEFAULT_MAX_AREA &&
            toast.error(tGlobal('value_entered_in_the_from_field'));
        setMaxIsLargerThanDefault(false);
        setUserChangedValues(true);
    };

    useEffect(() => {
        if (progressRef.current) {
            const startDirection = locale === EN_LOCALE ? 'left' : 'right';
            const endDirection = locale === EN_LOCALE ? 'right' : 'left';
            const minColor = (min - DEFAULT_MIN_AREA) / DEFAULT_MAX_AREA;
            progressRef.current.style[startDirection] = `${
                minColor > 0 ? minColor * 100 : 0
            }%`;
            const maxcolor = (DEFAULT_MAX_AREA - max) / DEFAULT_MAX_AREA;
            progressRef.current.style[endDirection] = `${
                maxcolor > 0 ? maxcolor * 100 : 0
            }%`;
        }
    }, [min, max, locale]);

    useEffect(() => {
        if (userChangedValues) {
            setTempArea({ from: debouncedMinValue, to: debouncedMaxValue });
        }
    }, [debouncedMinValue, debouncedMaxValue, userChangedValues, setTempArea]);

    useEffect(() => {
        setTempArea({
            from: area.from || DEFAULT_MIN_AREA,
            to: area.to || DEFAULT_MAX_AREA,
        });
    }, []);

    return (
        <div className="min-h-[110px] w-full place-items-center">
            <div className="mb-4">
                <div className="slider relative h-1 rounded-md bg-gray-300">
                    <div
                        className="progress absolute h-1 rounded bg-primary"
                        ref={progressRef}
                    ></div>
                </div>

                <div className="range-input relative">
                    <input
                        onChange={handleMinChange}
                        type="range"
                        min={DEFAULT_MIN_AREA}
                        step={step}
                        max={DEFAULT_MAX_AREA}
                        value={min || DEFAULT_MIN_AREA}
                        className="range-min pointer-events-none absolute -top-1 h-1 w-full appearance-none bg-transparent"
                    />

                    <input
                        onChange={handleMaxChange}
                        type="range"
                        min={DEFAULT_MIN_AREA}
                        step={step}
                        max={DEFAULT_MAX_AREA}
                        value={max || DEFAULT_MAX_AREA}
                        className="range-max pointer-events-none absolute -top-1 h-1 w-full appearance-none bg-transparent"
                    />
                </div>
            </div>

            <div className="mt-6 flex items-center justify-between gap-2">
                <CustomInputField
                    className={
                        minIsLargerThanMax
                            ? 'border-red-500'
                            : 'border-gray-200'
                    }
                    value={min}
                    type="from"
                    onChange={handleMinInput}
                    label={`${tGlobal('from')}`}
                    onBlur={handleBlurFrom}
                />
                <CustomInputField
                    className={
                        maxIsLargerThanDefault
                            ? 'border-red-500'
                            : 'border-gray-200'
                    }
                    value={max}
                    type="to"
                    onChange={handleMaxInput}
                    label={`${tGlobal('to')}`}
                    onBlur={handleBlurTo}
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

export default RangeSlider;
