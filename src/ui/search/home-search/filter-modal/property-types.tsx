import React, { useMemo } from 'react';
import BorderedCheckbox from '@/ui/bordered-checkbox';
import { useSearchStore } from '@/store/search';
import { DEFAULT_ALL_SALE_TYPE, SALE_TYPES } from '@/constants/store';
import {
    generateUrl,
    useGenerateUrl,
} from '@/hooks/useGenerateUrl/useGenerateUrl';
import { useRouter, useSearchParams } from 'next/navigation';
import { sortStringArray } from '@/helpers/get-sorted-array';
import { BOUNDS_SHORT, DEFATULT_EMPTY_URL } from '@/constants';
import { useTranslations, useLocale } from 'next-intl';

interface PropertyTypesCompProps {
    withHeader?: boolean;
    isDiscover?: boolean;
}

const PropertyTypesComp = ({
    withHeader = true,
    isDiscover = false,
}: PropertyTypesCompProps) => {
    // Read localization
    const locale = useLocale();
    const searchParams = useSearchParams();
    const bounds = searchParams.get(BOUNDS_SHORT) || '';

    // Read translations
    const tGlobal = useTranslations('global');

    const router = useRouter();

    const propertyTypes = [
        { value: SALE_TYPES.PRIMARY, label: `${tGlobal('primary')}` },
        { value: SALE_TYPES.RESALE, label: `${tGlobal('resale')}` },
        { value: SALE_TYPES.RENT, label: `${tGlobal('rent')}` },
    ];
    const {
        tab,
        text,
        amenities,
        unitFeatures,
        saleType,
        type,
        unitTypeList,
        area,
        beds,
        baths,
        price,
        downPayment,
        installment,
        developers,
        locations,
        projects,
        readyToMove,
        resetSaleType,
        updateSaleType,
        setSaleTypeList,
        sortByValue,
    } = useSearchStore();
    const handleSaleType = (tempType: string) => {
        const tempSaleType = saleType.includes(tempType)
            ? saleType.filter((sType) => sType !== tempType)
            : sortStringArray([...saleType, tempType]);
        const searchState = {
            tab,
            text,
            amenities,
            unitFeatures,
            saleType,
            type,
            unitTypeList,
            area,
            beds,
            baths,
            price,
            downPayment,
            installment,
            developers,
            locations,
            projects,
            readyToMove,
            bounds,
            sortByValue,
        };
        if (tempSaleType.length >= 3) {
            handleReset();
        } else {
            const linkUrl = generateUrl(searchState, locale, {
                tempSaleType:
                    tempSaleType.length === 0
                        ? DEFAULT_ALL_SALE_TYPE
                        : tempSaleType,
                tempPage: DEFATULT_EMPTY_URL.tempPage,
            });
            if (isDiscover) {
                router.push(linkUrl);
            } else {
                updateSaleType(tempType);
            }
        }
    };
    const resettingUrl = useGenerateUrl({
        tempSaleType: sortStringArray([
            SALE_TYPES.PRIMARY,
            SALE_TYPES.RENT,
            SALE_TYPES.RESALE,
        ]),
        tempPage: DEFATULT_EMPTY_URL.tempPage,
    });
    const handleReset = () => {
        if (isDiscover) {
            router.push(resettingUrl);
        } else {
            resetSaleType();
            setSaleTypeList(DEFAULT_ALL_SALE_TYPE);
        }
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
                    checked={saleType.length >= 3}
                    id="AllTypes"
                    value="All"
                />
                {propertyTypes.map(
                    (property: { value: string; label: string }, index) => (
                        <BorderedCheckbox
                            label={property.label}
                            withIcon={true}
                            onChange={() => handleSaleType(property.value)}
                            checked={
                                saleType.length < 3 &&
                                saleType.includes(property.value)
                            }
                            value={`${property.value}`}
                            id={`${property.value}-ty`}
                            key={`${property.value}-ty`}
                        />
                    )
                )}
            </ul>
        </div>
    );
};

export default PropertyTypesComp;
