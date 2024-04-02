'use client';

import { useState } from 'react';
import getOffer from '@/actions/getOffer';
import { Unit } from '@/types';
import { useTranslations } from 'next-intl';
import DownloadIcon from '../svg/DownloadIcon';
import Link from 'next/link';

const SalesOffer = ({ unit }: { unit: Unit }) => {
    // use translation
    const tGlobal = useTranslations('global');
    const [loading, setLoading] = useState(true);
    const [offerLink, setOfferLink] = useState(undefined);
    const fetchOffer = async () => {
        const offer = await getOffer(unit.id);
        setOfferLink(offer.download_link);
        setLoading(false);
    };
    fetchOffer();
    return (
        <div className="flex">
            {!loading && offerLink ? (
                <Link
                    href={offerLink}
                    target={'_blank'}
                    className={` group flex w-auto cursor-pointer items-center justify-center gap-2 rounded-lg border border-gray-200 bg-primary px-4 py-[10px] text-sm font-medium capitalize text-white duration-300 hover:border-primary hover:bg-primary hover:text-white`}
                >
                    <DownloadIcon className="h-5 w-5" />
                    {tGlobal('unit_proposal')}
                </Link>
            ) : null}
        </div>
    );
};

export default SalesOffer;
