import { useCompareStore } from '@/store/global';
import React, { useEffect, useState } from 'react';

function CompareCounter() {
    const { compare_items } = useCompareStore();

    const [load, setLoad] = useState(false);

    useEffect(() => {
        setLoad(true);
        setTimeout(() => {
            setLoad(false);
        }, 1000);
    }, [compare_items.length]);

    return (
        <div className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center overflow-hidden rounded-full bg-white text-sm text-primary shadow-md">
            <div
            // className={
            //     load
            //         ? '-translate-y-[15px] transform transition'
            //         : 'translate-y-0 transform transition'
            // }
            >
                {compare_items.length}
            </div>
        </div>
    );
}

export default CompareCounter;
