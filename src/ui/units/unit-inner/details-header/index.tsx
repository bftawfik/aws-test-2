'use client';
import getNumberFormat from '@/helpers/get-number-format';
import React from 'react';
import {
    hotline,
    whatsapp,
    emptyCountryCode,
    egCountryCode,
} from '@/constants';
import { CallSmallIcon, WhatsappSmallIcon } from '@/ui/svg';
import useCurrentUrl from '@/hooks/useCurrentUrl';
import { useLocale, useTranslations } from 'next-intl';
import { getUrlLocaleSegment } from '@/helpers/getUrlLocaleSegment';
import { generateUnitWhatsappTextEncoded } from '@/helpers/generateUnitWhatsappTextEncoded';

const DetailsHeader = ({ unit }: any) => {
    // Read localization
    const locale = useLocale();

    // Read translations
    const tGlobal = useTranslations('global');
    const urlLocaleSegment = getUrlLocaleSegment(locale);

    // const [loading, setLoading] = useState(false);
    // const downloadOffer = async () => {
    //     setLoading(true);
    //     const offer = await getOffer(unit.id);
    //     setLoading(false);
    //     offer ? (document.location.href = offer.download_link) : null;
    // };

    // Get CurrentUrl and concatinate it for the unit link
    const unitLink = useCurrentUrl(`${urlLocaleSegment}/units/${unit?.slug}`);

    // Whatsapp
    const encodedWhatsappText = generateUnitWhatsappTextEncoded(
        unit.title,
        unit.type,
        unit.price,
        unit.address,
        unitLink
    );

    return (
        <section className="my-8 flex flex-wrap items-center justify-between gap-y-4 self-start">
            <div className="flex flex-wrap items-center gap-x-10 gap-y-4">
                <div>
                    <span className="overflow-hidden whitespace-nowrap text-[14px] font-normal capitalize text-gray-500">
                        {tGlobal('starting_from')}
                    </span>
                    <div className="mt-1 flex items-end gap-2 text-[30px] font-bold text-black lg:text-4xl">
                        {getNumberFormat(unit?.price)}
                        <span className="ms-1 whitespace-nowrap text-[20px] font-normal uppercase lg:text-2xl">
                            {tGlobal('egp')}
                        </span>
                    </div>
                </div>

                {unit.min_down_payment && (
                    <div>
                        <span className="overflow-hidden whitespace-nowrap text-[14px] font-normal capitalize text-gray-500">
                            {tGlobal('min_down_payment')}
                        </span>
                        <div className="mt-1 flex items-end gap-2 text-[22px] font-bold text-black lg:text-2xl">
                            {getNumberFormat(unit?.min_down_payment)}
                            <span className="ms-1 whitespace-nowrap text-[20px] font-normal uppercase lg:text-2xl">
                                {tGlobal('egp')}
                            </span>
                        </div>
                    </div>
                )}

                {unit?.min_month_payment && (
                    <div>
                        <span className="overflow-hidden whitespace-nowrap text-[14px] font-normal capitalize text-gray-500">
                            {tGlobal('min_monthly_payment')}
                        </span>
                        <div className="mt-1 flex items-end gap-2 text-[22px] font-bold text-black lg:text-2xl">
                            {getNumberFormat(unit?.min_month_payment)}

                            <span className="ms-1 whitespace-nowrap text-[20px] font-normal uppercase lg:text-2xl">
                                {tGlobal('egp')}
                            </span>
                        </div>
                    </div>
                )}
            </div>
            <nav className="4k:mt-6 mt-0 flex flex-wrap items-center justify-center gap-4 lg:justify-end">
                {/* {loading ? (
                    <div className="h-11 w-auto items-center justify-center">
                        <BrandLoader />
                    </div>
                ) : (
                    <button
                        onClick={downloadOffer}
                        className="group flex  h-11 w-auto min-w-[128px] cursor-pointer items-center justify-center gap-2 rounded-lg border border-gray-200 px-1 text-sm font-medium capitalize text-black duration-300 hover:border-primary hover:bg-primary hover:text-white"
                    >
                        <BiCloudDownload className="h-5 w-5" />
                        {tGlobal('download_offer')}
                    </button>
                )} */}
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
        </section>
    );
};

export default DetailsHeader;
