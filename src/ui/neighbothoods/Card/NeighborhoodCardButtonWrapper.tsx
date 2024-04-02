'use server';
import { LIST_VIEW } from '@/constants';
import { addDrawerIdToUrl } from '@/helpers/drawersUrlUtils';
import { Location } from '@/types';
import DrawerSSR from '@/ui/DrawerSSR/DrawerSSR';
import { LocationContent } from '@/ui/discover/drawers-content/LocationContentV2';
import Link from 'next/link';

interface NeighborhoodCardButtonWrapperProps {
    location: Location;
    children: React.ReactNode[];
    locale: string;
    isDrawerOpen?: boolean;
    currentUrl: string;
}
const NeighborhoodCardButtonWrapper = ({
    children,
    location,
    isDrawerOpen = false,
    currentUrl,
}: NeighborhoodCardButtonWrapperProps) => {
    const addDrawerIdToCurrentUrl = addDrawerIdToUrl(
        currentUrl,
        LIST_VIEW,
        location?.id
    );

    const [cardContent, drawerContent, SSRLink] = children;

    return (
        <>
            <Link className={'w-full'} href={addDrawerIdToCurrentUrl}>
                {cardContent}
            </Link>
            <DrawerSSR
                isOpen={isDrawerOpen}
                currentUrl={currentUrl}
                headerElemnt={SSRLink}
            >
                <LocationContent>{drawerContent}</LocationContent>
            </DrawerSSR>
        </>
    );
};

export default NeighborhoodCardButtonWrapper;
