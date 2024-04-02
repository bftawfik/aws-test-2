'use client';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperArrow from '@/ui/swiper-arrow';

interface HomeProjectsSwiperProps {
    priority?: boolean;
    children: JSX.Element[];
}
export default function HomeProjectsSwiper({
    priority,
    children,
}: HomeProjectsSwiperProps) {
    // slider arrows classes
    const next = 'project-image-swiper-button-next';
    const prev = 'project-image-swiper-button-prev';

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
        <>
            <div className="relative">
                <SwiperArrow prev={prev} next={next} />
                <Swiper
                    slidesPerView={1}
                    spaceBetween={20}
                    pagination={{
                        clickable: true,
                        dynamicBullets: true,
                    }}
                    navigation={{
                        nextEl: `.${next}`,
                        prevEl: `.${prev}`,
                        disabledClass: 'swiper-button-disabled',
                    }}
                    modules={[Pagination, Navigation]}
                    updateOnWindowResize={true}
                    className="mySwiper"
                    breakpoints={breakPoints as any}
                >
                    {' '}
                    {children?.map((child: React.ReactNode, ndx) => (
                        <SwiperSlide itemType={'div'} key={ndx}>
                            <div className="md:block">{child}</div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </>
    );
}
