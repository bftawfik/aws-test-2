'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import GalleryPreview from './gallery-preview';
import ImageContainer from './galley-image-container';
import MobileGallery from './mobile-gallery';
import { useLocale } from 'next-intl';
import { AR_LOCALE } from '@/constants';
interface GalleryComponentProps {
    images: string[];
    outerView?: string | undefined;
}

const GalleryComponent = ({
    images,
    outerView = 'gallery',
}: GalleryComponentProps) => {
    // Read localization
    const locale = useLocale();

    const placholderImages = [
        '/images/imagePlaceholder.png',
        '/images/imagePlaceholder.png',
        '/images/imagePlaceholder.png',
    ];
    const imagesList = [...(images || []), ...placholderImages];
    const restImages = imagesList?.slice(1, 5);
    const [open, setOpen] = useState(false);
    const [activeIndex, setActive] = useState(0);
    const handleOpen = (index?: number) => {
        setOpen(!open);
        index && setActive(index);
    };

    return (
        <div className="relative my-2 overflow-hidden">
            <div className="lg:h-170  relative mx-auto  mt-3 hidden  h-[400px] w-full self-center md:block">
                {outerView === 'gallery' ? (
                    <div className="grid h-full w-full grid-cols-8 gap-2 ">
                        <ImageContainer
                            classes={` col-span-4 ${
                                locale === AR_LOCALE
                                    ? 'rounded-r-lg'
                                    : 'rounded-l-lg'
                            } group`}
                        >
                            <Image
                                onClick={() => handleOpen(0)}
                                style={{ objectFit: 'cover' }}
                                alt="neighborhood image object-cover"
                                fill={true}
                                className="h-full w-full cursor-pointer duration-150 group-hover:scale-110"
                                src={imagesList[0]}
                            />
                        </ImageContainer>
                        <div className="col-span-4 grid grid-cols-2 grid-rows-2 gap-2 ">
                            {restImages.map((img, index) => (
                                <ImageContainer
                                    key={Math.random()}
                                    classes={` ${
                                        index == 1 &&
                                        (locale === AR_LOCALE
                                            ? 'rounded-tl-xl'
                                            : 'rounded-tr-xl')
                                    } ${
                                        index == 3 &&
                                        (locale == AR_LOCALE
                                            ? 'rounded-bl-xl'
                                            : 'rounded-br-xl')
                                    } group`}
                                >
                                    <Image
                                        style={{ objectFit: 'cover' }}
                                        onClick={() => handleOpen(index + 1)}
                                        className="h-full w-full cursor-pointer object-cover duration-150 group-hover:scale-110"
                                        alt="neighborhood image"
                                        fill
                                        src={img}
                                    />
                                </ImageContainer>
                            ))}
                        </div>
                    </div>
                ) : (
                    <MobileGallery handleOpen={handleOpen} images={images} />
                )}
            </div>

            <div className="relative mt-2 h-[250px] w-full  md:hidden">
                {images ? (
                    <MobileGallery handleOpen={handleOpen} images={images} />
                ) : (
                    <Image
                        fill
                        alt="placeholder image"
                        className="h-full w-full overflow-hidden rounded-lg"
                        src={placholderImages[0]}
                    />
                )}
            </div>
            {images && (
                <GalleryPreview
                    outerView={outerView}
                    activeIndex={activeIndex}
                    open={open}
                    handleOpen={handleOpen}
                    images={images}
                />
            )}
        </div>
    );
};

export default GalleryComponent;
