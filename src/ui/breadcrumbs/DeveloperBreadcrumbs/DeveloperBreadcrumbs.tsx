'use client';
import React, { useEffect } from 'react';
import Breadcrumbs from '@/ui/breadcrumbs';
import { useGetDevelopersInnersQuery } from '@/actions/useGetDevelopersInnersQuery';
import { useRouter } from 'next/navigation';
import Loading from '@/ui/loaders/loading/loading';
import { useTranslations } from 'next-intl';
import { getUrlLocaleSegment } from '@/helpers/getUrlLocaleSegment';

interface DeveloperBreadcrumbsProps {
    slug: any;
    lang: any;
}

const DeveloperBreadcrumbs = ({ lang, slug }: DeveloperBreadcrumbsProps) => {
    // Read translations
    const tGlobal = useTranslations('global');
    const router = useRouter();
    const { data: developer, isFetched } = useGetDevelopersInnersQuery(
        slug,
        lang
    );
    const urlLocaleSegment = getUrlLocaleSegment(lang);

    const pages = [
        { name: tGlobal('home'), href: `${urlLocaleSegment}/`, current: false },
        {
            name: tGlobal('developers'),
            href: `${urlLocaleSegment}/developers`,
            current: false,
        },
        { name: developer?.name || '', href: `{/${slug}}`, current: true },
    ];

    useEffect(() => {
        if (isFetched) {
            if (developer === undefined) {
                router.replace('/not-found');
            }
        }
    }, [isFetched, developer, router]);

    return !isFetched ? <Loading /> : <Breadcrumbs pages={pages} />;
};

export default DeveloperBreadcrumbs;
