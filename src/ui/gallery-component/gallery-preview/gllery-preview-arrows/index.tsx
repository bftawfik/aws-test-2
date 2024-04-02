import { SwiperArrowProps } from '@/ui/swiper-arrow/swiper-arrow';
import { classes } from '@/helpers';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { useLocale } from 'next-intl';
import { AR_LOCALE, EN_LOCALE } from '@/constants';

const GalleryPreviewArrows = ({ prev, next }: SwiperArrowProps) => {
    // Read localization
    const locale = useLocale();

    const forwardArrowClasses = classes({
        '!-right-[10%] translate-x-1/2': locale === EN_LOCALE,
        '!-left-[10%] -translate-x-1/2': locale === AR_LOCALE,
    });

    const backwardArrowClasses = classes({
        '!-left-[10%] -translate-x-1/2': locale === EN_LOCALE,
        '!-right-[10%] translate-x-1/2': locale === AR_LOCALE,
    });

    return (
        <>
            <div
                className={`${forwardArrowClasses} ${next} customArrow  image-swiper-button-next test absolute  top-[40%] z-10 hidden -translate-y-1/2  cursor-pointer border-white bg-black md:flex md:items-center md:justify-center`}
            >
                {locale === EN_LOCALE ? (
                    <IoIosArrowForward />
                ) : (
                    <IoIosArrowBack />
                )}
            </div>

            <div
                className={`${backwardArrowClasses} ${prev} customArrow image-swiper-button-prev absolute  top-[40%] z-10 hidden -translate-y-1/2 cursor-pointer border border-white bg-black md:flex md:items-center md:justify-center`}
            >
                {locale === EN_LOCALE ? (
                    <IoIosArrowBack />
                ) : (
                    <IoIosArrowForward />
                )}
            </div>
        </>
    );
};

export default GalleryPreviewArrows;
