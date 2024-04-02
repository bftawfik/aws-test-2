'use client';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Navigation, Pagination } from 'swiper';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

import { ProjectSkeleton } from '@/ui/loaders/project-card-skeleton';

import SwiperArrow from '../../swiper-arrow';
import { ProjectCard } from '../project-card';
import { useQuery } from '@tanstack/react-query';
import getProjects from '@/actions/projects/getProjects';
import { Project } from '@/types';

import { useSession } from 'next-auth/react';
import { useLocale } from 'next-intl';

interface ProjectsSliderProps {
    priority?: boolean;
}
export default function ProjectsSlider({ priority }: ProjectsSliderProps) {
    // Read localization
    const locale = useLocale();

    // fetch data
    const { data: session, status } = useSession();

    let { data, isFetching } = useQuery<{
        data: Project[];
        isFetching: boolean;
    }>({
        queryKey: ['projects'],
        queryFn: () => getProjects(session?.auth?.meta?.token, locale),
        enabled: status !== 'loading',
    });

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

    if (isFetching) {
        return (
            <>
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                    {Array.from(Array(3), (e, i) => {
                        return <ProjectSkeleton key={'project-card' + i} />;
                    })}
                </div>
            </>
        );
    }
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
                    {data?.data?.map((project: any) => (
                        <SwiperSlide itemType={'div'} key={project.id}>
                            <div className="md:block">
                                <ProjectCard
                                    project={project}
                                    priority={priority}
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </>
    );
}
