import { FeatureFlagNames } from '../FeatureFlagNames';
import { FeatureFlag } from '../featureflag';
import { UserNames } from '../userNames';
export const featureFlagsList: FeatureFlag[] = [
    {
        name: FeatureFlagNames.TEST,
        sprint: 'test sprint name',
        user: UserNames.BISHOY_KHALIL,
        active: true,
    },
];
