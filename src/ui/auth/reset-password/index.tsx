'use client';

import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import PasswordShow from '@/ui/show-hide-password';
import Link from 'next/link';
import { Logo } from '@/ui/svg';
import { useVerificationStore } from '@/store/global';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import setResetPassword from '@/actions/auth/setResetPassword';
import { errorHandler, successHandler } from '@/helpers';
import { useTranslations, useLocale } from 'next-intl';
import { DEFAULT_LOCALE } from '@/constants';
import EstatebookLogo from '@/ui/EstatebookLogo/EstatebookLogo';

interface ResetPasswordData {
    password: string | number;
    password_confirmation: string | number;
}
const ResetPasswordForm = () => {
    // Read localization
    const locale = useLocale();

    // Read translations
    const tAuth = useTranslations('auth');

    const [loading, setLoading] = useState(false);
    const { verificationToken, setVerificationView, setLoginInfo } =
        useVerificationStore();

    const {
        register,
        handleSubmit,
        watch,
        control,
        formState: { errors, touchedFields },
    } = useForm<ResetPasswordData>({
        mode: 'all',
    });
    const password = watch('password'); // Get the value of the 'password' field

    const onSubmit: SubmitHandler<ResetPasswordData> = async (data) => {
        setLoading(true);
        const formData = {
            token: verificationToken,
            ...data,
        };
        const res = await setResetPassword(formData);
        const jsonRes = await res.json();

        if (res.ok) {
            successHandler(jsonRes?.message);
            setVerificationView('password-changed');
            setLoginInfo('email', jsonRes.data.email);
            setLoginInfo('password', data.password_confirmation);
            return;
        } else {
            errorHandler(jsonRes.errors || jsonRes.message);
        }
        setLoading(false);
    };

    return (
        <>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="mx-w-md w-3/12 space-y-6 rounded-2xl px-3 py-5"
            >
                <Link
                    href={`${locale === DEFAULT_LOCALE ? '/' : `/${locale}`}`}
                    prefetch={false}
                >
                    <EstatebookLogo isNewBranding={true} />
                </Link>
                <div>
                    <p className="text-base font-semibold capitalize">
                        {tAuth('create_new_password')}
                    </p>
                </div>
                <div>
                    <label className="block text-sm leading-6 text-gray-900">
                        {tAuth('password')}
                    </label>
                    <Controller
                        name="password"
                        control={control}
                        render={({ field }) => (
                            <PasswordShow
                                id="password"
                                onInputChange={(inputValue: string) => {
                                    field.onChange(inputValue);
                                }}
                                {...register('password', {
                                    required: tAuth('password_required'),
                                    minLength: {
                                        value: 8,
                                        message: tAuth('password_8_characters'),
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
                <div>
                    <label className="block text-sm leading-6 text-gray-900">
                        {tAuth('confirm_password')}
                    </label>
                    <Controller
                        name="password_confirmation"
                        control={control}
                        render={({ field }) => (
                            <PasswordShow
                                id="password_confirmation"
                                onInputChange={(inputValue: string) => {
                                    field.onChange(inputValue);
                                }}
                                {...register('password_confirmation', {
                                    required: tAuth('password_required'),
                                    minLength: {
                                        value: 8,
                                        message: tAuth('password_8_characters'),
                                    },
                                })}
                            />
                        )}
                        rules={{
                            required: true,
                            validate: (value) =>
                                value === password || 'Passwords do not match',
                        }}
                    />
                    {errors.password_confirmation && (
                        <p className="my-1 text-xs text-red-500">
                            {errors.password_confirmation.message}
                        </p>
                    )}
                </div>
                <button
                    type="submit"
                    className="focus:text-green focus:bg-text-green hover:bg-text-primary/90 flex h-11 w-full items-center justify-center gap-2 space-y-2 rounded-md bg-primary text-sm font-semibold capitalize text-white duration-300 focus:outline-none"
                >
                    {loading && (
                        <AiOutlineLoading3Quarters className="h-4 w-4 animate-spin" />
                    )}

                    {tAuth('reset_password')}
                </button>
            </form>
        </>
    );
};

export default ResetPasswordForm;
