import InnerSectionHeader from '@/ui/inners-section-header';
import { Project } from '@/types';
import { ProjectCardV2 } from '@/ui/projects/ProjectCardV2';
import { getTranslator } from 'next-intl/server';
import { DEVELOPER_SHORT } from '@/constants';
import { converSlugToUrlName } from '@/helpers';

interface DeveloperProjectsSectionProps {
    locale: string;
    developerProjectsLength: number;
    developerProjects: Project[];
    developerId: number;
    developerSlug: string;
}

const DeveloperProjectsSection = async ({
    developerProjects,
    developerProjectsLength,
    locale,
    developerId,
    developerSlug,
}: DeveloperProjectsSectionProps) => {
    const tGlobal = await getTranslator(locale, 'global');

    const PROJECTS_LINK = `/discover/tab-projects/${DEVELOPER_SHORT}-${converSlugToUrlName(
        developerSlug
    )}_${developerId}`;

    return (
        <div className="mt-8 w-full lg:mt-16">
            <InnerSectionHeader
                title={tGlobal('projects') + ` (${developerProjectsLength})`}
                href={PROJECTS_LINK}
            />
            <div className="mt-4 grid w-full grid-cols-1 gap-3 gap-x-4 md:grid-cols-2 lg:grid-cols-3">
                {developerProjects?.map((project: Project) => (
                    <ProjectCardV2
                        locale={locale}
                        key={project?.id}
                        project={project}
                        tGlobal={tGlobal}
                    />
                ))}
            </div>
        </div>
    );
};
export default DeveloperProjectsSection;
