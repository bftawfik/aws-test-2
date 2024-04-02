import { useSearchParams } from 'next/navigation';
import useCurrentUrl from './useCurrentUrl';
import { addKeyToSearchParams } from '@/helpers/addKeyToSearchParams';
import { DRAWERS_SHORT } from '@/constants';

const useGetUrlWithDrawer = (
    drawerOpenerLocation: string,
    drawerId: number
) => {
    const currentUrl = useCurrentUrl();
    const searchParams = useSearchParams();
    const updatedSearchParams = addKeyToSearchParams(
        DRAWERS_SHORT,
        `${drawerOpenerLocation}_${drawerId}`,
        new URLSearchParams(searchParams as unknown as URLSearchParams)
    );
    const updatedSearchParamsString = updatedSearchParams.toString();
    const updatedUrl = `${currentUrl}?${updatedSearchParamsString}`;

    return updatedUrl;
};

export default useGetUrlWithDrawer;
