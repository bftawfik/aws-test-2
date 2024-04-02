import { NextIntlGetTranslatorFunction, Project } from '@/types';
import { ProjectCardV2Link } from './ProjectCardV2Link/ProjectCardV2Link';
import { ProjectCardV2Content } from './ProjectCardV2Content/ProjectCardV2Content';
import { ProjectCardV2Button } from './ProjectCardV2Button/ProjectCardV2Button';
import SSRDrawerProjectContent from '@/ui/discover/drawers-content/SSRDrawersContent/SSRDrawerProjectContent';
import { MultiArrowsIcon } from '@/ui/svg/MultiArrowsIcon';
import Link from 'next/link';
import { getUrlLocaleSegment } from '@/helpers/getUrlLocaleSegment';

export interface ProjectCardV2Props {
    project: Project;
    priority?: boolean;
    shouldPreventRouting?: boolean;
    className?: string;
    locale: string;
    isDrawerOpen?: boolean;
    currentUrl?: string;
    tGlobal: NextIntlGetTranslatorFunction;
    isDrawerContent?: boolean;
}

export const ProjectCardV2 = ({
    project,
    priority = false,
    shouldPreventRouting = false,
    locale,
    isDrawerOpen = false,
    currentUrl = '',
    tGlobal,
    isDrawerContent = false,
}: ProjectCardV2Props) => {
    const urlLocaleSegment = getUrlLocaleSegment(locale);
    const fullUrl = `${urlLocaleSegment}/discover/${currentUrl}`;
    return (
        <div className="relative">
            {project &&
                (shouldPreventRouting ? (
                    <ProjectCardV2Button
                        project={project}
                        locale={locale}
                        isDrawerOpen={isDrawerOpen}
                        currentUrl={fullUrl}
                    >
                        <ProjectCardV2Content
                            priority={priority}
                            project={project}
                            locale={locale}
                            tGlobal={tGlobal}
                            isDrawerContent={isDrawerContent}
                        />
                        <SSRDrawerProjectContent
                            project={project}
                            locale={locale}
                            tGlobal={tGlobal}
                        />
                        <Link
                            href={`${urlLocaleSegment}/projects/${project?.slug}`}
                            target="_blank"
                            className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#B3B3B3] px-3 py-2 text-xs capitalize text-[#5F5F5F] transition-colors duration-150 hover:bg-gray-200"
                        >
                            <MultiArrowsIcon className="h-4 w-4 text-custom-grey" />
                            {tGlobal('view_details')}
                        </Link>
                    </ProjectCardV2Button>
                ) : (
                    <ProjectCardV2Link
                        locale={locale}
                        projectSlug={project?.slug}
                    >
                        <ProjectCardV2Content
                            priority={priority}
                            project={project}
                            locale={locale}
                            tGlobal={tGlobal}
                            isDrawerContent={isDrawerContent}
                        />
                    </ProjectCardV2Link>
                ))}
        </div>
    );
};
