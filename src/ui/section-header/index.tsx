'use client';
import { SectionHeaderProps } from '@/ui/section-header/section-header';
import {
    HiOutlineArrowNarrowLeft,
    HiOutlineArrowNarrowRight,
} from 'react-icons/hi';
import { useLocale } from 'next-intl';
import { EN_LOCALE } from '@/constants';

const SectionHeader = (props: SectionHeaderProps) => {
    // Read localization
    const locale = useLocale();

    return (
        <div className="flex items-center justify-between" {...props}>
            <h3 className="text-lg font-semibold capitalize leading-none text-black lg:text-xl">
                {props.title}
            </h3>

            {props.url && (
                <a
                    href={`/${props.url}`}
                    className="text-medium-gray inline-flex items-center gap-x-2 text-sm font-light"
                >
                    <span className="capitalize">Show All</span>
                    {locale === EN_LOCALE ? (
                        <HiOutlineArrowNarrowRight className="text-medium-gray h-5 w-5 fill-current" />
                    ) : (
                        <HiOutlineArrowNarrowLeft className="text-medium-gray h-5 w-5 fill-current" />
                    )}
                </a>
            )}
        </div>
    );
};

export default SectionHeader;
