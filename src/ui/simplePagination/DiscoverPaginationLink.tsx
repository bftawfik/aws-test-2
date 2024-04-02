import { useGenerateUrl } from '@/hooks/useGenerateUrl/useGenerateUrl';
import { usePageStore } from '@/store/global';
import Link from 'next/link';
import React from 'react';

interface DiscoverPaginationLinkProps {
    pageNumber: number;
    relAttribute: (
        i: number | string,
        currentPage: number
    ) => 'prev' | 'next' | 'canonical' | undefined;
}
const DiscoverPaginationLink = ({
    pageNumber,
    relAttribute,
}: DiscoverPaginationLinkProps) => {
    const { currentPage, setPageNumber } = usePageStore();
    const pageUrl = useGenerateUrl({ tempPage: pageNumber });
    return (
        <Link
            rel={relAttribute(pageNumber, currentPage)}
            className={`flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 
                            text-xs
                                ${
                                    currentPage === pageNumber
                                        ? 'bg-[#74D8AF] text-white'
                                        : 'hover:bg-[#74D8AF] hover:text-white'
                                }`}
            style={
                currentPage === pageNumber
                    ? {
                          backgroundColor: '#74D8AF',
                          color: 'white',
                      }
                    : {}
            }
            onClick={() => setPageNumber(pageNumber as number)}
            href={pageUrl}
            prefetch={false}
        >
            {pageNumber}
        </Link>
    );
};

export default DiscoverPaginationLink;
