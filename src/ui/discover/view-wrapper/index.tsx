'use client';
import React, { useEffect, useRef } from 'react';
import { useDiscoverStore } from '@/store/global';
import { classNames } from '@/helpers';
import DiscoverToggle from '../discover-toggle';
import { useSearchParams } from 'next/navigation';
import { GRID_VIEW, LIST_VIEW, MAP_VIEW } from '@/constants';
import { useWindowSize } from 'react-use';
// import DiscoverToggle from '../discover-toggle';
// import DiscoverTab from '@/ui/discover-tab';
const DiscoverViewWrapper = ({
    children,
    cookieDiscoverView = LIST_VIEW,
}: {
    children: React.ReactNode[];
    cookieDiscoverView?: string;
}) => {
    // const { discoverView, setDiscoverView } = useDiscoverStore();
    const cardGridContainerRef = useRef<HTMLDivElement>(null);

    // set data into the store

    const mapping = children[1];
    const listing = children[0];
    const { width } = useWindowSize();
    const isInfinity = !isFinite(width);
    const isMap = cookieDiscoverView === MAP_VIEW;
    const isList = cookieDiscoverView === LIST_VIEW;
    const isGrid = cookieDiscoverView === GRID_VIEW;
    const offsetTop = cardGridContainerRef?.current?.offsetTop || 206;
    // const inlineStyles = {
    //     '--offset-top': '206',
    // } as React.CSSProperties;

    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get('page')) || 1;
    useEffect(() => {
        cardGridContainerRef?.current?.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentPage]);
    return (
        <div
            className={classNames(
                `relative w-full flex-grow overflow-hidden lg:block`,

                isMap ? 'flex h-screen' : '',
                isList ? 'flex h-full' : '',
                isGrid ? 'h-full lg:flex' : ''
            )}
        >
            <div
                ref={cardGridContainerRef}
                className={classNames(
                    `p-4 pt-[6px] transition-transform duration-200 ease-in-out`,
                    isMap
                        ? '-translate-x-full'
                        : isGrid
                        ? 'scrollbar block h-screen max-h-[calc(100vh-206px)] overflow-y-auto lg:w-1/2'
                        : 'w-full'
                )}
            >
                {listing}
            </div>
            <div
                className={classNames(
                    `h-screen max-h-[calc(100vh-206px)] transition-all duration-200 ease-in-out`,
                    isList
                        ? 'hidden'
                        : isMap
                        ? 'absolute bottom-0 right-0 top-0 w-full'
                        : 'w-1/2',
                    isList ? 'hidden' : ''
                )}
            >
                {mapping}
            </div>
            <DiscoverToggle cookieDiscoverView={cookieDiscoverView} />
        </div>
    );
};

export default DiscoverViewWrapper;
