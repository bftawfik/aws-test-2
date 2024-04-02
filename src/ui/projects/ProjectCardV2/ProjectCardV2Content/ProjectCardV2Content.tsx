import { getLangkey } from '@/helpers';
import 'swiper/swiper-bundle.css';
import WishlistButton from '@/ui/wishlist-button';
import CompareButton from '@/ui/compare-button';
import getNumberFormat from '@/helpers/get-number-format';
import { LocationSolidIcon } from '@/ui/svg';
import { NextIntlGetTranslatorFunction, Project } from '@/types';
import Image from 'next/image';
import ProjectCardV2Swiper from '../ProjectCardV2Swiper/ProjectCardV2Swiper';
import SoldOut from '@/ui/SoldOut/SoldOut';

export interface ProjectCardV2ContentProps {
    project: Project;
    priority?: boolean;
    className?: string;
    locale: string;
    tGlobal: NextIntlGetTranslatorFunction;
    isDrawerContent?: boolean;
}
export const ProjectCardV2Content = ({
    project,
    priority,
    locale,
    tGlobal,
    isDrawerContent = false,
}: ProjectCardV2ContentProps) => {
    return (
        <>
            {project && (
                <div className="w-full rounded-xl border border-gray-100 bg-white shadow md:block">
                    <div className="group relative h-56 w-full cursor-pointer overflow-hidden rounded-t-xl">
                        <div>
                            <ProjectCardV2Swiper
                                images={project?.images}
                                projectName={project?.name}
                                priority={priority}
                            />
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

                        <div className="absolute bottom-6 z-10 flex w-full  items-center justify-between px-4">
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
                        <div
                            className={`col-span-3 flex items-center ${
                                isDrawerContent ? 'gap-x-4' : 'gap-x-3'
                            }`}
                        >
                            <div className="h-8 w-8 shrink-0 overflow-hidden rounded-full border border-gray-50 shadow-md 2xl:h-10 2xl:w-10">
                                <Image
                                    src={
                                        project?.logo ||
                                        'https://images.pexels.com/photos/14795562/pexels-photo-14795562.jpeg?auto=compress&cs=tinysrgb&w=600'
                                    }
                                    width={50}
                                    height={50}
                                    className="h-full w-full object-contain"
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
                            <p
                                className={`flex items-center gap-x-1  font-bold ${
                                    isDrawerContent ? 'text-base' : 'text-lg'
                                }`}
                            >
                                {getNumberFormat(project?.start_price)}

                                <span className="text-xs">
                                    {tGlobal('egp') || ''}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
