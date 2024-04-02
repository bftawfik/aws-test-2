'use client';

import { getSession, signIn, useSession, signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { toast } from 'react-toastify';
import { setOnLocalStorage, successHandler } from '@/helpers';
import PasswordShow from '@/ui/show-hide-password';
import FacebookLogin from '../facebook-login';
import GoogleLogin from '../google-login';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';

interface LoginFormProps {
    openSignUpModal: () => void;
    openForgetPasswordModal: () => void;
    closeModal: () => void;
    locale: string;
}
type FormValues = {
    name: string;
    email: string;
    password: string;
};

const LoginForm = ({
    openSignUpModal,
    openForgetPasswordModal,
    closeModal,
    locale,
}: LoginFormProps) => {
    // Read translations
    const tAuth = useTranslations('auth');

    const [password, setPassword] = useState('');
    const { data: session, status } = useSession();

    // loading state
    const [loading, setLoading] = useState(false);

    // form handling
    const {
        register,
        control,
        handleSubmit,
        formState: { errors, touchedFields },
    } = useForm<FormValues>({
        mode: 'onChange',
    });

    const router = useRouter();
    // login submit
    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        setLoading(true);
        await signIn('credentials', {
            email: data.email,
            password: password,
            redirect: false,
        });
        closeModal();
        try {
            const session = await getSession();
            if (session && !session?.auth?.message) {
                successHandler(tAuth('successMessage'));
                router.refresh();
                setCookie('_token', session?.auth?.meta?.token);
                setOnLocalStorage('project.WishlistItems', []);
                setOnLocalStorage('unit.WishlistItems', []);
            } else {
                toast.error(
                    session?.auth?.message
                        ? session?.auth?.message
                        : 'Email or password incorrect',
                    {
                        theme: 'colored',
                    }
                );
                await signOut({ redirect: false });
                router.refresh();
            }
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error(error);
        }
        setLoading(false);
    };

    useEffect(() => {
        if (
            status === 'authenticated' &&
            session &&
            session?.auth &&
            session?.auth?.id
        ) {
            closeModal();
        }
    }, [session, status, closeModal]);

    return (
        <>
            <div className="space-y-4">
                <div>
                    <span className="text-xs capitalize text-grey-400">
                        {tAuth('login_to_your_account')}
                    </span>
                </div>
                <form
                    className="flex flex-col gap-y-4"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className="space-y-1">
                        <label
                            htmlFor="email"
                            className="block text-sm leading-6 text-gray-900"
                        >
                            {tAuth('email_address')}
                        </label>
                        <div>
                            <input
                                type="email"
                                id="email"
                                {...register('email', {
                                    required: tAuth('email_is_required'),
                                    pattern: {
                                        value: /\S+@\S+\.\S+/,
                                        message: tAuth('invalid_email'),
                                    },
                                })}
                                placeholder={tAuth('enter_your_mail')}
                                className={`block w-full rounded-md border bg-transparent  py-1.5 ps-4 text-xs text-gray-900 placeholder:text-xs placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6 ${
                                    touchedFields.email && errors.email
                                        ? 'border-red-500'
                                        : 'border-grey-200 focus:ring-1 focus:ring-primary'
                                }`}
                            />
                            {touchedFields.email && errors.email && (
                                <p className="my-1 text-xs text-red-500">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="space-y-1">
                        <label className="block text-sm leading-6 text-gray-900">
                            {tAuth('password')}
                        </label>
                        <div>
                            <Controller
                                name="password"
                                control={control}
                                render={({ field }) => (
                                    <PasswordShow
                                        id="password"
                                        onInputChange={(inputValue: string) => {
                                            setPassword(inputValue);
                                            field.onChange(inputValue);
                                        }}
                                        {...register('password', {
                                            required:
                                                tAuth('password_required'),
                                            minLength: {
                                                value: 8,
                                                message: tAuth(
                                                    'password_8_characters'
                                                ),
                                            },
                                        })}
                                    />
                                )}
                                rules={{ required: true }}
                            />
                            {errors.password && (
                                <p className="my-1 text-xs text-red-500">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="focus:text-green focus:bg-text-green hover:bg-text-primary/90 flex h-11 w-full items-center justify-center gap-2 space-y-2 rounded-md bg-primary text-sm font-semibold capitalize text-white duration-300 focus:outline-none"
                    >
                        {loading && (
                            <AiOutlineLoading3Quarters className="h-4 w-4 animate-spin" />
                        )}

                        {tAuth('sign_in')}
                    </button>
                </form>

                <div className="flex items-center justify-between gap-1 text-xs capitalize text-grey-400">
                    <p className="space-x-2">
                        {tAuth('dont_have_account')}

                        <button
                            className="ms-1 text-primary"
                            onClick={openSignUpModal}
                        >
                            {tAuth('sign_up_here')}
                        </button>
                    </p>

                    {/* TODO: disable forget password until functionality being done */}

                    <span
                        className="cursor-pointer"
                        onClick={openForgetPasswordModal}
                    >
                        {tAuth('forget_password')}
                    </span>
                </div>
                <div className="inline-flex w-full items-center justify-center">
                    <hr className="my-5 h-px w-full border-0 bg-gray-200 " />
                    <span className="absolute left-1/2 -translate-x-1/2 bg-white px-3 uppercase text-grey-500">
                        {tAuth('or')}
                    </span>
                </div>
                <div className="flex gap-4">
                    <FacebookLogin locale={locale} />
                    <GoogleLogin locale={locale} />
                </div>
            </div>
        </>
    );
};

export default LoginForm;
