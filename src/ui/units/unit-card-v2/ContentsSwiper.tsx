'use client';

import { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ImagePlaceholder } from '@/ui/image-placeholder';
import 'swiper/swiper-bundle.css';
import Image from 'next/image';

interface ContentsSwiperProps {
    images: string[];
}
const ContentsSwiper = ({ images }: ContentsSwiperProps) => {
    return images.length ? (
        <Swiper
            pagination={{ clickable: true }}
            navigation={true}
            loop={true}
            modules={[Pagination, Navigation]}
            className="mySwiper cardSwiper h-64 "
        >
            {images?.map((image: any, idx: number) => (
                <SwiperSlide itemType={'div'} key={image}>
                    <ImagePlaceholder
                        classes="h-full w-full rounded-t-xl object-cover object-center"
                        image={image ?? ''}
                    />
                </SwiperSlide>
            ))}
        </Swiper>
    ) : (
        <div className=" flex h-64 w-full  items-center justify-center rounded-lg bg-neutral-100">
            <Image
                style={{ objectFit: 'cover' }}
                alt="Estatebook logo"
                src={'/images/eb_logo.svg'}
                width={156}
                height={21}
                className="w-32"
            />
        </div>
    );
};

export default ContentsSwiper;
