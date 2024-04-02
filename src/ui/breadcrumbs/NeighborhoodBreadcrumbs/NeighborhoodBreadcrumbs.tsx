'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Breadcrumbs from '@/ui/breadcrumbs';
import { TAB_SHORT } from '@/constants';
import { useGetSingleLocationQuery } from '@/actions/useGetNeighborhoodsInnersQuery';
import { Locale } from '@/config/i18n-config';
import Loading from '@/ui/loaders/loading/loading';
import { useTranslations } from 'next-intl';
import { getUrlLocaleSegment } from '@/helpers/getUrlLocaleSegment';

interface NeighborhoodBreadcrumbsProps {
    slug: string;
    lang: string;
}

const NeighborhoodBreadcrumbs = ({
    lang,
    slug,
}: NeighborhoodBreadcrumbsProps) => {
    const tGlobal = useTranslations('global');
    const router = useRouter();
    const { data: neighborhood, isFetched } = useGetSingleLocationQuery(
        slug,
        lang
    );
    const urlLocaleSegment = getUrlLocaleSegment(lang);

    const pages = [
        { name: tGlobal('home'), href: `${urlLocaleSegment}/`, current: false },
        {
            name: tGlobal('neighborhoods'),
            href: `${urlLocaleSegment}/discover/${TAB_SHORT}-neighborhoods`,
            current: false,
        },
        {
            name: neighborhood?.name || '',
            href: `{/${slug}}`,
            current: true,
        },
    ];

    useEffect(() => {
        if (isFetched) {
            if (neighborhood === undefined) {
                router.replace('/not-found');
            }
        }
    }, [isFetched, neighborhood, router]);

    return !isFetched ? <Loading /> : <Breadcrumbs pages={pages} />;
};

export default NeighborhoodBreadcrumbs;
