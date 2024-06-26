import { getLangkey } from '@/helpers';
import { Unit } from '@/types';
import React, { useEffect, useRef, useState } from 'react';
import { ImagePlaceholder } from '@/ui/image-placeholder';
import getNumberFormat from '@/helpers/get-number-format';
import {
    BathRoomIcon,
    BedOutlineIcon,
    CallSmallIcon,
    DimensionsIcon,
    WhatsappSmallIcon,
} from '@/ui/svg';

import DrawerGallery from '@/ui/gallery-component/DrawerGallery/DrawerGallery';
import {
    hotline,
    whatsapp,
    emptyCountryCode,
    egCountryCode,
} from '@/constants';
import useCurrentUrl from '@/hooks/useCurrentUrl';
import CompareButton from '@/ui/compare-button';
import WishlistButton from '@/ui/wishlist-button';
import InnersShareButton from '@/ui/inners-share-button';
import InnerSectionHeader from '@/ui/inners-section-header';
import ReadMore from '@/ui/read-more';
import Image from 'next/image';
import { InnerMapWIthStaticImage } from '@/ui/InnerMapWIthStaticImage/InnerMapWIthStaticImage';
import ContactusForm from '@/ui/contactus-form';
import AmenitiesShow from '@/ui/AmenitiesShow/AmenitiesShow';
import { useTranslations, useLocale } from 'next-intl';
import { getUrlLocaleSegment } from '@/helpers/getUrlLocaleSegment';
import { generateUnitWhatsappTextEncoded } from '@/helpers/generateUnitWhatsappTextEncoded';
import SoldOut from '@/ui/SoldOut/SoldOut';

