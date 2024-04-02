import Image from 'next/image';
import React from 'react';
import { BsCheck2Square } from 'react-icons/bs';
import { Banners } from './banners';
import { useTranslations, useLocale } from 'next-intl';

const DeveloperBanner = ({ data, selected }: Banners) => {
    // Read translations
    const tGlobal = useTranslations('global');

    if (!data) return null;
    return (
        <div className="flex h-10 items-center justify-between md:h-12 md:px-2">
            <div className="flex items-center justify-start gap-1  md:gap-2 ">
                <div className="h-5 w-5 overflow-hidden rounded-full border md:h-8 md:w-8">
                    <Image
                        alt="img"
                        width={30}
                        height={30}
                        src={data.logo}
                        className="h-full w-full rounded-full "
                    />
                </div>

                <p className="line-clamp-1 flex-auto text-start text-xs md:text-base">
                    {data?.name}
                </p>
            </div>
            <div className="flex items-center gap-2">
                {selected && (
                    <BsCheck2Square className="h-6 w-6 fill-[#4CB087]" />
                )}
                <div className="rounded-md border border-gray-600 p-1 text-xs  md:px-3  md:py-1 md:text-sm ">
                    {tGlobal('developer')}
                </div>
            </div>
        </div>
    );
};

export default DeveloperBanner;
