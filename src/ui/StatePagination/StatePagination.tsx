import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { usePagination } from '@/hooks/use-pagination';
import { UsePaginationProps } from '@/hooks/use-pagination/use-pagination';
import { useLocale } from 'next-intl';
import { EN_LOCALE } from '@/constants';

export interface PagintaionStatePagination extends UsePaginationProps {
    label?: string | undefined;
    pages: number;
    searchTerm?: string | undefined;
    currentPage: number;
    onPageChange: (pageNumber: number) => void;
}

const StatePagination = (props: PagintaionStatePagination) => {
    // Read localization
    const locale = useLocale();

    let paginationRange = usePagination({
        pageSize: props.pageSize,
        totalCount: props.totalCount,
        siblingCount: 1,
        pagesNum: props.pages,
        currentPage: props.currentPage,
    });

    let lastPage = paginationRange
        ? paginationRange[paginationRange?.length - 1]
        : 0;

    const goToPage = (pageNumber: number) => {
        props.onPageChange(pageNumber);
    };

    const prevPage = () => {
        if (props.currentPage) {
            const num: number = props.currentPage - 1;
            goToPage(num);
        }
    };

    const nextPage = () => {
        if (props.currentPage) {
            const num = props.currentPage + 1;
            goToPage(num);
        }
    };

    return props.pages > 1 ? (
        <div className=" mt-6 flex w-full justify-center gap-1 ">
            <button
                disabled={props.currentPage <= 1}
                onClick={prevPage}
                className="h-12 w-12 rounded-full border border-gray-300 align-middle text-[#BEBEBE] hover:border-none hover:bg-[#74D8AF] hover:text-white disabled:pointer-events-none"
            >
                {locale === EN_LOCALE ? (
                    <HiChevronLeft className="mx-auto h-6 w-6 " />
                ) : (
                    <HiChevronRight className="mx-auto h-6 w-6 " />
                )}
            </button>

            {paginationRange &&
                paginationRange.map((i: number | string) => {
                    const isActive = i === props.currentPage;
                    return (
                        <button
                            key={i}
                            onClick={() => goToPage(i as number)}
                            className={`flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 
                            text-xs
                                ${
                                    isActive
                                        ? 'bg-[#74D8AF] text-white'
                                        : 'hover:bg-[#74D8AF] hover:text-white'
                                }`}
                        >
                            {i}
                        </button>
                    );
                })}

            <button
                disabled={props.currentPage >= +lastPage}
                onClick={nextPage}
                className={`h-12 w-12 rounded-full border border-gray-300 align-middle text-[#BEBEBE] hover:border-none hover:bg-[#74D8AF] hover:text-white disabled:pointer-events-none`}
            >
                {locale === EN_LOCALE ? (
                    <HiChevronRight className="mx-auto h-6 w-6 " />
                ) : (
                    <HiChevronLeft className="mx-auto h-6 w-6 " />
                )}
            </button>
        </div>
    ) : null;
};

export default StatePagination;
