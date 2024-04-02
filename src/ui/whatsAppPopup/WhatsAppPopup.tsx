import React from 'react';
import { WhatsAppIcon } from '../svg';
import { Project, Unit } from '@/types';
import { getUrlLocaleSegment } from '@/helpers/getUrlLocaleSegment';
import { headers } from 'next/headers';
import { generateProjectWhatsappTextEncoded } from '@/helpers/generateProjectWhatsappTextEncoded';
import { generateUnitWhatsappTextEncoded } from '@/helpers/generateUnitWhatsappTextEncoded'; // Import the function for generating unit WhatsApp text
import { egCountryCode, whatsapp } from '@/constants';

interface WhatsAppPopupProps {
    type: string;
    item: Unit | Project;
    locale: string;
}

const WhatsAppPopup: React.FC<WhatsAppPopupProps> = async ({
    type,
    item,
    locale,
}) => {
    const urlLocaleSegment = getUrlLocaleSegment(locale);
    const headersList = headers();
    const host = headersList.get('host');

    let encodedWhatsappText = '';
    let link = '';

    if (type === 'unit') {
        const unit = item as Unit;
        link = `${host}${urlLocaleSegment}/units/${unit?.slug}`;
        encodedWhatsappText = generateUnitWhatsappTextEncoded(
            unit?.title,
            unit?.type,
            unit?.price,
            unit?.address,
            link
        );
    } else if (type === 'project') {
        const project = item as Project;
        link = `${host}${urlLocaleSegment}/projects/${project?.slug}`;
        encodedWhatsappText = generateProjectWhatsappTextEncoded(
            project?.name,
            project?.start_price,
            project?.address,
            link
        );
    }

    return (
        <div className="sticky bottom-20 left-[calc(100%-56px)] z-[50] flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-primary lg:hidden">
            <a
                target="_blank"
                href={`https://wa.me/${egCountryCode}${whatsapp}?text=${encodedWhatsappText}`}
            >
                <WhatsAppIcon className="h-8 w-8 p-1" fill="#fff" />
            </a>
        </div>
    );
};

export default WhatsAppPopup;
