import { SwiperArrowProps } from '@/ui/swiper-arrow/swiper-arrow';
import { classes } from '@/helpers';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { AR_LOCALE, EN_LOCALE } from '@/constants';
import { useLocale } from 'next-intl';

const SwiperArrow = ({ prev, next }: SwiperArrowProps) => {
    const locale = useLocale();

    const forwardArrowClasses = classes({
        'right-0 translate-x-1/2': locale === EN_LOCALE,
        'left-0 -translate-x-1/2': locale === AR_LOCALE,
    });

    const backwardArrowClasses = classes({
        'left-0 -translate-x-1/2': locale === EN_LOCALE,
        'right-0 translate-x-1/2': locale === AR_LOCALE,
    });

    return (
        <>
            <div
                className={`${forwardArrowClasses} ${next}  image-swiper-button-next test absolute top-1/2 z-10 hidden -translate-y-1/2 cursor-pointer md:flex md:items-center md:justify-center`}
            >
                {locale === EN_LOCALE ? (
                    <IoIosArrowForward />
                ) : (
                    <IoIosArrowBack />
                )}
            </div>

            <div
                className={`${backwardArrowClasses} ${prev}    image-swiper-button-prev absolute -left-0 top-1/2 z-10 hidden -translate-y-1/2 cursor-pointer md:flex md:items-center md:justify-center`}
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

export default SwiperArrow;
