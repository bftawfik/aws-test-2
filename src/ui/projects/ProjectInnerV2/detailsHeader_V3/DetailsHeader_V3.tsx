import getNumberFormat from '@/helpers/get-number-format';
import React from 'react';
import {
    egCountryCode,
    emptyCountryCode,
    hotline,
    whatsapp,
} from '@/constants';
import { CallSmallIcon, WhatsappSmallIcon } from '@/ui/svg';
import { getUrlLocaleSegment } from '@/helpers/getUrlLocaleSegment';
import { getTranslations } from 'next-intl/server';
import { headers } from 'next/headers';
import { Project } from '@/types';
import { generateProjectWhatsappTextEncoded } from '@/helpers/generateProjectWhatsappTextEncoded';
import CompareButton from '@/ui/compare-button';
import WishlistButton from '@/ui/wishlist-button';
import InnersShareButton from '@/ui/inners-share-button';
import Image from 'next/image';
interface ProjectDetailsHeader_V3Props {
    project: Project;
    locale: string;
}
const ProjectDetailsHeader_V3 = async ({
    project,
    locale,
}: ProjectDetailsHeader_V3Props) => {
    const tGlobal = await getTranslations('global');
    const urlLocaleSegment = getUrlLocaleSegment(locale);
    const headersList = headers();
    const host = headersList.get('host');

    const projectLink = `${host}${urlLocaleSegment}/projects/${project?.slug}`;
    // Whatsapp
    const encodedWhatsappText = generateProjectWhatsappTextEncoded(
        project?.name,
        project?.start_price,
        project?.address,
        projectLink
    );

    return (
        <section className="flex w-full flex-col items-start justify-end lg:items-end">
            <div className="my-4 grid w-full items-center justify-between gap-y-6 self-start md:flex md:flex-wrap">
                <div className="grid items-center gap-x-10 gap-y-4 md:flex md:flex-wrap">
                    <div className="flex">
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
                        <div>
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

                    <div>
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
            </div>
            <nav className="flex items-center gap-2 lg:mt-0">
                <CompareButton usage="inner" item={project} type="projects" />
                <WishlistButton usage="inner" item={project} type="project" />
                <InnersShareButton item={project} />
            </nav>
        </section>
    );
};

export default ProjectDetailsHeader_V3;
