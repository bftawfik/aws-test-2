'use client';
import React from 'react';
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';
import 'swiper/swiper-bundle.css';

interface MainClientSwiperWrapperProps extends SwiperProps {
    children: JSX.Element[];
    className?: string;
    next?: string;
    prev?: string;
}
const MainClientSwiperWrapper = ({
    children,
    className,
    next,
    prev,
}: MainClientSwiperWrapperProps) => {
    const breakPoints: object = {
        640: {
            slidesPerView: 1,
        },
        768: {
            slidesPerView: 2,
            spaceBetween: 20,
        },
        1024: {
            slidesPerView: 3,
            spaceBetween: 20,
            pagination: {
                enabled: false,
            },
        },
    };
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
                <SwiperSlide itemType="div" key={index}>
                    <div className="md:block">{child}</div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default MainClientSwiperWrapper;
