'use client';
import { useEffect, useRef, useState } from 'react';
import CompareButton from '@/ui/compare-button';
import WishlistButton from '@/ui/wishlist-button';
import InnersShareButton from '@/ui/inners-share-button';
import { CallSmallIcon, WhatsappSmallIcon } from '@/ui/svg';
import useCurrentUrl from '@/hooks/useCurrentUrl';
import { egCountryCode, hotline, whatsapp } from '@/constants';
import { Project } from '@/types';
import { useTranslations } from 'next-intl';
import { getUrlLocaleSegment } from '@/helpers/getUrlLocaleSegment';
import { generateProjectWhatsappTextEncoded } from '@/helpers/generateProjectWhatsappTextEncoded';
import FilteredUnitsSection from './project/FilteredUnitsSection';

const ProjectContent = ({
    project,
    children,
    locale,
}: {
    project: Project;
    children: React.ReactNode;
    locale: string;
}) => {
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
            {/* SSR content */}
            {children}
            <FilteredUnitsSection
                type="sale"
                projectId={project.id}
                title={tGlobal('developer_units') || ''}
                isDrawerContent={true}
            />
            <FilteredUnitsSection
                type="resale"
                projectId={project.id}
                title={tGlobal('resale_units') || ''}
                isDrawerContent={true}
            />
            <div
                ref={drawerFooterRef}
                className="fixed bottom-0 z-50 flex w-full flex-wrap items-center justify-center gap-4 gap-y-3 border-t bg-slate-50 p-5 ltr:left-0 rtl:right-0 sm:justify-between lg:w-1/2"
            >
                <nav className="4k:mt-6 mt-0 flex flex-wrap items-center justify-center gap-4 lg:justify-end">
                    <a
                        href={`tel:${hotline}}`}
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
