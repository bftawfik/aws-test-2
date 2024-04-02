import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { EN_LOCALE } from '@/constants';
import Link from 'next/link';
import { getPaginationUrlV2 } from '@/helpers/getPaginationUrl';
import { clsx } from 'clsx';

const PAGES_TO_SHOW = 3;

const relAttribute = (i: number | string, currentPage: number) => {
    if (i === currentPage - 1) {
        return 'prev';
    } else if (i === currentPage + 1) {
        return 'next';
    } else if (i === currentPage) {
        return 'canonical';
    }
};

const calcPagesArray = (
    currentPage: number,
    startMin: number,
    endMax: number,
    deff: number,
    isMobile: boolean = false
) => {
    const startMax = endMax - 2 * deff;
    const endMin = startMin + 2 * deff;
    const start =
        currentPage - deff < startMin
            ? startMin
            : currentPage - deff > startMax
            ? startMax
            : currentPage - deff;
    const end =
        currentPage + deff > endMax
            ? endMax
            : currentPage + deff < endMin
            ? endMin
            : currentPage + deff;
    const addPreDots = start > startMin;
    const addPostDots = end < endMax;
    const rangeArr = Array.from(
        { length: end + 1 - start },
        (_, i) => start + i
    );
    if (addPreDots && !isMobile) {
        rangeArr.unshift(-1);
    }
    if (addPostDots && !isMobile) {
        rangeArr.push(-1);
    }
    return rangeArr;
};

const getRangeArr = (
    totalPages: number,
    currentPage: number,
    minPgNo: number,
    maxPgNo: number,
    deff: number,
    isMobile: boolean = false
) =>
    totalPages < PAGES_TO_SHOW + 2
        ? Array.from({ length: totalPages }, (_, ndx) => ndx + 1)
        : isMobile
        ? calcPagesArray(currentPage, minPgNo, maxPgNo, deff, isMobile)
        : [
              1,
              ...calcPagesArray(currentPage, minPgNo, maxPgNo, deff),
              totalPages,
          ];

interface SimplePaginationProps {
    currentPage: number;
    totalPages: number;
    locale: string;
    pathName: string;
    isDiscover?: boolean;
    isMobile?: boolean;
}

const SimplePagination = ({
    currentPage,
    totalPages,
    locale,
    pathName,
    isDiscover = false,
    isMobile = false,
}: SimplePaginationProps) => {
    const deff = Math.floor(PAGES_TO_SHOW / 2);
    const MIN_PG_NO = 2;
    const MAX_PG_NO = totalPages - 1;
    const MIN_PG_NO_MOB = 1;
    const MAX_PG_NO_MOB = totalPages;
    const rangeArr = getRangeArr(
        totalPages,
        currentPage,
        MIN_PG_NO,
        MAX_PG_NO,
        deff
    );
    const rangeArrMob = getRangeArr(
        totalPages,
        currentPage,
        MIN_PG_NO_MOB,
        MAX_PG_NO_MOB,
        deff,
        true
    );
    const handleUrl = (pageNumber: number) =>
        getPaginationUrlV2(pathName, pageNumber, isDiscover);

    const isLastPage = currentPage >= totalPages;
    const isFirstPage = currentPage <= 1;

    return rangeArr?.length > 1 || rangeArrMob?.length > 1 ? (
        <div className=" mt-6 flex w-full justify-center gap-1 ">
            <Link
                href={isFirstPage ? {} : handleUrl(currentPage - 1)}
                className=" flex h-12 w-12 items-center rounded-full border border-gray-300
                text-[#BEBEBE] hover:border-none hover:bg-[#74D8AF] hover:text-white disabled:pointer-events-none"
            >
                {locale === EN_LOCALE ? (
                    <HiChevronLeft className="mx-auto h-6 w-6 " />
                ) : (
                    <HiChevronRight className="mx-auto h-6 w-6 " />
                )}
            </Link>
            <div className=" hidden justify-center md:flex md:gap-1">
                {rangeArr?.map((pgNo) =>
                    pgNo > 0 ? (
                        <Link
                            key={pgNo}
                            rel={relAttribute(pgNo, currentPage)}
                            className={clsx([
                                'flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 text-xs',
                                currentPage === pgNo
                                    ? 'bg-[#74D8AF] text-white'
                                    : 'hover:bg-[#74D8AF] hover:text-white',
                            ])}
                            href={handleUrl(pgNo)}
                            prefetch={false}
                        >
                            {pgNo}
                        </Link>
                    ) : (
                        <div
                            className={`flex h-10 w-10  items-center justify-center text-sm `}
                            key={Math.random()}
                        >
                            ...
                        </div>
                    )
                )}
            </div>
            <div className=" flex justify-center gap-1 md:hidden">
                {rangeArrMob?.map((pgNo) =>
                    pgNo > 0 ? (
                        <Link
                            key={pgNo}
                            rel={relAttribute(pgNo, currentPage)}
                            className={clsx([
                                'flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 text-xs',
                                currentPage === pgNo
                                    ? 'bg-[#74D8AF] text-white'
                                    : 'hover:bg-[#74D8AF] hover:text-white',
                            ])}
                            href={handleUrl(pgNo)}
                            prefetch={false}
                        >
                            {pgNo}
                        </Link>
                    ) : (
                        <div
                            className={`flex h-10 w-10  items-center justify-center text-sm `}
                            key={Math.random()}
                        >
                            ...
                        </div>
                    )
                )}
            </div>
            <Link
                href={isLastPage ? {} : handleUrl(currentPage + 1)}
                className={`flex h-12 w-12 items-center  rounded-full border border-gray-300  text-[#BEBEBE] hover:border-none
                hover:bg-[#74D8AF]  hover:text-white disabled:pointer-events-none  `}
            >
                {locale === EN_LOCALE ? (
                    <HiChevronRight className="mx-auto h-6 w-6 " />
                ) : (
                    <HiChevronLeft className="mx-auto h-6 w-6 " />
                )}
            </Link>
        </div>
    ) : null;
};

export default SimplePagination;
