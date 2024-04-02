'use client';

import { NotFoundSearchIcon } from '@/ui/svg';

const NoResults = () => {
    return (
        <>
            <div className="flex flex-col items-center justify-center  gap-4">
                <NotFoundSearchIcon />
            </div>
        </>
    );
};
export default NoResults;
