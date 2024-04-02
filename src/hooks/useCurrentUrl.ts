'use client';
import { usePathname } from 'next/navigation';

const useCurrentUrl = (suffix?: string) => {
    const pathName = usePathname();
    const origin =
        typeof window !== 'undefined' && window.location.origin
            ? window.location.origin
            : '';
    if (!suffix) {
        return `${origin}${pathName}`;
    } else {
        return `${origin}${suffix}`;
    }
};

export default useCurrentUrl;
