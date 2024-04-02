import { getRange } from '@/helpers/get-range';
import BorderedCheckbox from '@/ui/bordered-checkbox';
import React from 'react';
import { useSearchStore } from '@/store/search';
import { useTempStore } from '@/store/temp-search';
import { UniquList } from '@/helpers';
import { useTranslations, useLocale } from 'next-intl';

const BathsSection = () => {
    // Read localization
    const locale = useLocale();

    // Read translations
    const tGlobal = useTranslations('global');

    const { baths } = useSearchStore();
    const { tempBaths, setTempBaths, setAllTempBaths } = useTempStore();

    const updateBaths = (bathsNum: number) => {
        tempBaths === null
            ? setAllTempBaths(UniquList(baths, bathsNum))
            : setTempBaths(bathsNum);
    };
    const bathsList = tempBaths ? tempBaths : baths;
    const isAllSelected = bathsList.length <= 0;
    return (
        <div className="my-2">
            <div className="flex items-center gap-3">
                <p className="my-2 text-sm font-semibold">
                    {tGlobal('specific_baths')}
                </p>
            </div>

            <div className="py-2 ">
                <ul className="flex flex-wrap gap-3 lg:flex-none">
                    <BorderedCheckbox
                        onChange={() => setAllTempBaths([])}
                        checked={isAllSelected}
                        styleType="fill"
                        label={`${tGlobal('all')}`}
                    />
                    {getRange(1, 5, 1)?.map((item, index) => (
                        <BorderedCheckbox
                            key={`${item}-idb`}
                            id={`${item}-idb`}
                            onChange={() => updateBaths(+item)}
                            checked={bathsList.includes(+item)}
                            label={index === 4 ? `${item} +` : `${item}`}
                        />
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default BathsSection;
