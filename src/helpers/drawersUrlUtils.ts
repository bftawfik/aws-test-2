import { DRAWERS_SHORT } from '@/constants';

export const addDrawerIdToUrl = (url: string, type: string, id: number) => {
    const separator = url.endsWith('?') ? '' : url.includes('?') ? '&' : '?';
    const drawerQp = `${DRAWERS_SHORT}=${type}_${id}`;
    const fullLink = `${url}${separator}${drawerQp}`;
    return fullLink;
};
