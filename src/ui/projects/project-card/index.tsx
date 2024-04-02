'use client';
import Image from 'next/image';
import { ProjectCardProps } from './project-card';
import { getLangkey } from '@/helpers';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/swiper-bundle.css';
import { Navigation, Pagination } from 'swiper';
import { useState } from 'react';
import WishlistButton from '@/ui/wishlist-button';
import CompareButton from '@/ui/compare-button';
import Link from 'next/link';
import getNumberFormat from '@/helpers/get-number-format';
import { LocationSolidIcon } from '@/ui/svg';
import { useTranslations, useLocale } from 'next-intl';
import Drawer from '@/ui/drawer';
import { Project } from '@/types';
import { MultiArrowsIcon } from '@/ui/svg/MultiArrowsIcon';
import ProjectContent from '@/ui/discover/drawers-content/ProjectContent';
import { getUrlLocaleSegment } from '@/helpers/getUrlLocaleSegment';
import SoldOut from '@/ui/SoldOut/SoldOut';

export const ProjectCard = ({
    project,
    priority,
    shouldPreventRouting = false,
}: ProjectCardProps) => {
    // Read localization
    const locale = useLocale();

    // Read translations
    const tGlobal = useTranslations('global');
    const urlLocaleSegment = getUrlLocaleSegment(locale);

    const [error, setError] = useState(false);

    const handleError = () => {
        setError(true);
    };

    // open drawer
    const [openProjectDrawer, setOpenProjectDrawer] = useState(false);
    const handleRouting = (e: React.MouseEvent<HTMLElement>) => {
        const clickedNext = (e.target as HTMLElement).classList.contains(
            'swiper-button-next'
        );
        const clickedPrev = (e.target as HTMLElement).classList.contains(
            'swiper-button-prev'
        );
        if (shouldPreventRouting && !clickedNext && !clickedPrev) {
            e.preventDefault();
            setOpenProjectDrawer(true);
        }
    };
    return (
        <>
            <Link
                onClick={handleRouting}
                href={`${urlLocaleSegment}/projects/${project.slug}`}
                prefetch={false}
            >
                <div className="w-full rounded-xl border border-gray-100 bg-white shadow md:block">
                    <div className="group relative h-56 w-full cursor-pointer overflow-hidden rounded-t-xl">
                        <div>
                            <Swiper
                                pagination={{ clickable: true }}
                                navigation={true}
                                loop={true}
                                modules={[Pagination, Navigation]}
                                className="mySwiper cardSwiper h-56"
                            >
                                {project?.images?.map(
                                    (image: any, idx: number) => (
                                        <SwiperSlide itemType={'div'} key={idx}>
                                            {!error ? (
                                                <Image
                                                    priority={priority}
                                                    src={image}
                                                    width={300}
                                                    height={300}
                                                    onError={handleError}
                                                    className="rounded-top-xl h-full w-full rounded-t-xl object-cover object-center"
                                                    alt={
                                                        project?.name +
                                                        ' Project'
                                                    }
                                                />
                                            ) : (
                                                <div className="flex h-full w-full items-center justify-center bg-neutral-100">
                                                    <Image
                                                        alt="Estatebook logo"
                                                        src={
                                                            '/images/eb_logo.svg'
                                                        }
                                                        width={156}
                                                        height={21}
                                                        className="w-32"
                                                        priority={priority}
                                                    />
                                                </div>
                                            )}
                                        </SwiperSlide>
                                    )
                                )}
                            </Swiper>
                        </div>

                        <div className="absolute top-0 z-10 flex w-full items-center justify-between p-4">
                            {project.developer ? (
                                <div className="h-10 w-10 overflow-hidden rounded-full bg-white text-xs font-medium">
                                    <Image
                                        src={
                                            project?.developer?.logo
                                            // ||'https://images.pexels.com/photos/14795562/pexels-photo-14795562.jpeg?auto=compress&cs=tinysrgb&w=600'
                                        }
                                        width={300}
                                        height={300}
                                        className="h-full w-full object-cover object-center"
                                        alt={project?.name.en + ' logo'}
                                    />
                                </div>
                            ) : (
                                <div></div>
                            )}
                            <div className="flex items-center gap-x-2 rounded-full text-xs font-medium">
                                <CompareButton item={project} type="projects" />
                                <WishlistButton item={project} type="project" />
                            </div>
                        </div>

                        <div className="absolute bottom-4 z-10 flex w-full items-center justify-between px-4">
                            <div>
                                {project?.address ? (
                                    <div className="flex max-w-[80%] items-center gap-x-2 rounded-lg bg-black/70 px-2 py-1 text-xs text-white">
                                        <LocationSolidIcon />
                                        <p className="line-clamp-1">
                                            {getLangkey(
                                                project?.address || '',
                                                locale
                                            )}
                                        </p>
                                    </div>
                                ) : null}
                            </div>

                            {project?.sold_out ? (
                                <SoldOut type="project" />
                            ) : null}
                        </div>
                    </div>
                    <div className="flex items-center justify-between p-4">
                        <div className="col-span-3 flex items-center gap-x-3">
                            <div className="h-10 w-10 overflow-hidden rounded-full border border-gray-50 shadow-md">
                                <Image
                                    src={
                                        project?.logo ||
                                        'https://images.pexels.com/photos/14795562/pexels-photo-14795562.jpeg?auto=compress&cs=tinysrgb&w=600'
                                    }
                                    width={300}
                                    height={300}
                                    className="h-full w-full"
                                    alt={project?.name.en + ' logo'}
                                />
                            </div>
                            <p className="break-words text-sm font-medium">
                                {getLangkey(project?.name || '', locale)}
                            </p>
                        </div>

                        <div className="col-span-2 capitalize">
                            <p className="text-xs">
                                {tGlobal('starting_from') || ''}
                            </p>
                            <h2 className="flex items-center gap-x-1 text-lg font-bold ">
                                {getNumberFormat(project?.start_price)}

                                <span className="text-xs">
                                    {tGlobal('egp') || ''}
                                </span>
                            </h2>
                        </div>
                    </div>
                </div>
            </Link>
            <Drawer
                isOpen={openProjectDrawer}
                closeModalHandler={() => setOpenProjectDrawer(false)}
                headerElemnt={
                    <Link
                        prefetch={false}
                        href={`${urlLocaleSegment}/projects/${project?.slug}`}
                        target="_blank"
                        className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#B3B3B3] px-3 py-2 text-xs capitalize text-[#5F5F5F] transition-colors duration-150 hover:bg-gray-200"
                    >
                        <MultiArrowsIcon className="h-4 w-4 text-custom-grey" />
                        {tGlobal('view_details')}
                    </Link>
                }
            >
                <ProjectContent project={project} />
            </Drawer>
        </>
    );
};
