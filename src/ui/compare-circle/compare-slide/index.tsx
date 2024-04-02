import React from 'react';
import { motion } from 'framer-motion';
import { useCompareStore } from '@/store/global';
import { getLangkey, setOnLocalStorage } from '@/helpers';
import { HiTrash } from 'react-icons/hi';
import Link from 'next/link';
import { Project, Unit } from '@/types';
import { useTranslations, useLocale } from 'next-intl';
import { getUrlLocaleSegment } from '@/helpers/getUrlLocaleSegment';

const CompareSlide = ({}) => {
    // Read localization
    const locale = useLocale();

    // Read translations
    const tCompare = useTranslations('compare');
    const urlLocaleSegment = getUrlLocaleSegment(locale);

    const { compare_items, setCompareItems, setCompareType } =
        useCompareStore();

    const compareListTransition = {
        visible: {
            opacity: 1,
            transition: {
                delayChildren: 0.2,
                staggerChildren: 0.07,
            },
        },
        hidden: {
            opacity: 0,
            transition: {
                staggerChildren: 0.05,
                staggerDirection: -1,
            },
        },
    };

    const compareItemTransition = {
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                y: { stiffness: 200, velocity: -100 },
            },
        },
        hidden: {
            y: 50,
            opacity: 0,
            transition: {
                y: { stiffness: 200, velocity: -100 },
            },
        },
    };

    // remove item
    const removeItem = (id: number) => {
        const compare_items_after_remove = compare_items.filter(function (el) {
            return el.id !== id;
        });
        if (!compare_items_after_remove.length) {
            setCompareType('');
            setOnLocalStorage('compare_type', '', 'string');
        }
        setCompareItems(compare_items_after_remove);
        setOnLocalStorage('compare_items', compare_items_after_remove);
    };

    // reset
    const resetCompareItems = () => {
        setCompareItems([]);
        setOnLocalStorage('compare_items', []);
        setCompareType('');
        setOnLocalStorage('compare_type', '', 'string');
    };

    return (
        <>
            {/*  */}

            <motion.ul
                className="flex gap-4"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={compareListTransition}
            >
                <div className="flex max-w-[80px] gap-4 overflow-x-auto overflow-y-hidden sm:max-w-xs md:max-w-md lg:max-w-5xl">
                    {compare_items.map((item) => (
                        <motion.li
                            className="flex items-center justify-between gap-4 rounded-[10px] bg-primary/10 px-2 py-1 text-xs capitalize text-primary"
                            variants={compareItemTransition}
                            key={item.id}
                        >
                            <p className="truncate">
                                {getLangkey(
                                    (item as Unit).title ||
                                        (item as Project).name,
                                    locale
                                )}
                            </p>
                            <button
                                onClick={() => removeItem(item.id)}
                                className="flex h-5 w-5 shrink-0 cursor-pointer items-center justify-center rounded-full bg-red-400 text-white"
                            >
                                <HiTrash />
                            </button>
                        </motion.li>
                    ))}
                </div>
                <div className="flex items-center justify-center gap-4">
                    <Link
                        href={`${urlLocaleSegment}/compare`}
                        className="flex items-center justify-center rounded-[10px] bg-primary px-4 py-2 text-sm capitalize text-white"
                        prefetch={false}
                    >
                        {tCompare('compare')}
                    </Link>
                    <button
                        onClick={resetCompareItems}
                        className="shrink-0 border-0 bg-transparent px-4 text-sm capitalize text-primary outline-none"
                    >
                        {tCompare('clear_all')}
                    </button>
                </div>
            </motion.ul>
        </>
    );
};

export default CompareSlide;
