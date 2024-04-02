'use client';
import React, { useState } from 'react';
import { useGetSingleLocationQuery } from '@/actions/useGetNeighborhoodsInnersQuery';
import { useGetProjectsByNeighborhoodIdQuery } from '@/actions/useGetProjectsByNeighborhoodIdQuery';
import StatePagination from '@/ui/StatePagination/StatePagination';
import CustomShowAllLink from '@/ui/custom-show-all-link';
import { useTranslations } from 'next-intl';
import { PROJECTS_LINK } from '@/constants';
import { Project } from '@/types';
import { ProjectCardV2 } from '@/ui/projects/ProjectCardV2';

interface NeighborhoodProjectSectionDrawerProps {
    locale: string;
    slug: string;
    gridSize?: number;
    pageSize?: number;
}

const NeighborhoodProjectSectionDrawer = ({
    locale,
    slug,
    pageSize = 16,
}: NeighborhoodProjectSectionDrawerProps) => {
    // Read translations
    const tGlobal = useTranslations('global');
    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const { data: neighborhood } = useGetSingleLocationQuery(slug, locale);

    const neighborhoodId = neighborhood?.id;
    const { data, isFetching } = useGetProjectsByNeighborhoodIdQuery(
        locale,
        neighborhoodId,
        pageSize,
        currentPage,
        !!neighborhoodId
    );

    const { data: paginatedProjects, meta } = data || {};

    if (isFetching) {
        return null;
    }
    return (
        <div className="mt-8 w-full lg:mt-16">
            <div className="mb-3 flex items-center justify-between lg:mb-5">
                <h2 className=" text-xl font-semibold  capitalize leading-none text-black  lg:text-2xl">
                    {tGlobal('available_projects') || ''}
                </h2>
                <CustomShowAllLink hrefUrl={PROJECTS_LINK} />
            </div>
            {!!paginatedProjects && (
                <>
                    <div
                        className={`grid w-full grid-cols-1 gap-3 gap-x-4 file:grid md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2`}
                    >
                        {paginatedProjects?.map((project: Project) => (
                            <ProjectCardV2
                                key={project?.id}
                                project={project}
                                locale={locale}
                                tGlobal={tGlobal}
                            />
                        ))}
                    </div>
                    <div className="w-full">
                        <StatePagination
                            currentPage={currentPage}
                            pages={meta?.last_page || 1}
                            pageSize={pageSize}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </>
            )}
        </div>
    );
};
export default NeighborhoodProjectSectionDrawer;
