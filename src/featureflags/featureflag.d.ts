import { FeatureFlagNames } from './FeatureFlagNames';
import { UserNames } from './userNames';
interface FeatureFlag {
    name: keyof typeof FeatureFlagNames;
    sprint: string;
    ticket?: string;
    user: keyof typeof UserNames;
    active: boolean;
}

export { FeatureFlag };
