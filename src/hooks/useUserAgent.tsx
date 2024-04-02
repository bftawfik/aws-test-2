import { useEffect, useState } from 'react';
import UAParser, { IBrowser, ICPU, IDevice, IEngine, IOS } from 'ua-parser-js';

export interface UserAgentDescriptor {
    os: IOS;
    browser: IBrowser;
    cpu: ICPU;
    device: IDevice;
    engine: IEngine;
}

const useUserAgent = () => {
    const uastring =
        typeof window !== 'undefined' ? window?.navigator?.userAgent : '';
    const [state, setState] = useState<UserAgentDescriptor | null>(null);

    useEffect(() => {
        let didRun = true;

        try {
            const uaParser = new UAParser(uastring);

            const uaDescriptor: UserAgentDescriptor = {
                os: uaParser.getOS(),
                browser: uaParser.getBrowser(),
                cpu: uaParser.getCPU(),
                device: uaParser.getDevice(),
                engine: uaParser.getEngine(),
            };

            if (didRun) setState(uaDescriptor);
        } catch (error) {
            if (didRun) setState(null);
        }

        return () => {
            didRun = false;
        };
    }, [uastring]);

    return state;
};

export default useUserAgent;
