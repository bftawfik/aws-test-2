import React from 'react';
import { InputFieldProps } from './inputfield';
import { useTranslations } from 'next-intl';

const CustomInputField = ({
    value,
    onChange,
    label,
    onBlur,
    className,
}: InputFieldProps) => {
    // Read translations
    const tGlobal = useTranslations('global');

    return (
        // focus-within:border-primary
        <div
            className={`my-2 inline-flex h-10 w-auto min-w-[45%] basis-0 items-center gap-1 rounded-md border border-gray-200 p-2 text-sm font-light leading-3  shadow-sm  lg:min-w-[160px] ${className}`}
        >
            <p className="text-xs capitalize text-gray-500">{label + ':'}</p>
            <input
                type="number"
                value={value}
                onChange={onChange}
                className="w-full border-none font-normal focus:outline-none"
                onBlur={onBlur}
            />
            <p>{tGlobal('meter')}</p>
            <sup>2</sup>
        </div>
    );
};

export default CustomInputField;
