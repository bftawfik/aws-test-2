'use client';
import React, { useEffect, useState, useCallback } from 'react';
import { offsetYWrapperProps } from './offset-y-wrapper';

const OffsetYWrapper = ({
    refTop,
    refBottom,
    offsetY,
    offsetBottom,
    offsetTop,
    children,
}: offsetYWrapperProps) => {
    const [topOffset, setTopOffset] = useState(0);
    const [bottomOffset, setBottomOffset] = useState(0);

    const fullHeightHandler = useCallback(() => {
        const windowHeigh = window.innerHeight;

        const headerHeight =
            refTop?.current?.offsetHeight || offsetTop || offsetY || 0;
        setTopOffset(headerHeight);

        const footerTop = refBottom?.current?.offsetTop;
        const footerHeight = footerTop
            ? +(footerTop - windowHeigh)
            : offsetBottom || offsetY || 0;
        setBottomOffset(footerHeight);
    }, [refTop, refBottom, offsetY, offsetBottom, offsetTop]);

    useEffect(() => {
        fullHeightHandler();
    }, [fullHeightHandler]);

    return (
        <div
            style={{
                paddingTop: `${topOffset}px`,
                paddingBottom: `${bottomOffset}px`,
            }}
        >
            {children}
        </div>
    );
};

OffsetYWrapper.defaultProps = {
    refBottom: null,
    refTop: null,
    offsetY: 0,
    offsetTop: 0,
    offsetBottom: 0,
};

export default OffsetYWrapper;
