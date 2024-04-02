'use client';
import getNumberFormat from '@/helpers/get-number-format';
import CompareButton from '@/ui/compare-button';
import InnersShareButton from '@/ui/inners-share-button';
import WishlistButton from '@/ui/wishlist-button';
import Image from 'next/image';
import React from 'react';
import { useTranslations } from 'next-intl';

const DetailsHeader = ({ project }: any) => {
    // Read translations
    const tGlobal = useTranslations('global');

    return (
        <section className=" my-8 flex flex-wrap items-center justify-between gap-y-4">
            <div className="flex items-center">
                <div className="me-6 flex h-[78px] min-w-[78px] max-w-[78px] items-center justify-center overflow-hidden rounded-full border border-gray-100 bg-white">
                    {project?.logo && (
                        <Image
                            src={project?.logo}
                            width={300}
                            height={300}
                            className="h-full w-full rounded-full rounded-t-xl object-cover object-center transition duration-500 group-hover:scale-110"
                            alt={project?.name.en + ' logo'}
                        />
                    )}
                </div>
                {project?.start_price && (
                    <div className="">
                        <span className="overflow-hidden whitespace-nowrap text-[14px] font-normal capitalize text-gray-500">
                            {tGlobal('starting_from')}
                        </span>
                        <div className="mt-1 flex items-end gap-2 text-[30px] font-bold text-black lg:text-4xl">
                            {getNumberFormat(project?.start_price)}
                            <span className="ms-1 whitespace-nowrap text-[20px] font-normal uppercase lg:text-2xl">
                                {tGlobal('egp')}
                            </span>
                        </div>
                    </div>
                )}
            </div>

            <div>
                <span className="overflow-hidden whitespace-nowrap text-[14px] font-normal capitalize text-gray-500">
                    {tGlobal('min_down_payment')}
                </span>
                <div className="mt-1 flex items-end gap-2 text-[22px] font-bold text-black lg:text-2xl">
                    {getNumberFormat(project?.min_down_payment)}
                    <span className="ms-1 whitespace-nowrap text-[20px] font-normal uppercase lg:text-2xl">
                        {tGlobal('egp')}
                    </span>
                </div>
            </div>

            <div className="">
                <span className="overflow-hidden whitespace-nowrap text-[14px] font-normal capitalize text-gray-500">
                    {tGlobal('min_monthly_payment')}
                </span>
                <div className="mt-1 flex items-end gap-2 text-[22px] font-bold text-black lg:text-2xl">
                    {getNumberFormat(project?.min_month_payment)}

                    <span className="ms-1 whitespace-nowrap text-[20px] font-normal uppercase lg:text-2xl">
                        {tGlobal('egp')}
                    </span>
                </div>
            </div>

            <nav className="flex items-center gap-2 sm:mt-6">
                <CompareButton usage="inner" item={project} type="projects" />
                <WishlistButton usage="inner" item={project} type="project" />
                <InnersShareButton item={project} />
            </nav>
        </section>
    );
};

export default DetailsHeader;
