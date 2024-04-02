import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
// import { Pagination } from 'swiper/modules';
import 'swiper/css/thumbs';
import { Navigation, Pagination } from 'swiper';
import Image from 'next/image';
import { MobileGalleryProps } from './mobile-gallery';

const MobileGallery = ({ images, handleOpen }: MobileGalleryProps) => {
    return (
        <div className="h-full w-full">
            <Swiper
                spaceBetween={5}
                updateOnWindowResize={true}
                modules={[Pagination]}
                className="mobileSwiper h-full w-full"
                pagination={true}
                slidesPerView={1}
            >
                {images.map((img, index) => (
                    <SwiperSlide key={Math.random()}>
                        <Image
                            width={300}
                            height={300}
                            onClick={() => handleOpen(index)}
                            className="h-full w-full cursor-pointer overflow-hidden rounded-lg object-cover"
                            alt="placeholder"
                            src={img}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default MobileGallery;
