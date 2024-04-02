import Breadcrumbs from '@/ui/breadcrumbs';
import { getUrlLocaleSegment } from '@/helpers/getUrlLocaleSegment';
import { getTranslator } from 'next-intl/server';

interface DeveloperInnerBreadcrumbsProps {
    slug: string;
    locale: string;
    developerName: string;
}

const DeveloperInnerBreadcrumbs = async ({
    locale,
    slug,
    developerName,
}: DeveloperInnerBreadcrumbsProps) => {
    // Read translations
    const tGlobal = await getTranslator(locale, 'global');

    const urlLocaleSegment = getUrlLocaleSegment(locale);

    const pages = [
        { name: tGlobal('home'), href: `${urlLocaleSegment}/`, current: false },
        {
            name: tGlobal('developers'),
            href: `${urlLocaleSegment}/developers`,
            current: false,
        },
        { name: `${developerName}` || '', href: `{/${slug}}`, current: true },
    ];

    return <Breadcrumbs pages={pages} />;
};

export default DeveloperInnerBreadcrumbs;
