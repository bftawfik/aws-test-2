'use client';
import Link from 'next/link';
import React from 'react';
import { IoClose } from 'react-icons/io5';
import { TbHeadset } from 'react-icons/tb';
import LocaleSwitcher from '@/ui/header/locale-switcher';
import {
    DiscoverIcon,
    FacebookIcon,
    InstagramIcon,
    LinkedinIcon,
    TiktokIcon,
    TwitterSolidIcon,
} from '../svg';
import { SocialLink } from '@/interfaces/SharingLinks';
import {
    AR_LOCALE,
    DEFATULT_EMPTY_URL,
    DEFAULT_LOCALE,
    emptyCountryCode,
    hotline,
} from '@/constants';
import { useGenerateUrl } from '@/hooks/useGenerateUrl/useGenerateUrl';
import { useTranslations, useLocale } from 'next-intl';
import { getUrlLocaleSegment } from '@/helpers/getUrlLocaleSegment';
import EstatebookLogo from '../EstatebookLogo/EstatebookLogo';

export const MobileDrawer = ({
    setMobileMenuOpen,
}: {
    setMobileMenuOpen: any;
}) => {
    // Read localization
    const locale = useLocale();

    // Read translations
    const tGlobal = useTranslations('global');
    const tHeader = useTranslations('header');
    const urlLocaleSegment = getUrlLocaleSegment(locale);

    const socialLinks: SocialLink[] = [
        {
            name: 'Facebook',
            href: 'https://facebook.com/EstateBookApp',
            icon: (props) => (
                <FacebookIcon className="h-6 w-6 text-[#BFBFBF]" {...props} />
            ),
        },
        {
            name: 'Instagram',
            href: 'https://instagram.com/estatebook.App',
            icon: (props) => (
                <InstagramIcon className="h-6 w-6 text-[#BFBFBF]" {...props} />
            ),
        },
        {
            name: 'Twitter',
            href: 'https://twitter.com/EstatebookEG',
            icon: (props) => (
                <TwitterSolidIcon
                    className="h-6 w-6 text-[#BFBFBF]"
                    {...props}
                />
            ),
        },
        {
            name: 'TikTok',
            href: 'https://www.tiktok.com/@estatebook.app',
            icon: (props) => (
                <TiktokIcon className="h-6 w-6 text-[#BFBFBF]" {...props} />
            ),
        },
        {
            name: 'LinkedIn',
            href: 'https://linkedin.com/company/estatebook/',
            icon: (props) => (
                <LinkedinIcon className="h-6 w-6 text-[#BFBFBF]" {...props} />
            ),
        },
    ];
    const pojectsLink = useGenerateUrl({
        ...DEFATULT_EMPTY_URL,
        tempTab: 'projects',
    });
    return (
        <>
            <div className="relative h-screen w-full overflow-hidden bg-white p-6">
                <div className="flex h-[60px] items-center justify-between">
                    <Link
                        className="ring-none flex h-full flex-col justify-center outline-none "
                        href={`${
                            locale === DEFAULT_LOCALE ? '/' : `/${locale}`
                        }`}
                        prefetch={false}
                    >
                        <EstatebookLogo isNewBranding={true} />
                    </Link>
                    <button onClick={() => setMobileMenuOpen(false)}>
                        <IoClose className="h-6 w-6" />
                    </button>
                </div>
                <div>
                    <nav className="text-md">
                        <Link
                            href={`${urlLocaleSegment}/discover`}
                            onClick={() => setMobileMenuOpen(false)}
                            className="mt-8 flex items-center justify-center rounded-lg bg-primary px-[18px] py-2 text-center"
                            prefetch={false}
                        >
                            <DiscoverIcon />
                            <span className="ms-2 text-white">
                                {tGlobal('discover')}
                            </span>
                        </Link>
                        <div className="mt-4 grid divide-y-[0.5px] divide-gray-300 font-medium">
                            <Link
                                className="py-4"
                                href={`${
                                    locale === DEFAULT_LOCALE
                                        ? '/'
                                        : `/${locale}`
                                }`}
                                onClick={() => setMobileMenuOpen(false)}
                                prefetch={false}
                            >
                                {tHeader('home')}
                            </Link>
                            <Link
                                className="py-4"
                                href={`${urlLocaleSegment}/developers`}
                                onClick={() => setMobileMenuOpen(false)}
                                prefetch={false}
                            >
                                {tHeader('developers')}
                            </Link>
                            <Link
                                className="py-4"
                                href={pojectsLink}
                                onClick={() => setMobileMenuOpen(false)}
                                prefetch={false}
                            >
                                {tHeader('projects')}
                            </Link>
                            {/* <Link
                                className="py-4"
                                href={`${urlLocaleSegment}/blogs`}
                                onClick={() => setMobileMenuOpen(false)}
                                                                        prefetch={false}

                            >
                                {tHeader('blogs')}
                            </Link> */}
                            <LocaleSwitcher>
                                <span className="py-4  font-cairo font-medium">
                                    {' '}
                                    {locale === AR_LOCALE
                                        ? 'English'
                                        : 'العربية'}{' '}
                                </span>
                            </LocaleSwitcher>
                        </div>
                    </nav>
                </div>
                <div className="fixed bottom-5">
                    <div>
                        <div className="flex pb-1">
                            <TbHeadset className="h-6 w-6" />
                            <span className="ms-2 font-bold uppercase">
                                {tHeader('hotline')}
                            </span>
                        </div>
                        <div className="text-3xl font-bold text-primary">
                            <a href={`tel:${emptyCountryCode}${hotline}`}>
                                {hotline}
                            </a>
                        </div>
                    </div>
                    <div className="text-gray-250 flex gap-x-4 py-5">
                        {socialLinks.map((item) => (
                            <a key={item.name} href={item.href} target="_blank">
                                <span className="sr-only">{item.name}</span>
                                <item.icon fill="currentColor" />
                            </a>
                        ))}
                    </div>
                    <div className="text-[11px] font-light text-gray-400">
                        <p>
                            {' '}
                            {tHeader('copyrights')} • {new Date().getFullYear()}{' '}
                            • <span className="font-medium"> Estatebook </span>{' '}
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};
