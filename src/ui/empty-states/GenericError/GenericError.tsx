'use server';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { DEFAULT_LOCALE } from '@/constants';
import { getUrlLocaleSegment } from '@/helpers/getUrlLocaleSegment';
import { GenericErrorIcon } from '@/ui/svg';
import { getTranslations } from 'next-intl/server';

export default async function GenericError() {
    // Read localization
    const locale = useLocale();
    // Read translations
    const tErrorPages = await getTranslations('error_pages');

    const urlLocaleSegment = getUrlLocaleSegment(locale);

    return (
        <div className="container mx-auto flex flex-col items-center justify-center gap-14 px-4 pb-0 pt-24 lg:px-24 lg:pt-24">
            <div className="flex w-full max-w-full justify-center">
                <GenericErrorIcon />
            </div>
            <div className="flex flex-col items-center justify-center gap-4">
                <h2 className="text-center text-lg font-medium tracking-tight text-black">
                    {tErrorPages('error_pages_error_title')}
                </h2>
                <p className="whitespace-pre-line text-center text-base font-normal leading-7 tracking-tight text-black text-opacity-70">
                    {tErrorPages('error_pages_error_paragraph')}
                </p>
            </div>
            <div className="flex gap-4 ">
                <Link
                    prefetch={false}
                    href={`${locale === DEFAULT_LOCALE ? '/' : `/${locale}`}`}
                    className="h-12 rounded-lg bg-primary px-8 py-3 text-center capitalize text-white"
                >
                    {tErrorPages('error_pages_home_cta')}
                </Link>

                <Link
                    prefetch={false}
                    href={`${urlLocaleSegment}/discover`}
                    className="h-12 rounded-lg bg-primary px-8 py-3 text-center capitalize text-white"
                >
                    {tErrorPages('error_pages_discover_cta')}
                </Link>
            </div>
        </div>
    );
}
