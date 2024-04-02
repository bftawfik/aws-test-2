import getNumberFormat from '@/helpers/get-number-format';
import CompareButton from '@/ui/compare-button';
import InnersShareButton from '@/ui/inners-share-button';
import WishlistButton from '@/ui/wishlist-button';
import Image from 'next/image';
import React from 'react';
import { Project } from '@/types';
import { getTranslations } from 'next-intl/server';

interface DetailsHeaderV2Props {
    project: Project;
    locale: string;
}

const DetailsHeaderV2 = async ({ project, locale }: DetailsHeaderV2Props) => {
    // Read translations
    const tGlobal = await getTranslations('global');

    return (
        <section className="my-8 items-center justify-between gap-4 lg:flex">
            <div className="flex flex-wrap items-center justify-between gap-4 lg:w-3/4">
                <div className="flex items-center">
                    <div className="me-6 flex h-[78px] min-w-[78px] max-w-[78px] items-center justify-center overflow-hidden rounded-full border border-gray-100 bg-white">
                        {project?.logo ? (
                            <Image
                                src={project?.logo}
                                width={300}
                                height={300}
                                className="h-full w-full rounded-full rounded-t-xl object-cover object-center transition duration-500 group-hover:scale-110"
                                alt={project?.name.en + ' logo'}
                            />
                        ) : null}
                    </div>
                    {project?.start_price ? (
                        <div className="">
                            <span className="overflow-hidden whitespace-nowrap text-xs font-normal capitalize text-gray-500 md:text-[14px]">
                                {tGlobal('starting_from')}
                            </span>
                            <div className="mt-1 flex items-end gap-2 text-[20px] font-bold text-black md:text-[30px] lg:text-4xl">
                                {getNumberFormat(project?.start_price)}
                                <span className="ms-1 whitespace-nowrap text-base font-normal uppercase md:text-[20px] lg:text-2xl">
                                    {tGlobal('egp')}
                                </span>
                            </div>
                        </div>
                    ) : null}
                </div>

                <div>
                    <span className="overflow-hidden whitespace-nowrap text-[11px] font-normal capitalize text-gray-500 md:text-[14px]">
                        {tGlobal('min_down_payment')}
                    </span>
                    <div className="mt-1 flex items-end gap-2 text-base font-bold text-black md:text-[22px] lg:text-2xl">
                        {getNumberFormat(project?.min_down_payment)}
                        <span className="ms-1 whitespace-nowrap text-base font-normal uppercase md:text-[20px] lg:text-2xl">
                            {tGlobal('egp')}
                        </span>
                    </div>
                </div>

                <div className="">
                    <span className="overflow-hidden whitespace-nowrap text-xs font-normal  capitalize text-gray-500 md:text-[14px]">
                        {tGlobal('min_monthly_payment')}
                    </span>
                    <div className="mt-1 flex items-end gap-2 text-base font-bold text-black md:text-[22px] lg:text-2xl">
                        {getNumberFormat(project?.min_month_payment)}

                        <span className="ms-1 whitespace-nowrap text-base font-normal uppercase md:text-[20px] lg:text-2xl">
                            {tGlobal('egp')}
                        </span>
                    </div>
                </div>
            </div>

            <nav className="mt-6 flex items-center gap-2 lg:mt-0">
                <CompareButton usage="inner" item={project} type="projects" />
                <WishlistButton usage="inner" item={project} type="project" />
                <InnersShareButton item={project} />
            </nav>
        </section>
    );
};

export default DetailsHeaderV2;
