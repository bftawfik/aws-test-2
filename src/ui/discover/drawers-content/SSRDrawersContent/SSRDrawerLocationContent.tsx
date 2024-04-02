'use server';
import { getLangkey } from '@/helpers';
import { Location } from '@/types';
import NeighborhoodProjectSectionDrawer from '@/ui/neighbothoods/NeighborhoodProjectSectionDrawer/NeighborhoodProjectSectionDrawer';
import Image from 'next/image';
const SSRDrawerLocationContent = async ({
    location,
    locale,
}: {
    location: Location;
    locale: string;
}) => {
    return (
        <div>
            <h1 className="text-xl font-semibold capitalize leading-none text-black lg:text-2xl">
                {getLangkey(location.name, locale)}
            </h1>
            {location.image && (
                <div className="my-5 h-[400px]">
                    <Image
                        alt={location.slug}
                        src={location.image}
                        className="h-full max-h-full w-full rounded-md object-cover"
                        height={400}
                        width={400}
                    />
                </div>
            )}

            <NeighborhoodProjectSectionDrawer
                locale={locale}
                slug={location.slug}
            />
        </div>
    );
};

export default SSRDrawerLocationContent;
