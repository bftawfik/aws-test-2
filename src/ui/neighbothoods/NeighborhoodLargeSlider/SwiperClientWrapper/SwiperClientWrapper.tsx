'use client';
import React from 'react';
import { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

interface SwiperClientWrapperProps extends SwiperProps {
    children: JSX.Element[];
    prev?: string;
    next?: string;
    itemType?: string;
    deviceType?: string;
    className: string;
}

const SwiperClientWrapper = ({
    children,
    prev,
    next,
    itemType,
    className,
    deviceType = 'desktop',
}: SwiperClientWrapperProps) => {
    const breakPoints: object = {
        640: {
            slidesPerView: 1,
        },
        768: {
            slidesPerView: 2,
            spaceBetween: 20,
        },
        1024: {
            slidesPerView: 1,
            spaceBetween: 10,
            pagination: {
                enabled: false,
            },
        },
    };
    const divExtraClasses =
        deviceType === 'desktop'
            ? 'grid h-full auto-rows-fr grid-cols-1 gap-2 md:grid-cols-2 lg:grid-flow-col lg:grid-cols-4'
            : '';

    return (
        <Swiper
            slidesPerView={1}
            spaceBetween={20}
            navigation={{
                nextEl: `.${next}`,
                prevEl: `.${prev}`,
                disabledClass: 'swiper-button-disabled',
            }}
            modules={[Pagination, Navigation]}
            className={className}
            pagination={{
                clickable: true,
                dynamicBullets: true,
            }}
            updateOnWindowResize={true}
            breakpoints={breakPoints as any}
        >
            {children.map((child: any, index: any) => (
                <SwiperSlide itemType={itemType} key={index}>
                    <div className={divExtraClasses}>{child}</div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default SwiperClientWrapper;
