import { Locale, Location } from '@/types';

import React from 'react';

export interface LocationCardProps extends React.ComponentProps<'div'> {
    location?: any;
    shouldPreventRouting?: boolean;
}
