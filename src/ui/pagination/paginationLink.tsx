import { usePaginationUrl } from '@/hooks/use-pagination/usePagingationUrl';
import { usePageStore } from '@/store/global';
import Link from 'next/link';
import React from 'react';

interface PaginationLinkProps {
    pageNumber: number;
    relAttribute: (
        i: number | string,
        currentPage: number
    ) => 'prev' | 'next' | 'canonical' | undefined;
}
const PaginationLink = ({ pageNumber, relAttribute }: PaginationLinkProps) => {
    const { currentPage } = usePageStore();
    const pageUrl = usePaginationUrl({ pageNumber });
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
            href={pageUrl}
            prefetch={false}
        >
            {pageNumber}
        </Link>
    );
};

export default PaginationLink;
