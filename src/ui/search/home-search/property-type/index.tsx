import { useSearchStore } from '@/store/search';
import DropDown from '@/ui/dropdown-list';
import React from 'react';
import { BiHomeAlt2 } from 'react-icons/bi';
import { DEFAULT_SALE_TYPE_VALUE, SALE_TYPES } from '@/constants/store';
import { useTranslations } from 'next-intl';

const PropertyType = () => {
    // Read translations
    const tGlobal = useTranslations('global');

    const items = [
        { value: '1', label: tGlobal('buy') },
        { value: '2', label: tGlobal('rent') },
    ];

    const { saleType, setSaleTypeList } = useSearchStore();
    const handleSelection = (value: string) => {
        if (value === tGlobal('buy')) {
            setSaleTypeList(DEFAULT_SALE_TYPE_VALUE);
        } else {
            setSaleTypeList([SALE_TYPES.RENT]);
        }
    };

    const currentValue = saleType.some((item) => item === SALE_TYPES.RENT)
        ? tGlobal('rent')
        : tGlobal('buy');
    return (
        <DropDown
            label="buy"
            value={currentValue}
            icon={BiHomeAlt2}
            onClick={(val) => handleSelection(val.label || '')}
            items={items}
        />
    );
};

export default PropertyType;
