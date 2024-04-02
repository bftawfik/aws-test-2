import { useVerificationStore } from '@/store/global';
import { PasswordDoneIcon } from '@/ui/svg';
import { signIn } from 'next-auth/react';
import { useTranslations, useLocale } from 'next-intl';

const PasswordChanged = () => {
    // Read localization
    const locale = useLocale();

    // Read translations
    const tAuth = useTranslations('auth');

    const { loginInfo } = useVerificationStore();

    const login = async () => {
        await signIn('credentials', {
            email: loginInfo.email,
            password: loginInfo.password,
            callbackUrl: `/${locale}`,
        });
    };

    return (
        <div className="flex flex-col items-center gap-y-4">
            <PasswordDoneIcon />
            <h5 className="font-semibold">{tAuth('password_changed')}</h5>
            <p className="text-sm text-custom-grey">
                {tAuth('password_reseted_successfuly')}
            </p>
            <button
                onClick={login}
                className="flex h-11 w-full items-center justify-center gap-2 space-y-2 rounded-md bg-primary text-sm font-semibold capitalize text-white duration-300 hover:bg-primary/90 focus:bg-primary focus:outline-none"
            >
                {tAuth('sign_in')}
            </button>
        </div>
    );
};

export default PasswordChanged;
