import { CloseIcon } from '@/ui/svg';
import React from 'react';
interface SearchBadgeProps {
    onClick: () => void;
    content: string;
}
const SearchBadge = ({ onClick, content }: SearchBadgeProps) => {
    return (
        <div
            key={Math.random()}
            className="flex cursor-pointer items-center gap-2 rounded-md bg-[#eeeeee] p-1"
        >
            <p className="line-clamp-1 w-full text-sm font-normal capitalize text-black">
                {content}
            </p>
            <p onClick={onClick}>
                <CloseIcon className="h-6 w-6 flex-none" />
            </p>
        </div>
    );
};

export default SearchBadge;
