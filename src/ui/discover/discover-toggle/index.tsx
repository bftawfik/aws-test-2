'use client';
import { useDiscoverStore } from '@/store/global';
import { BsGrid } from 'react-icons/bs';
import { CiCircleList, CiMap } from 'react-icons/ci';
import { SlMap } from 'react-icons/sl';
import { useTranslations } from 'next-intl';
import {
    GRID_VIEW,
    LARGEST_SCREEN_SIZE,
    LIST_VIEW,
    MAP_VIEW,
} from '@/constants';
import { useWindowSize } from 'react-use';
import { LegacyRef, useRef } from 'react';

import clsx from 'clsx';
import {
    setDiscoverViewGrid,
    setDiscoverViewList,
    setDiscoverViewMap,
} from './setCookieAction';
interface DiscoverToggleProps {
    cookieDiscoverView: string;
}

const DiscoverToggle = ({ cookieDiscoverView }: DiscoverToggleProps) => {
    // const { discoverView } = useDiscoverStore();
    // Read translations
    const listTogglerRef = useRef<HTMLFormElement>(null);
    const tGlobal = useTranslations('global');
    const { width } = useWindowSize();
    const isInfinity = !isFinite(width);
    const isSmallScreen = width < LARGEST_SCREEN_SIZE;
    const isMap = cookieDiscoverView === MAP_VIEW;
    const isList = cookieDiscoverView === LIST_VIEW;
    const isGrid = cookieDiscoverView === GRID_VIEW;
    if (isSmallScreen && isGrid) {
        listTogglerRef.current?.submit();
    }
    const classes = {
        container:
            'fixed bottom-[78px] left-1/2 z-30 mx-auto inline-flex -translate-x-1/2 rounded-md shadow-sm md:bottom-5 lg:bottom-4',
        button: 'group items-center justify-center gap-x-1 border border-gray-200 px-4 py-4 text-sm font-medium focus:z-10',
        buttonFirst: ' ltr:rounded-l-lg rtl:rounded-r-lg',
        buttonLast: 'ltr:rounded-r-lg rtl:rounded-l-lg',
        buttonGrid: 'hidden xl:inline-flex',
        buttonOther: 'inline-flex',
        buttonActive: 'border-none bg-primary text-white',
        buttonInactive: 'bg-white text-gray-900 duration-300',
        buttonHover: 'hover:bg-primary hover:text-white',
        buttonIcon: `h-5 w-5 duration-300`,
        buttonIconActive: 'fill-white',
        buttonIconInactive: 'fill-gray-400',
        buttonIconHover: 'group-hover:fill-white',
    };

    return (
        <div className={classes.container} role="group">
            <form action={setDiscoverViewList} ref={listTogglerRef}>
                <button
                    type="submit"
                    className={clsx(
                        classes.button,
                        classes.buttonOther,
                        classes.buttonFirst,
                        {
                            [classes.buttonActive]: isList,
                            [classes.buttonInactive]: !isList,
                            [classes.buttonHover]: !isSmallScreen,
                        }
                    )}
                >
                    <CiCircleList
                        className={clsx(classes.buttonIcon, {
                            [classes.buttonIconActive]: isList,
                            [classes.buttonIconInactive]: !isList,
                            [classes.buttonIconHover]: !isSmallScreen,
                        })}
                    />
                    {tGlobal(LIST_VIEW)}
                </button>
            </form>
            <form action={setDiscoverViewGrid}>
                <button
                    type="submit"
                    className={clsx(classes.button, classes.buttonGrid, {
                        [classes.buttonActive]: isGrid,
                        [classes.buttonInactive]: !isGrid,
                        [classes.buttonHover]: !isSmallScreen,
                    })}
                >
                    <BsGrid
                        className={clsx(classes.buttonIcon, {
                            [classes.buttonIconActive]: isGrid,
                            [classes.buttonIconInactive]: !isGrid,
                            [classes.buttonIconHover]: !isSmallScreen,
                        })}
                    />
                    {tGlobal(GRID_VIEW)}
                </button>
            </form>
            <form action={setDiscoverViewMap}>
                <button
                    type="submit"
                    className={clsx(
                        classes.button,
                        classes.buttonOther,
                        classes.buttonLast,
                        {
                            [classes.buttonActive]: isMap,
                            [classes.buttonInactive]: !isMap,
                            [classes.buttonHover]: !isSmallScreen,
                        }
                    )}
                >
                    <SlMap
                        className={clsx(classes.buttonIcon, {
                            [classes.buttonIconActive]: isMap,
                            [classes.buttonIconInactive]: !isMap,
                            [classes.buttonIconHover]: !isSmallScreen,
                        })}
                    />

                    {tGlobal(MAP_VIEW)}
                </button>
            </form>
        </div>
    );
};

export default DiscoverToggle;
