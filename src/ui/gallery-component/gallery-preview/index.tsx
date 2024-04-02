'use client';
import React, { Fragment } from 'react';
import GalleryPreviewSwiper from './gallery-preview-swiper';
import { Transition } from '@headlessui/react';
import { GalleryPreviewProps } from './gallery-preview';
import ImageCounter from './imageCounter';
import { CloseIcon } from '@/ui/svg';
import { useTranslations, useLocale } from 'next-intl';
import { AR_LOCALE } from '@/constants';

const GalleryPreview = ({
    images,
    open,
    activeIndex,
    handleOpen,
    outerView,
    showAllPhotosDisplay = true,
}: GalleryPreviewProps) => {
    // Read localization
    const locale = useLocale();

    // const [current, setCurrent] = useState(1);

    // Read translations
    const tGlobal = useTranslations('global');

    const handleCounter = (data: any) => {
        // setCurrent(data.activeIndex + 1);
    };
    return (
        <>
            {outerView === 'gallery' && showAllPhotosDisplay && (
                <button
                    onClick={() => handleOpen(0)}
                    className={`absolute bottom-8 ${
                        locale === AR_LOCALE ? 'left-5' : 'right-5'
                    }  z-10 rounded-md bg-white p-1 px-3 text-xs font-light shadow-md md:bottom-5`}
                >
                    {tGlobal('show_all_photos')}
                </button>
            )}
            <Transition appear show={open} as={Fragment}>
                <div className="fixed inset-0 left-0 top-0 z-gallery h-screen max-h-screen w-screen overflow-hidden">
                    <Transition.Child
                        enter="transition ease-in-out duration-500 transform"
                        enterFrom="opacity-0 translate-y-full"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease duration-300 transform"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 -translate-y-full"
                    >
                        <div className="flex h-screen max-h-screen w-full flex-col items-center justify-start bg-[#000000] text-white">
                            {/* header */}
                            <div className="flex h-[10%] w-full items-center justify-between p-7">
                                <button
                                    onClick={() => handleOpen()}
                                    className="flex items-center gap-2 text-xs font-light"
                                >
                                    <CloseIcon />

                                    <span>{tGlobal('close')}</span>
                                </button>
                                {/* <ImageCounter
                                    length={images.length}
                                    current={current}
                                /> */}
                                {/* <div className="flex items-center gap-3  ">
                                    <button className="">
                                        <svg
                                            width="18"
                                            height="16"
                                            viewBox="0 0 18 16"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M6.99385 1.3635L6.995 1.36414C7.59664 1.69838 8.12982 2.18588 8.59184 2.8404L8.98085 3.39151L9.395 2.85903C9.94715 2.14913 10.5135 1.65108 11.0925 1.33759C11.674 1.02277 12.2923 0.864563 12.9587 0.864563C14.0694 0.864563 14.9774 1.23673 15.7167 1.97974L15.7176 1.98062C16.4607 2.72375 16.8337 3.63611 16.8337 4.7604C16.8337 5.33777 16.732 5.9119 16.5194 6.48135L16.5184 6.4841C16.311 7.04958 15.9396 7.70679 15.3868 8.44929L15.386 8.45033C14.833 9.19714 14.0869 10.0544 13.1388 11.0232C12.1894 11.9932 10.9803 13.1487 9.51337 14.4952C9.51299 14.4955 9.51261 14.4959 9.51223 14.4962L8.9995 14.9612L8.48369 14.4957C8.48327 14.4953 8.48285 14.4949 8.48242 14.4945C7.01646 13.1531 5.80731 11.9935 4.85766 11.0232C3.90953 10.0544 3.16352 9.19714 2.61048 8.45033C2.05745 7.70354 1.68607 7.04655 1.4786 6.48131C1.27183 5.90651 1.16699 5.335 1.16699 4.7604C1.16699 3.63537 1.54038 2.71961 2.28217 1.98149C3.02747 1.23988 3.93702 0.864563 5.04199 0.864563C5.75116 0.864563 6.40009 1.03158 6.99385 1.3635Z"
                                                stroke="white"
                                            />
                                        </svg>
                                    </button>
                                    <button className="">
                                        <svg
                                            width="16"
                                            height="18"
                                            viewBox="0 0 16 18"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M11.2854 14.6885L10.7913 14.6116L11.2854 14.6885C11.3016 14.5841 11.3246 14.4994 11.3511 14.4312L11.5062 14.0325L11.1362 13.8177L4.82373 10.151L4.46905 9.94498L4.19767 10.2525C4.03714 10.4345 3.83582 10.586 3.58639 10.705C3.34398 10.8207 3.10474 10.875 2.86426 10.875C2.33563 10.875 1.90249 10.6957 1.53552 10.3288L1.18594 10.6783L1.53552 10.3288C1.16855 9.96179 0.989258 9.52865 0.989258 9.00002C0.989258 8.47139 1.16855 8.03825 1.53552 7.67128C1.90249 7.30431 2.33563 7.12502 2.86426 7.12502C3.11645 7.12502 3.35496 7.17395 3.58396 7.27209C3.81414 7.37074 4.02552 7.51422 4.21904 7.70774L4.48968 7.97838L4.82158 7.78778L11.1341 4.16278L11.5185 3.94201L11.3454 3.5339C11.3212 3.47688 11.2997 3.4047 11.2843 3.31406L11.2843 3.31405C11.2677 3.21657 11.2601 3.12595 11.2601 3.04169C11.2601 2.51306 11.4394 2.07992 11.8064 1.71295C12.1733 1.34598 12.6065 1.16669 13.1351 1.16669C13.6637 1.16669 14.0969 1.34598 14.4638 1.71295C14.8308 2.07992 15.0101 2.51306 15.0101 3.04169C15.0101 3.57031 14.8308 4.00345 14.4638 4.37043C14.0969 4.7374 13.6637 4.91669 13.1351 4.91669C12.8653 4.91669 12.6113 4.87356 12.3702 4.78876C12.1549 4.71302 11.9745 4.59149 11.8225 4.41921L11.5566 4.11786L11.2051 4.31274L4.89264 7.81274L4.55692 7.99888L4.65002 8.37129C4.67265 8.46181 4.69398 8.57279 4.71303 8.70615C4.73191 8.83826 4.73926 8.93624 4.73926 9.00504C4.73926 9.07103 4.73243 9.14335 4.7171 9.22262L4.7171 9.22264C4.69804 9.32119 4.67571 9.42183 4.65002 9.52458L4.55788 9.89314L4.88826 10.0807L11.2008 13.664L11.5202 13.8454L11.7888 13.5947C11.952 13.4424 12.145 13.3172 12.3723 13.2206C12.5774 13.1335 12.8282 13.0834 13.1351 13.0834C13.6637 13.0834 14.0969 13.2626 14.4638 13.6296C14.8308 13.9966 15.0101 14.4297 15.0101 14.9584C15.0101 15.487 14.8308 15.9201 14.4638 16.2871C14.0969 16.6541 13.6637 16.8334 13.1351 16.8334C12.6069 16.8334 12.1739 16.6537 11.8069 16.2856C11.4397 15.9174 11.2601 15.4825 11.2601 14.9515C11.2601 14.8934 11.2669 14.8075 11.2854 14.6885Z"
                                                stroke="white"
                                            />
                                        </svg>
                                    </button>
                                </div> */}
                            </div>
                            {/* swiper */}
                            <div className="flex h-[80%] w-full max-w-screen-2xl flex-auto items-center justify-center px-4  md:w-2/3 lg:w-[80%]">
                                <GalleryPreviewSwiper
                                    initial={activeIndex}
                                    images={images}
                                    handleCounter={handleCounter}
                                />
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Transition>
        </>
    );
};

export default GalleryPreview;
