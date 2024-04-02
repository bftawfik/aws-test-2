'use client';
import {
    hotline,
    whatsapp,
    emptyCountryCode,
    egCountryCode,
} from '@/constants';
import getNumberFormat from '@/helpers/get-number-format';
import useCurrentUrl from '@/hooks/useCurrentUrl';
import { LocationMarkerIcon, PhoneCallIcon, WhatsAppIcon } from '@/ui/svg';
import React, { useState, useRef, useEffect } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { getUrlLocaleSegment } from '@/helpers/getUrlLocaleSegment';
import { generateProjectWhatsappTextEncoded } from '@/helpers/generateProjectWhatsappTextEncoded';

const ScrollHeader = ({ project }: any) => {
    const [view, setView] = useState(false);
    const intersectionRef = useRef<HTMLDivElement>(null);
    // Read localization
    const locale = useLocale();
    // Read translations
    const tGlobal = useTranslations('global');
    const urlLocaleSegment = getUrlLocaleSegment(locale);

    const handleScrolling = () => {
        if (intersectionRef) {
            const offsetTop = intersectionRef.current?.offsetTop ?? 200;
            const position = window.pageYOffset;
            setView(position > offsetTop);
        }
    };
    useEffect(() => {
        window.addEventListener('scroll', handleScrolling);
        return () => window.removeEventListener('scroll', handleScrolling);
    }, []);

    // Get BaseUrl and create it for the project link
    const projectLink = useCurrentUrl(
        `${urlLocaleSegment}/projects/${project?.slug}`
    );

    // Whatsapp
    const encodedWhatsappText = generateProjectWhatsappTextEncoded(
        project.name,
        project.start_price,
        project.address,
        projectLink
    );

    return (
        <div className="w-full" ref={intersectionRef}>
            {view && (
                <div className=" duration-600 min-h-12 fixed left-0 top-0 z-50 hidden w-full bg-gray-100 shadow-sm transition-all sm:px-6 lg:block">
                    <div className="container mx-auto items-center justify-between px-3 py-5 md:flex">
                        <div className="w-full flex-wrap items-center justify-between lg:flex">
                            <div className="flex w-full items-center justify-between gap-8">
                                <div>
                                    <h3 className="font-bold capitalize">
                                        {project.name}
                                    </h3>
                                    <div className="flex w-full items-center gap-1 py-1 text-xs text-gray-800">
                                        <LocationMarkerIcon />
                                        <p className="line-clamp-1 max-w-xs md:max-w-sm">
                                            {project.address}
                                        </p>
                                    </div>
                                </div>{' '}
                                <div className="flex gap-8">
                                    <div className="flex items-center">
                                        <div data-v-0eea979a="">
                                            <span className="text-xs font-normal capitalize text-gray-500">
                                                {tGlobal('starting_from')}
                                            </span>
                                            <div className="text-lg font-bold text-black">
                                                {getNumberFormat(
                                                    project.start_price
                                                )}
                                                <span className="ms-1 text-sm font-normal uppercase">
                                                    {tGlobal('egp')}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <span className="text-xs font-normal capitalize text-gray-500">
                                            {tGlobal('min_down_payment')}
                                        </span>
                                        <div className="text-lg font-bold text-black">
                                            {getNumberFormat(
                                                project?.min_down_payment
                                            )}
                                            <span className="ms-1 text-sm font-normal uppercase">
                                                {tGlobal('egp')}
                                            </span>
                                        </div>
                                    </div>{' '}
                                    <div>
                                        <span className="text-xs font-normal capitalize text-gray-500">
                                            {tGlobal('min_monthly_payment')}
                                        </span>
                                        <div className="text-lg font-bold text-black">
                                            {getNumberFormat(
                                                project?.min_month_payment
                                            )}

                                            <span className="ms-1 text-sm font-normal uppercase">
                                                {tGlobal('egp')}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <nav className="flex items-center">
                                    <a
                                        href={`tel:${emptyCountryCode}${hotline}`}
                                        className=" group flex items-center justify-center rounded-full border p-3 text-sm font-medium capitalize text-black duration-150 hover:border-primary hover:bg-primary hover:text-white ltr:mr-2 rtl:ml-2"
                                    >
                                        <PhoneCallIcon
                                            width={20}
                                            height={20}
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            className="h-4 w-4 fill-black duration-300 group-hover:fill-white"
                                        />
                                    </a>
                                    <a
                                        href={`https://wa.me/${egCountryCode}${whatsapp}?text=${encodedWhatsappText}`}
                                        target="_blank"
                                        className="flex items-center justify-center rounded-full border border-primary bg-primary p-3 text-sm font-medium capitalize text-white duration-150"
                                    >
                                        <WhatsAppIcon
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            className="h-4 w-4 shrink-0 fill-white duration-300 group-hover:fill-white"
                                        />
                                    </a>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ScrollHeader;
