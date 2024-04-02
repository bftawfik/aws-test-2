import BorderedCheckbox from '@/ui/bordered-checkbox';
import React from 'react';
import { UnitFeatures } from '@/types';
import { useTempStore } from '@/store/temp-search';
import { useSearchStore } from '@/store/search';
import { UniquList } from '@/helpers';
import { useTranslations, useLocale } from 'next-intl';

const FeaturesSection = ({
    featuresData,
}: {
    featuresData: UnitFeatures[];
}) => {
    // Read translations
    const tGlobal = useTranslations('global');

    const { unitFeatures } = useSearchStore();
    const { tempUnitFeatures, setTempFeatures, setAllTempFeatures } =
        useTempStore();
    const handleTempFeature = (feature: { id: number; name: string }) => {
        tempUnitFeatures === null
            ? setAllTempFeatures(UniquList(unitFeatures, feature))
            : setTempFeatures(feature);
    };
    const featuresList = tempUnitFeatures ? tempUnitFeatures : unitFeatures;

    return (
        <div className="w-full justify-between gap-2 border-t p-2">
            <div className="my-2 flex items-center gap-3 ">
                <p className="my-2 text-sm font-semibold capitalize">
                    {tGlobal('features')}
                </p>
            </div>
            <div className="py-3">
                <ul className="grid grid-cols-2 items-center gap-2 lg:flex lg:flex-wrap lg:gap-2">
                    {featuresData?.map((feature, index) => (
                        <BorderedCheckbox
                            key={`${index}-fd`}
                            id={`${index}-fd`}
                            checked={featuresList?.some(
                                (val) => val.id === feature.id
                            )}
                            onChange={() =>
                                handleTempFeature({
                                    id: feature.id,
                                    name: feature.name,
                                })
                            }
                            label={
                                <div className="flex items-center gap-2">
                                    <p className="capitalize">{feature.name}</p>
                                </div>
                            }
                        />
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default FeaturesSection;
