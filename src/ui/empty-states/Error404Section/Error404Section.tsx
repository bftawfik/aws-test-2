'use server';
import Error from '../../../../public/images/Error.jpg';
import Image404 from '../../../../public/images/Image404.png';
import Image from 'next/image';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { DEFAULT_LOCALE } from '@/constants';
import { getUrlLocaleSegment } from '@/helpers/getUrlLocaleSegment';
import { getTranslations } from 'next-intl/server';

export default async function Error404Section() {
    // Read localization
    const locale = useLocale();
    // Read translations
    const tNotFound = await getTranslations('notFound');
    const urlLocaleSegment = getUrlLocaleSegment(locale);

    return (
        <div>
            <div className="container mx-auto flex flex-col-reverse items-center justify-center gap-14 px-4 py-24 md:px-44 md:py-20 lg:flex-row lg:px-24 lg:py-24">
                <div className="relative w-full pb-12 lg:pb-0 xl:w-1/2 xl:pt-24">
                    <div className="relative">
                        <div className="absolute">
                            <div className="space-y-6">
                                <h1 className="my-2 text-2xl font-bold text-gray-800 lg:text-4xl">
                                    {tNotFound('not_found_title')}
                                </h1>
                                <p className="text-gray-800 lg:text-lg">
                                    {tNotFound('not_found_paragraph')}
                                </p>
                                <aside className="flex gap-4">
                                    <Link
                                        prefetch={false}
                                        href={`${
                                            locale === DEFAULT_LOCALE
                                                ? '/'
                                                : `/${locale}`
                                        }`}
                                        className="md my-2 block max-w-xs rounded-xl border bg-[#4CB087] px-8 py-3 text-center capitalize text-white hover:bg-[#4CB087] focus:outline-none focus:ring-2 focus:ring-[#4CB087] focus:ring-opacity-50 sm:w-full lg:w-auto"
                                    >
                                        {tNotFound('not_found_home_cta')}
                                    </Link>

                                    <Link
                                        prefetch={false}
                                        href={`${urlLocaleSegment}/discover`}
                                        className="md my-2 block max-w-xs rounded-xl border bg-[#4CB087] px-8 py-3 text-center capitalize text-white hover:bg-[#4CB087] focus:outline-none focus:ring-2 focus:ring-[#4CB087] focus:ring-opacity-50 sm:w-full lg:w-auto"
                                    >
                                        {tNotFound('not_found_discover_cta')}
                                    </Link>
                                </aside>
                            </div>
                        </div>
                        <div>
                            <Image
                                className="w-full lg:max-w-lg"
                                src={Image404}
                                alt="Error image"
                                width={300}
                                height={300}
                            />
                        </div>
                    </div>
                </div>
                <div>
                    <Image
                        src={Error}
                        className="w-full lg:max-w-lg"
                        alt="Error image"
                        width={300}
                        height={300}
                    />
                </div>
            </div>
        </div>
    );
}
