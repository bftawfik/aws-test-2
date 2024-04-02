'use client';

import { LoadingCircleIcon } from '../svg';

const BrandLoader = () => {
    return (
        <div role="status">
            <LoadingCircleIcon />
            <span className="sr-only">Loading...</span>
        </div>
    );
};

export default BrandLoader;
