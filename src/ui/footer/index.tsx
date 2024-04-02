'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import {
    FacebookIcon,
    LinkedinIcon,
    TiktokIcon,
    InstagramIcon,
    TwitterSolidIcon,
    AppleIcon,
    GooglePlayIcon,
} from '../svg';
import { DEFATULT_EMPTY_URL, emptyCountryCode, hotline } from '@/constants';
import { useGenerateUrl } from '@/hooks/useGenerateUrl/useGenerateUrl';
import { useTranslations, useLocale } from 'next-intl';
import { getUrlLocaleSegment } from '@/helpers/getUrlLocaleSegment';
import ResetStoreWrapper from '../ResetStoreWrapper/ResetStoreWrapper';
import EstatebookLogo from '../EstatebookLogo/EstatebookLogo';
import clsx from 'clsx';
interface FooterProps {
    isGrid?: boolean;
}
const Footer = React.forwardRef(
    ({ isGrid = false }: FooterProps, ref: React.Ref<HTMLElement>) => {
        // Read localization
        const locale = useLocale();

        // Read translations
        const tFooter = useTranslations('footer');
        const urlLocaleSegment = getUrlLocaleSegment(locale);

        const navigation = {
            quickLinks: [
                {
                    name: tFooter('neighborhoods'),
                    href: useGenerateUrl({
                        ...DEFATULT_EMPTY_URL,
                        tempTab: 'neighborhoods',
                    }),
                },
                {
                    name: tFooter('projects'),
                    href: useGenerateUrl({
                        ...DEFATULT_EMPTY_URL,
                        tempTab: 'projects',
                    }),
                },
                {
                    name: tFooter('developers'),
                    href: `${urlLocaleSegment}/developers`,
                },
                // { name: tFooter('blogs'), href: `${urlLocaleSegment}/blogs` },
            ],
            about: [
                {
                    name: tFooter('about_us'),
                    href: `${urlLocaleSegment}/about-us`,
                },
                // { name: tFooter('contant_us'), href: '#' },
                {
                    name: tFooter('privacy_policy'),
                    href: `${urlLocaleSegment}/privacy-policy`,
                },
                // { name: tFooter('help'), href: '#' },
            ],
            social: [
                {
                    name: 'Facebook',
                    href: 'https://facebook.com/EstateBookApp',
                    icon: (props: any) => <FacebookIcon {...props} />,
                },
                {
                    name: 'Instagram',
                    href: 'https://instagram.com/estatebook.App',
                    icon: (props: any) => <InstagramIcon {...props} />,
                },
                {
                    name: 'Twitter',
                    href: 'https://twitter.com/EstatebookEG',
                    icon: (props: any) => <TwitterSolidIcon {...props} />,
                },
                {
                    name: 'TikTok',
                    href: 'https://www.tiktok.com/@estatebook.app',
                    icon: (props: any) => <TiktokIcon {...props} />,
                },
                {
                    name: 'LinkedIn',
                    href: 'https://linkedin.com/company/estatebook/',
                    icon: (props: any) => <LinkedinIcon {...props} />,
                },
            ],
        };

        return (
            <footer
                ref={ref}
                className="relative bg-grey-50 pb-[80px] lg:mt-16 lg:pb-0"
                aria-labelledby="footer-heading"
            >
                {/* Desktop */}
                <div className="pb-5 pt-16 sm:pt-24 md:pt-16 lg:block">
                    <div
                        className={clsx({
                            'es-container xl:grid xl:grid-cols-2 xl:gap-8':
                                !isGrid,
                            'es-container xl:grid xl:grid-cols-1 xl:gap-8':
                                isGrid,
                        })}
                    >
                        <div
                            className={clsx({
                                'xl:grid xl:grid-cols-3 xl:gap-4': !isGrid,
                                'xl:grid xl:grid-cols-2 xl:gap-4': isGrid,
                            })}
                        >
                            <div className="flex flex-col gap-y-10">
                                <div className="space-y-5">
                                    <Link
                                        href={`${urlLocaleSegment}/`}
                                        prefetch={false}
                                    >
                                        <EstatebookLogo isNewBranding={true} />
                                    </Link>
                                    <div className="hidden lg:block">
                                        <div className="flex w-1/2 gap-x-4 text-[#BFBFBF] md:w-auto">
                                            {navigation.social.map((item) => (
                                                <a
                                                    key={item.name}
                                                    href={item.href}
                                                    target="_blank"
                                                    className="group"
                                                >
                                                    <span className="sr-only">
                                                        {item.name}
                                                    </span>
                                                    <item.icon
                                                        className="h-6 w-6 duration-100 group-hover:fill-black"
                                                        aria-hidden="true"
                                                        fill="currentColor"
                                                    />
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Hotline */}
                                <div className="hidden lg:block">
                                    <div className="flex items-center gap-x-1">
                                        <p className="text-base font-bold uppercase text-black">
                                            {tFooter('hotline')}
                                        </p>
                                    </div>
                                    <p className="text-[42px] font-bold leading-8 text-primary md:leading-10">
                                        <a
                                            href={`tel:${emptyCountryCode}${hotline}`}
                                        >
                                            {hotline}
                                        </a>
                                    </p>
                                </div>
                            </div>
                            <div className="mt-16 grid gap-8 xl:col-span-2 xl:mt-0">
                                <div className="grid grid-cols-2 gap-8">
                                    <div>
                                        <h3 className="text-md md:text-md font-semibold leading-6 text-gray-900">
                                            {tFooter('quick_links')}
                                        </h3>
                                        <ul
                                            role="list"
                                            className="mt-3 space-y-3"
                                        >
                                            {navigation.quickLinks.map(
                                                (item) => (
                                                    <li key={item.name}>
                                                        <ResetStoreWrapper>
                                                            <Link
                                                                href={item.href}
                                                                className="text-sm font-normal capitalize leading-6 text-grey-900 hover:text-primary"
                                                                prefetch={false}
                                                            >
                                                                {item.name}
                                                            </Link>
                                                        </ResetStoreWrapper>
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    </div>
                                    <div>
                                        <h3 className="text-md md:text-md font-semibold leading-6 text-gray-900">
                                            {tFooter('support')}
                                        </h3>
                                        <ul
                                            role="list"
                                            className="mt-3 space-y-3"
                                        >
                                            {navigation.about.map((item) => (
                                                <li key={item.name}>
                                                    <ResetStoreWrapper>
                                                        <Link
                                                            href={item.href}
                                                            className="mt-3 text-sm font-normal capitalize text-black/70 duration-300 hover:text-primary"
                                                            prefetch={false}
                                                        >
                                                            {item.name}
                                                        </Link>
                                                    </ResetStoreWrapper>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="my-10 flex items-center justify-between">
                                <div className="inline-block lg:hidden">
                                    <div className="flex w-1/2 gap-x-4 fill-current text-[#BFBFBF] md:w-auto">
                                        {navigation.social.map((item) => (
                                            <a
                                                className="group"
                                                target="_blank"
                                                key={item.name}
                                                href={item.href}
                                            >
                                                <span className="sr-only">
                                                    {item.name}
                                                </span>
                                                <item.icon
                                                    aria-hidden="true"
                                                    className="h-6 w-6 duration-100"
                                                />
                                            </a>
                                        ))}
                                    </div>
                                </div>
                                <div className="inline-block lg:hidden">
                                    <div className="flex items-center gap-x-1">
                                        <p className="text-base font-bold uppercase text-black">
                                            {tFooter('hotline')}
                                        </p>
                                    </div>
                                    <p className="text-[42px] font-bold leading-8 text-primary md:leading-10">
                                        <a
                                            href={`tel:${emptyCountryCode}${hotline}`}
                                        >
                                            {hotline}
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Footer image */}
                        <div
                            className={clsx({
                                'hidden lg:block xl:col-span-1': !isGrid,
                                'hidden xl:col-span-1': isGrid,
                            })}
                        >
                            <div className="relative mt-8 h-[179px] w-full rounded-[20px] bg-[#000] xl:mt-0">
                                <div className="space-y-6 p-6 text-white">
                                    <div className="space-y-2">
                                        <p className="font-semibold">
                                            {tFooter('download_our_app')}
                                        </p>
                                        <p className="text-sm">
                                            {tFooter('footer_description1')}
                                            <br />
                                            {tFooter('footer_description2')}
                                        </p>
                                    </div>

                                    {/* Application stores */}
                                    <div className="flex items-center gap-x-3">
                                        <a
                                            target="_blank"
                                            style={{ direction: 'ltr' }}
                                            href="https://apps.apple.com/us/app/estatebook-its-time/id6448032499"
                                            className="inline-flex h-[40px] w-[135px] items-center justify-center gap-x-1 rounded-[5px] bg-[#D9D9D933]/20 transition-colors hover:bg-primary"
                                        >
                                            {/* svg */}
                                            <AppleIcon />
                                            <div className="text-center">
                                                {/* <p className="text-[8px]">
                                                    {tFooter('download_on')}
                                                </p> */}
                                                <p className="-mt-[3px] text-sm font-medium">
                                                    {tFooter('apple_store')}
                                                </p>
                                            </div>
                                        </a>
                                        <a
                                            target="_blank"
                                            style={{ direction: 'ltr' }}
                                            href="https://play.google.com/store/apps/details?id=com.estatebook.app"
                                            className="inline-flex h-[40px] w-[135px] items-center justify-center gap-x-1 rounded-[5px] bg-[#D9D9D933]/20 transition-colors hover:bg-primary"
                                        >
                                            {/* svg */}
                                            <GooglePlayIcon />
                                            <div className="text-center">
                                                {/* <p className="text-[8px]">
                                                    {tFooter('download_on')}
                                                </p> */}
                                                <p className="-mt-[3px] text-sm font-medium">
                                                    {tFooter('play_store')}
                                                </p>
                                            </div>
                                        </a>
                                    </div>
                                </div>

                                <div className="absolute end-6 top-1/2 flex -translate-y-1/2 items-center justify-center">
                                    <div className="flex-shrink-0">
                                        <Image
                                            alt="Footer mobile"
                                            src={`/images/FooterMockup-${locale}.webp`}
                                            width={129}
                                            height={242}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="es-container">
                        <p className="w-full text-center text-xs font-normal text-[#000]">
                            {tFooter('all_copy_rights')} &copy;{' '}
                            {tFooter('reserved')} .{new Date().getFullYear()} .
                            <span className="font-medium text-black">
                                {tFooter('Estatebook')}
                            </span>
                        </p>
                    </div>
                </div>
            </footer>
        );
    }
);

Footer.displayName = 'Footer';

export default Footer;
