import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import CompareButton from '@/ui/compare-button';
import WishlistButton from '@/ui/wishlist-button';
import InnersShareButton from '@/ui/inners-share-button';
import DrawerGallery from '@/ui/gallery-component/DrawerGallery/DrawerGallery';
import { ImagePlaceholder } from '@/ui/image-placeholder';
import InnerSectionHeader from '@/ui/inners-section-header';
import ReadMore from '@/ui/read-more';
import AmenitiesShow from '@/ui/AmenitiesShow/AmenitiesShow';
import { CallSmallIcon, WhatsappSmallIcon } from '@/ui/svg';
import useCurrentUrl from '@/hooks/useCurrentUrl';
import { getLangkey } from '@/helpers';
import getNumberFormat from '@/helpers/get-number-format';
import {
    hotline,
    whatsapp,
    emptyCountryCode,
    egCountryCode,
} from '@/constants';
import { Project } from '@/types';
import FilteredUnitsSection from './project/FilteredUnitsSection';
import { useTranslations, useLocale } from 'next-intl';
import { getUrlLocaleSegment } from '@/helpers/getUrlLocaleSegment';
import { generateProjectWhatsappTextEncoded } from '@/helpers/generateProjectWhatsappTextEncoded';
import SoldOut from '@/ui/SoldOut/SoldOut';

