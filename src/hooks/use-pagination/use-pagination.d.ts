import React from 'react';

export interface UsePaginationProps {
    totalCount?: number | undefined;

    pagesNum?: number | undefined;

    pageSize?: number | undefined;

    siblingCount?: number | undefined;

    currentPage?: number | undefined;
}
