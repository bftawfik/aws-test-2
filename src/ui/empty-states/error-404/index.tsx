import React from 'react';
import { Error404Icon } from '@/ui/svg';
import { useTranslations } from 'next-intl';

const Error404 = () => {
    // Read translations
    const tEmptyState = useTranslations('empty_state');

    return (
        <section className="h-full p-3">
            <div className="flex flex-col items-center justify-center  gap-4">
                <Error404Icon />
                <div className="mx-2 flex w-full flex-col items-center gap-3">
                    <h1 className="font-bold sm:text-lg  md:text-2xl md:font-extrabold">
                        {tEmptyState('ops')}
                    </h1>
                    <p className="text-sm text-[#5F5F5F] sm:text-xs  md:text-sm">
                        {tEmptyState('go')}
                        <button className="pointer-cursor text-emerald-500">
                            {tEmptyState('Home')}
                        </button>
                        {tEmptyState('page')}
                    </p>
                </div>
            </div>
        </section>
    );
};
export default Error404;
