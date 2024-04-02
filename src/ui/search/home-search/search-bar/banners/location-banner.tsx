import React from 'react';
import { BsCheck2Square } from 'react-icons/bs';
import { Banners } from './banners';
import { LocationMarkerOutlineIcon } from '@/ui/svg';
import { useTranslations } from 'next-intl';

const LocationBanner = ({ data, selected }: Banners) => {
    // Read translations
    const tGlobal = useTranslations('global');
    if (!data) return null;

    return (
        <div className="flex h-10 items-center justify-between md:h-12 md:px-2">
            <div className="flex items-center justify-start gap-1  md:gap-2 ">
                <LocationMarkerOutlineIcon
                    viewBox="0 0 24 24"
                    className="h-5 w-5 fill-current text-gray-400"
                />

                <p className="line-clamp-1 flex-auto text-start text-xs md:text-base">
                    {data?.name}
                </p>
            </div>
            <div className="flex items-center gap-2">
                {selected && (
                    <BsCheck2Square className="h-6 w-6 fill-[#4CB087]" />
                )}
                <div className="rounded-md border  border-primary px-3  py-1 text-xs text-primary  md:text-sm ">
                    {tGlobal('location')}
                </div>
            </div>
        </div>
    );
};

export default LocationBanner;
