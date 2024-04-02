import React from 'react';

const ImageCounter = ({
    current,
    length,
}: {
    current: number;
    length: number;
}) => {
    return (
        <div className="inline-flex items-center text-sm">
            {current} / {length}
        </div>
    );
};

export default ImageCounter;