const ProjectContent = ({ project }: { project: Project }) => {
    // Read localization
    const locale = useLocale();
    // Read translations
    const tGlobal = useTranslations('global');
    const urlLocaleSegment = getUrlLocaleSegment(locale);

    // Get BaseUrl and create it for the project link
    const projectLink = useCurrentUrl(
        `${urlLocaleSegment}/projects/${project?.slug}`
    );

    // Whatsapp
    const encodedWhatsappText = generateProjectWhatsappTextEncoded(
        project?.name,
        project?.start_price,
        project?.address,
        projectLink
    );

    const [drawerFooterHeight, setdrawerFooterHeight] = useState(80);
    const drawerFooterRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        setdrawerFooterHeight(drawerFooterRef?.current?.offsetHeight || 0);
    }, []);

    return (
        <div style={{ paddingBottom: `${drawerFooterHeight + 20}px` }}>
            <div className="mb-5 flex items-center gap-x-4">
                <h2 className="text-xl font-semibold capitalize leading-none text-black lg:text-2xl">
                    {getLangkey(project.name, locale)}
                </h2>

                {project?.sold_out ? <SoldOut type="project" /> : null}
            </div>
            <div className={`flex flex-col gap-y-12 md:mt-8`}>
                <div className="items-center gap-4 md:flex">
                    <div className="flex h-20 w-20 items-center rounded-full bg-white drop-shadow-header">
                        <ImagePlaceholder
                            classes="max-w-full max-h-full rounded-full w-full"
                            image={project?.logo || ''}
                            errorClasses="h-full w-full flex items-center justify-center bg-neutral-100 p-1"
                        />
                    </div>
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-4 md:flex-nowrap">
                        <div>
                            <span className="text-base font-normal capitalize text-custom-grey">
                                {tGlobal('starting_from')}
                            </span>
                            <div className="flex items-center gap-x-2 text-2xl font-bold text-black">
                                <span>
                                    {getNumberFormat(project?.start_price)}
                                </span>

                                <span className="text-xl font-normal uppercase">
                                    {tGlobal('egp') || ''}
                                </span>
                            </div>
                        </div>
                        <div>
                            <span className="text-base font-normal capitalize text-custom-grey">
                                {tGlobal('min_down_payment')}
                            </span>
                            <div className="flex items-center gap-x-2 text-2xl font-bold text-black">
                                <span>
                                    {getNumberFormat(project?.min_down_payment)}
                                </span>

                                <span className="text-xl font-normal uppercase">
                                    {tGlobal('egp') || ''}
                                </span>
                            </div>
                        </div>
                        <div>
                            <span className="text-base font-normal capitalize text-custom-grey">
                                {tGlobal('min_monthly_payment')}
                            </span>
                            <div className="flex items-center gap-x-2 text-2xl font-bold text-black">
                                <span>
                                    {getNumberFormat(
                                        project?.min_month_payment
                                    )}
                                </span>

                                <span className="text-xl font-normal uppercase">
                                    {tGlobal('egp') || ''}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <DrawerGallery images={project?.images} locale={locale} />
                <div className="w-full">
                    <InnerSectionHeader title={tGlobal('description') || ''} />
                    <ReadMore
                        classNames="line-clamp mt-4 text-sm text-gray-500"
                        maxChar={300}
                        text={getLangkey(project?.description, locale) || ''}
                    />
                </div>
                <aside className="mt-10 w-full lg:mt-12">
                    <InnerSectionHeader
                        title={tGlobal('property_details') || ''}
                    />
                    <div className="grid w-full grid-cols-3 gap-2 gap-x-4">
                        <div className="col-span-1">
                            <span className="text-sm font-light capitalize text-gray-500">
                                {tGlobal('delivery') || ''}
                            </span>
                            <div className="mt-2 text-lg font-medium capitalize text-black">
                                {project?.start_delivery?.slice(0, 4) || ''}
                            </div>
                        </div>
                        <div className="col-span-1">
                            <span className="text-sm font-light capitalize text-gray-500">
                                {tGlobal('payment_option') || ''}
                            </span>
                            <div className="mt-2 text-lg font-medium capitalize text-black">
                                {project?.payment_method || ''}
                            </div>
                        </div>
                        {project?.maintenance_fees && (
                            <div className="col-span-1">
                                <span className="text-sm font-light capitalize text-gray-500">
                                    {tGlobal('maintenance_fees') || ''}
                                </span>
                                <div className="mt-2 text-lg font-medium capitalize text-black">
                                    {project?.maintenance_fees || ''}
                                </div>
                            </div>
                        )}
                    </div>
                </aside>
                <aside>
                    <InnerSectionHeader title={tGlobal('developed_by') || ''} />
                    <div className="mt-7 flex items-center">
                        <div className="w-auto">
                            <div className="me-4 flex h-[78px] min-w-[78px] max-w-[78px] items-center justify-center overflow-hidden rounded-full border border-gray-100 bg-white p-2">
                                {project?.developer?.logo && (
                                    <Image
                                        src={project?.developer?.logo}
                                        width={300}
                                        height={300}
                                        className="h-full w-full rounded-full object-cover object-center transition duration-500 group-hover:scale-110"
                                        alt={
                                            project?.developer?.name?.en ||
                                            '' + ' logo'
                                        }
                                    />
                                )}
                            </div>
                        </div>

                        <div>
                            <div className="text-base font-medium text-black">
                                {getLangkey(project?.developer?.name, locale)}
                            </div>
                            <div>
                                <ReadMore
                                    classNames="mt-2 text-xs text-gray-500"
                                    maxChar={300}
                                    text={
                                        getLangkey(
                                            project?.developer?.description ||
                                                '',
                                            locale
                                        ) as string | ''
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </aside>
                <div>
                    {project?.amenities?.length ? (
                        <AmenitiesShow amenities={project.amenities} />
                    ) : null}
                </div>
                <FilteredUnitsSection
                    type="sale"
                    projectId={project.id}
                    title={tGlobal('developer_units') || ''}
                />
                <FilteredUnitsSection
                    type="resale"
                    projectId={project.id}
                    title={tGlobal('resale_units') || ''}
                />
            </div>
            <div
                ref={drawerFooterRef}
                className="fixed bottom-0 z-50 flex w-full flex-wrap items-center justify-center gap-4 gap-y-3 border-t bg-slate-50 p-5 ltr:left-0 rtl:right-0 sm:justify-between lg:w-1/2"
            >
                <nav className="4k:mt-6 mt-0 flex flex-wrap items-center justify-center gap-4 lg:justify-end">
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
                <nav className="flex items-center gap-2">
                    <CompareButton
                        usage="inner"
                        item={project}
                        type="projects"
                    />
                    <WishlistButton
                        usage="inner"
                        item={project}
                        type="project"
                    />
                    <InnersShareButton item={project} top fromDrawer />
                </nav>
            </div>
        </div>
    );
};

export default ProjectContent;
