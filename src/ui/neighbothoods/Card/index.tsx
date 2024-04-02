import NeighborhoodCardContent from './NeighborhoodCardContent';
import NeighborhoodCardButtonWrapper from './NeighborhoodCardButtonWrapper';
import { Location, NextIntlGetTranslatorFunction } from '@/types';
import NeighborhoodCardLinkWrapper from './NeighborhoodCardLinkWrapper';
import SSRDrawerLocationContent from '@/ui/discover/drawers-content/SSRDrawersContent/SSRDrawerLocationContent';
import Link from 'next/link';
import { MultiArrowsIcon } from '@/ui/svg/MultiArrowsIcon';
import { getUrlLocaleSegment } from '@/helpers/getUrlLocaleSegment';

interface NeighborhoodCardProps extends React.ComponentProps<'div'> {
    location: Location;
    shouldPreventRouting?: boolean;
    locale: string;
    isDrawerOpen?: boolean;
    currentUrl?: string;
    tGlobal: NextIntlGetTranslatorFunction;
}

const NeighborhoodCard = ({
    shouldPreventRouting,
    location,
    locale,
    className,
    isDrawerOpen = false,
    currentUrl = '',
    tGlobal,
}: NeighborhoodCardProps) => {
    const urlLocaleSegment = getUrlLocaleSegment(locale);

    return (
        <div className="relative h-full">
            {shouldPreventRouting ? (
                <NeighborhoodCardButtonWrapper
                    location={location}
                    locale={locale}
                    isDrawerOpen={isDrawerOpen}
                    currentUrl={currentUrl}
                >
                    <NeighborhoodCardContent
                        locale={locale}
                        location={location}
                        className={className}
                        tGlobal={tGlobal}
                    />
                    <SSRDrawerLocationContent
                        location={location}
                        locale={locale}
                    />
                    <Link
                        href={`${urlLocaleSegment}/neighborhoods/${location?.slug}`}
                        target="_blank"
                        className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#B3B3B3] px-3 py-2 text-xs capitalize text-[#5F5F5F] transition-colors duration-150 hover:bg-gray-200"
                    >
                        <MultiArrowsIcon className="h-4 w-4 text-custom-grey" />
                        {tGlobal('view_details')}
                    </Link>
                </NeighborhoodCardButtonWrapper>
            ) : (
                <NeighborhoodCardLinkWrapper
                    location={location}
                    locale={locale}
                >
                    <NeighborhoodCardContent
                        locale={locale}
                        location={location}
                        className={className}
                        tGlobal={tGlobal}
                    />
                </NeighborhoodCardLinkWrapper>
            )}
        </div>
    );
};

export default NeighborhoodCard;
