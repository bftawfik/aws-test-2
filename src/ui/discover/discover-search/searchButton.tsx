import { useSearchStore } from '@/store/search';
import { useTempStore } from '@/store/temp-search';
import { BigSearchIcon } from '@/ui/svg';
import React from 'react';

const DiscoverSearchButton = () => {
    const { tempText, resetTempText } = useTempStore();
    const { setText } = useSearchStore();
    const handleSearch = () => {
        if (tempText) {
            setText(tempText);
            resetTempText();
        }
    };
    return (
        <button
            onClick={handleSearch}
            className="inline-flex appearance-none items-center justify-center rounded-lg border border-emerald-500 bg-emerald-500 p-2 shadow-md transition-colors hover:bg-emerald-600"
        >
            <BigSearchIcon />
        </button>
    );
};

export default DiscoverSearchButton;
