import React from 'react';

export interface SectionHeaderProps extends React.ComponentProps<'div'> {
    title: string;
    url?: string;
}
