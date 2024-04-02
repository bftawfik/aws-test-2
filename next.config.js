/** @type {import('next').NextConfig} */

const withNextIntl = require('next-intl/plugin')('./src/i18n.ts');

const nextConfig = withNextIntl({
    images: {
        domains: [
            'api.theestatebook.net',
            'images.pexels.com',
            'images.unsplash.com',
            'estatebook-files.s3.eu-central-1.amazonaws.com',
        ],
    },
    env: {
        BASE_URL: 'https://api.theestatebook.net/api/v1',
    },
    experimental: {
        serverActions: true,
    },
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'Strict-Transport-Security',
                        value: 'max-age=63072000; includeSubDomains; preload',
                    },
                ],
            },
        ];
    },
});

module.exports = nextConfig;
