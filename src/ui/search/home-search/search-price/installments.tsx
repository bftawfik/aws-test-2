import { generateSequence } from '@/helpers/get-range';
import ComboBoxComponent from '@/ui/combobox';
import React from 'react';
import { useTempStore } from '@/store/temp-search';
import { useSearchStore } from '@/store/search';
import { useTranslations } from 'next-intl';

const Installments = () => {
    // Read translations
    const tGlobal = useTranslations('global');

    const { tempInstallment, setTempInstallment } = useTempStore();
    const { installment } = useSearchStore();
    const installmentData = tempInstallment ? tempInstallment : installment;

    const fromElements = generateSequence(5000, 500000, 5000);

    let toElements = generateSequence(5000, 500000, 5000);

    const handleFromFilter = (item: { label: string; value: number }) => {
        return item.value >= installmentData.from;
    };
    const handleToFilter = (item: { label: string; value: number }) => {
        return (
            item.value > installmentData.from &&
            item.value >= installmentData.to
        );
    };

    const handleChangeFrom = (data: number) => {
        if (data > installmentData.to) {
            setTempInstallment({ ...installmentData, to: 0 });
        }
        setTempInstallment({ ...installmentData, from: data });
    };
    const handleChangeTo = (data: number) =>
        setTempInstallment({ ...installmentData, to: data });
    return (
        <div className="h-42 flex w-full flex-col gap-4 ">
            <div className="flex  w-full gap-4 ">
                <div className="w-full">
                    <p className="hidden text-xs capitalize text-[#5F5F5F] lg:block">
                        {tGlobal('from')}
                    </p>
                    <ComboBoxComponent
                        title={`${tGlobal('from')}`}
                        value={installmentData.from}
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
                        value={installmentData.to}
                        onChange={handleChangeTo}
                        listOfData={toElements}
                        filterData={handleToFilter}
                    />
                </div>
            </div>
        </div>
    );
};

export default Installments;
