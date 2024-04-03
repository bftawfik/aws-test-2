import createIntlMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import {
    EN_LOCALE,
    AR_LOCALE,
    DEFAULT_LOCALE,
    gstaticMaps,
    baseUrlLink,
    devURL,
    gStatic,
    googleUrl,
    googleApi,
    googleFonts,
    flagsSource,
    googleusercontent,
    fontsUrl,
    vercelLive,
    w3Pusher,
    gTagManager,
    gAnalytics,
    msCarity,
    msBing,
    swiper,
    msCarityA,
    msCarityB,
    msCarityC,
    msCarityD,
    msCarityE,
    msCarityF,
    msCarityG,
    msCarityH,
    msCarityI,
    msCarityJ,
    msCarityK,
    msCarityL,
    msCarityM,
    msCarityN,
    msCarityO,
    msCarityP,
    msCarityQ,
    msCarityR,
    msCarityS,
    msCarityT,
    msCarityU,
    msCarityV,
    msCarityW,
    msCarityX,
    msCarityY,
    msCarityZ,
} from '@/constants';

const NODE_ENV = process.env.NODE_ENV;

export default async function middleware(request: NextRequest) {
    const nonce = Buffer.from(crypto.randomUUID()).toString('base64');

    const cspHeader = `
    default-src *;
    script-src 'self' 'unsafe-inline' 'unsafe-eval' ${vercelLive} ${googleApi} ${gTagManager} ${gAnalytics} ${msCarity} ${msBing} ${msCarityA} ${msCarityB} ${msCarityC} ${msCarityD} ${msCarityE} ${msCarityF} ${msCarityG} ${msCarityH} ${msCarityI} ${msCarityJ} ${msCarityK} ${msCarityL} ${msCarityM} ${msCarityN} ${msCarityO} ${msCarityP} ${msCarityQ} ${msCarityR} ${msCarityS} ${msCarityT} ${msCarityU} ${msCarityV} ${msCarityW} ${msCarityX} ${msCarityY} ${msCarityZ};
    style-src 'self' ${googleFonts} 'unsafe-inline';
    connect-src 'self' https: ${baseUrlLink} ${googleApi} ${googleUrl} ${gStatic} data: blob: ${w3Pusher}  ${gAnalytics} 'unsafe-inline' 'unsafe-eval';
    img-src 'self' blob: data: https: ${googleApi} ${gStatic} ${flagsSource} ${googleUrl} ${googleusercontent} ${baseUrlLink}  ${gAnalytics} ;
    font-src 'self' data: ${fontsUrl} ${devURL} ${swiper};
    object-src 'none';
    base-uri 'self';
    form-action 'self'  ${baseUrlLink};
    frame-ancestors 'none';
    block-all-mixed-content;
    upgrade-insecure-requests;`;

    const requestHeaders = new Headers();
    requestHeaders.set('x-nonce', nonce);
    // requestHeaders.set(
    //     'Content-Security-Policy',
    //     // Replace newline characters and spaces
    //     cspHeader.replace(/\s{2,}/g, ' ').trim()
    // );
    const url = new URL(request.url);
    const pathname = url.pathname;
    const handleI18nRouting = createIntlMiddleware({
        locales: [EN_LOCALE, AR_LOCALE],
        defaultLocale: DEFAULT_LOCALE,
        localeDetection: false,
    });
    const response = await handleI18nRouting(request);
    if (NODE_ENV !== 'development') {
        response.headers.set('x-default-locale', DEFAULT_LOCALE);
        response.headers.set('x-nonce', nonce);
        response.headers.set(
            'Content-Security-Policy',
            cspHeader.replace(/\s{2,}/g, ' ').trim()
        );
        response.headers.set('x-invoke-path', pathname);
    }
    NextResponse.next({
        headers: response.headers, // Pass the headers from the response
        request: request, // You can also pass the request object if needed
    });
    return response;
}

export const config = {
    // Matcher ignoring `/_next/` and `/api/`
    matcher: [
        '/((?!api|_next/static|_next/image|assets|images|public|icons|images/icons|favicon.ico|sw.js).*)',
    ],
};
