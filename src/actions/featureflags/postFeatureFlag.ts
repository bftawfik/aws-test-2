import { FeatureFlagNames } from '@/featureflags/FeatureFlagNames';
import { headers } from 'next/headers';

const postFeatureFlag = async (keys: FeatureFlagNames[]) => {
    const headersList = headers();
    const host = headersList.get('host');
    const response = await fetch(`http://${host}/api/featureflags`, {
        method: 'POST',
        headers: { 'accept-language': 'lang', origin: host || '' },
        body: JSON.stringify({ keys: keys }),
    });
    return await response.json();
};

export { postFeatureFlag };
