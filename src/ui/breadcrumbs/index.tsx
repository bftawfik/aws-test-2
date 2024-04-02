import { BsChevronRight } from 'react-icons/bs';
import { BsChevronLeft } from 'react-icons/bs';
import { BreadcrumbProps } from './breadcrumbs';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { EN_LOCALE } from '@/constants';

const classNames = (...classes: string[]) =>
    classes.filter((classes) => Boolean(classes)).join(' ');

const Breadcrumbs = ({ pages }: BreadcrumbProps) => {
    // Read localization
    const locale = useLocale();

    const isArabic = locale === EN_LOCALE;
    const languageText = isArabic ? 'English' : 'العربية';

    function isLast(index: number) {
        return index === pages.length - 1;
    }
    return (
        <nav className="mt-8 flex" aria-label="Breadcrumb">
            <ol role="list" className="my-3  flex items-center gap-2">
                {pages.map((page, index) => {
                    const disabled = isLast(index);

                    return (
                        <div key={index}>
                            <li key={index}>
                                <div className="flex items-center gap-2 font-normal">
                                    {page.current ? (
                                        <div
                                            className={`pointer-events-none cursor-default text-xs font-normal capitalize text-gray-500 text-primary
                                            hover:text-primary`}
                                        >
                                            {page.name}
                                        </div>
                                    ) : (
                                        <Link
                                            href={page.href}
                                            className={` text-xs font-normal capitalize text-gray-500 hover:text-primary ${
                                                page.current &&
                                                'pointer-events-none cursor-default text-primary'
                                            }`}
                                            aria-current={
                                                page.current
                                                    ? 'page'
                                                    : undefined
                                            }
                                            prefetch={false}
                                        >
                                            {page.name}
                                        </Link>
                                    )}
                                    {isArabic ? (
                                        <BsChevronRight
                                            className={classNames(
                                                disabled
                                                    ? 'hidden'
                                                    : 'h-2.5 w-2.5 flex-shrink-0  text-gray-400'
                                            )}
                                            aria-hidden="true"
                                        />
                                    ) : (
                                        <BsChevronLeft
                                            className={classNames(
                                                disabled
                                                    ? 'hidden'
                                                    : 'h-2.5 w-2.5 flex-shrink-0 text-gray-400'
                                            )}
                                            aria-hidden="true"
                                        />
                                    )}
                                </div>
                            </li>
                        </div>
                    );
                })}
            </ol>
        </nav>
    );
};

export default Breadcrumbs;
