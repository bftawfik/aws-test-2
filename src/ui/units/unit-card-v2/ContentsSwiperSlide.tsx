'use client';
import { Swiper, SwiperSlide } from 'swiper/react';

interface ContentsSwiperSlideProps {
    children: React.ReactNode;
}
const ContentsSwiperSlide = ({ children }: ContentsSwiperSlideProps) => {
    return <SwiperSlide itemType={'div'}>{children}</SwiperSlide>;
};

export default ContentsSwiperSlide;
