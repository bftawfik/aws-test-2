import React from 'react';
import { ImagePlaceholder } from '@/ui/image-placeholder';
import { getLangkey } from '@/helpers';
import { Amenity } from '@/types';
import { useLocale } from 'next-intl';

export interface AmenitiesShowProps {
    amenities: Amenity[];
}
const AmenitiesShow = ({ amenities }: AmenitiesShowProps) => {
    // Read localization
    const locale = useLocale();

    return (
        <ul className="grid grid-cols-3 gap-2 overflow-hidden overflow-x-scroll lg:grid-cols-5 lg:gap-5">
            {amenities.map((amenity) => (
                <li
                    key={`amenity-${amenity.id}`}
                    className="flex flex-col gap-y-4"
                >
                    <div className="flex h-[102px] items-center justify-center rounded-lg border border-[#E4E4E4]">
                        <div className="h-full w-full">
                            <div className="flex h-full w-full items-center justify-center">
                                <ImagePlaceholder
                                    classes="h-12 w-12"
                                    image={amenity?.logo || ''}
                                    errorClasses="h-12 w-12"
                                />
                            </div>
                        </div>
                    </div>
                    <h4 className="text-center text-base font-normal text-black">
                        {getLangkey(amenity.name, locale)}
                    </h4>
                </li>
            ))}
        </ul>
    );
};

export default AmenitiesShow;
