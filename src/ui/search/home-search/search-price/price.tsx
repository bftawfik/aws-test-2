import { getMillionsRange } from '@/helpers/get-range';
import ComboBoxComponent from '@/ui/combobox';
import React from 'react';
import { useTempStore } from '@/store/temp-search';
import { useSearchStore } from '@/store/search';
import { useTranslations } from 'next-intl';

const Price = () => {
    // Read translations
    const tGlobal = useTranslations('global');

    const { tempPrice, setTempPrice } = useTempStore();
    const { price } = useSearchStore();
    const priceData = tempPrice ? tempPrice : price;

    const fromElements = getMillionsRange(1, 50, 5);

    const toElements = getMillionsRange(1, 50, 5);

    const handleFromFilter = (item: { label: string; value: number }) => {
        return item.value >= priceData.from;
    };
    const handleToFilter = (item: { label: string; value: number }) => {
        return item.value > priceData.from && item.value >= priceData.to;
    };
    const handleChangeFrom = (data: number) => {
        if (data > priceData.to) {
            setTempPrice({ ...priceData, to: 0 });
        }
        setTempPrice({ ...priceData, from: data });
    };
    const handleChangeTo = (data: number) => {
        setTempPrice({ ...priceData, to: data });
    };

    return (
        <div className="h-42 flex w-full flex-col gap-4 ">
            <div className="flex  w-full gap-4 ">
                <div className="w-full">
                    <p className="hidden text-xs capitalize text-[#5F5F5F] lg:block">
                        {tGlobal('from')}
                    </p>
                    <ComboBoxComponent
                        id="price-from-value"
                        title={`${tGlobal('from')}`}
                        value={priceData.from}
                        filterData={handleFromFilter}
                        listOfData={fromElements}
                        onChange={handleChangeFrom}
                    />
                </div>
                <div className="w-full">
                    <p className="hidden text-xs capitalize text-[#5F5F5F] lg:block">
                        {tGlobal('to')}
                    </p>
                    <ComboBoxComponent
                        id="price-to-value"
                        value={priceData.to}
                        title={`${tGlobal('to')}`}
                        filterData={handleToFilter}
                        onChange={handleChangeTo}
                        listOfData={toElements}
                    />
                </div>
            </div>
        </div>
    );
};

export default Price;
