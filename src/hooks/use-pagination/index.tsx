'use client';
import { useMemo } from 'react';
import { UsePaginationProps } from './use-pagination';
import { useWindowSize } from 'usehooks-ts';

const Range = (start: number, end: number) => {
    let length = end - start + 1;
    return Array.from({ length }, (_, index) => index + start);
};

export const usePagination = ({
    currentPage = 1,
    siblingCount = 2,
    pageSize,
    pagesNum,
    totalCount,
}: UsePaginationProps) => {
    const { width, height } = useWindowSize();

    const paginationRange = useMemo(() => {
        const Dots = '...';
        let deviceType = '';

        deviceType = width <= 500 ? 'Mobile' : 'Desktop';

        const totalPageCount = (function () {
            if (pagesNum) {
                return pagesNum;
            } else if (totalCount && pageSize) {
                return Math.ceil(totalCount / pageSize);
            }
            return 1;
        })();
        const siblingRestriction = Math.min(siblingCount, 4);
        const totalPageNumbers = siblingRestriction + 5;

        const leftSiblingIndex = Math.max(currentPage - siblingRestriction, 1);

        const rightSiblingIndex = Math.min(
            currentPage + siblingRestriction,
            totalPageCount
        );

        const showLeftDots = leftSiblingIndex > 2;
        const showRightDots = rightSiblingIndex <= totalPageCount - 2;
        const firstPageIndex = 1;
        const lastPageIndex = totalPageCount;

        // Mobile size no dots visible

        if (deviceType === 'Mobile') {
            let items = Range(
                currentPage,
                currentPage + 1 > totalPageCount ? 1 : currentPage + 1
            );
            return [...items];
        }
        //all visible
        if (totalPageNumbers >= totalPageCount) {
            return Range(1, totalPageCount);
        }
        // NO left dots but there're right dots

        if (!showLeftDots && showRightDots) {
            let leftItemCount = 2 + 2 * siblingRestriction;
            let leftRange = Range(1, leftItemCount);
            return [...leftRange, Dots, totalPageCount];
        }
        // No right dots but there're left dots
        if (showLeftDots && !showRightDots) {
            let rightItemCount = 2 + 2 * siblingRestriction;
            let rightRange = Range(
                totalPageCount - rightItemCount + 1,
                totalPageCount
            );
            return [firstPageIndex, Dots, ...rightRange];
        }
        // both dots exist
        if (showLeftDots && showRightDots) {
            let middleRange = Range(leftSiblingIndex, rightSiblingIndex);
            return [firstPageIndex, Dots, ...middleRange, Dots, lastPageIndex];
        }
    }, [totalCount, pageSize, siblingCount, currentPage, width, pagesNum]);
    return paginationRange;
};
