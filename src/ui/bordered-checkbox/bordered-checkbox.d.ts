import React from 'react';
import { BlockedCheckboxProps } from '../blocked-checkbox/blocked-checkbox';
import { IconType } from 'react-icons';

export interface BorderedChecboxProps extends BlockedCheckboxProps {
    styleType?: string | undefined;
    withIcon?: boolean | undefined;
    withBox?: boolean | undefined;
}
