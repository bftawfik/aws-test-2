import getFilteredProjects from '@/actions/getFilteredProjects';
import { formatBoundsToBackend } from '@/helpers';
import { getOrigin } from '@/helpers/getOrigin';
import { useSearchBody } from '@/hooks/useSearchBody/useSearchBody';
import { useMapStore, usePageStore } from '@/store/global';
import { Project } from '@/types';
import Drawer from '@/ui/drawer';
import { MultiArrowsIcon } from '@/ui/svg/MultiArrowsIcon';
import { Polygon } from '@react-google-maps/api';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { useState } from 'react';
import ProjectContent from '../drawers-content/ProjectContent';
import { useTranslations, useLocale } from 'next-intl';
import { getUrlLocaleSegment } from '@/helpers/getUrlLocaleSegment';
import {
    LIST_DEFAULT_PAGE_SIZE,
    PROJECTS_MAP_DEFAULT_PAGE_SIZE,
} from '@/constants/store';
import { useRouter } from 'next/navigation';
import { addDrawerIdToUrl } from '@/helpers/drawersUrlUtils';
import { MAP_VIEW } from '@/constants';
import DrawerSSR from '@/ui/DrawerSSR/DrawerSSR';
import { useGenerateUrl } from '@/hooks/useGenerateUrl/useGenerateUrl';

interface DiscoverMapProjectsProps {
    drawerId?: number;
    bounds?: string;
}

const DiscoverMapProjects = ({
    drawerId,
    bounds,
}: DiscoverMapProjectsProps) => {
    const router = useRouter();
    const locale = useLocale();
    const tGlobal = useTranslations('global');
    const urlLocaleSegment = getUrlLocaleSegment(locale);

    const { currentPage } = usePageStore();

    const { data: session } = useSession();
    // bounds
    const { zoomLevel } = useMapStore();
    const boundsAsNumbers =
        bounds?.split('-').map((value) => Number(value)) || [];
    const formattedBounds = formatBoundsToBackend(boundsAsNumbers);
    const { filters, queryString } = useSearchBody();
    const mapCurrentPage = Math.ceil(
        (currentPage * LIST_DEFAULT_PAGE_SIZE) / PROJECTS_MAP_DEFAULT_PAGE_SIZE
    );
    let { data: projectsData } = useQuery(
        [
            'get-discover-map-projects',
            currentPage,
            bounds,
            filters,
            queryString,
            zoomLevel,
        ], // queryKey
        () =>
            getFilteredProjects(
                filters,
                mapCurrentPage,
                PROJECTS_MAP_DEFAULT_PAGE_SIZE,
                session?.auth?.meta?.token,
                locale,
                formattedBounds,
                queryString
            ) // queryFn
    );
    projectsData = projectsData?.data;
    const currentUrlFromUrl = useGenerateUrl();

    const handleProjectClick = (project: Project) => {
        const addDrawerIdToCurrentUrl = addDrawerIdToUrl(
            currentUrlFromUrl,
            MAP_VIEW,
            project?.id
        );
        router.push(addDrawerIdToCurrentUrl);
    };

    return (
        <>
            {(projectsData as Project[])?.map((project, index: number) => (
                <div key={index}>
                    <Polygon
                        key={`polygon-${index}`}
                        options={{
                            fillColor: '#4CB087',
                            strokeColor: '#4CB087',
                        }}
                        paths={project.coords}
                        onClick={() => handleProjectClick(project)}
                    />
                    {drawerId && drawerId === project.id && (
                        <DrawerSSR
                            isOpen={drawerId === project.id ? true : false}
                            currentUrl={currentUrlFromUrl}
                            headerElemnt={
                                <Link
                                    prefetch={false}
                                    href={`${urlLocaleSegment}/projects/${project?.slug}`}
                                    target="_blank"
                                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#B3B3B3] px-3 py-2 text-xs capitalize text-[#5F5F5F] transition-colors duration-150 hover:bg-gray-200"
                                >
                                    <MultiArrowsIcon className="h-4 w-4 text-custom-grey" />
                                    {tGlobal('view_details')}
                                </Link>
                            }
                        >
                            <ProjectContent project={project} />
                        </DrawerSSR>
                    )}
                </div>
            ))}
        </>
    );
};

export default DiscoverMapProjects;
