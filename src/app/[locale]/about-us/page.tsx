import Breadcrumbs from '@/ui/breadcrumbs';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import { emptyCountryCode, hotline } from '@/constants';
import { getUrlLocaleSegment } from '@/helpers/getUrlLocaleSegment';

export async function generateMetadata({
    params,
}: {
    params: { locale: string };
}): Promise<Metadata> {
    const { locale } = params;
    const tMeta = await getTranslations('meta');
    return {
        title: tMeta('about_us_title'),
        description: tMeta('about_us_description'),
    };
}
interface AboutUsProps {
    params: { locale: string };
}
export default async function AboutUs({ params }: AboutUsProps) {
    const { locale } = params;
    const tGlobal = await getTranslations('global');
    const tAboutUs = await getTranslations('aboutus');
    const urlLocaleSegment = getUrlLocaleSegment(locale);

    const pages = [
        { name: tGlobal('home'), href: `${urlLocaleSegment}/`, current: false },
        {
            name: tGlobal('about_us'),
            href: '/privacy-policy',
            current: true,
        },
    ];
    return (
        <div className="es-container mx-auto  px-6 ">
            <div className="my-2">
                <Breadcrumbs pages={pages} />
            </div>
            <article className="mx-auto max-w-2xl py-16 text-center">
                <h1 className="text-xl font-semibold capitalize leading-none text-black lg:text-2xl">
                    {tAboutUs('about_us')}
                </h1>
                <section className="my-8 space-y-8">
                    <h5 className="text-center text-lg font-medium">
                        {tAboutUs('about_heading')}
                        <span className="font-black text-primary">
                            &nbsp;Estate
                        </span>{' '}
                        <span className="-ml-1 font-black">Book</span>
                    </h5>{' '}
                    <p className="px-5 leading-7 text-[#5F5F5F]">
                        {tAboutUs('about_description')}
                    </p>{' '}
                    <aside className="font-semibold">
                        <p className="text-xl uppercase md:text-2xl">
                            {tAboutUs('hotline')}
                        </p>
                        <a
                            href={`tel:${emptyCountryCode}${hotline}`}
                            className="font-poppins text-2xl text-primary md:text-4xl"
                        >
                            {hotline}
                        </a>
                    </aside>
                </section>
            </article>
        </div>
    );
}
