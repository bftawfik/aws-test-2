import { ReactNode } from 'react';
import { IconType } from 'react-icons';

export interface CustomDropDownProps {
    icon?: ReactNode | React.SVGProps | undefined;
    label: string;
    showArrow?: boolean;
    className?: string;
    children: ReactNode;
}
