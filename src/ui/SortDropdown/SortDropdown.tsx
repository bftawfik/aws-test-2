import { useTranslations } from 'next-intl';
import React from 'react';
import DropDown from '../dropdown-list';
import CustomDropdown from '../custom-dropdown';
import NotificationDot from '../notification-badge/brand-notification';
interface SortDropdownProps {
    handleSortBy: (value: string) => void;
    sortCurrentValue: string;
    isMobile?: boolean;
}
const SortDropdown = ({
    handleSortBy,
    isMobile = false,
    sortCurrentValue,
}: SortDropdownProps) => {
    const tGlobal = useTranslations('global');
    const sortByItems = [
        { value: 'default', label: tGlobal('default') },
        {
            value: 'price:asc',
            label: `${tGlobal('price')} (${tGlobal('Lowest_to_Highest')})`,
        },
        {
            value: 'price:desc',
            label: `${tGlobal('price')} (${tGlobal('Highest_to_lowest')})`,
        },
        {
            value: 'min_down_payment:asc',
            label: `${tGlobal('down_payment')} (${tGlobal(
                'Lowest_to_Highest'
            )})`,
        },
        {
            value: 'min_down_payment:desc',
            label: `${tGlobal('down_payment')} (${tGlobal(
                'Highest_to_lowest'
            )})`,
        },
        {
            value: 'area:asc',
            label: ` ${tGlobal('area')} (${tGlobal('Lowest_to_Highest')})`,
        },
        {
            value: 'area:desc',
            label: ` ${tGlobal('area')} (${tGlobal('Highest_to_lowest')}) `,
        },
    ];

    const sortCurrentVlaue =
        sortByItems.find((item) => item.value === sortCurrentValue)?.label ||
        '';

    return (
        <div className={` relative flex items-center gap-2 text-sm `}>
            {sortCurrentValue !== 'default' && (
                <NotificationDot classes="z-50 end-0 -top-1" />
            )}

            {isMobile ? (
                <CustomDropdown
                    label={tGlobal('sort_by')}
                    className="!gap-0 rounded-lg border border-neutral-300 !p-2 text-sm leading-normal tracking-tight text-black"
                >
                    <div className="w-[200px]">
                        <ul className="flex flex-col gap-2">
                            {sortByItems.map((item) => (
                                <li
                                    key={item.value}
                                    className={`p-2 ${
                                        sortCurrentValue === item.value
                                            ? 'bg-primary/20'
                                            : ''
                                    }`}
                                    onClick={() => handleSortBy(item.value)}
                                >
                                    {item.label}
                                </li>
                            ))}
                        </ul>
                    </div>
                </CustomDropdown>
            ) : (
                <DropDown
                    key={Math.random()}
                    label={'default'}
                    title={tGlobal('sort_by')}
                    value={sortCurrentVlaue}
                    items={sortByItems}
                    onClick={(value) => {
                        handleSortBy(value.value);
                    }}
                />
            )}
        </div>
    );
};

export default SortDropdown;
