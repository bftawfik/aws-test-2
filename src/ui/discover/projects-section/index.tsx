import getFilteredProjects from '@/actions/getFilteredProjects';
import { Project } from '@/types';
import { formatBoundsToBackend } from '@/helpers';
import NoResults from '@/ui/empty-states/no-search-results';
import { getTranslations } from 'next-intl/server';
import ContentsWrapper from '../discover-listing/ContentsWrapper/ContentsWrapper';
import { ProjectCardV2 } from '@/ui/projects/ProjectCardV2';
import { headers } from 'next/headers';
import SimplePagination from '@/ui/simplePagination';
import { LIST_DEFAULT_PAGE_SIZE } from '@/constants';

interface ProjectsSectionProps {
    filters: (string | string[])[];
    queryString: string;
    locale: string;
    currentPage: number;
    bounds?: string;
    drawerId?: number;
    currentUrl?: string;
    cookieDiscoverView: string;
}

const ProjectsSection = async ({
    filters,
    queryString,
    locale,
    currentPage,
    bounds,
    drawerId,
    currentUrl,
    cookieDiscoverView,
}: ProjectsSectionProps) => {
    const tEmptyState = await getTranslations('empty_state');
    const tGlobal = await getTranslations('global');

    const headersList = headers();
    const pathName = headersList.get('x-invoke-path') || '';
    // get user session
    // const { currentPage } = usePageStore();
    // const { discoverView } = useDiscoverStore();
    // const isGrid = discoverView === GRID_VIEW;
    // const { data: session, status } = useSession();
    const boundsAsNumbers =
        bounds?.split('-').map((value) => Number(value)) || [];
    const formattedBounds = formatBoundsToBackend(boundsAsNumbers);

    // TODO: hide server session until solve forge problem
    // const session = await getServerSession(authOptions);

    const projectsData = await getFilteredProjects(
        filters,
        currentPage,
        LIST_DEFAULT_PAGE_SIZE,
        undefined,
        locale,
        formattedBounds,
        queryString
    );
    const { data: projects, meta } = projectsData || {};

    const totalPages =
        Math.ceil(meta?.total / meta?.per_page) || meta?.last_page;

    return (
        <div>
            <ContentsWrapper cookieDiscoverView={cookieDiscoverView}>
                {projects?.length ? (
                    (projects as Project[])?.map((project, idx: number) => (
                        <ProjectCardV2
                            project={project}
                            key={`item-${idx}`}
                            locale={locale}
                            shouldPreventRouting
                            isDrawerOpen={
                                project.id === drawerId ? true : false
                            }
                            currentUrl={currentUrl}
                            tGlobal={tGlobal}
                        />
                    ))
                ) : (
                    <div className="col-span-2 space-y-6 py-5">
                        <NoResults />
                        <div className="mx-2 flex w-full flex-col items-center gap-3">
                            <h1 className="font-bold sm:text-lg  md:text-2xl md:font-extrabold">
                                {tEmptyState('no_results')}
                            </h1>
                            <p className="text-sm text-[#5F5F5F] sm:text-xs  md:text-sm">
                                {tEmptyState('try')}
                                <button className="pointer-cursor text-emerald-500">
                                    {tEmptyState('new_search')}
                                </button>
                                {tEmptyState('check')}
                            </p>
                        </div>
                    </div>
                )}
            </ContentsWrapper>
            {projects?.length && meta && currentPage ? (
                <div className="w-full">
                    <SimplePagination
                        isDiscover={true}
                        pathName={pathName}
                        currentPage={currentPage}
                        totalPages={totalPages}
                        locale={locale}
                    />
                </div>
            ) : null}
        </div>
    );
};
export default ProjectsSection;
