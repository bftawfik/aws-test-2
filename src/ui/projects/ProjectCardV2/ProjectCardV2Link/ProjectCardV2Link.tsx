import { getUrlLocaleSegment } from '@/helpers/getUrlLocaleSegment';
import Link from 'next/link';
import React from 'react';

interface ProjectCardV2LinkProps {
    children: React.ReactNode;
    projectSlug: string;
    locale: string;
}
export const ProjectCardV2Link = ({
    children,
    projectSlug,
    locale,
}: ProjectCardV2LinkProps) => {
    const urlLocaleSegment = getUrlLocaleSegment(locale);
    return (
        <Link
            prefetch={false}
            href={`${urlLocaleSegment}/projects/${projectSlug}`}
        >
            {children}
        </Link>
    );
};
