import '../styles/globals.css';
import { Cairo, Poppins } from 'next/font/google';
import React from 'react';
import { NextLayout } from '@/types';
import AuthProvider from '@/ui/auth/auth-provider';
import { Header } from '@/ui/header/header';
import LayoutClientChildren from '@/ui/layout-client';
import ReactQueryProvider from '@/ui/react-query-provider';
import ConditionalFooter from '@/ui/ConditionalFooter/ConditionalFooter';
import { NextIntlClientProvider } from 'next-intl';
import { AR_LOCALE, DEFAULT_LOCALE } from '@/constants';
import Script from 'next/script';
import { cookies } from 'next/headers';
import Clarity from '@/ui/clarity/Clarity';

export const metadata = {
    title: 'Estatebook',
    description: "'Estatebook Website it's time to estatebook'",
    manifest: '/manifest.webmanifest',
};

const poppins = Poppins({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-poppins',
    weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
});

const cairo = Cairo({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-cairo',
    weight: ['200', '300', '400', '500', '600'],
});

export default async function Root({
    children,
    params: { locale },
}: NextLayout) {
    let messages;
    try {
        messages = (await import(`../../lang/${locale || DEFAULT_LOCALE}.json`))
            .default;
    } catch (error) {}

    const fontClass = locale === AR_LOCALE ? 'font-cairo' : 'font-poppins';
    const cookieStore = cookies();
    const cookieDiscoverView = cookieStore.get('discoverView');
    return (
        <html lang={locale} dir={locale === AR_LOCALE ? 'rtl' : 'ltr'}>
            <head>
                <Script id="google-tag-manager">{`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}');`}</Script>
                <Script id="google-analytics">
                    {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
            
                    gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}');
                `}
                </Script>
                <Clarity id={process.env.NEXT_PUBLIC_CLARITY_ID} />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: `
  { "@context": "https://schema.org",
 "@type": "Organization",
 "name": "Estatebook.com",
 "url": "https://estatebook.com/",
 "contactPoint": {
 "@type": "ContactPoint",
 "telephone": "17066" }}
`,
                    }}
                ></script>
            </head>
            <body
                className={`${poppins.variable} ${cairo.variable} ${fontClass}`}
            >
                <noscript>
                    <iframe
                        src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
                        height="0"
                        width="0"
                        style={{ display: 'none', visibility: 'hidden' }}
                    ></iframe>
                </noscript>

                <NextIntlClientProvider locale={locale} messages={messages}>
                    {/* <AuthProvider> */}
                    <ReactQueryProvider>
                        <LayoutClientChildren />
                        <Header />
                        <main className="pb-16 lg:pb-0">{children}</main>
                        <ConditionalFooter
                            cookieDiscoverView={cookieDiscoverView?.value}
                        />
                    </ReactQueryProvider>
                    {/* </AuthProvider> */}
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
