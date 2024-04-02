'use client';
import { ImagePlaceholder } from '../image-placeholder';
import { galleryImageProps } from './gallery-image';

const GalleryImage = ({ images }: galleryImageProps) => {
    return (
        <>
            {/** Desktop version */}
            <div className="mx-auto mt-10 hidden h-96 w-full grid-flow-col grid-rows-4 gap-4 md:grid md:max-w-2xl lg:max-w-7xl">
                <div className="col-span-4 row-span-4">
                    <ImagePlaceholder
                        classes="h-full w-full rounded-lg "
                        image={images[0]}
                    />
                </div>
                <div className="col-span-1">
                    <ImagePlaceholder
                        classes="h-full w-full rounded-lg"
                        image={images[0]}
                    />
                </div>
                <div className="col-span-1 row-span-3">
                    <ImagePlaceholder
                        classes="h-full w-full rounded-lg"
                        image={images[0]}
                    />
                </div>
                <div className="col-span-1 row-span-3 rounded">
                    <ImagePlaceholder
                        classes="h-full w-full rounded-lg object-cover"
                        image={images[0]}
                    />
                </div>
                <div className="col-span-1 rounded">
                    <ImagePlaceholder
                        classes="h-full w-full rounded-lg object-cover"
                        image={images[0]}
                    />
                </div>
            </div>

            {/** Mobile version*/}
            <div className="mx-auto mt-10 grid h-96 w-full max-w-md grid-flow-col grid-rows-3 gap-4 md:hidden">
                <div className="col-span-3 row-span-4">
                    <ImagePlaceholder
                        classes="h-full w-full rounded-lg "
                        image={images[0]}
                    />
                </div>
                <div className="col-span-1 row-span-2">
                    <ImagePlaceholder
                        classes="h-full w-full rounded-lg"
                        image={images[0]}
                    />
                </div>
                <div className="col-span-1 row-span-2 ">
                    <ImagePlaceholder
                        classes="h-full w-full rounded-lg"
                        image={images[0]}
                    />
                </div>
            </div>
        </>
    );
};

export default GalleryImage;
