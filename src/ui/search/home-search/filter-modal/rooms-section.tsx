import { getRange } from '@/helpers/get-range';
import BorderedCheckbox from '@/ui/bordered-checkbox';
import React from 'react';
import { useSearchStore } from '@/store/search';
import { useTempStore } from '@/store/temp-search';
import { UniquList } from '@/helpers';
import { useTranslations, useLocale } from 'next-intl';

const RoomsSection = () => {
    // Read localization
    const locale = useLocale();

    // Read translations
    const tGlobal = useTranslations('global');

    const { beds } = useSearchStore();
    const { tempBeds, setTempBeds, setAllTempBeds } = useTempStore();

    const updateBeds = (bedsNum: number) => {
        tempBeds === null
            ? setAllTempBeds(UniquList(beds, bedsNum))
            : setTempBeds(bedsNum);
    };
    const toggleAll = () => {
        setAllTempBeds([]);
    };

    const bedsList = tempBeds ? tempBeds : beds;
    const isAllSelected = bedsList.length <= 0;
    return (
        <div className="my-2 ">
            <div className="flex items-center gap-3">
                <p className="my-2 text-sm font-semibold ">
                    {tGlobal('specific_rooms')}
                </p>
            </div>
            <div className="py-2">
                <ul className="flex flex-wrap gap-3">
                    <BorderedCheckbox
                        styleType="fill"
                        id="AllRooms"
                        label={`${tGlobal('all')}`}
                        checked={isAllSelected}
                        onChange={toggleAll}
                    />
                    {getRange(1, 5, 1)?.map((item, index) => (
                        <BorderedCheckbox
                            id={`${index}-idr`}
                            key={`${index}-idr`}
                            onChange={() => updateBeds(item)}
                            checked={bedsList.includes(item)}
                            label={index === 4 ? `${item} +` : `${item}`}
                        />
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default RoomsSection;
