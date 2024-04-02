import { getSingleLocation } from '@/actions/useGetNeighborhoodsInnersQuery';
import { getProjectsByNeighborhoodId } from '@/actions/useGetProjectsByNeighborhoodIdQuery';
import CustomShowAllLink from '@/ui/custom-show-all-link';
import { useLocale } from 'next-intl';
import { LIST_DEFAULT_PAGE_SIZE, PROJECTS_LINK } from '@/constants';
import { ProjectCardV2 } from '@/ui/projects/ProjectCardV2';
import { headers } from 'next/headers';
import { parseUrl } from '@/helpers/url-segments';
import { redirect } from 'next/navigation';
import { getTranslator } from 'next-intl/server';
import { getUrlLocaleSegment } from '@/helpers/getUrlLocaleSegment';
import SimplePagination from '@/ui/simplePagination';
import { Project } from '@/types';

interface NeighborhoodProjectsSecitonProps {
    slug: string;
}

const NeighborhoodProjectsSeciton = async ({
    slug,
}: NeighborhoodProjectsSecitonProps) => {
    // Read localization
    const locale = useLocale();
    const headersList = headers();
    const pathName = headersList.get('x-invoke-path') || '';

    // Read translations
    const tGlobal = await getTranslator(locale, 'global');

    const { pg } = parseUrl(pathName);

    const currentPage = (pg as number) || 1;
    const data = await getSingleLocation(slug, locale);
    const neighborhoodId = data?.id;
    const projects = await getProjectsByNeighborhoodId(
        locale,
        neighborhoodId,
        LIST_DEFAULT_PAGE_SIZE,
        currentPage
    );

    const { data: paginatedProjects, meta } = projects || {};

    const isValidPage = meta?.last_page && currentPage <= meta.last_page;
    const localeSegment = getUrlLocaleSegment(locale);
    const resettedUrlToPg1 = `${localeSegment}/neighborhoods/${slug}/`;

    if (!isValidPage) {
        redirect(resettedUrlToPg1);
    }

    const totalPages =
        Math.ceil(meta?.total / meta?.per_page) || meta.last_page;

    return projects ? (
        <div className="mt-8 w-full lg:mt-16">
            <div className="mb-2 flex items-center justify-between lg:mb-5">
                <h2 className=" text-xl font-semibold  capitalize leading-none text-black  lg:text-2xl">
                    {tGlobal('available_projects') || ''}
                </h2>
                <CustomShowAllLink hrefUrl={PROJECTS_LINK} />
            </div>

            <div className="grid w-full grid-cols-1 gap-3 gap-x-4 file:grid md:grid-cols-2 lg:grid-cols-3">
                {paginatedProjects?.map((project: Project) => (
                    <ProjectCardV2
                        locale={locale}
                        key={project?.id}
                        project={project}
                        tGlobal={tGlobal}
                    />
                ))}
            </div>
            {paginatedProjects?.length && meta && currentPage ? (
                <div className="w-full">
                    <SimplePagination
                        pathName={pathName}
                        currentPage={currentPage}
                        totalPages={totalPages}
                        locale={locale}
                    />
                </div>
            ) : null}
        </div>
    ) : null;
};
export default NeighborhoodProjectsSeciton;
