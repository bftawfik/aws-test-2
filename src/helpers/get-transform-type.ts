import { Platform } from '@/types';
import { headers } from 'next/headers';

export function getTransformType() {
    const userAgent = headers().get('user-agent')!;
    const matchedPlatform = userAgent.match('iPhone|iPad|Macintosh');
    const platform = (matchedPlatform ? matchedPlatform[0] : '') as Platform;

    return ['iPhone', 'iPad'].includes(platform!)
        ? 'transform-gpu'
        : 'transform-cpu';
}
