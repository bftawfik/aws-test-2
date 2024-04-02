import getNumberFormat from '@/helpers/get-number-format';
import React from 'react';
import {
    egCountryCode,
    emptyCountryCode,
    hotline,
    whatsapp,
} from '@/constants';
import { CallSmallIcon, WhatsappSmallIcon } from '@/ui/svg';
import { useLocale } from 'next-intl';
import { getUrlLocaleSegment } from '@/helpers/getUrlLocaleSegment';
import { getTranslator } from 'next-intl/server';
import { headers } from 'next/headers';
import { Unit } from '@/types';
import { generateUnitWhatsappTextEncoded } from '@/helpers/generateUnitWhatsappTextEncoded';
interface UnitDetailsHeaderProps {
    unit: Unit;
}
const UnitDetailsHeader = async ({ unit }: UnitDetailsHeaderProps) => {
    const locale = useLocale();
    const tGlobal = await getTranslator(locale, 'global');
    const urlLocaleSegment = getUrlLocaleSegment(locale);
    const headersList = headers();
    const host = headersList.get('host');
    const unitLink = `${host}${urlLocaleSegment}/units/${unit?.slug}`;
    const encodedWhatsappText = generateUnitWhatsappTextEncoded(
        unit.title,
        unit.type,
        unit.price,
        unit.address,
        unitLink
    );

    return (
        <section className="my-8 grid items-center justify-between gap-y-6 self-start md:flex md:flex-wrap">
            <div className="grid items-center gap-x-10 gap-y-4 md:flex md:flex-wrap">
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
                {unit?.payment_type === 'installments' && (
                    <div>
                        <span className="overflow-hidden whitespace-nowrap text-[14px] font-normal capitalize text-gray-500">
                            {tGlobal('min_down_payment')}
                        </span>
                        <div className="mt-1 flex items-end gap-2 text-[22px] font-bold text-black lg:text-2xl">
                            {getNumberFormat(
                                Number(unit?.min_down_payment || 0)
                            )}
                            <span className="ms-1 whitespace-nowrap text-[20px] font-normal uppercase lg:text-2xl">
                                {tGlobal('egp')}
                            </span>
                        </div>
                    </div>
                )}

                {unit?.payment_type === 'installments' && (
                    <div>
                        <span className="overflow-hidden whitespace-nowrap text-[14px] font-normal capitalize text-gray-500">
                            {tGlobal('min_monthly_payment')}
                        </span>
                        <div className="mt-1 flex items-end gap-2 text-[22px] font-bold text-black lg:text-2xl">
                            {getNumberFormat(
                                Number(unit?.min_month_payment || 0)
                            )}
                            <span className="ms-1 whitespace-nowrap text-[20px] font-normal uppercase lg:text-2xl">
                                {tGlobal('egp')}
                            </span>
                        </div>
                    </div>
                )}
            </div>
            <nav className="4k:mt-6 mt-0 flex flex-wrap items-center gap-4 md:justify-end">
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

export default UnitDetailsHeader;
