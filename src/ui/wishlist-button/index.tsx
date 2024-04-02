'use client';
import React, { useEffect, useState } from 'react';
import { WishlistButtonProps } from './wishlist-button';
import { RiHeartFill } from 'react-icons/ri';
import { WishlistItem, useWishlistStore } from '@/store/global';

const WishlistButton = ({ item, type, usage }: WishlistButtonProps) => {
    const [inNotAuthWishlist, setinNotAuthWishlist] = useState(false);
    // use store
    const { wishlist, setWishlist } = useWishlistStore();

    useEffect(() => {
        setinNotAuthWishlist(
            wishlist?.some((w: WishlistItem) => w.id === item.id)
        );
    }, [item, wishlist]);

    // push wishlist item
    const handlePushWishlistItem = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault();
        event.stopPropagation();
        setWishlist({ ...item, type: type });
    };

    return (
        <button
            onClick={handlePushWishlistItem}
            className={`inline-flex h-8 w-8 items-center justify-center rounded-full bg-white ${
                usage == 'inner' &&
                'group !h-10  !w-10 rounded-full border p-1 lg:hover:bg-primary'
            }`}
        >
            <RiHeartFill
                className={`h-5 w-5  ${
                    inNotAuthWishlist ? 'text-red-500' : ' text-gray-400'
                } ${usage === 'inner' && 'lg:group-hover:text-white'} `}
            />
        </button>
    );
};

export default WishlistButton;
