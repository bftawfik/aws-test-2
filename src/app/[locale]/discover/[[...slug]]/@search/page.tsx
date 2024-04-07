import DiscoverSearch from '@/ui/discover/discover-search';
interface SearchPageProps {
    params: { locale: string; attrs: []; slug: string[] };
    searchParams: { [key: string]: string };
}
export default async function SearchPage({
    params,
    searchParams,
}: SearchPageProps) {
    // Parse slugs
    const slugs = decodeURIComponent(params.slug?.join('/') || '');

    // URL Parse
    const { feat, amn, txt, bnd } = searchParams || {};

    const paramsArray = [
        feat && `feat=${feat}`,
        amn && `amn=${amn}`,
        txt && `txt=${txt}`,
        bnd && `bnd=${bnd}`,
    ].filter((item) => !!item);
    const joinedParams = paramsArray?.join('&') || '';
    const url: string = `${slugs}?${joinedParams}`;
    return <DiscoverSearch url={url} />;
}
