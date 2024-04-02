'use client';
import Image from 'next/image';
import { ImageSliderProps } from './image-gallary';
import { ImagePlaceholder } from '../image-placeholder';

export const ImageGallary = ({ images }: ImageSliderProps) => {
    return (
        <>
            {/* <section className="grid w-full grid-cols-4 gap-2 mt-0 gap-x-4 lg:mt-4">
        <div className="col-span-4 md:col-span-3 lg:col-span-2">
          <a
            href="#"
            className="lg:h-170 group relative mt-4 block h-[390px] w-full overflow-hidden rounded-lg"
          >
            <img
              src="http://via.placeholder.com/1050x1050"
              className="object-cover w-full h-full duration-300 group-hover:scale-110"
              alt="Estate Book"
            />
          </a>
        </div>
        <div className="hidden col-span-1 lg:block">
          <a
            href="#"
            className="group relative mt-4 block h-[260px] w-full overflow-hidden rounded-lg"
          >
            <img
              src="http://via.placeholder.com/1050x1050"
              className="object-cover w-full h-full duration-300 group-hover:scale-110"
              alt="Estate Book"
            />
          </a>
          <a
            href="#"
            className="group relative mt-4 block h-[348px] w-full overflow-hidden rounded-lg"
          >
            <img
              src="http://via.placeholder.com/1050x1050"
              className="object-cover w-full h-full duration-300 group-hover:scale-110"
              alt="Estate Book"
            />
          </a>
        </div>
        <div className="hidden col-span-1 md:block lg:col-span-1">
          <a
            href="#"
            className="group relative mt-4 block h-[214px] w-full overflow-hidden rounded-lg lg:h-[348px]"
          >
            <img
              src="http://via.placeholder.com/1050x1050"
              className="object-cover w-full h-full duration-300 group-hover:scale-110"
              alt="Estate Book"
            />
          </a>
          <a
            href="#"
            className="group relative mt-4 block h-[160px] w-full overflow-hidden rounded-lg lg:h-[260px]"
          >
            <img
              src="http://via.placeholder.com/1050x1050"
              className="object-cover w-full h-full duration-300 group-hover:scale-110"
              alt="Estate Book"
            />
            <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full text-2xl font-semibold text-white bg-bg-overlay lg:text-4xl">
              +4
            </div>
          </a>
        </div>
      </section> */}

            <div className="lg:h-170 relative mt-4 grid h-[500px] w-full grid-flow-col  grid-rows-5 gap-4 overflow-hidden">
                <div className="row-span-5 ">
                    <ImagePlaceholder
                        classes="h-full w-full rounded-lg object-cover duration-300 group-hover:scale-110"
                        image={images[0]}
                    />
                </div>
                {images.slice(1).map((image: string, idx: number) => (
                    <div
                        key={'project' + idx}
                        className={
                            idx % 3 === 0
                                ? 'col-span-2 row-span-2'
                                : ' col-span-2 row-span-3'
                        }
                    >
                        <ImagePlaceholder
                            classes="h-full w-full rounded-lg object-cover duration-300 group-hover:scale-110"
                            image={image}
                        />
                    </div>
                ))}
            </div>
        </>
    );
};
