import React, { Fragment } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import { ComboBoxProps } from './combobox';
import { useTranslations } from 'next-intl';

function ComboBoxComponent({
    listOfData,
    onChange,
    value,
    title,
    filterData,
}: ComboBoxProps) {
    // Read translations
    const tGlobal = useTranslations('global');

    const handleCompoChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        let newValue = event.target?.value;
        if (newValue) {
            let pureNumber;
            if (newValue.charAt(newValue.length - 1).toLowerCase() === 'm') {
                let value = newValue.slice(0, -1);
                pureNumber = +value * 1000000;
            } else {
                pureNumber = newValue?.split(/[^\d]+/).join('');
            }
            return onChange(+pureNumber);
        }

        onChange(0);
    };

    const inList =
        !value || listOfData.findIndex((item) => item.value === value) !== -1;

    const filteredByValue = listOfData?.filter(filterData);
    const filteredData = inList
        ? filteredByValue
        : [{ label: `${value}`, value: value }, ...filteredByValue];

    const currentValue =
        value > 0 &&
        (filteredData.filter(
            (item: { label: string; value: number }) => item.value === value
        )[0]?.label ||
            value.toString());
    return (
        <div className="w-full">
            <Combobox value={currentValue} onChange={onChange}>
                <div className="relative mt-1">
                    <Combobox.Button className="pointer-events-none flex w-full items-center overflow-hidden rounded-md border border-gray-300 py-1 ps-1 shadow-sm   focus-within:border-primary">
                        <p className="ms-1 text-xs  font-light capitalize text-[#5F5F5F] lg:hidden">
                            {title}
                        </p>

                        <Combobox.Input
                            className="pointer-events-auto ms-1 w-full border-none p-1 text-sm font-medium leading-5 text-gray-900 focus:outline-none "
                            onChange={handleCompoChanged}
                        />
                        <p className="absolute end-2  text-xs text-black">
                            {tGlobal('egp')}
                        </p>
                    </Combobox.Button>
                    {filteredData.length > 0 && (
                        <Transition
                            as={Fragment}
                            leave="transition ease-in-out duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Combobox.Options className="absolute start-1 z-10 mt-1 max-h-28 w-[90%] overflow-y-auto rounded-md border-primary bg-white  py-1  text-xs shadow-lg ring-1 ring-primary sm:text-sm lg:start-0 lg:w-full ">
                                {filteredData?.map((item) => (
                                    <Combobox.Option
                                        key={item.label + title}
                                        className={({ active }) =>
                                            `relative w-full cursor-pointer overflow-hidden border-b p-2 text-xs ${
                                                active && '!bg-gray-200'
                                            }`
                                        }
                                        value={item.value}
                                    >
                                        {({ selected }) => (
                                            <span
                                                className={`block truncate 
                                          
                                                 ${
                                                     selected
                                                         ? 'font-sm !bg-gray-400'
                                                         : 'font-xs'
                                                 }`}
                                            >
                                                {item.label}
                                                {title === 'from' &&
                                                (item.label === '1 M' ||
                                                    item.label === '100,000' ||
                                                    item.label === '5,000')
                                                    ? ' or Less'
                                                    : ''}
                                            </span>
                                        )}
                                    </Combobox.Option>
                                ))}
                            </Combobox.Options>
                        </Transition>
                    )}
                </div>
            </Combobox>
        </div>
    );
}
export default ComboBoxComponent;
