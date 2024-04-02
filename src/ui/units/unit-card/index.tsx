'use client';
import Image from 'next/image';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperClass } from 'swiper/types';
// Import Swiper styles
import 'swiper/swiper-bundle.css';
import { UnitCardProps } from './unit-card';
import { useCallback, useState } from 'react';
import { getLangkey } from '@/helpers';
import { Navigation, Pagination } from 'swiper';
import { ImagePlaceholder } from '@/ui/image-placeholder';
import CompareButton from '@/ui/compare-button';
import WishlistButton from '@/ui/wishlist-button';
import Link from 'next/link';
import {
    hotline,
    whatsapp,
    emptyCountryCode,
    egCountryCode,
} from '@/constants';
import getNumberFormat from '@/helpers/get-number-format';
import {
    AreaIcon,
    BathIcon,
    BedIcon,
    FacebookIcon,
    HouseIcon,
    LinkIcon,
    LocationMarkerOutlineIcon,
    PhoneCallIcon,
    ShareTogglerIcon,
    TwitterIcon,
    WhatsAppIcon,
} from '@/ui/svg';
import useCurrentUrl from '@/hooks/useCurrentUrl';
import { useTranslations, useLocale } from 'next-intl';
import Drawer from '@/ui/drawer';
import { MultiArrowsIcon } from '@/ui/svg/MultiArrowsIcon';
import UnitContent from '@/ui/discover/drawers-content/UnitContent';
import { getUrlLocaleSegment } from '@/helpers/getUrlLocaleSegment';
import { generateUnitWhatsappTextEncoded } from '@/helpers/generateUnitWhatsappTextEncoded';
import SoldOut from '@/ui/SoldOut/SoldOut';

// import CompareButton from '@/ui/compare-button';

