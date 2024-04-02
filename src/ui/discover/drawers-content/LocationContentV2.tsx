'use client';
import { useEffect, useRef, useState } from 'react';

export const LocationContent = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [drawerFooterHeight, setdrawerFooterHeight] = useState(80);
    const drawerFooterRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setdrawerFooterHeight(drawerFooterRef?.current?.offsetHeight || 0);
    }, []);

    return (
        <>
            <div style={{ paddingBottom: `${drawerFooterHeight + 20}px` }}>
                {children}
            </div>
        </>
    );
};
