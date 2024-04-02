import React from 'react';
import BorderedCheckbox from '@/ui/bordered-checkbox';
import { useSearchStore } from '@/store/search';
import {
    DEFAULT_ALL_SALE_TYPE,
    DEFAULT_SALE_TYPE_VALUE,
    SALE_TYPES,
} from '@/constants/store';
import { sortStringArray } from '@/helpers/get-sorted-array';
import { useTranslations } from 'next-intl';
import { useTempStore } from '@/store/temp-search';

interface PropertyTypesCompProps {
    withHeader?: boolean;
    isDiscover?: boolean;
}

const MobileProperityTypes = ({
    withHeader = true,
}: PropertyTypesCompProps) => {
    // Read translations
    const tGlobal = useTranslations('global');

    const propertyTypes = [
        { value: SALE_TYPES.PRIMARY, label: `${tGlobal('primary')}` },
        { value: SALE_TYPES.RESALE, label: `${tGlobal('resale')}` },
        { value: SALE_TYPES.RENT, label: `${tGlobal('rent')}` },
    ];

    const { tempSaleType, setTempSaleType } = useTempStore();

    const handleSaleType = (tempType: string) => {
        const tempSaleTypeList = tempSaleType?.includes(tempType)
            ? tempSaleType?.filter((sType) => sType !== tempType)
            : sortStringArray([
                  ...(tempSaleType || DEFAULT_SALE_TYPE_VALUE),
                  tempType,
              ]);

        setTempSaleType(tempSaleTypeList);
    };

    const handleReset = () => {
        setTempSaleType(DEFAULT_ALL_SALE_TYPE);
    };

    return (
        <div className="w-full max-w-full justify-start self-start">
            {withHeader && (
                <div className="my-2 flex items-center gap-3">
                    <p className="text-sm font-semibold capitalize">
                        {tGlobal('property_types')}
                    </p>
                </div>
            )}

            <ul className="flex flex-wrap items-center gap-2 py-3">
                <BorderedCheckbox
                    label={`${tGlobal('all')}`}
                    styleType="fill"
                    onChange={handleReset}
                    checked={tempSaleType?.length >= 3}
                    id="mobile-pt"
                    value="All"
                />
                {propertyTypes.map(
                    (property: { value: string; label: string }, index) => (
                        <BorderedCheckbox
                            label={property.label}
                            withIcon={true}
                            onChange={() => handleSaleType(property.value)}
                            checked={
                                tempSaleType?.length < 3 &&
                                tempSaleType?.includes(property.value)
                            }
                            value={`${property.value}`}
                            id={`${property.value}-mobilety`}
                            key={`${property.value}-mobilety`}
                        />
                    )
                )}
            </ul>
        </div>
    );
};

export default MobileProperityTypes;
