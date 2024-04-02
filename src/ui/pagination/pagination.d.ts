import { UsePaginationProps } from '@/hooks/use-pagination/use-pagination';
import React from 'react';

export interface PagintaionProps extends UsePaginationProps {
    label?: string | undefined;
    pages?: number | undefined;
    searchTerm?: string | undefined;
    currentPage: number;
    onPageChange?: (pageNumber: number) => void;
}
