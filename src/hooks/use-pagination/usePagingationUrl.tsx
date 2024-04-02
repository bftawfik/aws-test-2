import { PAGE_SHORT } from '@/constants';
import { usePathname } from 'next/navigation';

interface UsePaginaionUrlProps {
    pageNumber: number;
}
export const usePaginationUrl = ({
    pageNumber,
}: UsePaginaionUrlProps): string => {
    const pathName = usePathname();
    const prefix = pathName.split(`/${PAGE_SHORT}`)[0];
    const pageUrl =
        pageNumber === 1 ? prefix : `${prefix}/${PAGE_SHORT}-${pageNumber}`;

    return pageUrl;
};
