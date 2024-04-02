import BorderedCheckbox from '@/ui/bordered-checkbox';
import React from 'react';
import { UniquList, getLangkey } from '@/helpers';
import { useTempStore } from '@/store/temp-search';
import { useSearchStore } from '@/store/search';
import { Amenity } from '@/types';
import { useTranslations, useLocale } from 'next-intl';
export interface AmenitiesSectionProps {
    amenitiesList: Amenity[];
}

const AmenitiesSection = ({ amenitiesList }: AmenitiesSectionProps) => {
    // Read localization
    const locale = useLocale();

    // Read translations
    const tGlobal = useTranslations('global');

    const { tempAmenities, setTempAmenities, setAllAmenities } = useTempStore();
    const { amenities } = useSearchStore();
    const amenitiesValues = tempAmenities ? tempAmenities : amenities;
    const handleAmenities = (amenity: { id: number; name: string }) => {
        tempAmenities === null
            ? setAllAmenities(UniquList(amenities, amenity))
            : setTempAmenities(amenity);
    };
    return (
        <div className="w-full justify-between gap-2 border-t p-2">
            <div className="my-2 flex items-center gap-3">
                <p className="my-2 text-sm font-semibold capitalize">
                    {tGlobal('amenities')}
                </p>
            </div>
            <div>
                <ul className="flex flex-wrap gap-3 lg:grid  lg:grid-cols-4 lg:gap-3">
                    {amenitiesList.map((amenity) => (
                        <BorderedCheckbox
                            checked={amenitiesValues.some(
                                (item) => item.id === amenity.id
                            )}
                            onChange={() =>
                                handleAmenities({
                                    id: amenity.id,
                                    name:
                                        getLangkey(amenity.name, locale) || '',
                                })
                            }
                            key={`amenity-${amenity.id}`}
                            id={`amenity-${amenity.id}`}
                            label={getLangkey(amenity.name, locale)}
                        />
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AmenitiesSection;
