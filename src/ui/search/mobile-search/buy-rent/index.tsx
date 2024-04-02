import { DEFAULT_SALE_TYPE_VALUE, SALE_TYPES } from '@/constants/store';
import { useSearchStore } from '@/store/search';
import React, { useEffect, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { EN_LOCALE } from '@/constants';
import { useTempStore } from '@/store/temp-search';

const BuyRent = () => {
    // Read localization
    const locale = useLocale();

    // Read translations
    const tGlobal = useTranslations('global');

    const { saleType } = useSearchStore();
    const { tempSaleType, setTempSaleType } = useTempStore();

    const handleSelection = (value: string) => {
        if (value === tGlobal('buy')) {
            setTempSaleType(DEFAULT_SALE_TYPE_VALUE);
        } else {
            setTempSaleType([SALE_TYPES.RENT]);
        }
    };

    useEffect(() => {
        if (saleType) {
            setTempSaleType(saleType);
        }
    }, [saleType, setTempSaleType]);

    return (
        <div className="relative mx-auto grid w-40 grid-cols-2 rounded-2xl bg-white p-1 lg:hidden">
            <div
                onClick={() => handleSelection(tGlobal('buy'))}
                className="relative flex items-center justify-center p-3 capitalize"
            >
                {tGlobal('buy')}
                <span
                    className={`absolute inset-0 flex h-full w-full translate-x-0 cursor-pointer items-center justify-center rounded-2xl border-none !bg-primary/20 text-sm font-light capitalize text-black transition-all duration-300 ${
                        tempSaleType?.some((item) => item === SALE_TYPES.RENT)
                            ? `${
                                  locale === EN_LOCALE
                                      ? '!translate-x-full'
                                      : '!-translate-x-full'
                              } border-none bg-primary/20`
                            : 'bg-white'
                    }`}
                ></span>
            </div>

            <div
                onClick={() => handleSelection(tGlobal('rent'))}
                className="flex items-center justify-center p-3 capitalize"
            >
                {tGlobal('rent')}
            </div>
        </div>
    );
};

export default BuyRent;