export const UnitCard = ({
    unit,
    shouldPreventRouting = false,
}: UnitCardProps) => {
    // Read localization
    const locale = useLocale();

    // Read translations
    const tUnitCard = useTranslations('unit_card');
    const tGlobal = useTranslations('global');

    //  toggle share content section
    const [showShareContent, setShareContent] = useState(false);
    const [copied, setCopied] = useState(false);

    const toggleShareContent = () => {
        setShareContent(!showShareContent);
    };

    const [swiperRef, setSwiperRef] = useState<SwiperClass>();

    const handlePrevious = useCallback(() => {
        swiperRef?.slidePrev();
    }, [swiperRef]);

    const handleNext = useCallback(() => {
        swiperRef?.slideNext();
    }, [swiperRef]);

    const handleCopy = () => {
        const textArea = document.createElement('textarea');
        textArea.value = unitLink;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 1000);
    };

    // check if unit type is commercial
    const isCommercialUnit = unit?.type === 'commercial';
    const urlLocaleSegment = getUrlLocaleSegment(locale);

    // Get CurrentUrl and concatinate it for the unit link
    const unitLink = useCurrentUrl(`${urlLocaleSegment}/units/${unit?.slug}`);

    // Whatsapp
    const encodedWhatsappText = generateUnitWhatsappTextEncoded(
        unit.title,
        unit.type,
        unit.price,
        unit.address,
        unitLink
    );

    // open drawer
    const [openUnitDrawer, setOpenUnitDrawer] = useState(false);
    const handleRouting = (e: React.MouseEvent<HTMLElement>) => {
        const clickedNext = (e.target as HTMLElement).classList.contains(
            'swiper-button-next'
        );
        const clickedPrev = (e.target as HTMLElement).classList.contains(
            'swiper-button-prev'
        );
        if (shouldPreventRouting && !clickedNext && !clickedPrev) {
            e.preventDefault();
            setOpenUnitDrawer(true);
        }
    };

    return (
        <>
            <div className="w-full rounded-xl border border-gray-100 bg-white shadow">
                <Link
                    prefetch={false}
                    onClick={handleRouting}
                    href={`${urlLocaleSegment}/units/${unit?.slug}`}
                >
                    <div className="group relative h-64 w-full cursor-pointer overflow-hidden rounded-t-xl">
                        <div>
                            <Swiper
                                pagination={{ clickable: true }}
                                navigation={true}
                                loop={true}
                                modules={[Pagination, Navigation]}
                                className="mySwiper cardSwiper h-64 "
                            >
                                {unit?.images?.map(
                                    (image: any, idx: number) => (
                                        <SwiperSlide
                                            itemType={'div'}
                                            key={image}
                                        >
                                            <ImagePlaceholder
                                                classes="h-full w-full rounded-t-xl object-cover object-center"
                                                image={image ?? ''}
                                            />
                                        </SwiperSlide>
                                    )
                                )}
                            </Swiper>
                        </div>
                        <div className="absolute top-0 z-10 flex w-full items-center justify-between p-4">
                            {unit?.sale_type === 'sale' ? (
                                <div className="rounded-full bg-white px-3 py-1 text-xs font-medium capitalize">
                                    {tGlobal('from_developer') || ''}
                                </div>
                            ) : (
                                <div className="rounded-full bg-white px-3 py-1 text-xs font-medium capitalize">
                                    {unit.sale_type || ''}
                                </div>
                            )}
                            <div className="flex items-center gap-x-2 rounded-full text-xs font-medium">
                                <CompareButton item={unit} type="units" />
                                <WishlistButton item={unit} type="unit" />
                            </div>
                        </div>
                        <div className="absolute bottom-4 z-10 flex w-full items-center justify-between px-4">
                            <div>
                                {unit?.UnitType?.name && (
                                    <div className="flex items-center justify-center gap-1 rounded-3xl bg-[#E8FFF5] px-3 py-1 text-xs font-medium capitalize text-black">
                                        <HouseIcon />
                                        <p className="text-primary-green">
                                            {getLangkey(
                                                unit.UnitType.name || '',
                                                locale
                                            )}
                                        </p>
                                    </div>
                                )}
                            </div>
                            {unit?.sold_out ? <SoldOut type="unit" /> : null}
                        </div>
                    </div>
                </Link>

                <div className="group relative overflow-hidden">
                    <div className="grid grid-cols-2 bg-[#FAFAFA] px-4 py-2 text-xs font-medium capitalize">
                        {unit?.developer?.name && (
                            <div
                                className="line-clamp-1"
                                title={getLangkey(
                                    unit.developer.name || '',
                                    locale
                                )}
                            >
                                {getLangkey(unit.developer?.name || '', locale)}
                            </div>
                        )}

                        <div>
                            {tUnitCard('delivery') || ''} -
                            {unit.project?.delivery_year || ''}
                        </div>
                    </div>

                    <div
                        className={` absolute inset-0 z-10 flex  items-center justify-center gap-x-2 bg-white/80 backdrop-blur-sm transition-transform ${
                            showShareContent
                                ? 'translate-y-0'
                                : 'translate-y-full'
                        } `}
                    >
                        {/* Facebook Sharing */}
                        <a
                            target="popup"
                            rel="noopener noreferrer"
                            onClick={() => {
                                window.open(
                                    `https://www.facebook.com/sharer/sharer.php?u=${unitLink}`,
                                    'popup',
                                    'width=600,height=600,scrollbars=no,resizable=no'
                                );
                                return false;
                            }}
                            href={`https://www.facebook.com/sharer/sharer.php?u=${unitLink}`}
                            className="z-[20] inline-flex h-12 w-12 items-center justify-center rounded-full"
                        >
                            <FacebookIcon
                                width={24}
                                height={24}
                                className="h-6 w-6 fill-current"
                            />
                        </a>
                        {/* Twitter */}
                        <a
                            target="_blank"
                            href={`https://twitter.com/intent/tweet?url=${unitLink}&text=${unit?.slug}`}
                            className="inline-flex h-12 w-12 items-center justify-center rounded-full"
                        >
                            <TwitterIcon
                                width={24}
                                height={24}
                                className="h-6 w-6 fill-current"
                            />
                        </a>
                        {/* whatsapp */}
                        <a
                            target="_blank"
                            href={`https://wa.me/${egCountryCode}${whatsapp}?text=${encodedWhatsappText}`}
                            className="group inline-flex h-12 w-12 items-center justify-center rounded-full"
                        >
                            <WhatsAppIcon
                                width={24}
                                height={24}
                                className="h-6 w-6 fill-current"
                            />
                        </a>
                        {/* Copy Link */}
                        <button
                            className="inline-flex h-12 w-12 items-center justify-center rounded-full"
                            onClick={handleCopy}
                        >
                            {copied ? (
                                <span>{tGlobal('copied')}</span>
                            ) : (
                                <LinkIcon
                                    width={24}
                                    height={24}
                                    className="h-6 w-6 fill-current"
                                />
                            )}
                        </button>
                    </div>

                    <div className="space-y-4 p-4">
                        <div className="space-y-4">
                            {/* start content */}
                            {/* payment type leasing */}
                            {unit?.payment_type === 'leasing' && (
                                <div className="grid grid-cols-2">
                                    <div className="flex flex-col gap-y-3 capitalize">
                                        <div className="space-y-2">
                                            <div>
                                                <div className="text-xs text-gray-500">
                                                    <p>
                                                        {tUnitCard(
                                                            'starting_from'
                                                        ) || ''}
                                                    </p>
                                                </div>
                                                <h2 className="line-clamp-1 space-x-1 text-lg font-bold">
                                                    {tUnitCard(
                                                        'leasing_only'
                                                    ) || ''}
                                                </h2>
                                            </div>
                                            {/* {unit?.project?.name && (
                                                <p className="line-clamp-1 rounded-lg text-xs ltr:mr-2 rtl:ml-2">
                                                    {getLangkey(
                                                        unit.project.name || '',
                                                        locale
                                                    )}
                                                </p>
                                            )} */}
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-y-6 capitalize">
                                        <div className="space-y-2">
                                            {unit?.min_down_payment ? (
                                                <div>
                                                    <div className="text-xs text-gray-500">
                                                        <p>
                                                            {tUnitCard(
                                                                'down_payment'
                                                            ) || ''}
                                                        </p>
                                                    </div>
                                                    <h2 className="line-clamp-1 text-lg font-bold">
                                                        {getNumberFormat(
                                                            +unit?.min_down_payment
                                                        )}

                                                        <span className="ms-1 text-xs">
                                                            {tGlobal('egp') ||
                                                                ''}
                                                        </span>
                                                    </h2>
                                                </div>
                                            ) : (
                                                <div>
                                                    <div className="text-xs text-gray-500">
                                                        {/* <p>rental</p> */}
                                                        <span>
                                                            {tUnitCard(
                                                                'rental'
                                                            ) || ''}
                                                        </span>
                                                    </div>
                                                    <h2 className="font-bold">
                                                        {tUnitCard('monthly') ||
                                                            ''}
                                                    </h2>
                                                </div>
                                            )}
                                            {unit?.min_month_payment && (
                                                <p className="text-medium-gray line-clamp-1 space-x-1 text-xs">
                                                    <span className="font-semibold">
                                                        {getNumberFormat(
                                                            +unit?.min_month_payment
                                                        )}
                                                    </span>
                                                    <span>
                                                        {tUnitCard('monthly') ||
                                                            ''}{' '}
                                                        / {unit.duration || ''}
                                                        {tUnitCard('years') ||
                                                            ''}
                                                    </span>
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                            {/* payment type cash  */}
                            {unit?.payment_type === 'cash' && (
                                <div className="grid grid-cols-2">
                                    <div className="flex flex-col gap-y-3 capitalize">
                                        <div className="space-y-2">
                                            <div>
                                                <div className="text-xs text-gray-500">
                                                    <p>
                                                        {tUnitCard(
                                                            'starting_from'
                                                        ) || ''}
                                                    </p>
                                                </div>
                                                <h2 className="line-clamp-1 space-x-1 text-lg font-bold">
                                                    {getNumberFormat(
                                                        unit?.price
                                                    )}

                                                    <span className="ms-1 text-xs">
                                                        {tGlobal('egp') || ''}
                                                    </span>
                                                </h2>
                                            </div>
                                            {unit?.project?.name && (
                                                <p className="line-clamp-1 rounded-lg text-xs ltr:mr-2 rtl:ml-2">
                                                    {getLangkey(
                                                        unit.project.name || '',
                                                        locale
                                                    )}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-y-6 capitalize">
                                        <div className="space-y-2">
                                            {unit?.min_down_payment ? (
                                                <div>
                                                    <div className="text-xs text-gray-500">
                                                        <p>
                                                            {tUnitCard(
                                                                'down_payment'
                                                            ) || ''}
                                                        </p>
                                                    </div>
                                                    <h2 className="line-clamp-1 text-lg font-bold">
                                                        {getNumberFormat(
                                                            +unit?.min_down_payment
                                                        )}

                                                        <span className="ms-1 text-xs">
                                                            {tGlobal('egp') ||
                                                                ''}
                                                        </span>
                                                    </h2>
                                                </div>
                                            ) : (
                                                <div>
                                                    <div className="text-xs text-gray-500">
                                                        <span>
                                                            {tUnitCard(
                                                                'payment'
                                                            ) || ''}
                                                        </span>
                                                    </div>
                                                    <h2 className="font-bold">
                                                        {tUnitCard('cash') ||
                                                            ''}
                                                    </h2>
                                                </div>
                                            )}
                                            {unit?.min_month_payment && (
                                                <p className="text-medium-gray line-clamp-1 space-x-1 text-xs">
                                                    <span className="font-semibold">
                                                        {getNumberFormat(
                                                            +unit?.min_month_payment
                                                        )}
                                                    </span>
                                                    <span>
                                                        {` ${
                                                            tUnitCard(
                                                                'monthly'
                                                            ) || ''
                                                        } / ${
                                                            unit.duration || ''
                                                        } ${
                                                            tUnitCard(
                                                                'years'
                                                            ) || ''
                                                        }`}
                                                    </span>
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                            {/* payment type installemts */}
                            {unit?.payment_type === 'installments' && (
                                <div className="grid grid-cols-2">
                                    <div className="flex flex-col gap-y-3 capitalize">
                                        <div className="space-y-2">
                                            <div>
                                                <div className="text-xs text-gray-500">
                                                    <p>
                                                        {tUnitCard(
                                                            'starting_from'
                                                        ) || ''}
                                                    </p>
                                                </div>
                                                <h2 className="line-clamp-1 space-x-1 text-lg font-bold">
                                                    {getNumberFormat(
                                                        unit?.price
                                                    )}
                                                    <span className="ms-1 text-xs">
                                                        {tGlobal('egp') || ''}
                                                    </span>
                                                </h2>
                                            </div>
                                            {unit?.project?.name && (
                                                <p className="line-clamp-1 rounded-lg text-xs ltr:mr-2 rtl:ml-2">
                                                    {getLangkey(
                                                        unit.project.name || '',
                                                        locale
                                                    )}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-y-6 capitalize">
                                        <div className="space-y-2">
                                            {unit?.min_down_payment ? (
                                                <div>
                                                    <div className="text-xs text-gray-500">
                                                        <p>
                                                            {' '}
                                                            {tUnitCard(
                                                                'down_payment'
                                                            ) || ''}
                                                        </p>
                                                    </div>
                                                    <h2 className="line-clamp-1 text-lg font-bold">
                                                        {getNumberFormat(
                                                            +unit?.min_down_payment
                                                        )}
                                                        <span className="ms-1 text-xs">
                                                            {tGlobal('egp') ||
                                                                ''}
                                                        </span>
                                                    </h2>
                                                </div>
                                            ) : (
                                                <div>
                                                    <div className="text-xs text-gray-500">
                                                        {/* <p>No down payment</p> */}
                                                        <span>
                                                            {tUnitCard(
                                                                'rental'
                                                            ) || ''}
                                                        </span>
                                                    </div>
                                                    <h2 className="line-clamp-1 text-lg font-bold">
                                                        0
                                                        <span className="ms-1 text-xs">
                                                            {tGlobal('egp') ||
                                                                ''}
                                                        </span>
                                                    </h2>
                                                </div>
                                            )}
                                            {unit?.min_month_payment && (
                                                <p className="text-medium-gray line-clamp-1 space-x-1 text-xs">
                                                    <span className="font-semibold">
                                                        {getNumberFormat(
                                                            +unit?.min_month_payment
                                                        )}
                                                    </span>
                                                    <span>
                                                        {` ${
                                                            tUnitCard(
                                                                'monthly'
                                                            ) || ''
                                                        } / ${
                                                            unit?.duration || ''
                                                        } ${
                                                            tUnitCard(
                                                                'years'
                                                            ) || ''
                                                        }`}
                                                    </span>
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* end content */}

                            <div className="flex items-center gap-x-1 text-xs">
                                <LocationMarkerOutlineIcon
                                    width={24}
                                    height={24}
                                    className="h-4 w-4 shrink-0 fill-current text-gray-500"
                                />

                                {unit?.address && (
                                    <p className="line-clamp-1">
                                        {getLangkey(unit.address || '', locale)}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center gap-x-4">
                                <div className="flex items-center gap-x-4">
                                    {!isCommercialUnit && (
                                        <div className="flex items-center gap-x-2 text-xs font-medium">
                                            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-100 bg-gray-50">
                                                <BedIcon />
                                            </div>
                                            {unit.bedroom || ''}
                                        </div>
                                    )}
                                    {!isCommercialUnit && (
                                        <div className="flex items-center gap-x-2 text-xs font-medium">
                                            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-100 bg-gray-50">
                                                <BathIcon />
                                            </div>
                                            {unit.bathroom || ''}
                                        </div>
                                    )}

                                    <div className="flex items-center gap-x-2 text-xs font-medium">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-100 bg-gray-50">
                                            <AreaIcon />
                                        </div>
                                        <p className="space-x-1">
                                            <span>{unit.area || ''}</span>
                                            <span>
                                                {tUnitCard('meter')}
                                                <sup>2</sup>
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-3 overflow-hidden rounded-b-lg border-t border-t-gray-100">
                    {/* Call Mobile */}
                    <a
                        href={`tel:${emptyCountryCode}${hotline}`}
                        className="inline-flex items-center justify-center p-4 hover:bg-[#FAFAFA]"
                    >
                        <PhoneCallIcon
                            viewBox="0 0 24 24"
                            width={24}
                            height={24}
                            className="h-7 w-7 fill-current text-[#4CB087]"
                        />
                    </a>
                    {/* Whatsapp */}
                    <a
                        href={`https://wa.me/${egCountryCode}${whatsapp}?text=${encodedWhatsappText}`}
                        target="_blank"
                        className="inline-flex items-center justify-center p-3 hover:bg-[#FAFAFA]"
                    >
                        <WhatsAppIcon
                            viewBox="0 0 24 24"
                            width={24}
                            height={24}
                            className="h-7 w-7 fill-current text-[#4CB087]"
                        />
                    </a>

                    <button
                        onClick={toggleShareContent}
                        className="inline-flex items-center justify-center p-3 hover:bg-[#FAFAFA]"
                    >
                        <ShareTogglerIcon
                            viewBox="0 0 24 24"
                            width={24}
                            height={24}
                            className="h-7 w-7 fill-current text-[#4CB087]"
                        />
                    </button>
                </div>
            </div>
            <Drawer
                isOpen={openUnitDrawer}
                closeModalHandler={() => setOpenUnitDrawer(false)}
                headerElemnt={
                    <Link
                        prefetch={false}
                        href={`${urlLocaleSegment}/units/${unit?.slug}`}
                        target="_blank"
                        className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#B3B3B3] px-3 py-2 text-xs capitalize text-[#5F5F5F] transition-colors duration-150 hover:bg-gray-200"
                    >
                        <MultiArrowsIcon className="h-4 w-4 text-custom-grey" />
                        {tGlobal('view_details')}
                    </Link>
                }
            >
                <UnitContent unit={unit} />
            </Drawer>
        </>
    );
};
