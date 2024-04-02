import React from 'react';
// import required modules
import SwiperArrow from '@/ui/swiper-arrow';
import { Location } from '@/types';
import getNeighborhoods from '@/actions/neighborhoods/getNeighborhoods';
import SwiperClientWrapper from './SwiperClientWrapper/SwiperClientWrapper';
// import { getServerSession } from 'next-auth';
import SlidesHolder from './SlidesHolder/SlidesHolder';
import NeighborhoodCard from '../Card';
import { getTranslator } from 'next-intl/server';
export default async function NeighborhoodLargeSlider({
    locale,
}: {
    locale: string;
}) {
    // Read localization
    const tGlobal = await getTranslator(locale, 'global');

    // TODO: hide server session until solve forge problem
    // const session = await getServerSession();
    let data = await getNeighborhoods(
        // session?.auth?.meta?.token
        undefined,
        locale
    );

    function chunkLocationsList(array: Location[], size: number) {
        let result = [];
        for (let i = 0; i < array?.length; i += size) {
            result.push(array.slice(i, i + size));
        }
        return result;
    }
    const newLocations = chunkLocationsList(data?.data as Location[], 6);

    // const isLargeScreen = useMediaQuery("(min-width: 1024px)");
    // slider arrows classes
    const next = 'location-image-swiper-button-next';
    const prev = 'location-image-swiper-button-prev';
    return (
        <>
            {/* Desktop view */}
            <div className="relative hidden w-full select-none lg:block">
                <SwiperArrow prev={prev} next={next} />
                <SwiperClientWrapper
                    deviceType="desktop"
                    next={next}
                    prev={prev}
                    className="mySwipe h-56 w-full md:h-[750px] lg:h-[450px]"
                >
                    {newLocations.map((newArray, index) => (
                        <SlidesHolder key={index} data={newArray} />
                    ))}
                </SwiperClientWrapper>
            </div>

            {/* Mobile view */}
            <div className="relative block w-full select-none lg:hidden">
                <SwiperClientWrapper
                    itemType={'div'}
                    slidesPerView={1}
                    className="mySwipe"
                    deviceType="mobile"
                >
                    {data?.data?.map((location: Location) => (
                        <div key={location.id}>
                            <NeighborhoodCard
                                locale={locale}
                                className="h-64"
                                location={location}
                                tGlobal={tGlobal}
                            />
                        </div>
                    ))}
                </SwiperClientWrapper>
            </div>
        </>
    );
}
