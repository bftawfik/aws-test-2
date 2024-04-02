import React from 'react';

export interface DiscoverToggle extends React.ComponentProps<'div'> {
    ref?: React.Ref | undefined;
    listBtnRef?: React.Ref | undefined;
    gridBtnRef?: React.Ref | undefined;
    mapBtnRef?: React.Ref | undefined;
    onListClick?: any | undefined;
    onGridClick?: (...args: any[]) => void | undefined;
    onMapClick?: (...args: any[]) => void | undefined;
}
