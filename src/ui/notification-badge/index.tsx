import React from 'react';

const NotificationBadge = ({ counter }: { counter: number }) => {
    return (
        <div className="absolute -end-[6px] -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-[9px] font-medium text-white">
            {counter}
        </div>
    );
};

export default NotificationBadge;
