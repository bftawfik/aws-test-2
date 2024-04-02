import { getLangkey } from '@/helpers';
import { LocationCardProps } from '@/ui/neighbothoods/neighborhood-card/neighborhood-card';
import React, { useState } from 'react';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import { ImagePlaceholder } from '@/ui/image-placeholder';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import Drawer from '@/ui/drawer';
import { MultiArrowsIcon } from '@/ui/svg/MultiArrowsIcon';
import { LocationContent } from '@/ui/discover/drawers-content/LocationContent';
import { getUrlLocaleSegment } from '@/helpers/getUrlLocaleSegment';

const LocationCard = (props: LocationCardProps) => {
    // Read localization
    const locale = useLocale();
    // Read translations
    const tGlobal = useTranslations('global');
    const urlLocaleSegment = getUrlLocaleSegment(locale);

    // open drawer
    const [openLocationDrawer, setOpenLocationDrawer] = useState(false);
    const handleRouting = (e: React.MouseEvent<HTMLElement>) => {
        if (props.shouldPreventRouting) {
            e.preventDefault();
            setOpenLocationDrawer(true);
        }
    };
    return (
        <>
            <Link
                onClick={handleRouting}
                key={props.location?.id}
                href={`${urlLocaleSegment}/neighborhoods/${props.location?.slug}`}
                prefetch={false}
            >
                <div
                    className={`drop-shadow group relative overflow-hidden rounded-lg bg-white text-white ${props.className}`}
                >
                    <div className="absolute top-0 z-20 h-full w-full space-y-2 bg-gradient-to-b from-black/70 to-gray-50/10 p-4">
                        {props.location?.name && locale && (
                            <h2 className="line-clamp-1 text-xl font-bold">
                                {getLangkey(props.location?.name, locale)}
                            </h2>
                        )}

                        <div className="flex items-center gap-x-2 text-sm">
                            {props.location?.projects_count ? (
                                <>
                                    {props.location?.projects_count}{' '}
                                    {tGlobal('single_project')}
                                    <HiOutlineArrowNarrowRight className="h-4 w-4 rtl:rotate-180" />
                                </>
                            ) : (
                                ''
                            )}
                        </div>
                    </div>

                    <ImagePlaceholder
                        classes="absolute inset-0 z-10 h-full w-full rounded-lg object-cover object-center transition-transform duration-500 group-hover:scale-110"
                        image={props?.location?.image ?? ''}
                    />
                </div>
            </Link>
            <Drawer
                isOpen={openLocationDrawer}
                closeModalHandler={() => setOpenLocationDrawer(false)}
                headerElemnt={
                    <Link
                        prefetch={false}
                        href={`${urlLocaleSegment}/neighborhoods/${props?.location?.slug}`}
                        target="_blank"
                        className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#B3B3B3] px-3 py-2 text-xs capitalize text-[#5F5F5F] transition-colors duration-150 hover:bg-gray-200"
                    >
                        <MultiArrowsIcon className="h-4 w-4 text-custom-grey" />
                        {tGlobal('view_details')}
                    </Link>
                }
            >
                <LocationContent neighborhood={props.location} />
            </Drawer>
        </>
    );
};

export default LocationCard;
