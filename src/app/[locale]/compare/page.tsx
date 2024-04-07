import Breadcrumbs from '@/ui/breadcrumbs';
import CompareClient from '@/ui/compare-client';
import { getTranslations } from 'next-intl/server';
import { getUrlLocaleSegment } from '@/helpers/getUrlLocaleSegment';
import { Metadata } from 'next';

export async function generateMetadata({
    params,
}: {
    params: { locale: string };
}): Promise<Metadata> {
    const { locale } = params;
    const tMeta = await getTranslations('meta');

    return {
        title: tMeta('compare_title'),
        description: tMeta('compare_discription'),
    };
}

interface CompareProps {
    params: { locale: string };
}
const Compare = async ({ params }: CompareProps) => {
    const { locale } = params;
    const tGlobal = await getTranslations('global');
    const tCompare = await getTranslations('compare');
    const urlLocaleSegment = getUrlLocaleSegment(locale);

    const pages = [
        { name: tGlobal('home'), href: `${urlLocaleSegment}/`, current: false },
        { name: tCompare('compare'), href: '/compare', current: true },
    ];

    return (
        <>
            <div className="es-container w-full">
                <Breadcrumbs pages={pages} />
                <h1 className="mb-4 text-base font-semibold capitalize text-black md:text-[20px]">
                    {tCompare('compare_list')}
                </h1>
                <CompareClient />
            </div>
        </>
    );
};

export default Compare;
