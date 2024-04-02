import { SingleHouseIcon } from '@/ui/svg';
import React, { FC } from 'react';

export const PopularSkeleton: FC = () => {
    return (
        <div className="m-2 h-full min-h-[300px] w-full max-w-sm overflow-hidden rounded-md border bg-zinc-200 p-4 shadow">
            <div className="animate-pulse">
                <div className="h-1/4 space-y-3 py-1">
                    <div className="h-6 w-1/2 rounded-3xl bg-white"></div>
                    <div className="h-4 w-1/3 rounded-3xl bg-white"></div>
                </div>
                <div className="flex  h-96 items-center justify-center ">
                    <SingleHouseIcon
                        width={52}
                        height={52}
                        viewBox="0 0 52 52"
                    />
                </div>
            </div>
        </div>
    );
};
