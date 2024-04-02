import { Project } from '@/types';
import Link from 'next/link';
import ProjectContent from '@/ui/discover/drawers-content/ProjectContentV2';
import { LIST_VIEW } from '@/constants';
import { addDrawerIdToUrl } from '@/helpers/drawersUrlUtils';
import DrawerSSR from '@/ui/DrawerSSR/DrawerSSR';

interface ProjectCardV2ButtonProps {
    children: React.ReactNode[];
    project: Project;
    locale: string;
    isDrawerOpen?: boolean;
    currentUrl: string;
}
export const ProjectCardV2Button = ({
    children,
    project,
    locale,
    isDrawerOpen = false,
    currentUrl,
}: ProjectCardV2ButtonProps) => {
    const addDrawerIdToCurrentUrl = addDrawerIdToUrl(
        currentUrl,
        LIST_VIEW,
        project?.id
    );

    const [cardContent, drawerContent, SSRLInk] = children;

    return (
        <>
            <Link className={'w-full'} href={addDrawerIdToCurrentUrl}>
                {cardContent}
            </Link>
            <DrawerSSR
                isOpen={isDrawerOpen}
                currentUrl={currentUrl}
                headerElemnt={SSRLInk}
            >
                <ProjectContent project={project} locale={locale}>
                    {drawerContent}
                </ProjectContent>
            </DrawerSSR>
        </>
    );
};
