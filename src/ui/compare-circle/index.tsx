import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CompareSlide from './compare-slide';
import { MdCompare } from 'react-icons/md';
import { Transition } from '@headlessui/react';
import { useCompareStore } from '@/store/global';
import CompareCounter from './compare-counter';
import Link from 'next/link';
import { getUrlLocaleSegment } from '@/helpers/getUrlLocaleSegment';
import { useLocale } from 'next-intl';
import { getFromLocalStorage, setOnLocalStorage } from '@/helpers';

const CompatreCycle = () => {
    // Read localization
    const locale = useLocale();
    const [isToggled, setToggle] = useState(false);
    const { compare_items, compare_type, setCompareItems } = useCompareStore();
    const [compareChanged, setCompareChanged] = useState(false);

    const [load, setLoad] = useState(false);
    const urlLocaleSegment = getUrlLocaleSegment(locale);

    useEffect(() => {
        setLoad(true);
        setTimeout(() => {
            setLoad(false);
        }, 1000);
    }, [compare_items.length]);

    useEffect(() => {
        const stored_compare_items = getFromLocalStorage('compare_items')
            ? getFromLocalStorage('compare_items')
            : setOnLocalStorage('compare_items', []);
        setCompareItems(stored_compare_items);
    }, []);

    useEffect(() => {
        if (!compare_items.length) {
            setToggle(false);
        }
    }, [compare_items]);

    const navContainer = {
        visible: {
            opacity: 1,
            transition: {
                x: { velocity: 100 },
                duration: 0.3,
            },
        },
        hidden: {
            opacity: 0,
            transition: {
                x: { velocity: 100 },
                duration: 0.3,
            },
        },
    };

    const compareListLength = () => {
        if (compare_items?.length && isToggled) {
            return true;
        } else {
            return false;
        }
    };

    return (
        <>
            <div className="fixed bottom-20 start-8 z-40 flex h-[60px] md:bottom-8">
                {compare_items.length ? (
                    <Transition
                        appear={true}
                        show={true}
                        enter="transition ease duration-500 transform"
                        enterFrom="opacity-0 ltr:-translate-x-12 rtl:translate-x-12"
                        enterTo="opacity-100 translate-x-0"
                        leave="transition ease duration-300 transform"
                        leaveFrom="opacity-100 translate-x-0"
                        leaveTo="opacity-0 ltr:-translate-x-12 rtl:translate-x-12"
                    >
                        <button
                            className={`hidden h-full w-[60px] cursor-pointer items-center justify-center bg-primary outline-none md:flex ${
                                !isToggled
                                    ? 'rounded-full'
                                    : 'ltr:rounded-l-full rtl:rounded-r-full'
                            } ${load ? 'shake' : ''}`}
                            onClick={() => setToggle(!isToggled)}
                        >
                            <MdCompare className="h-5 w-5 text-white" />
                            <CompareCounter />
                        </button>
                        <Link
                            href={`${urlLocaleSegment}/compare`}
                            className={`flex h-full w-[60px] cursor-pointer items-center justify-center rounded-full bg-primary outline-none md:hidden ${
                                load ? 'shake' : ''
                            }`}
                            prefetch={false}
                        >
                            <MdCompare className="h-5 w-5 text-white" />
                            <CompareCounter />
                        </Link>
                    </Transition>
                ) : (
                    ''
                )}
                {compareListLength() ? (
                    <AnimatePresence>
                        <Transition
                            appear={compareListLength()}
                            show={compareListLength()}
                            enter="transform transition ease-in-out duration-150 sm:duration-150"
                            enterFrom="ltr:-translate-x-full rtl:translate-x-full"
                            enterTo="translate-x-0"
                            leave="transform transition ease-in-out duration-150 sm:duration-150"
                            leaveFrom="translate-x-0"
                            leaveTo="ltr:-translate-x-full rtl:translate-x-full"
                        >
                            <motion.div
                                className="relative inset-y-0 hidden h-full  w-auto items-center justify-center gap-4 bg-white px-4 text-primary shadow-md transition-all duration-300 ltr:rounded-r-full rtl:rounded-l-full md:flex"
                                initial="hidden"
                                animate={
                                    compareListLength() ? 'visible' : 'hidden'
                                }
                                exit="hidden"
                                variants={navContainer}
                            >
                                <CompareSlide />
                                {isToggled}
                            </motion.div>
                        </Transition>
                    </AnimatePresence>
                ) : (
                    ''
                )}
            </div>
        </>
    );
};

export default CompatreCycle;
