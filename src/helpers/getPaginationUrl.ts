import { PAGE_SHORT, TAB_SHORT } from '@/constants';

export const getPaginationUrl = (
    pathName: string,
    pageNumber: number,
    isDiscover: boolean
): string => {
    let urlSegments = pathName.split('/');
    const pageIndex = urlSegments.findIndex((item) =>
        item.includes(`${PAGE_SHORT}`)
    );
    const newPage = `${PAGE_SHORT}-${pageNumber}`;

    const deleteItem = (urlSegments: string[], ndx: number) => {
        urlSegments.splice(ndx, 1);
        return urlSegments;
    };
    const addItem = (urlSegments: string[], ndx: number, newItem: string) => {
        urlSegments.splice(ndx, 0, newItem);
        return urlSegments;
    };
    const replaceItem = (
        urlSegments: string[],
        ndx: number,
        newItem: string
    ) => {
        urlSegments.splice(ndx, 1, newItem);
        return urlSegments;
    };
    if (pageIndex === -1) {
        if (pageNumber !== 1) {
            if (isDiscover) {
                const tabIndex = urlSegments.findIndex((item) =>
                    item.includes(`${TAB_SHORT}`)
                );
                const discoverIndex = urlSegments.findIndex((item) =>
                    item.includes('discover')
                );

                urlSegments =
                    tabIndex !== -1
                        ? addItem([...urlSegments], tabIndex + 1, newPage)
                        : addItem([...urlSegments], discoverIndex + 1, newPage);
            } else {
                urlSegments.push(newPage);
            }
        }
    } else {
        urlSegments =
            pageNumber === 1
                ? deleteItem([...urlSegments], pageIndex)
                : replaceItem([...urlSegments], pageIndex, newPage);
    }
    const paginatedUrl = urlSegments.join('/');

    return paginatedUrl;
};
export const getPaginationUrlV2 = (
    fullUrl: string,
    pageNumber: number,
    isDiscover: boolean
): string => {
    const urlParts = fullUrl.split('?');
    let urlSegments = urlParts[0].split('/');
    const queryString = urlParts[1];

    const pageIndex = urlSegments.findIndex((item) =>
        item.includes(`${PAGE_SHORT}`)
    );
    const newPage = `${PAGE_SHORT}-${pageNumber}`;

    const deleteItem = (urlSegments: string[], ndx: number) => {
        return urlSegments.slice(0, ndx).concat(urlSegments.slice(ndx + 1));
    };
    const addItem = (urlSegments: string[], ndx: number, newItem: string) => {
        return [
            ...urlSegments.slice(0, ndx),
            newItem,
            ...urlSegments.slice(ndx),
        ];
    };
    const replaceItem = (
        urlSegments: string[],
        ndx: number,
        newItem: string
    ) => {
        return [
            ...urlSegments.slice(0, ndx),
            newItem,
            ...urlSegments.slice(ndx + 1),
        ];
    };

    if (pageIndex === -1) {
        if (pageNumber !== 1) {
            if (isDiscover) {
                const tabIndex = urlSegments.findIndex((item) =>
                    item.includes(`${TAB_SHORT}`)
                );
                const discoverIndex = urlSegments.findIndex((item) =>
                    item.includes('discover')
                );

                urlSegments =
                    tabIndex !== -1
                        ? addItem([...urlSegments], tabIndex + 1, newPage)
                        : addItem([...urlSegments], discoverIndex + 1, newPage);
            } else {
                urlSegments = [...urlSegments, newPage];
            }
        }
    } else {
        urlSegments =
            pageNumber === 1
                ? deleteItem([...urlSegments], pageIndex)
                : replaceItem([...urlSegments], pageIndex, newPage);
    }

    // Reassemble the URL
    const paginatedUrl = queryString
        ? urlSegments.join('/') + '?' + queryString
        : urlSegments.join('/');

    return paginatedUrl;
};

export const removePageFromUrl = (url: string) => {
    const urlSegments = url.split('/');
    const filteredSegments = urlSegments.filter(
        (segment) => !segment.includes(PAGE_SHORT)
    );
    return filteredSegments.join('/');
};
