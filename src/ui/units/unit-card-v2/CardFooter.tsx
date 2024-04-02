import { PhoneCallIcon, WhatsAppIcon } from '@/ui/svg';
import React from 'react';
import ShareContents from './ShareContents';
import { Unit } from '@/types';
import {
    egCountryCode,
    emptyCountryCode,
    hotline,
    whatsapp,
} from '@/constants';
import { getUrlLocaleSegment } from '@/helpers/getUrlLocaleSegment';
import { generateUnitWhatsappTextEncoded } from '@/helpers/generateUnitWhatsappTextEncoded';

export interface CardContentsProps {
    unit: Unit;
    locale: string;
    host: string;
}
const CardFooter = ({ unit, locale, host }: CardContentsProps) => {
    const urlLocaleSegment = getUrlLocaleSegment(locale);
    const unitLink = `${host}${urlLocaleSegment}/units/${unit?.slug}`;
    const encodedWhatsappText = generateUnitWhatsappTextEncoded(
        unit.title,
        unit.type,
        unit.price,
        unit.address,
        unitLink
    );
    return (
        <div className="grid grid-cols-3 overflow-hidden rounded-b-lg border-t border-t-gray-100">
            {/* Call Mobile */}
            <a
                href={`tel:${emptyCountryCode}${hotline}`}
                className="inline-flex items-center justify-center p-4 hover:bg-[#FAFAFA]"
            >
                <PhoneCallIcon
                    viewBox="0 0 24 24"
                    width={24}
                    height={24}
                    className="h-7 w-7 fill-current text-[#4CB087]"
                />
            </a>
            {/* Whatsapp */}
            <a
                href={`https://wa.me/${egCountryCode}${whatsapp}?text=${encodedWhatsappText}`}
                target="_blank"
                className="inline-flex items-center justify-center p-3 hover:bg-[#FAFAFA]"
            >
                <WhatsAppIcon
                    viewBox="0 0 24 24"
                    width={24}
                    height={24}
                    className="h-7 w-7 fill-current text-[#4CB087]"
                />
            </a>

            <ShareContents
                unitLink={unitLink}
                unitSlug={unit?.slug}
                encodedWhatsappText={encodedWhatsappText}
            />
        </div>
    );
};

export default CardFooter;
