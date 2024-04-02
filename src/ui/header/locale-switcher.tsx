'use client';
import { usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { AR_LOCALE, EN_LOCALE } from '@/constants';

interface LocaleSwitcherProps {
    children: React.ReactNode;
}

const LocaleSwitcher: React.FC<LocaleSwitcherProps> = ({ children }) => {
    const pathname = usePathname();
    // const switchLang = lang === AR_LOCALE ? '' : AR_LOCALE;
    const searchParams = useSearchParams();
    const feat = searchParams.get('feat');
    const amn = searchParams.get('amn');
    const txt = searchParams.get('txt');

    const paramsArray = [
        feat && `feat=${feat}`,
        amn && `amn=${amn}`,
        txt && `txt=${txt}`,
    ].filter((item) => !!item);
    const joinedParams = paramsArray?.join('&') || '';
    const startingWithLetter = pathname[0] !== '/';
    const segment1 = startingWithLetter
        ? pathname.slice(0, 2)
        : pathname.slice(1, 3);
    const startingWithLang = segment1 === AR_LOCALE || segment1 === EN_LOCALE;
    const urlLocaleSegment = segment1 === AR_LOCALE ? '' : `/${AR_LOCALE}`;
    const pathnameRest = startingWithLang
        ? pathname.slice(pathname.indexOf(segment1) + 2, pathname.length)
        : startingWithLetter
        ? `/${pathname}`
        : pathname;
    const url = `${urlLocaleSegment}${pathnameRest ? pathnameRest : '/'}${
        joinedParams ? `?${joinedParams}` : ''
    }`;

    return (
        <Link
            href={url}
            className="text-medium-gray flex items-center"
            prefetch={false}
        >
            {children}
        </Link>
    );
};

export default LocaleSwitcher;
