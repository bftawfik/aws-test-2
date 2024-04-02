import React from 'react';
import { SearchTypeProps } from './search-type';
import BorderedCheckbox from '@/ui/bordered-checkbox';
import CustomDropdown from '@/ui/custom-dropdown';
import Tabs from '@/ui/tabs';
import { Menu } from '@headlessui/react';
import { UniquList, getLangkey } from '@/helpers';
import { useTempStore } from '@/store/temp-search';
import { useSearchStore } from '@/store/search';
import NotificationDot from '@/ui/notification-badge/brand-notification';
import { CustomFilterIcon } from '@/ui/svg';
import { useTranslations, useLocale } from 'next-intl';

const SearchType = ({
    residential,
    commercial,
    handleReset,
    handleApply,
}: SearchTypeProps) => {
    // Read localization
    const locale = useLocale();

    // Read translations
    const tGlobal = useTranslations('global');
    const { type, unitTypeList } = useSearchStore();
    const {
        tempType,
        tempUnitTypeList,
        setTempType,
        setTempUnitTypeList,
        setAllTempList,
    } = useTempStore();
    const typeValue = tempType ? tempType : type;
    const listValue = tempUnitTypeList ? tempUnitTypeList : unitTypeList;

    const handleSelectingAction = (
        item: { id: number; name: string },
        unitType: string
    ) => {
        if (unitType !== typeValue) {
            setTempType(unitType);
        }
        tempUnitTypeList === null && unitType === typeValue
            ? setAllTempList(UniquList(listValue, item))
            : setTempUnitTypeList(item);
    };

    const tabs = {
        [tGlobal('residential')]: {
            value: 'residential',
            content: (
                <div className="h-full">
                    <div className="max-h-[200px] overflow-y-auto ">
                        <ul className="grid  grid-cols-2 gap-4">
                            {residential?.map((item) => (
                                <BorderedCheckbox
                                    onChange={() =>
                                        handleSelectingAction(
                                            {
                                                id: item.id,
                                                name:
                                                    getLangkey(
                                                        item.name,
                                                        locale
                                                    ) || '',
                                            },
                                            'residential'
                                        )
                                    }
                                    label={getLangkey(item.name, locale)}
                                    value={getLangkey(item.name, locale)}
                                    checked={listValue.some(
                                        (i) => item.id === i.id
                                    )}
                                    key={item.id}
                                    id={`${item.id}`}
                                />
                            ))}
                        </ul>
                    </div>

                    <div className="mt-4 flex h-auto items-center justify-end gap-x-3 ">
                        <button
                            onClick={handleReset}
                            className="inline-flex appearance-none items-center justify-center rounded-lg border border-primary/60 bg-white px-3 py-2 text-xs font-medium capitalize hover:bg-primary hover:text-white"
                        >
                            {tGlobal('reset')}
                        </button>
                        <Menu.Item>
                            {({ close }) => (
                                <button
                                    onClick={() => {
                                        handleApply();
                                        close();
                                    }}
                                    className="inline-flex appearance-none items-center justify-center rounded-lg border border-emerald-500 bg-primary px-3 py-2 text-xs font-medium capitalize text-white  hover:bg-emerald-600"
                                >
                                    {tGlobal('apply')}
                                </button>
                            )}
                        </Menu.Item>
                    </div>
                </div>
            ),
        },
        [tGlobal('Commercial')]: {
            value: 'commercial',
            content: (
                <div className="w-full">
                    <div className="max-h-[280px] overflow-y-auto ">
                        <ul className="grid grid-cols-2 gap-4">
                            {commercial?.map((item) => (
                                <BorderedCheckbox
                                    onChange={() =>
                                        handleSelectingAction(
                                            {
                                                id: item.id,
                                                name:
                                                    getLangkey(
                                                        item.name,
                                                        locale
                                                    ) || '',
                                            },
                                            'commercial'
                                        )
                                    }
                                    checked={listValue.some(
                                        (i) => item.id === i.id
                                    )}
                                    label={getLangkey(item.name, locale)}
                                    value={getLangkey(item.name, locale)}
                                    key={item.id}
                                    id={`${item.id}`}
                                />
                            ))}
                        </ul>
                    </div>
                    <div className="mt-4 flex items-center justify-end gap-x-3 ">
                        <button
                            onClick={handleReset}
                            className="inline-flex appearance-none items-center justify-center rounded-lg border border-primary/60 bg-white px-3 py-2 text-xs font-medium capitalize hover:bg-primary hover:text-white"
                        >
                            {tGlobal('reset')}
                        </button>
                        <Menu.Item>
                            {({ close }) => (
                                <button
                                    onClick={() => {
                                        handleApply();
                                        close();
                                    }}
                                    className="inline-flex appearance-none items-center justify-center rounded-lg border border-emerald-500 bg-primary px-3 py-2 text-xs font-medium capitalize text-white  hover:bg-emerald-600"
                                >
                                    {tGlobal('apply')}
                                </button>
                            )}
                        </Menu.Item>
                    </div>
                </div>
            ),
        },
    };
    const updated = unitTypeList.length > 0;
    const activeTab = typeValue === 'commercial' ? 1 : 0;
    return (
        <div className="group flex h-16 cursor-pointer items-center border-e border-gray-100 transition-colors hover:bg-gray-50">
            <div className="relative inline-block h-16">
                {updated && <NotificationDot classes="z-50 end-0 -top-1" />}
                <div className="h-full w-full ">
                    <CustomDropdown
                        icon={<CustomFilterIcon />}
                        label={tGlobal('type')}
                    >
                        <div className="w-[420px]">
                            <Tabs activeTab={activeTab} list={tabs} />
                        </div>
                    </CustomDropdown>
                </div>
            </div>
        </div>
    );
};

export default SearchType;
