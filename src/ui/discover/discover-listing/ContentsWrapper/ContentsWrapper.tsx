'use client';

import { GRID_VIEW } from '@/constants';
import { useDiscoverStore } from '@/store/global';

export interface ContentsWrapperProps {
    children: React.ReactNode;
    cookieDiscoverView: string;
}
const ContentsWrapper = ({
    children,
    cookieDiscoverView,
}: ContentsWrapperProps) => {
    // const { discoverView } = useDiscoverStore();
    const isGrid = cookieDiscoverView === GRID_VIEW;
    return (
        <div
            className={`grid gap-4 ${
                isGrid
                    ? 'grid-cols-1 lg:grid-cols-2'
                    : ' grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
            }`}
        >
            {children}
        </div>
    );
};
export default ContentsWrapper;
