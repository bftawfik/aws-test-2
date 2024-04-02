import { DEFATULT_EMPTY_URL } from '@/constants';
import { useGenerateUrl } from '@/hooks/useGenerateUrl/useGenerateUrl';
import { useSearchStore } from '@/store/search';
import { useRouter } from 'next/navigation';
import React from 'react';

import { useTranslations } from 'next-intl';

const ResetButton = () => {
    // Read translations
    const tGlobal = useTranslations('global');

    const { tab } = useSearchStore();
    const router = useRouter();

    const resetUrl = useGenerateUrl({ ...DEFATULT_EMPTY_URL, tempTab: tab });
    const handleReset = () => {
        router.push(resetUrl);
    };
    return (
        <button
            onClick={handleReset}
            className="text-sm capitalize text-primary duration-100 hover:opacity-70"
        >
            {tGlobal('reset_all')}
        </button>
    );
};

export default ResetButton;
