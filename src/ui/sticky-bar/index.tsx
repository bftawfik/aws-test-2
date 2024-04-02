'use client';
import { EN_LOCALE } from '@/constants';
import { StickyBarProps } from './sticky-bar';
import { Disclosure } from '@headlessui/react';
import { useLocale } from 'next-intl';

const classNames = (...classes: string[]) =>
    classes.filter((classes) => Boolean(classes)).join(' ');

const StickyBar = ({ children, scrollTop }: StickyBarProps) => {
    // Read localization
    const locale = useLocale();
    const isArabic = locale === EN_LOCALE;
    const languageText = isArabic ? 'English' : 'العربية';

    return (
        <>
            <div
                className={classNames(
                    scrollTop > 100
                        ? 'duration-600 sticky top-0 z-50 w-screen transition-all ease-out'
                        : 'hidden'
                )}
            >
                <Disclosure as="div" className="bg-gray-100 text-black">
                    <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
                        <div className="relative flex h-20 items-center justify-between">
                            <div className="flex items-center  lg:px-0">
                                {children}
                            </div>
                        </div>
                    </div>
                </Disclosure>
            </div>
        </>
    );
};

export default StickyBar;
