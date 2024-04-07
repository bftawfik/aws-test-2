import { PAGE_SHORT, REVALIDATE_SECONDS } from '@/constants';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { getUrlLocaleSegment } from '@/helpers/getUrlLocaleSegment';
import DeveloperInnerPage from './DeveloperInnerPage';
import DevelopersListPage from './DevelopersListPage';

type GenerateMetadataProps = {
    params: { slugs: string[]; locale: string };
};
async function getDevelopersInners(slug: string, lang: string) {
    const response = await fetch(`${process.env.BASE_URL}/developers/${slug}`, {
        headers: { 'accept-language': lang },
        next: {
            revalidate: REVALIDATE_SECONDS,
        },
    });
    const res = await response.json();
    return res.data;
}

export async function generateMetadata({
    params,
}: GenerateMetadataProps): Promise<Metadata> {
    const { slugs, locale } = params;

    const tMeta = await getTranslations('meta');
    const tGlobal = await getTranslations('global');

    const isDeveloperSlug =
        slugs && slugs?.filter((item) => !item.includes(PAGE_SHORT)).length > 0;
    const developerSlug = isDeveloperSlug ? slugs[0] : null;
    const data = isDeveloperSlug
        ? await getDevelopersInners(developerSlug || '', locale)
        : null;
    const urlLocaleSegment = getUrlLocaleSegment(locale);

    const siteName = `https://estatebook.com/${urlLocaleSegment}`;
    const projectLink = `${siteName}/projects/${developerSlug}`;

    return {
        title: isDeveloperSlug
            ? data
                ? data.meta_title || data?.name
                : tGlobal('description')
            : tMeta('developer_title'),
        description: isDeveloperSlug
            ? data?.meta_description || data?.description
            : tMeta('developer_description'),
        openGraph: data && {
            locale: locale,
            type: 'website',
            url: projectLink,
            title: data?.meta_title,
            description: data?.meta_description || data?.description,
            siteName: siteName,
        },
    };
}
interface DeveloperProps {
    params: { locale: string; slugs: undefined | string[] };
    searchParams: Record<string, string>;
}
const Developer = async (props: DeveloperProps) => {
    const {
        params: { slugs },
    } = props;

    // get session on server
    // const session = await getServerSession(authOptions);

    const isDeveloperSlug =
        slugs && slugs?.filter((item) => !item.includes(PAGE_SHORT)).length > 0;

    return isDeveloperSlug ? (
        <DeveloperInnerPage {...props} />
    ) : (
        <DevelopersListPage {...props} />
    );
};

export default Developer;
