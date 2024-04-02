import { FeatureFlag } from './featureflag';
import { featureFlagsList as developFeatureFlags } from './Lists/develop';
import { featureFlagsList as stagingFeatureFlags } from './Lists/staging';
import { featureFlagsList as masterFeatureFlags } from './Lists/master';
import { developHosts, stagingHosts, masterHosts } from './hosts';

const getFeatureFlagsList = (host: string | null) => {
    if (host == null) {
        return developFeatureFlags;
    }
    const isDevelop = developHosts.includes(host);
    const isStaging = stagingHosts.includes(host);
    const isMaster = masterHosts.includes(host);
    return isDevelop
        ? developFeatureFlags
        : isStaging
        ? stagingFeatureFlags
        : isMaster
        ? masterFeatureFlags
        : developFeatureFlags;
};

const getFeatureFlag = (key: string, featureFlagList: FeatureFlag[]) => {
    const flage = featureFlagList.find((flag) => flag.name === key);
    return flage ? flage.active : false;
};
const getDevelopFeatureFlags = (keys: string[], host: string | null) => {
    const featureFlagList = getFeatureFlagsList(host);
    return keys.reduce(
        (acc, key) => ({ ...acc, [key]: getFeatureFlag(key, featureFlagList) }),
        {}
    );
};

export { getDevelopFeatureFlags };
