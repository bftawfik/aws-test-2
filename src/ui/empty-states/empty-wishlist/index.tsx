import { EmptyWishlistIcon } from '@/ui/svg';
import { useTranslations } from 'next-intl';

const EmptyWishlist = () => {
    // Read translations
    const tEmptyState = useTranslations('empty_state');

    return (
        <section className="p-3">
            <div className="flex flex-col items-center justify-center  gap-4">
                <EmptyWishlistIcon />
                <div className="flex w-full flex-col items-center gap-3">
                    <h1 className="text-2xl font-extrabold">
                        {tEmptyState('empty_wishlist')}
                    </h1>
                    <p className="text-sm text-[#5F5F5F]">
                        {tEmptyState('empty_wishlist_description')}
                    </p>
                </div>
            </div>
        </section>
    );
};
export default EmptyWishlist;
