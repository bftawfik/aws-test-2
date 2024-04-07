import DiscoverListing from '@/ui/discover/discover-listing';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { getFiltersAndQueryString } from '@/helpers/discoverUtils';
import { cookies, headers } from 'next/headers';
import { LIST_VIEW } from '@/constants';

export async function generateMetadata({
    params,
}: DiscoverPage): Promise<Metadata> {
    const { locale } = params;
    const tMeta = await getTranslations('meta');
    return {
        title: tMeta('discover_title'),
        description: tMeta('discover_description'),
    };
}
interface DiscoverPage {
    params: { locale: string; attrs: []; slug: string[] };
    searchParams: { [key: string]: string };
}
export default async function DiscoverPage({
    params,
    searchParams,
}: DiscoverPage) {
    // Parse slugs
    const slugs = decodeURIComponent(params.slug?.join('/') || '');
    const cookieStore = cookies();
    const cookieDiscoverView = cookieStore.get('discoverView');

    // URL Parse
    const { feat, amn, txt, bnd, drawer_id } = searchParams || {};
    // const paramsArray = Object.keys(searchParams).map(
    //     (key) => `${key}=${searchParams[key]}`
    // );
    // URL Parse
    const isListDrawer = drawer_id?.indexOf(LIST_VIEW) !== -1;
    const drawerItemId = drawer_id ? drawer_id.split('_')[1] : undefined;
    const drawerItemIdNo = Number(drawerItemId);

    const paramsArray = [
        feat && `feat=${feat}`,
        amn && `amn=${amn}`,
        txt && `txt=${txt}`,
        bnd && `bnd=${bnd}`,
    ].filter((item) => !!item);
    const joinedParams = paramsArray?.join('&') || '';
    const url: string = `${slugs}?${joinedParams}`;
    const headersList = headers();
    const host = headersList.get('host');

    const { filters, queryString, tab, currentPage, sortBy } =
        getFiltersAndQueryString(url);

    return (
        <DiscoverListing
            filters={filters}
            queryString={queryString}
            locale={params.locale}
            tab={tab}
            currentPage={currentPage}
            host={host || ''}
            bounds={bnd as string}
            sortBy={sortBy}
            drawerId={
                isListDrawer && !isNaN(drawerItemIdNo)
                    ? drawerItemIdNo
                    : undefined
            }
            url={url}
            cookieDiscoverView={cookieDiscoverView?.value}
        />
    );
}
