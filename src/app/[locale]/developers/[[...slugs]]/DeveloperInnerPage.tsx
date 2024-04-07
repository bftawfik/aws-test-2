import DeveloperInnerBreadcrumbs from '@/ui/pages/DeveloperInnerPage/DeveloperBreadcrumbs/DeveloperInnerBreadcrumbs';
import DeveloperInnerDescription from '@/ui/pages/DeveloperInnerPage/DeveloperInnerDescription/DeveloperInnerDescription';
import DeveloperProjectsSection from '@/ui/pages/DeveloperInnerPage/DeveloperProjectsSection/DeveloperProjectsSection';
import DeveloperUnitsSection from '@/ui/pages/DeveloperInnerPage/DeveloperUnitsSection/DeveloperUnitsSection';
import Error404V2 from '@/ui/empty-states/Error404V2/Error404V2';
import { getDeveloperDetails } from '@/actions/getDeveloperDetails';
import { DeveloperDetailsResponse } from '@/types';
import getFilteredUnitsOld from '@/actions/units/getFilteredUnitsOld';
import getProjectsWithFilter from '@/actions/projects/getProjectsWithFilter';

interface DeveloperInnerPageProps {
    params: { locale: string; slugs: undefined | string[] };
    searchParams: Record<string, string>;
}
const DEVELOPER_PROJECTS_PER_PAGE = 12;
const DEVELOPER_UNITS_PER_PAGE = 12;

const DeveloperInnerPage = async (props: DeveloperInnerPageProps) => {
    const { params } = props;
    const { locale, slugs } = params;

    const developerSlug = slugs ? slugs[0] : undefined;
    const developerDetails: DeveloperDetailsResponse = developerSlug
        ? await getDeveloperDetails(developerSlug, locale)
        : null;

    let developerUnits = [];
    let developerProjects = [];

    if (developerDetails?.id) {
        developerUnits = await getFilteredUnitsOld(
            // session?.auth?.meta?.token,
            undefined,
            ['developer.id', developerDetails.id],
            locale,
            undefined,
            DEVELOPER_UNITS_PER_PAGE
        );
        developerProjects = await getProjectsWithFilter(
            // session?.auth?.meta?.token,
            undefined,
            ['developer_id', developerDetails.id],
            locale,
            undefined,
            DEVELOPER_PROJECTS_PER_PAGE
        );
    }

    return (
        <>
            {developerDetails ? (
                <div className="es-container mt-8 px-3 lg:mt-10">
                    <DeveloperInnerBreadcrumbs
                        developerName={developerDetails?.name}
                        slug={developerDetails?.slug}
                        locale={locale}
                    />
                    <DeveloperInnerDescription
                        developer={developerDetails}
                        locale={locale}
                    />
                    {developerProjects?.data?.length ? (
                        <DeveloperProjectsSection
                            developerProjects={developerProjects?.data}
                            developerProjectsLength={
                                developerProjects.meta.total
                            }
                            locale={locale}
                            developerId={developerDetails.id}
                            developerSlug={developerDetails.name}
                        />
                    ) : null}
                    {developerUnits?.data?.length ? (
                        <DeveloperUnitsSection
                            developerUnits={developerUnits?.data}
                            locale={locale}
                            developerId={developerDetails.id}
                            developerSlug={developerDetails.name}
                        />
                    ) : null}
                </div>
            ) : (
                <Error404V2 />
            )}
        </>
    );
};

export default DeveloperInnerPage;
