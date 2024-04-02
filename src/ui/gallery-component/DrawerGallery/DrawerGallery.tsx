'use client';
import React, { useState } from 'react';
import ImageContainer from '../galley-image-container';
import Image from 'next/image';
import GalleryPreview from '../gallery-preview';
import { AR_LOCALE } from '@/constants';

const firstImgIndex = 0;
const secondImgIndex = 1;
const thirdImgIndex = 2;

const DrawerGallery = ({
    images,
    locale,
}: {
    images: string[];
    locale: string;
}) => {
    const [open, setOpen] = useState(false);
    const [activeIndex, setActive] = useState(0);
    const handleOpen = (index?: number) => {
        setOpen(!open);
        if (index !== undefined) {
            setActive(index);
        }
    };

    return (
        <>
            <div className="lg:h-170 relative mx-auto mt-3 hidden h-[400px] w-full grid-cols-2 gap-4 self-center md:grid">
                <ImageContainer
                    classes={`${
                        locale === AR_LOCALE ? 'rounded-r-lg' : 'rounded-l-lg'
                    } group`}
                >
                    <Image
                        priority
                        onClick={() => handleOpen(firstImgIndex)}
                        style={{ objectFit: 'cover' }}
                        alt="image object-cover"
                        fill={true}
                        className="h-full w-full cursor-pointer duration-150 group-hover:scale-110"
                        src={
                            images ? images[0] : '/images/imagePlaceholder.png'
                        }
                    />
                </ImageContainer>
                <div className="grid h-full grid-cols-1 grid-rows-2 gap-2">
                    <ImageContainer
                        classes={`${
                            locale === AR_LOCALE
                                ? 'rounded-l-lg'
                                : 'rounded-r-lg'
                        } group`}
                    >
                        <Image
                            priority
                            onClick={() => handleOpen(secondImgIndex)}
                            style={{ objectFit: 'cover' }}
                            alt="image object-cover"
                            fill={true}
                            className="h-full w-full cursor-pointer duration-150 group-hover:scale-110"
                            src={
                                images
                                    ? images[1]
                                    : '/images/imagePlaceholder.png'
                            }
                        />
                    </ImageContainer>
                    <ImageContainer
                        classes={`${
                            locale === AR_LOCALE
                                ? 'rounded-l-lg'
                                : 'rounded-r-lg'
                        } group`}
                    >
                        <Image
                            priority
                            onClick={() => handleOpen(thirdImgIndex)}
                            style={{ objectFit: 'cover' }}
                            alt="image object-cover"
                            fill={true}
                            className="h-full w-full cursor-pointer duration-150 group-hover:scale-110"
                            src={
                                images
                                    ? images[2]
                                    : '/images/imagePlaceholder.png'
                            }
                        />
                    </ImageContainer>
                </div>
            </div>
            <div className="relative mx-auto mt-3 h-[400px] w-full lg:hidden">
                <ImageContainer classes={`group h-full wi-full rounded-lg`}>
                    <Image
                        priority
                        onClick={() => handleOpen(firstImgIndex)}
                        style={{ objectFit: 'cover' }}
                        alt="image object-cover"
                        fill={true}
                        className="h-full w-full cursor-pointer duration-150 group-hover:scale-110"
                        src={
                            images ? images[0] : '/images/imagePlaceholder.png'
                        }
                    />
                </ImageContainer>
            </div>
            {images && (
                <GalleryPreview
                    outerView={'gallery'}
                    activeIndex={activeIndex}
                    open={open}
                    handleOpen={handleOpen}
                    images={images}
                    showAllPhotosDisplay={false}
                />
            )}
        </>
    );
};

export default DrawerGallery;
