'use client';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { PagintaionProps } from './pagination';
import { usePagination } from '@/hooks/use-pagination';
import { useLocale } from 'next-intl';
import { usePageStore } from '@/store/global';
import PaginationLink from './paginationLink';
import { usePathname } from 'next/navigation';
import DiscoverPaginationLink from './DiscoverPaginationLink';
import { EN_LOCALE, PAGE_SHORT } from '@/constants';
import { useRouter } from 'next/navigation';
import { useGenerateUrl } from '@/hooks/useGenerateUrl/useGenerateUrl';
import { usePaginationUrl } from '@/hooks/use-pagination/usePagingationUrl';
import { parseUrl } from '@/helpers/url-segments';

const relAttribute = (i: number | string, currentPage: number) => {
    if (i === currentPage - 1) {
        return 'prev';
    } else if (i === currentPage + 1) {
        return 'next';
    } else if (i === currentPage) {
        return 'canonical';
    }
};
const Pagination = (props: PagintaionProps) => {
    const { currentPage, setPageNumber } = usePageStore();
    const router = useRouter();
    const pathName = usePathname();

    const { pg } = parseUrl(pathName);
    const page = (pg as number) || 1;

    if (page !== currentPage) {
        setPageNumber(page);
    }
    // Read localization
    const locale = useLocale();

    let paginationRange = usePagination({
        pageSize: props.pageSize,
        totalCount: props.totalCount,
        siblingCount: 1,
        pagesNum: props.pages,
        currentPage: currentPage || 1,
    });

    let lastPage = paginationRange
        ? paginationRange[paginationRange?.length - 1]
        : 0;

    const prefix = pathName.split(`/${PAGE_SHORT}`)[0];
    const discoverNextUrl = useGenerateUrl({ tempPage: currentPage + 1 });
    const nextUrl = usePaginationUrl({ pageNumber: currentPage + 1 });
    const discoverPrevUrl = useGenerateUrl({ tempPage: currentPage - 1 });
    const prevUrl = usePaginationUrl({ pageNumber: currentPage - 1 });

    const isDiscover = pathName.includes('discover');

    const nextPageUrl = isDiscover ? discoverNextUrl : nextUrl;
    const prevPageUrl = isDiscover ? discoverPrevUrl : prevUrl;

    const prevPage = () => {
        router.push(prevPageUrl);
    };

    const nextPage = () => {
        router.push(nextPageUrl);
    };

    return (
        <div className=" mt-6 flex w-full justify-center gap-1 ">
            <button
                disabled={currentPage <= 1}
                onClick={prevPage}
                className=" h-12 w-12 rounded-full border border-gray-300 align-middle
                text-[#BEBEBE] hover:border-none hover:bg-[#74D8AF] hover:text-white disabled:pointer-events-none"
            >
                {locale === EN_LOCALE ? (
                    <HiChevronLeft className="mx-auto h-6 w-6 " />
                ) : (
                    <HiChevronRight className="mx-auto h-6 w-6 " />
                )}
            </button>

            {paginationRange &&
                paginationRange.map((i: number | string) => {
                    if (i === '...') {
                        return (
                            <a
                                href="#"
                                className={`flex h-10 w-10  items-center justify-center text-sm `}
                                key={Math.random()}
                            >
                                &#8230;
                            </a>
                        );
                    }
                    return isDiscover ? (
                        <DiscoverPaginationLink
                            relAttribute={relAttribute}
                            key={i}
                            pageNumber={i as number}
                        />
                    ) : (
                        <PaginationLink
                            relAttribute={relAttribute}
                            key={i}
                            pageNumber={i as number}
                        />
                    );
                })}

            <button
                disabled={currentPage >= +lastPage}
                onClick={nextPage}
                className={`h-12 w-12 rounded-full border border-gray-300 align-middle text-[#BEBEBE] hover:border-none
                hover:bg-[#74D8AF]  hover:text-white disabled:pointer-events-none  `}
            >
                {locale === EN_LOCALE ? (
                    <HiChevronRight className="mx-auto h-6 w-6 " />
                ) : (
                    <HiChevronLeft className="mx-auto h-6 w-6 " />
                )}
            </button>
        </div>
    );
};

export default Pagination;
