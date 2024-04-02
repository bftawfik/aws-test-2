import Breadcrumbs from '@/ui/breadcrumbs';
import { TAB_SHORT } from '@/constants';
import { getUrlLocaleSegment } from '@/helpers/getUrlLocaleSegment';
import { getTranslator } from 'next-intl/server';
import { getSingleNeighborhood } from '@/actions/getSingleNeighborhood';

interface NeighborhoodInnerBreadcrumbsProps {
    slug: string;
    locale: string;
}

const NeighborhoodInnerBreadcrumbs = async ({
    locale,
    slug,
}: NeighborhoodInnerBreadcrumbsProps) => {
    const tGlobal = await getTranslator(locale, 'global');
    const urlLocaleSegment = getUrlLocaleSegment(locale);
    const locationDetails = await getSingleNeighborhood(slug, locale);

    const pages = [
        { name: tGlobal('home'), href: `${urlLocaleSegment}/`, current: false },
        {
            name: tGlobal('neighborhoods'),
            href: `${urlLocaleSegment}/discover/${TAB_SHORT}-neighborhoods`,
            current: false,
        },
        {
            name: locationDetails?.name || '',
            href: `{/${slug}}`,
            current: true,
        },
    ];

    return <Breadcrumbs pages={pages} />;
};

export default NeighborhoodInnerBreadcrumbs;
