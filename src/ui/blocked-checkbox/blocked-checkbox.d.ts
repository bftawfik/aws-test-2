import { HtmlProps } from 'next/dist/shared/lib/html-context';
import React, { ReactNode } from 'react';

export interface BlockedCheckboxProps extends React.ComponentProps<'input'> {
    /**
     * Unique identifier of the element.
     */
    label?: string | ReactNode | undefined;

    /**
     * Checkbox appearance style.
     *
     * The default value is `outline`
     */
    variant?: 'contained' | 'outline';

    /**
     * Style class of the container element.
     */
    rootClasses?: string | undefined;

    /**
     * Reference of the input element.
     */
    inputRef?: React.Ref<HTMLInputElement> | undefined;
}
