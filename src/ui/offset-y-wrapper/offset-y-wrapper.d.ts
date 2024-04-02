import React, { HtmlHTMLAttributes, ReactElement, ReactNode } from 'react';
export interface offsetYWrapperProps {
    refTop: React.RefObject<HTMLElement>;
    refBottom: React.RefObject<HTMLElement>;
    offsetY: number;
    offsetTop: number;
    offsetBottom: number;
    children?: React.ReactNode;
}
