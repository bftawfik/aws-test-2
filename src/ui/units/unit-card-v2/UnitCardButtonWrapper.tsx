import UnitContent from '@/ui/discover/drawers-content/UnitContentV2';
import Link from 'next/link';
import { Unit } from '@/types';
import { addDrawerIdToUrl } from '@/helpers/drawersUrlUtils';
import { LIST_VIEW } from '@/constants';
import DrawerSSR from '@/ui/DrawerSSR/DrawerSSR';
interface UnitCardButtonWrapperProps {
    unit: Unit;
    children: React.ReactNode[];
    locale: string;
    isDrawerOpen?: boolean;
    currentUrl: string;
}
const UnitCardButtonWrapper = ({
    unit,
    children,
    locale,
    isDrawerOpen = false,
    currentUrl,
}: UnitCardButtonWrapperProps) => {
    const [cardContent, drawerContent, SSRLInk] = children;
    const addDrawerIdToCurrentUrl = addDrawerIdToUrl(
        currentUrl,
        LIST_VIEW,
        unit?.id
    );
    return (
        <>
            <Link className={'w-full'} href={addDrawerIdToCurrentUrl}>
                {cardContent}
            </Link>
            <DrawerSSR
                isOpen={isDrawerOpen}
                currentUrl={currentUrl}
                headerElemnt={SSRLInk}
            >
                <UnitContent unit={unit} locale={locale}>
                    {drawerContent}
                </UnitContent>
            </DrawerSSR>
        </>
    );
};
export default UnitCardButtonWrapper;