const UnitContent = ({ unit }: { unit: Unit }) => {
    // Read localization
    const locale = useLocale();
    // Read translations
    const tGlobal = useTranslations('global');

    const checkCommercialUnitType = unit?.type === 'commercial';
    const urlLocaleSegment = getUrlLocaleSegment(locale);

    // Whatsapp
    // Get CurrentUrl and concatinate it for the unit link
    const unitLink = useCurrentUrl(`${urlLocaleSegment}/units/${unit?.slug}`);
    const encodedWhatsappText = generateUnitWhatsappTextEncoded(
        unit.title,
        unit.type,
        unit.price,
        unit.address,
        unitLink
    );

    const [drawerFooterHeight, setdrawerFooterHeight] = useState(80);
    const drawerFooterRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        setdrawerFooterHeight(drawerFooterRef?.current?.offsetHeight || 0);
    }, []);

    return (
        <div style={{ paddingBottom: `${drawerFooterHeight + 20}px` }}>
            <div className="mb-5 flex items-center gap-x-4">
                <h2 className="text-xl font-semibold capitalize leading-none text-black lg:text-2xl">
                    {getLangkey(unit.title, locale)}
                </h2>

                {unit?.sold_out ? <SoldOut type="unit" /> : null}
            </div>

            <div className={`flex flex-col gap-y-12 md:mt-8`}>
                <div className="flex items-center gap-x-4">
                    <div className="h-20 w-20 rounded-full drop-shadow-header">
                        <ImagePlaceholder
                            classes="max-w-full max-h-full rounded-full"
                            image={unit?.project?.logo || ''}
                            errorClasses="h-full w-full flex items-center justify-center bg-neutral-100 p-1"
                        />
                    </div>
                    <div>
                        <span className="text-base font-normal capitalize text-custom-grey">
                            {tGlobal('starting_from')}
                        </span>
                        <div className="text-2xl font-bold text-black">
                            {getNumberFormat(unit?.price)}

                            <span className="text-xl font-normal uppercase">
                                {tGlobal('egp') || ''}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                    {unit?.bedroom && !checkCommercialUnitType && (
                        <div className="flex items-center gap-x-2">
                            <div className="flex h-10 min-w-[40px] max-w-[40px] items-center justify-center rounded-sm border border-solid bg-gray-100">
                                <BedOutlineIcon />
                            </div>
                            <span className="flex gap-x-1 text-sm font-medium uppercase text-custom-grey">
                                <span>{unit?.bedroom || ''}</span>
                                <span> {tGlobal('rooms') || ''}</span>
                            </span>
                        </div>
                    )}
                    {unit?.bathroom && !checkCommercialUnitType && (
                        <div className="flex items-center gap-x-2">
                            <div className="flex h-10 min-w-[40px] max-w-[40px] items-center justify-center rounded-sm border border-solid bg-gray-100">
                                <BathRoomIcon />
                            </div>
                            <span className="flex gap-x-1 text-sm font-medium uppercase text-custom-grey">
                                <span>{unit?.bathroom || ''}</span>
                                <span>{tGlobal('baths') || ''}</span>
                            </span>
                        </div>
                    )}
                    {unit?.area && (
                        <div className="flex items-center gap-x-2">
                            <div className="flex h-10 min-w-[40px] max-w-[40px] items-center justify-center rounded-sm border border-solid bg-gray-100">
                                <DimensionsIcon />
                            </div>
                            <span className="flex gap-x-1 truncate text-sm font-medium uppercase text-custom-grey">
                                <span> {unit?.area || ''}</span>
                                <span> {tGlobal('meter') || ''}</span>
                                <sup>2</sup>
                            </span>
                        </div>
                    )}
                </div>
                <DrawerGallery images={unit?.images} locale={locale} />
                <aside className="w-full">
                    <InnerSectionHeader
                        title={tGlobal('property_details') || ''}
                    />
                    <div className="grid w-full grid-cols-3 gap-2 gap-x-4">
                        <div className="col-span-1">
                            <div className="mt-8">
                                <span className="text-sm font-light capitalize text-gray-500">
                                    {tGlobal('unit_code') || ''}
                                </span>
                                <div className="mt-2 text-lg font-medium capitalize text-black">
                                    {unit?.reference || ''}
                                </div>
                            </div>
                        </div>
                        <div className="col-span-1">
                            <div className="mt-8">
                                <span className="text-sm font-light capitalize text-gray-500">
                                    {tGlobal('project') || ''}
                                </span>
                                <div className="mt-2 text-lg font-medium capitalize text-black">
                                    {getLangkey(unit?.project?.name, locale)}
                                </div>
                            </div>
                        </div>
                        <div className="col-span-1">
                            <div className="mt-8">
                                <span className="text-sm font-light capitalize text-gray-500">
                                    {tGlobal('delivery') || ''}
                                </span>
                                <div className="mt-2 text-lg font-medium capitalize text-black">
                                    {unit?.project?.start_delivery?.slice(
                                        0,
                                        4
                                    ) || ''}
                                </div>
                            </div>
                        </div>
                        <div className="col-span-1">
                            <div className="mt-8">
                                <span className="text-sm font-light capitalize text-gray-500">
                                    {tGlobal('payment_option') || ''}
                                </span>
                                <div className="mt-2 text-lg font-medium capitalize text-black">
                                    {unit?.project?.payment_method || ''}
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>
                <div className="mt-8 w-full md:mt-16">
                    <InnerSectionHeader title={tGlobal('description') || ''} />
                    <ReadMore
                        maxChar={300}
                        text={unit?.description || ''}
                        classNames="line-clamp mt-4 text-sm text-gray-500"
                    />
                </div>
                <aside>
                    <InnerSectionHeader title={tGlobal('developed_by') || ''} />
                    <div className="mt-7 flex items-center">
                        <div className="w-auto">
                            <div className="me-4 flex h-[78px] min-w-[78px] max-w-[78px] items-center justify-center overflow-hidden rounded-full border border-gray-100 bg-white p-2">
                                {unit?.developer?.logo && (
                                    <Image
                                        src={unit?.developer?.logo}
                                        width={300}
                                        height={300}
                                        className="h-full w-full rounded-full object-cover object-center transition duration-500 group-hover:scale-110"
                                        alt={
                                            unit?.developer?.name?.en ||
                                            '' + ' logo'
                                        }
                                    />
                                )}
                            </div>
                        </div>

                        <div>
                            <div className="text-base font-medium text-black">
                                {getLangkey(unit?.developer?.name, locale)}
                            </div>
                            <div>
                                <ReadMore
                                    classNames="mt-2 text-xs text-gray-500"
                                    maxChar={300}
                                    text={
                                        getLangkey(
                                            unit.developer.description || '',
                                            locale
                                        ) as string | ''
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </aside>
                <div className="mt-8 w-full md:mt-16">
                    <InnerSectionHeader title={tGlobal('location') || ''} />
                    <InnerMapWIthStaticImage
                        marker={{ lat: +unit.lat, lng: +unit.lng }}
                        staticImage={unit?.static_image_map}
                    />
                </div>
                <div>
                    <ContactusForm
                        id={unit?.id}
                        type="unit"
                        classes="lg:w-full"
                    />
                </div>
                {unit?.amenities?.length ? (
                    <AmenitiesShow amenities={unit.amenities} />
                ) : null}
            </div>

            <div
                ref={drawerFooterRef}
                className="fixed bottom-0 flex w-full flex-wrap items-center justify-center gap-y-3 border-t bg-slate-50 p-5 ltr:left-0 rtl:right-0 md:justify-between lg:w-1/2"
            >
                <nav className="4k:mt-6 mt-0 flex flex-wrap items-center justify-center gap-4 lg:justify-end">
                    <a
                        href={`tel:${emptyCountryCode}${hotline}`}
                        className="group flex h-11 w-32 min-w-[128px] cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary text-sm font-medium capitalize text-white duration-300 hover:bg-primary hover:text-white"
                    >
                        <CallSmallIcon />

                        {tGlobal('call_now')}
                    </a>
                    <a
                        target="_blank"
                        href={`https://wa.me/${egCountryCode}${whatsapp}?text=${encodedWhatsappText}`}
                        className="group flex h-11 w-32 min-w-[128px] cursor-pointer items-center justify-center gap-2 rounded-lg border border-gray-200 text-sm font-medium capitalize text-black duration-300 hover:border-primary hover:bg-primary hover:text-white"
                    >
                        <WhatsappSmallIcon />

                        {tGlobal('whatsapp')}
                    </a>
                </nav>
                <nav className="flex items-center gap-2">
                    <CompareButton usage="inner" item={unit} type="units" />
                    <WishlistButton usage="inner" item={unit} type="unit" />
                    <InnersShareButton item={unit} top fromDrawer />
                </nav>
            </div>
        </div>
    );
};

export default UnitContent;
