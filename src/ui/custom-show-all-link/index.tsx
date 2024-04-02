'use client';

import Link from 'next/link';
import React from 'react';
import { RightArrowIcon } from '../svg';
import { useLocale, useTranslations } from 'next-intl';
import { getUrlLocaleSegment } from '@/helpers/getUrlLocaleSegment';

interface CustomLinkProps {
    hrefUrl: string;
}
const CustomShowAllLink = ({ hrefUrl }: CustomLinkProps) => {
    // Read translations
    const tGlobal = useTranslations('global');

    const locale = useLocale();
    const urlLocaleSegment = getUrlLocaleSegment(locale);

    return (
        <Link
            href={`${urlLocaleSegment}${hrefUrl}`}
            className="flex items-center"
            prefetch={false}
        >
            <span className="text-medium-gray text-sm font-light">
                {tGlobal('show_all')}
            </span>
            <RightArrowIcon />
        </Link>
    );
};

export default CustomShowAllLink;
