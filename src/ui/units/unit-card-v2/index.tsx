import 'swiper/swiper-bundle.css';
import { getUrlLocaleSegment } from '@/helpers/getUrlLocaleSegment';
import { NextIntlGetTranslatorFunction, Unit } from '@/types';
import UnitCardLinkWrapper from './UnitCardLinkWrapper';
import UnitCardButtonWrapper from './UnitCardButtonWrapper';
import CardContents from './CardContents';
import CardFooter from './CardFooter';
import SSRDrawerUnitContent from '@/ui/discover/drawers-content/SSRDrawersContent/SSRDrawerUnitContent';
import { MultiArrowsIcon } from '@/ui/svg/MultiArrowsIcon';
import Link from 'next/link';

export interface UnitCardProps {
    unit: Unit;
    shouldPreventRouting?: boolean;
    locale: string;
    host: string;
    isDrawerOpen?: boolean;
    currentUrl?: string;
    tGlobal: NextIntlGetTranslatorFunction;
    tUnitCard: NextIntlGetTranslatorFunction;
    isDrawerContent?: boolean;
}

export const UnitCard = ({
    unit,
    shouldPreventRouting = false,
    locale,
    host,
    isDrawerOpen = false,
    currentUrl = '',
    tGlobal,
    tUnitCard,
    isDrawerContent = false,
}: UnitCardProps) => {
    const urlLocaleSegment = getUrlLocaleSegment(locale);
    const fullUrl = `${urlLocaleSegment}/discover/${currentUrl}`;
    return (
        <>
            <div className="relative w-full rounded-xl border border-gray-100 bg-white shadow">
                {shouldPreventRouting ? (
                    <UnitCardButtonWrapper
                        unit={unit}
                        locale={locale}
                        currentUrl={fullUrl}
                        isDrawerOpen={isDrawerOpen}
                    >
                        <CardContents
                            unit={unit}
                            locale={locale}
                            tGlobal={tGlobal}
                            tUnitCard={tUnitCard}
                            isDrawerContent={isDrawerContent}
                        />
                        <SSRDrawerUnitContent unit={unit} locale={locale} />
                        <Link
                            href={`${urlLocaleSegment}/units/${
                                unit?.slug || ``
                            }`}
                            target="_blank"
                            className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#B3B3B3] px-3 py-2 text-xs capitalize text-[#5F5F5F] transition-colors duration-150 hover:bg-gray-200"
                        >
                            <MultiArrowsIcon className="h-4 w-4 text-custom-grey" />
                            {tGlobal('view_details')}
                        </Link>
                    </UnitCardButtonWrapper>
                ) : (
                    <UnitCardLinkWrapper
                        url={`${urlLocaleSegment}/units/${unit?.slug || ''}`}
                    >
                        <CardContents
                            unit={unit}
                            locale={locale}
                            tGlobal={tGlobal}
                            tUnitCard={tUnitCard}
                            isDrawerContent={isDrawerContent}
                        />
                    </UnitCardLinkWrapper>
                )}
                <CardFooter unit={unit} locale={locale} host={host || ''} />
            </div>
        </>
    );
};
