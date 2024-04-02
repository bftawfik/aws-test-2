'use client';

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Navigation, Pagination } from 'swiper';
import { useState } from 'react';
import { Name } from '@/types';
interface ProjectCardV2SwiperProps {
    images?: string[];
    priority?: boolean;
    projectName?: Name;
}
const ProjectCardV2Swiper = ({
    images,
    projectName,
    priority,
}: ProjectCardV2SwiperProps) => {
    const [error, setError] = useState(false);

    const handleError = () => {
        setError(true);
    };
    return (
        <Swiper
            pagination={{ clickable: true }}
            navigation={true}
            loop={true}
            modules={[Pagination, Navigation]}
            className="mySwiper cardSwiper h-56"
        >
            {images?.map((image: any, idx: number) => (
                <SwiperSlide itemType={'div'} key={idx}>
                    {!error ? (
                        <Image
                            priority={priority}
                            src={image}
                            width={300}
                            height={300}
                            onError={handleError}
                            className="rounded-top-xl h-full w-full rounded-t-xl object-cover object-center"
                            alt={projectName + ' Project'}
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center bg-neutral-100">
                            <Image
                                alt="Estatebook logo"
                                src={'/images/eb_logo.svg'}
                                width={156}
                                height={21}
                                className="w-32"
                                priority={priority}
                            />
                        </div>
                    )}
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default ProjectCardV2Swiper;
