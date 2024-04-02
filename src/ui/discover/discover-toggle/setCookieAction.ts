'use server';
import { GRID_VIEW, LIST_VIEW, MAP_VIEW } from '@/constants';
import { cookies } from 'next/headers';

export const setDiscoverViewList = async () => {
    'use server';
    const cookieStore = cookies();
    cookieStore.set('discoverView', LIST_VIEW);
};
export const setDiscoverViewGrid = async () => {
    'use server';
    const cookieStore = cookies();
    cookieStore.set('discoverView', GRID_VIEW);
};
export const setDiscoverViewMap = async () => {
    'use server';
    const cookieStore = cookies();
    cookieStore.set('discoverView', MAP_VIEW);
};
