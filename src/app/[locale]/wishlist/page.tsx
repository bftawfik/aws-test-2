import Breadcrumbs from '@/ui/breadcrumbs';
import WishlishClient from '@/ui/wishlist-client';
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
        title: tMeta('wishlist_title'),
        description: tMeta('wishlist_description'),
    };
}

interface WishlistProps {
    params: { locale: string };
}
const Wishlist = async ({ params }: WishlistProps) => {
    const { locale } = params;
    const tGlobal = await getTranslations('global');
    const tWishlist = await getTranslations('wishlist');

    const urlLocaleSegment = getUrlLocaleSegment(locale);

    const pages = [
        { name: tGlobal('home'), href: `${urlLocaleSegment}/`, current: false },
        {
            name: tWishlist('wishlist'),
            href: '/wishlist',
            current: true,
        },
    ];

    return (
        <>
            <div className="es-container w-full">
                <Breadcrumbs pages={pages} />
                <WishlishClient locale={locale} />
            </div>
        </>
    );
};

export default Wishlist;
