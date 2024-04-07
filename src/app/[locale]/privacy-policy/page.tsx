import { AR_LOCALE } from '@/constants';
import Breadcrumbs from '@/ui/breadcrumbs';
import ArContent from '@/ui/privacy/ArContent/ArContent';
import EnContent from '@/ui/privacy/EnContent/EnContent';
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
        title: tMeta('privacy_title'),
        description: tMeta('privacy_description'),
    };
}

interface PrivacyPolicyProps {
    params: { locale: string };
}

export default async function PrivacyPolicy({ params }: PrivacyPolicyProps) {
    const { locale } = params;
    const tGlobal = await getTranslations('global');
    const urlLocaleSegment = getUrlLocaleSegment(locale);

    const pages = [
        { name: tGlobal('home'), href: `${urlLocaleSegment}/`, current: false },
        {
            name: tGlobal('privacy_policy'),
            href: '/privacy-policy',
            current: true,
        },
    ];
    return (
        <>
            <div className="es-container mx-auto  px-6 ">
                <div className="my-2">
                    <Breadcrumbs pages={pages} />
                </div>
                {locale === AR_LOCALE ? <ArContent /> : <EnContent />}
            </div>
        </>
    );
}
