import type { Config } from 'tailwindcss';

export default {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/ui/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                primary: '#4CB087',
                secondary: '#74D8AF',
                info: '#7DAFFF',
                warning: '#DAA100',
                danger: '#DA4242',
                black: '#000000',
                'custom-grey': '#5F5F5F',
                'custom-dark': '#0B0B0B',
                'custom-light': '#F9F9F9',
                'grey-50': '#fafafa',
                'grey-100': '#f5f5f5',
                'grey-200': '#e5e5e5',
                'grey-300': '#d4d4d4',
                'grey-400': '#a3a3a3',
                'grey-500': '#737373',
                'grey-900': 'rgba(0, 0, 0, 0.7)',
            },
            zIndex: {
                drawer: '500',
                gallery: '600',
            },
        },
        fontFamily: {
            poppins: ['var(--font-poppins)'],
            cairo: ['var(--font-cairo)'],
        },
        dropShadow: {
            search: '0 3px 10px rgba(0,0,0,0.1)',
            header: '0px -2px 20px rgba(0, 0, 0, 0.06)',
            'developer-card': '0px 0px 49px rgba(0, 0, 0, 0.05)',
        },
    },
    plugins: [],
} satisfies Config;
