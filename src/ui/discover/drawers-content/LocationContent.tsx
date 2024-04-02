import { getLangkey } from '@/helpers';
import { Location } from '@/types';
import NeighborhoodProjectSectionDrawer from '@/ui/neighbothoods/NeighborhoodProjectSectionDrawer/NeighborhoodProjectSectionDrawer';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useLocale } from 'next-intl';

export const LocationContent = ({
    neighborhood,
}: {
    neighborhood: Location;
}) => {
    // Read localization
    const locale = useLocale();

    const [drawerFooterHeight, setdrawerFooterHeight] = useState(80);
    const drawerFooterRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setdrawerFooterHeight(drawerFooterRef?.current?.offsetHeight || 0);
    }, []);

    return (
        <>
            <div style={{ paddingBottom: `${drawerFooterHeight + 20}px` }}>
                <h2 className="text-xl font-semibold capitalize leading-none text-black lg:text-2xl">
                    {getLangkey(neighborhood.name, locale)}
                </h2>
                {neighborhood.image && (
                    <div className="my-5 h-[400px]">
                        <Image
                            alt={neighborhood.slug}
                            src={neighborhood.image}
                            className="h-full max-h-full w-full rounded-md object-cover"
                            height={400}
                            width={400}
                        />
                    </div>
                )}

                <NeighborhoodProjectSectionDrawer
                    locale={locale}
                    slug={neighborhood.slug}
                />
            </div>
        </>
    );
};
