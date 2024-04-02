import { IconType } from 'react-icons';

export interface DropdownBase {
    label?: string | undefined;
    icon?: IconType | undefined;
}

export interface DropdownItem extends Partial<DropdownBase> {
    value: string;
}

export interface DropDownProps extends Partial<DropdownBase>, DropdownItem {
    items: DropdownItem[];
    hideArrow?: boolean | undefined;
    title?: string | undefined;
    onClick: (item: DropdownItem) => void;
}
