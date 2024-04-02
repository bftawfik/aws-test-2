'use client';
import { Unit } from '@/types';
import React, { useEffect, useRef, useState } from 'react';
import { CallSmallIcon, WhatsappSmallIcon } from '@/ui/svg';

import { egCountryCode, hotline, whatsapp } from '@/constants';
import useCurrentUrl from '@/hooks/useCurrentUrl';
import CompareButton from '@/ui/compare-button';
import WishlistButton from '@/ui/wishlist-button';
import InnersShareButton from '@/ui/inners-share-button';
import { useTranslations } from 'next-intl';
import { getUrlLocaleSegment } from '@/helpers/getUrlLocaleSegment';
import { generateUnitWhatsappTextEncoded } from '@/helpers/generateUnitWhatsappTextEncoded';

const UnitContent = ({
    unit,
    children,
    locale,
}: {
    unit: Unit;
    children: React.ReactNode;
    locale: string;
}) => {
    // Read translations
    const tGlobal = useTranslations('global');

    const urlLocaleSegment = getUrlLocaleSegment(locale);

    // Whatsapp
    // Get CurrentUrl and concatinate it for the unit link
    const unitLink = useCurrentUrl(`${urlLocaleSegment}/units/${unit?.slug}`);
    const encodedWhatsappText = generateUnitWhatsappTextEncoded(
        unit?.title,
        unit?.type,
        unit?.price,
        unit?.address,
        unitLink
    );
    const [drawerFooterHeight, setdrawerFooterHeight] = useState(80);
    const drawerFooterRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        setdrawerFooterHeight(drawerFooterRef?.current?.offsetHeight || 0);
    }, []);

    return (
        <div style={{ paddingBottom: `${drawerFooterHeight + 20}px` }}>
            {/* Start SSR content */}
            {children}
            {/* End SSR content */}
            <div
                ref={drawerFooterRef}
                className="fixed bottom-0 flex w-full flex-wrap items-center justify-center gap-y-3 border-t bg-slate-50 p-5 ltr:left-0 rtl:right-0 md:justify-between lg:w-1/2"
            >
                <nav className="4k:mt-6 mt-0 flex flex-wrap items-center justify-center gap-4 lg:justify-end">
                    <a
                        href={`tel:${hotline}}`}
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
