'use client';
import { useTranslations } from 'next-intl';

const SoldOut = ({ type }: { type: 'unit' | 'project' }) => {
    const tGlobal = useTranslations('global');

    return (
        <div className="w-auto shrink-0 rounded-lg bg-danger p-2 text-center text-[10px] font-semibold uppercase text-white">
            {type === 'unit'
                ? tGlobal('unit_sold_out') || ''
                : tGlobal('project_sold_out') || ''}
        </div>
    );
};

export default SoldOut;
