import getProjects from '@/actions/projects/getProjects';
import HomeProjectsSwiper from './HomeProjectsSwiper/HomeProjectsSwiper';
// import { getServerSession } from 'next-auth';
import { ProjectCardV2 } from '../ProjectCardV2';
import { Project } from '@/types';
import { getTranslations } from 'next-intl/server';

interface ProjectsSliderV2Props {
    locale: string;
}
export default async function ProjectsSliderV2({
    locale,
}: ProjectsSliderV2Props) {
    // get session on server
    // TODO: hide server session until solve forge problem
    // const session = await getServerSession(authOptions);

    // fetch data
    const GET_SOLD_OUT = false;

    const response = await getProjects(
        // session?.auth?.meta?.token
        undefined,
        locale,
        undefined,
        undefined,
        GET_SOLD_OUT
    );
    const tGlobal = await getTranslations('global');

    return (
        <HomeProjectsSwiper>
            {response.data.map((project: Project, ndx: number) => (
                <ProjectCardV2
                    project={project}
                    key={ndx}
                    locale={locale}
                    priority={true}
                    tGlobal={tGlobal}
                />
            ))}
        </HomeProjectsSwiper>
    );
}
