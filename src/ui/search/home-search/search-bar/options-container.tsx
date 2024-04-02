import React, { useRef } from 'react';
import { useOnClickOutside } from 'usehooks-ts';

const OptionsContainer = ({
    onClickOutside,
    children,
}: {
    onClickOutside: () => void;
    children: React.ReactNode;
}) => {
    const ref = useRef(null);
    useOnClickOutside(ref, onClickOutside);

    return (
        <div
            ref={ref}
            className="absolute top-16 z-40 max-h-56 w-full overflow-y-auto rounded-b-md bg-white shadow-sm duration-200"
        >
            {children}
        </div>
    );
};

export default OptionsContainer;
