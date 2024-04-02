'use client';
import { getFromLocalStorage, getLangkey, setOnLocalStorage } from '@/helpers';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { CgClose } from 'react-icons/cg';
import { ImagePlaceholder } from '../image-placeholder';
import { CompareItemType, Project, Unit } from '@/types';
import getNumberFormat from '@/helpers/get-number-format';
import { useCompareStore } from '@/store/global';
import NoResults from '../empty-states/no-search-results';
import ReadMore from '../read-more';
import { useTranslations, useLocale } from 'next-intl';
import { getUrlLocaleSegment } from '@/helpers/getUrlLocaleSegment';
import { AR_LOCALE, EMPTY_DATA_FIELD, EN_LOCALE } from '@/constants';
import EstatebookLoader from '../loaders/estate-book-loader';

const CompareClient = () => {
    // Read localization
    const locale = useLocale();

    // Read translations
    const tGlobal = useTranslations('global');
    const tCompare = useTranslations('compare');
    const urlLocaleSegment = getUrlLocaleSegment(locale);

    // use compare store
    const { compare_items, compare_type, setCompareItems, setCompareType } =
        useCompareStore();
    const maxCompareItems: number = 4;
    const initCompareTypeAndItemsFromLocalStorage = useCallback(() => {
        setCompareType(getFromLocalStorage('compare_type'));
        setCompareItems(getFromLocalStorage('compare_items'));
    }, [setCompareItems, setCompareType]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // init data from local storage
        initCompareTypeAndItemsFromLocalStorage();
        setIsLoading(false);
    }, [initCompareTypeAndItemsFromLocalStorage]);

    // remove item
    const removeItem = (id: number) => {
        const compare_items_after_remove = compare_items.filter(function (el) {
            return el.id !== id;
        });
        if (!compare_items_after_remove.length) {
            setCompareType('');
            setOnLocalStorage('compare_type', '', 'string');
        }
        setCompareItems(compare_items_after_remove);
        setOnLocalStorage('compare_items', compare_items_after_remove);
    };

    // css classes
    const borderClasses =
        'flex w-full items-center justify-center gap-2 py-0 text-sm md:text-base font-normal text-black ltr:border-r-2 ltr:last:border-l-0 ltr:last:border-r-0 rtl:border-l-2 rtl:last:border-l-0 rtl:last:border-r-0';

    const borderClassesWithoutFlexAlignment =
        'flex w-full gap-2 py-0 text-base font-normal text-black ltr:border-r-2 ltr:last:border-l-0 ltr:last:border-r-0 rtl:border-l-2 rtl:last:border-l-0 rtl:last:border-r-0';

    if (isLoading) {
        return <EstatebookLoader />;
    }
    return (
        <>
            {compare_items && compare_items.length > 0 ? (
                <div>
                    {/* <div className="w-full max-w-2xl overflow-x-auto md:max-w-5xl lg:max-w-full">
                        <div className="flex w-full min-w-[800px] flex-col gap-4 lg:min-w-full">
                            
                        </div>
                    </div> */}
                    {/* <div className="flex w-full flex-col gap-4 overflow-x-scroll md:min-w-[800px] lg:min-w-full"> */}
                    <div className="w-full max-w-2xl overflow-x-auto md:max-w-5xl lg:max-w-full">
                        <div className="flex w-full min-w-[800px] flex-col gap-2 md:gap-4 lg:min-w-full">
                            <div
                                className={`my-2 grid w-full gap-4 grid-cols-${maxCompareItems}`}
                            >
                                {compare_items?.map(
                                    (item: CompareItemType, idx: number) => (
                                        <div key={item?.id} className="w-full">
                                            <div className="relative flex h-full min-h-[160px] w-full flex-col gap-4 overflow-hidden rounded-t-[10px]">
                                                <a
                                                    onClick={() =>
                                                        removeItem(item.id)
                                                    }
                                                    className="absolute right-5 top-4 z-10 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-red-500 text-white"
                                                >
                                                    <CgClose className="h-3 w-3 fill-white text-white" />
                                                </a>
                                                <Link
                                                    href={`${urlLocaleSegment}/${getFromLocalStorage(
                                                        'compare_type'
                                                    )}/${item?.slug}`}
                                                    className="relative flex h-32 w-full md:h-44"
                                                    prefetch={false}
                                                >
                                                    {' '}
                                                    <ImagePlaceholder
                                                        classes="h-full w-full rounded-lg object-cover object-center"
                                                        image={item?.main_image}
                                                    />
                                                    <div className="absolute inset-x-1/2 -bottom-5 z-10 flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-white shadow ltr:-translate-x-1/2 rtl:translate-x-1/2">
                                                        <ImagePlaceholder
                                                            classes="h-full w-full rounded-lg "
                                                            image={
                                                                (item as Unit)
                                                                    .project
                                                                    ?.logo ||
                                                                (
                                                                    item as Project
                                                                )?.logo
                                                            }
                                                        />
                                                    </div>
                                                </Link>
                                                <h2 className="mt-4 text-center text-sm font-semibold capitalize text-black md:text-lg">
                                                    {getLangkey(
                                                        (item as Unit).title ||
                                                            (item as Project)
                                                                .name,
                                                        locale
                                                    )}
                                                </h2>
                                                {/* <a
                                                    className={` group mx-auto flex h-9 cursor-pointer items-center justify-center rounded-lg border px-4  text-xs font-medium capitalize text-black duration-150 md:w-52 ${
                                                        (item as Project)
                                                            .brochure
                                                            ? 'border-primary hover:bg-primary hover:text-white'
                                                            : 'pointer-events-none border-gray-300 bg-gray-50 fill-gray-300 text-gray-300'
                                                    }`}
                                                >
                                                    {tCompare(
                                                        'download_brochure'
                                                    )}
                                                </a> */}
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>
                            <div className="flex w-full items-center justify-start bg-custom-light py-2 md:py-2">
                                <p className="px-4 text-sm font-semibold capitalize text-black md:text-lg">
                                    {tCompare('starting_price')}
                                </p>
                            </div>
                            <div
                                className={`my-2 grid w-full gap-4 grid-cols-${maxCompareItems}`}
                            >
                                {compare_items?.map(
                                    (item: CompareItemType, idx: number) => (
                                        <div
                                            key={item?.id}
                                            className={`${borderClasses}`}
                                        >
                                            {getNumberFormat(
                                                (item as Unit).price ||
                                                    (item as Project)
                                                        .start_price
                                            )}{' '}
                                            {tGlobal('egp')}
                                        </div>
                                    )
                                )}
                            </div>
                            <div className="flex w-full items-center justify-start bg-custom-light py-2 md:py-2">
                                <p className="px-4 text-sm font-semibold capitalize text-black md:text-lg">
                                    {tGlobal('min_down_payment')}
                                </p>
                            </div>
                            <div
                                className={`my-2 grid w-full gap-4 grid-cols-${maxCompareItems}`}
                            >
                                {compare_items?.map(
                                    (item: CompareItemType, idx: number) => (
                                        <div
                                            key={item?.id}
                                            className={`${borderClasses}`}
                                        >
                                            {getNumberFormat(
                                                item.min_down_payment
                                            )}{' '}
                                            {tGlobal('egp')}
                                        </div>
                                    )
                                )}
                            </div>
                            <div className="flex w-full items-center justify-start bg-custom-light py-2 md:py-2">
                                <p className="px-4 text-sm font-semibold capitalize text-black md:text-lg">
                                    {tGlobal('min_monthly_payment')}
                                </p>
                            </div>
                            <div
                                className={`my-2 grid w-full gap-4 grid-cols-${maxCompareItems}`}
                            >
                                {compare_items?.map(
                                    (item: CompareItemType, idx: number) => (
                                        <div
                                            key={item?.id}
                                            className={`${borderClasses}`}
                                        >
                                            {getNumberFormat(
                                                item.min_month_payment
                                            )}{' '}
                                            {tGlobal('egp')}/ {tGlobal('month')}
                                        </div>
                                    )
                                )}
                            </div>
                            <div className="flex w-full items-center justify-start bg-custom-light py-2 md:py-2">
                                <p className="px-4 text-sm font-semibold capitalize text-black md:text-lg">
                                    {tGlobal('property_types')}
                                </p>
                            </div>
                            <div
                                className={`my-2 grid w-full gap-4 grid-cols-${maxCompareItems}`}
                            >
                                {compare_items?.map(
                                    (item: CompareItemType, idx: number) => (
                                        <div
                                            key={item?.id}
                                            className="flex w-full flex-wrap items-center justify-center gap-2 py-4 text-base font-normal text-black ltr:border-r-2 ltr:last:border-l-0 ltr:last:border-r-0 rtl:border-l-2 rtl:last:border-l-0 rtl:last:border-r-0"
                                        >
                                            {compare_type === 'projects' ? (
                                                <span className="text-sm">
                                                    {(
                                                        item as Project
                                                    )?.unit_types
                                                        .map((unitType) =>
                                                            getLangkey(
                                                                unitType.name,
                                                                locale
                                                            )
                                                        )
                                                        .join(', ')}
                                                </span>
                                            ) : (
                                                <span
                                                    key={`unit-type-${
                                                        (item as Unit).id
                                                    }`}
                                                    className="text-sm"
                                                >
                                                    {(item as Unit)?.UnitType
                                                        ?.name
                                                        ? getLangkey(
                                                              (item as Unit)
                                                                  ?.UnitType
                                                                  ?.name,
                                                              locale
                                                          )
                                                        : EMPTY_DATA_FIELD}
                                                </span>
                                            )}
                                        </div>
                                    )
                                )}
                            </div>

                            {compare_type == 'units' && (
                                <div>
                                    <div className="flex w-full items-center justify-start bg-custom-light py-2 md:py-2">
                                        <p className="px-4 text-sm font-semibold capitalize text-black md:text-lg">
                                            {tGlobal('unit_type')}
                                        </p>
                                    </div>
                                    <div
                                        className={`my-5 grid w-full gap-4 capitalize grid-cols-${maxCompareItems}`}
                                    >
                                        {compare_items?.map(
                                            (
                                                item: CompareItemType,
                                                idx: number
                                            ) => (
                                                <div
                                                    key={item?.id}
                                                    className={`${borderClasses}`}
                                                >
                                                    {(
                                                        item as Unit
                                                    )?.sale_type.replace(
                                                        new RegExp(
                                                            '\\b' +
                                                                'sale' +
                                                                '\\b'
                                                        ),
                                                        'primary'
                                                    )}
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>
                            )}
                            {compare_type == 'units' && (
                                <div>
                                    <div className="flex w-full items-center justify-start bg-custom-light py-2 md:py-2">
                                        <p className="px-4 text-sm font-semibold capitalize text-black md:text-lg">
                                            {tGlobal('property_area')}
                                        </p>
                                    </div>
                                    <div
                                        className={`my-5 grid w-full gap-4 capitalize grid-cols-${maxCompareItems}`}
                                    >
                                        {compare_items?.map(
                                            (item: any, idx: number) => (
                                                <div
                                                    key={item?.id}
                                                    className={`${borderClasses}`}
                                                >
                                                    {(item as Unit).area
                                                        ? parseFloat(
                                                              item.area
                                                          ).toLocaleString()
                                                        : `${EMPTY_DATA_FIELD}`}
                                                    {tGlobal('area_unit')}
                                                    <sup>2</sup>
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>
                            )}
                            <div className="flex w-full items-center justify-start bg-custom-light py-2 md:py-2">
                                <p className="px-4 text-sm font-semibold capitalize text-black md:text-lg">
                                    {tGlobal('description')}
                                </p>
                            </div>
                            <div
                                className={`my-2 grid w-full gap-4 grid-cols-${maxCompareItems}`}
                            >
                                {compare_items?.map(
                                    (item: any, idx: number) => (
                                        <div
                                            key={`short-description-${item.id}`}
                                            className="flex w-full justify-center px-4 text-sm font-normal text-black ltr:border-r-2 ltr:last:border-l-0 ltr:last:border-r-0 rtl:border-l-2 rtl:last:border-l-0 rtl:last:border-r-0 md:text-center"
                                        >
                                            <ReadMore
                                                wrapperType="div"
                                                maxChar={100}
                                                text={
                                                    getLangkey(
                                                        item.description,
                                                        locale
                                                    ) || ''
                                                }
                                            />
                                        </div>
                                    )
                                )}
                            </div>
                            <div className="flex w-full items-center justify-start bg-custom-light py-2 md:py-2">
                                <p className="px-4 text-xl font-semibold capitalize text-black">
                                    {tGlobal('developer')}
                                </p>
                            </div>
                            <div
                                className={`my-2 grid w-full gap-4 grid-cols-${maxCompareItems}`}
                            >
                                {compare_items?.map(
                                    (item: CompareItemType, idx: number) => (
                                        <div
                                            key={`developer-${item.id}`}
                                            className="flex w-full justify-center px-4 text-center text-sm font-normal text-black ltr:border-r-2 ltr:last:border-l-0 ltr:last:border-r-0 rtl:border-l-2 rtl:last:border-l-0 rtl:last:border-r-0"
                                        >
                                            <div className="flex items-center gap-x-3">
                                                <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full">
                                                    <ImagePlaceholder
                                                        classes="object-cover object-center w-full h-full"
                                                        image={
                                                            item?.developer
                                                                ?.logo
                                                        }
                                                    />
                                                </div>
                                                <Link
                                                    className="underline"
                                                    href={`${urlLocaleSegment}/developers/${
                                                        item?.developer?.slug ??
                                                        ''
                                                    }`}
                                                    prefetch={false}
                                                >
                                                    {getLangkey(
                                                        item?.developer?.name,
                                                        locale
                                                    )}
                                                </Link>
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>
                            {compare_type === 'units' && (
                                <div>
                                    <div className="flex w-full items-center justify-start bg-custom-light py-2 md:py-2">
                                        <p className="px-4 text-sm font-semibold capitalize text-black md:text-lg">
                                            {tGlobal('project')}
                                        </p>
                                    </div>
                                    <div
                                        className={`my-2 grid w-full gap-4 grid-cols-${maxCompareItems}`}
                                    >
                                        {compare_items?.map(
                                            (
                                                item: CompareItemType,
                                                idx: number
                                            ) => (
                                                <div
                                                    key={`Project-${item.id}`}
                                                    className="flex w-full justify-center px-4 text-center text-sm font-normal text-black ltr:border-r-2 ltr:last:border-l-0 ltr:last:border-r-0 rtl:border-l-2 rtl:last:border-l-0 rtl:last:border-r-0"
                                                >
                                                    <div className="flex items-center gap-x-3">
                                                        <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full">
                                                            <ImagePlaceholder
                                                                classes="object-cover object-center w-full h-full"
                                                                image={
                                                                    (
                                                                        item as Unit
                                                                    )?.project
                                                                        ?.logo
                                                                }
                                                            />
                                                        </div>
                                                        <Link
                                                            className="underline"
                                                            href={`${urlLocaleSegment}/projects/${
                                                                (item as Unit)
                                                                    ?.project
                                                                    .slug
                                                            }`}
                                                            prefetch={false}
                                                        >
                                                            {getLangkey(
                                                                (item as Unit)
                                                                    ?.project
                                                                    ?.name,
                                                                locale
                                                            )}
                                                        </Link>
                                                    </div>
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>
                            )}
                            <div className="flex w-full items-center justify-start bg-custom-light py-2 md:py-2">
                                <p className="px-4 text-sm font-semibold capitalize text-black md:text-lg">
                                    {tGlobal('location')}
                                </p>
                            </div>
                            <div
                                className={`my-2 grid w-full gap-4 grid-cols-${maxCompareItems}`}
                            >
                                {compare_items?.map(
                                    (item: CompareItemType, idx: number) => (
                                        <div
                                            key={`location-${item.id}`}
                                            className={`${borderClasses} text-center text-sm`}
                                        >
                                            {compare_type === 'projects' ? (
                                                <div>
                                                    {(item as Project)?.location
                                                        ? `${getLangkey(
                                                              item?.address,
                                                              locale
                                                          )} , ${getLangkey(
                                                              (item as Project)
                                                                  ?.location
                                                                  ?.name,
                                                              locale
                                                          )}`
                                                        : EMPTY_DATA_FIELD}
                                                </div>
                                            ) : (
                                                <div>
                                                    {item?.address
                                                        ? `${getLangkey(
                                                              item?.address,
                                                              locale
                                                          )}`
                                                        : EMPTY_DATA_FIELD}
                                                </div>
                                            )}
                                        </div>
                                    )
                                )}
                            </div>
                            {compare_type === 'projects' && (
                                <>
                                    <div className="flex w-full items-center justify-start bg-custom-light py-2 md:py-2">
                                        <p className="px-4 text-sm font-semibold capitalize text-black md:text-lg">
                                            {tGlobal('amenities')}
                                        </p>
                                    </div>
                                    <ul
                                        className={`my-2 grid w-full gap-4 grid-cols-${maxCompareItems}`}
                                    >
                                        {compare_items?.map(
                                            (
                                                item: CompareItemType,
                                                idx: number
                                            ) => (
                                                <div
                                                    key={`amentiy-${item.id}`}
                                                    className={` items-start  justify-center ${borderClassesWithoutFlexAlignment}`}
                                                >
                                                    {item?.amenities?.length ? (
                                                        <div
                                                            className={`grid grid-cols-1 flex-wrap gap-4 py-2 text-center text-sm ltr:border-r-2 ltr:last:border-l-0 ltr:last:border-r-0 rtl:border-l-2 rtl:last:border-l-0 rtl:last:border-r-0 md:grid-cols-2 lg:grid-cols-3`}
                                                        >
                                                            {item?.amenities?.map(
                                                                (
                                                                    amenity: any
                                                                ) => (
                                                                    <div
                                                                        className="m-auto h-auto max-w-[74px]"
                                                                        key={
                                                                            amenity.id
                                                                        }
                                                                    >
                                                                        <div className="flex h-[72px] w-[74px] items-center justify-center rounded-lg border border-[#E4E4E4]">
                                                                            <div className="flex h-12 w-12  items-center justify-center">
                                                                                <ImagePlaceholder
                                                                                    classes="object-cover object-center w-full h-full"
                                                                                    image={
                                                                                        amenity?.logo
                                                                                    }
                                                                                />
                                                                            </div>
                                                                        </div>{' '}
                                                                        <h4
                                                                            className="mt-3 truncate text-center text-sm font-normal text-black"
                                                                            title={
                                                                                amenity.name
                                                                            }
                                                                        >
                                                                            {getLangkey(
                                                                                amenity.name,
                                                                                locale
                                                                            )}
                                                                        </h4>
                                                                    </div>
                                                                )
                                                            )}
                                                        </div>
                                                    ) : (
                                                        <span className="flex justify-center">
                                                            {EMPTY_DATA_FIELD}
                                                        </span>
                                                    )}
                                                </div>
                                            )
                                        )}
                                    </ul>
                                </>
                            )}
                        </div>
                    </div>
                    {/* </div> */}
                </div>
            ) : (
                <NoResults />
            )}
        </>
    );
};

export default CompareClient;
