import React, { useState } from 'react';
import { FreeMode, Navigation, Thumbs } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
// import { FreeMode, Navigation, Thumbs } from 'swiper';
import GalleryPreviewArrows from '../gllery-preview-arrows';
import { useScreen } from 'usehooks-ts';
import { GalleryPreviewSwiperProps } from './gallery-preview-swiper';
import Image from 'next/image';

const GalleryPreviewSwiper = ({
    images,
    initial = 0,
    handleCounter,
}: GalleryPreviewSwiperProps) => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    const next = 'location-image-swiper-button-next';
    const prev = 'location-image-swiper-button-prev';

    const screen = useScreen();
    const slidesPerView = screen
        ? screen?.width <= 770
            ? Math.min(images.length, 3)
            : Math.min(images.length, 4)
        : 4;
    return (
        <div className="relative h-full w-full flex-col items-center gap-4">
            <div className="flex h-[80%]  flex-col items-center justify-center px-2">
                <GalleryPreviewArrows prev={prev} next={next} />
                <Swiper
                    spaceBetween={10}
                    thumbs={{ swiper: thumbsSwiper }}
                    slidesPerView={1}
                    initialSlide={initial}
                    onSlideChange={() => {
                        handleCounter;
                    }}
                    navigation={{
                        nextEl: `.${next}`,
                        prevEl: `.${prev}`,
                        disabledClass: 'swiper-button-disabled',
                    }}
                    updateOnWindowResize={true}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className="CustomSwiper w-full items-center"
                >
                    {images.map((image) => (
                        <SwiperSlide
                            className="relative h-full w-full overflow-hidden rounded-lg"
                            key={Math.random()}
                        >
                            <Image
                                style={{ objectFit: 'cover' }}
                                width={300}
                                height={300}
                                className="img h-full max-h-[680px] w-full object-cover"
                                alt={image}
                                src={image}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <div className="item flex h-[20%] w-full max-w-md justify-center overflow-hidden py-3  md:mx-auto md:w-[70%] lg:w-[55%]">
                <Swiper
                    spaceBetween={10}
                    slidesPerView={slidesPerView}
                    freeMode={true}
                    watchSlidesProgress={true}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className="secondarySlider"
                    onSwiper={(value: any) => setThumbsSwiper(value)}
                >
                    {images.map((image) => (
                        <SwiperSlide
                            className={`${
                                slidesPerView < 4 &&
                                'max-h-[88px] max-w-[114px]'
                            } h-full`}
                            key={Math.random()}
                        >
                            <Image
                                width={300}
                                height={300}
                                style={{ objectFit: 'cover' }}
                                className="h-full w-full object-cover"
                                alt={image}
                                src={image}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default GalleryPreviewSwiper;
