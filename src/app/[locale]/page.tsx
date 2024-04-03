import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { classNames } from '@/helpers';
import NeighborhoodLargeSlider from '@/ui/neighbothoods/NeighborhoodLargeSlider/neighborhood-large-slider';
import HomeSearch from '@/ui/search/home-search';
import ResaleUnitSlider from '@/ui/units/unit-slider/resale-units-slider';
import SaleUnitSlider from '@/ui/units/unit-slider/sale-units-slider';
import { Hydrate, dehydrate } from '@tanstack/react-query';
import getQueryClient from '@/helpers/get-query-client';
import { DiscoverIcon } from '@/ui/svg';
import CustomShowAllLink from '@/ui/custom-show-all-link';
import { getTranslations } from 'next-intl/server';
import {
    EN_LOCALE,
    DISCOVER_RESALE_UNITS_LINK,
    NEIGHBORHOODS_LINK,
    PROJECTS_LINK,
    UNITS_LINK,
} from '@/constants';
import type { Metadata } from 'next';
import ProjectsSliderV2 from '@/ui/projects/ProjectsSliderV2';
import { getUrlLocaleSegment } from '@/helpers/getUrlLocaleSegment';
// import { postFeatureFlag } from '@/actions/featureflags/postFeatureFlag';
// import { FeatureFlagNames } from '@/featureflags/FeatureFlagNames';

export async function generateMetadata({
    params,
}: {
    params: { locale: string };
}): Promise<Metadata> {
    const { locale } = params;
    const tMeta = await getTranslations('meta');

    return {
        title: tMeta('home_title'),
        description: tMeta('home_description'),
    };
}

export default async function Home({ params }: any) {
    const locale = params.locale;
    const tGlobal = await getTranslations('global');
    const urlLocaleSegment = getUrlLocaleSegment(locale);
    // get session on server
    // const session = await getServerSession(authOptions);

    // use query client
    const queryClient = getQueryClient();
    const dehydratedState = dehydrate(queryClient);
    // const response = await postFeatureFlag([
    //     FeatureFlagNames.TEST,
    //     FeatureFlagNames.TEST_2,
    // ]);
    // console.log(response);

    return (
        <>
            <section className="relative bg-gray-900 bg-opacity-5 py-10 md:pb-8 md:pt-16">
                <div className="es-container relative z-10 mx-auto">
                    <div className="flex flex-wrap gap-y-4">
                        <div className="w-full md:w-1/2">
                            <div className="text-center md:text-start">
                                <h1 className="mb-1 text-lg font-semibold text-black md:text-xl lg:text-2xl">
                                    {tGlobal('header_title')}{' '}
                                    <span className="font-bold text-primary">
                                        {tGlobal('move')}
                                    </span>
                                </h1>
                                <p className="text-text-gray mt-2 hidden text-base font-light leading-7 tracking-[0.0015em] lg:block">
                                    {tGlobal('header_description')}
                                </p>
                            </div>
                        </div>
                        {/*<MobileSearch />*/}
                        <Hydrate state={dehydratedState}>
                            <HomeSearch />
                        </Hydrate>
                    </div>
                </div>

                <div className="hidden md:absolute md:bottom-0 md:end-0 md:block md:w-1/2">
                    <Image
                        className="relative ms-auto"
                        src="/images/buildings.png"
                        alt="Building"
                        width={500}
                        height={309}
                        priority
                    />
                </div>

                <Link
                    href={`${urlLocaleSegment}/discover`}
                    className={classNames(
                        'absolute start-1/2 inline-flex translate-y-1/2  items-center justify-center gap-x-2 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-white transition-colors active:opacity-80 md:hidden',
                        locale === EN_LOCALE
                            ? '-translate-x-1/2'
                            : 'translate-x-1/2'
                    )}
                    prefetch={false}
                >
                    <DiscoverIcon />
                    {tGlobal('discover')}
                </Link>
            </section>

            {/* New Launches Section */}

            {/* <section className="mt-8 py-8">
                <div className="es-container">
                    <div className="my-8">
                        <SectionHeader title="New Launches" />
                    </div>
                    <Hydrate state={dehydratedState}>
                        <div className="flex items-center justify-between">
                            <NewLaunchSection />
                        </div>
                    </Hydrate>
                </div>
            </section> */}

            <section className="mt-8 py-8">
                <div className="es-container flex items-center justify-between">
                    <p className="text-lg font-semibold capitalize leading-none text-black lg:text-xl">
                        {tGlobal('trending_now')}
                    </p>
                    <CustomShowAllLink hrefUrl={NEIGHBORHOODS_LINK} />
                </div>
            </section>
            <Hydrate state={dehydratedState}>
                <section>
                    <div className="es-container w-full">
                        <NeighborhoodLargeSlider locale={locale} />
                    </div>
                </section>
            </Hydrate>
            {/* Projects slider */}
            <section className="py-8">
                <div className="es-container flex items-center justify-between">
                    <p className="text-lg font-semibold capitalize leading-none text-black lg:text-xl">
                        {tGlobal('recommended_projects')}
                    </p>
                    <CustomShowAllLink hrefUrl={PROJECTS_LINK} />
                </div>
            </section>

            <section>
                <div className="es-container w-full">
                    <ProjectsSliderV2 locale={locale} />
                </div>
            </section>
            {/*/!* Developer Units slider *!/*/}
            <section className="py-8">
                <div className="es-container flex items-center justify-between">
                    <p className="text-lg font-semibold capitalize leading-none text-black lg:text-xl">
                        {tGlobal('developer_units')}
                    </p>
                    <CustomShowAllLink hrefUrl={UNITS_LINK} />
                </div>
            </section>
            <Hydrate state={dehydratedState}>
                <section>
                    <div className="es-container w-full">
                        <SaleUnitSlider locale={locale} />
                    </div>
                </section>
            </Hydrate>
            {/*/!* Resale Units slider *!/*/}

            <Hydrate state={dehydratedState}>
                <section>
                    <div className="es-container w-full">
                        <ResaleUnitSlider locale={locale} />
                    </div>
                </section>
            </Hydrate>
        </>
    );
}
