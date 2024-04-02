'use client';
import React from 'react';
import { useGetDevelopersInnersQuery } from '@/actions/useGetDevelopersInnersQuery';
import InnerSectionHeader from '@/ui/inners-section-header';
import { ProjectCard } from '@/ui/projects/project-card';
import { useTranslations } from 'next-intl';

interface DeveloperProjectsProps {
    slug: any;
    lang: any;
}

const DeveloperProjects = ({ slug, lang }: DeveloperProjectsProps) => {
    // Read translations
    const tGlobal = useTranslations('global');

    const { data: developer, isFetching } = useGetDevelopersInnersQuery(
        slug,
        lang
    );

    return !developer ? null : (
        <div className="mt-8 w-full lg:mt-16">
            <InnerSectionHeader
                title={tGlobal('projects') + ` (${developer?.projects.length})`}
            />
            <div className="mt-4 grid w-full grid-cols-1 gap-3 gap-x-4 lg:grid-cols-3">
                {developer.projects?.map((project: any) => (
                    <ProjectCard key={project?.id} project={project} />
                ))}
            </div>
        </div>
    );
};
export default DeveloperProjects;
