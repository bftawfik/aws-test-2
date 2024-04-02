'use client';
import { useSession } from 'next-auth/react';
import { socialPopupWindow } from '..';
import { FcGoogle } from 'react-icons/fc';
import { useLocale, useTranslations } from 'next-intl';

export default function GoogleLogin({ locale }: { locale: string }) {
    const { status } = useSession();

    const tAuth = useTranslations('auth');

    if (status === 'loading') {
        return (
            <div
                className={`flex w-full animate-pulse items-center gap-2 rounded-lg bg-grey-100 px-2 py-3 text-xs font-medium text-grey-500 transition-colors`}
            >
                <div className="mb-4 h-2.5 w-48 rounded-full bg-gray-200"></div>
                <div className="mb-4 h-2.5 w-48 rounded-full bg-gray-200"></div>
            </div>
        );
    }
    return (
        <button
            className={`flex w-full items-center gap-x-2 rounded-lg bg-grey-100 px-2 py-3 text-xs font-medium text-grey-500 transition-colors`}
            onClick={() =>
                socialPopupWindow(
                    'signin-redirect?platform=google',
                    'Sign In With Google',
                    locale
                )
            }
        >
            <FcGoogle size={20} />

            {tAuth('sign_in_with_google')}
        </button>
    );
}
