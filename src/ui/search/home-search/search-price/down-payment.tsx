import { generateSequence } from '@/helpers/get-range';
import ComboBoxComponent from '@/ui/combobox';
import React from 'react';
import { useTempStore } from '@/store/temp-search';
import { useSearchStore } from '@/store/search';
import { useTranslations, useLocale } from 'next-intl';

const DownPayment = () => {
    // Read localization
    const locale = useLocale();

    // Read translations
    const tGlobal = useTranslations('global');

    const { tempDownPayment, setTempDownPayment } = useTempStore();
    const { downPayment } = useSearchStore();
    const paymentData = tempDownPayment ? tempDownPayment : downPayment;

    const fromElements = generateSequence(100000, 100000000, 100000);

    const toElements = generateSequence(100000, 100000000, 100000);

    const handleFromFilter = (item: { label: string; value: number }) => {
        return item.value >= paymentData.from;
    };
    const handleToFilter = (item: { label: string; value: number }) => {
        return item.value > paymentData.from && item.value >= paymentData.to;
    };
    const handleChangeFrom = (data: number) => {
        if (data > paymentData.to) {
            setTempDownPayment({ ...paymentData, to: 0 });
        }
        setTempDownPayment({ ...paymentData, from: data });
    };
    const handleChangeTo = (data: number) =>
        setTempDownPayment({ ...paymentData, to: data });

    return (
        <div className="h-42 flex w-full flex-col gap-4 ">
            <div className="flex  w-full gap-4 ">
                <div className="w-full">
                    <p className="hidden text-xs capitalize text-[#5F5F5F] lg:block">
                        {tGlobal('from')}
                    </p>
                    <ComboBoxComponent
                        title={`${tGlobal('from')}`}
                        value={paymentData.from}
                        onChange={handleChangeFrom}
                        listOfData={fromElements}
                        filterData={handleFromFilter}
                    />
                </div>
                <div className="w-full">
                    <p className="hidden text-xs capitalize text-[#5F5F5F] lg:block">
                        {tGlobal('to')}
                    </p>
                    <ComboBoxComponent
                        title={`${tGlobal('to')}`}
                        value={paymentData.to}
                        onChange={handleChangeTo}
                        listOfData={toElements}
                        filterData={handleToFilter}
                    />
                </div>
            </div>
        </div>
    );
};

export default DownPayment;
