'use client';

import { usePathname } from 'next/navigation';
import Footer from '../footer';
import { GRID_VIEW, LIST_VIEW, MAP_VIEW } from '@/constants';
import dynamic from 'next/dynamic';
interface ConditionalFooterProps {
    cookieDiscoverView?: string;
}
export const ConditionalFooter = ({
    cookieDiscoverView = LIST_VIEW,
}: ConditionalFooterProps) => {
    const pathname = usePathname();
    const pathSegments = pathname.split('/'); // Split the pathname into segments
    const isHidden =
        pathSegments.some((segment) => segment === 'discover') &&
        (cookieDiscoverView === GRID_VIEW || cookieDiscoverView === MAP_VIEW);

    return <>{isHidden ? null : <Footer />}</>;
};

export default dynamic(() => Promise.resolve(ConditionalFooter), {
    ssr: false,
});
