'use client';
import React, { useCallback, useEffect } from 'react';
import { CompareItemType } from '@/types';
import { CompareButtonProps } from './compare-button';
import {
    errorHandler,
    getFromLocalStorage,
    setOnLocalStorage,
} from '@/helpers';
import { useCompareStore } from '@/store/global';
import { CompareButtonIcon } from '../svg';
import { useTranslations } from 'next-intl';

const CompareButton = ({ item, type, usage }: CompareButtonProps) => {
    const tGlobal = useTranslations('global');
    const { compare_type, compare_items, setCompareType, setCompareItems } =
        useCompareStore();

    // Save state to localStorage whenever it changes
    const initCompareTypeAndItemsFromLocalStorage = useCallback(() => {
        const stored_compare_type = getFromLocalStorage('compare_type')
            ? getFromLocalStorage('compare_type')
            : setOnLocalStorage('compare_type', '', 'string');
        if (stored_compare_type) {
            setCompareType(stored_compare_type);
        }

        const stored_compare_items = getFromLocalStorage('compare_items')
            ? getFromLocalStorage('compare_items')
            : setOnLocalStorage('compare_items', []);
        if (stored_compare_items) {
            setCompareItems(stored_compare_items);
        }
    }, [setCompareType, setCompareItems]);

    useEffect(() => {
        initCompareTypeAndItemsFromLocalStorage();
    }, [initCompareTypeAndItemsFromLocalStorage]);

    const handleCompareItem = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        event.stopPropagation();

        if (compare_type) {
            if (compare_type !== type) {
                errorHandler(
                    `${
                        compare_type === 'units'
                            ? tGlobal('clear_compare_units')
                            : tGlobal('clear_compare_projects')
                    }
                    `
                );
                return;
            }
        }

        //  Push and slice from items
        const index = compare_items?.findIndex(
            (s: CompareItemType) => s.id === item.id
        );
        if (index === -1) {
            if (compare_items.length < 4) {
                const items = compare_items;
                items.push(item);
                setCompareItems(items);
            } else {
                errorHandler(
                    `${
                        type === 'units'
                            ? tGlobal('max_compare_units_reached')
                            : tGlobal('max_compare_projects_reached')
                    }
                    `
                );
            }
        } else {
            const items = compare_items;
            items.splice(index, 1);
            setCompareItems(items);
        }

        setCompareType(compare_items.length ? type : '');

        // Set data on local storage
        setOnLocalStorage('compare_type', compare_items.length ? type : '');
        setOnLocalStorage('compare_items', compare_items);
    };

    return (
        <button
            onClick={handleCompareItem}
            className={`inline-flex h-8 w-8 items-center justify-center rounded-full ${
                usage == 'inner' &&
                'group !h-10 !w-10 rounded-full border p-2 lg:hover:bg-primary'
            } ${
                compare_items?.filter((c: CompareItemType) => c.id === item.id)
                    .length
                    ? 'bg-primary'
                    : 'bg-white'
            }`}
        >
            <CompareButtonIcon
                className={`h-5 w-5 fill-current ${
                    compare_items?.filter(
                        (c: CompareItemType) => c.id === item.id
                    ).length
                        ? 'text-white'
                        : 'text-gray-400  '
                } ${usage === 'inner' && ' lg:group-hover:text-white'}`}
            />
        </button>
    );
};

export default CompareButton;
