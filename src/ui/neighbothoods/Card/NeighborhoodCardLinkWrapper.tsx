'use server';
import { getUrlLocaleSegment } from '@/helpers/getUrlLocaleSegment';
import { Location } from '@/types';
import Link from 'next/link';

interface NeighborhoodCardLinkWrapperProps {
    location: Location;
    children: React.ReactNode;
    locale: string;
}
const NeighborhoodCardLinkWrapper = async ({
    children,
    location,
    locale,
}: NeighborhoodCardLinkWrapperProps) => {
    const urlLocaleSegment = getUrlLocaleSegment(locale);
    return (
        <Link href={`${urlLocaleSegment}/neighborhoods/${location?.slug}`}>
            {children}
        </Link>
    );
};

export default NeighborhoodCardLinkWrapper;
