import { headers } from 'next/headers';
import { getTranslations } from 'next-intl/server';
import Breadcrumbs from '@/ui/breadcrumbs';
import Developers from '@/ui/pages/DevelopersListPage/Developers/Developers';
import DeveloperSearch from '@/ui/pages/DevelopersListPage/developerSearch/DeveloperSearch';
import { getUrlLocaleSegment } from '@/helpers/getUrlLocaleSegment';
import { getDevelopersInners } from '@/actions/useGetDevelopersInnersQuery';

interface DevelopersListPageProps {
    params: { locale: string; slugs: undefined | string[] };
    searchParams: Record<string, string>;
}
const DevelopersListPage = async (props: DevelopersListPageProps) => {
    const { params, searchParams } = props;
    const { locale, slugs } = params;
    const { txt: searchText } = searchParams;

    // to be removed once we make a utlity func
    const convertHeadersQueryToString = (query: string) => {
        // avoid adding encoded curly brackets in the url
        const decodedQueryParam = decodeURIComponent(query);
        const parsedQueryParam = decodedQueryParam
            ? JSON.parse(decodedQueryParam)
            : {};
        const urlSearchParamsObj = new URLSearchParams(parsedQueryParam);
        return urlSearchParamsObj.toString();
    };

    const headersList = headers();
    const activePath = headersList.get('x-invoke-path');
    const query = convertHeadersQueryToString(
        headersList.get('x-invoke-query') || ''
    );

    const tGlobal = await getTranslations('global');

    const urlLocaleSegment = getUrlLocaleSegment(locale);
    const pages = [
        { name: tGlobal('home'), href: `${urlLocaleSegment}/`, current: false },
        {
            name: tGlobal('developers'),
            href: '/developers',
            current: true,
        },
    ];
    const fullUrl = `${activePath}?${query}`;

    return (
        <div className="pt-8">
            <div className="es-container w-full">
                <Breadcrumbs pages={pages} />
                <div className="my-2 flex items-center justify-between gap-1">
                    <h1 className="hidden text-xl font-semibold capitalize leading-none md:inline-block lg:text-2xl">
                        {tGlobal('developers')}
                    </h1>
                    <DeveloperSearch
                        searchText={searchText}
                        activePath={activePath || ''}
                    />
                </div>

                <Developers
                    locale={locale}
                    slugs={slugs}
                    searchText={searchText}
                    fullUrl={fullUrl || ''}
                />
            </div>
        </div>
    );
};

export default DevelopersListPage;
