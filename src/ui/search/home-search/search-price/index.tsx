import CustomDropdown from '@/ui/custom-dropdown';
import Tabs from '@/ui/tabs';
import React from 'react';
import Price from './price';
import DownPayment from './down-payment';
import Installments from './installments';
import { Menu } from '@headlessui/react';
import { PriceIcon } from '@/ui/svg';
import { useTranslations } from 'next-intl';
import NotificationDot from '@/ui/notification-badge/brand-notification';
import { useSearchStore } from '@/store/search';
interface SearchPriceProps {
    handleReset: () => void;
    handleApply: () => void;
}
const SearchPrice = ({ handleReset, handleApply }: SearchPriceProps) => {
    // Read translations
    const tGlobal = useTranslations('global');
    const priceTabs = {
        [tGlobal('price')]: {
            value: 'Price',
            content: <Price />,
        },
        [tGlobal('down_payment')]: {
            value: 'DownPayment',
            content: <DownPayment />,
        },
        [tGlobal('installments')]: {
            value: 'Installment',
            content: <Installments />,
        },
    };

    // Filter updated check
    const { price, downPayment, installment } = useSearchStore();
    const priceChanged = Object.values(price).every((v) => v !== 0);
    const downPaymentChanged = Object.values(downPayment).every((v) => v !== 0);
    const installmentChanged = Object.values(installment).every((v) => v !== 0);
    const updated = priceChanged || downPaymentChanged || installmentChanged;

    return (
        <div className="group flex h-16 cursor-pointer items-center border-e border-gray-100 transition-colors hover:bg-gray-50">
            <div className="relative inline-block h-16">
                {updated && <NotificationDot classes="z-50 end-0 -top-1" />}

                <div className="h-full">
                    <CustomDropdown
                        icon={<PriceIcon />}
                        label={tGlobal('price')}
                    >
                        <div className="w-[420px]">
                            <Tabs list={priceTabs} />
                            <div className="flex max-w-md items-center justify-end gap-x-3 p-3 ">
                                <button
                                    onClick={handleReset}
                                    className="relative inline-flex appearance-none items-center justify-center rounded-lg border border-primary/60 bg-white px-3 py-2 text-xs font-medium capitalize hover:bg-primary hover:text-white"
                                >
                                    {tGlobal('reset')}
                                </button>
                                <Menu.Item>
                                    <button
                                        onClick={handleApply}
                                        className="inline-flex appearance-none items-center justify-center rounded-lg border border-emerald-500 bg-primary px-3 py-2 text-xs font-medium capitalize text-white shadow-md transition-colors hover:bg-emerald-600"
                                    >
                                        {tGlobal('apply')}
                                    </button>
                                </Menu.Item>
                            </div>
                        </div>
                    </CustomDropdown>
                </div>
            </div>
        </div>
    );
};

export default SearchPrice;
