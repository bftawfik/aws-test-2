'use client';

import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import setForgetPassword from '@/actions/setForgetPassword';
import { errorHandler, successHandler } from '@/helpers';
import { useVerificationStore } from '@/store/global';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

interface ForgetPasswordFormProps {
    openLoginModal: () => void;
    closeModal: () => void;
}
type FormValues = {
    email: string;
};

const ForgetPasswordForm = ({
    openLoginModal,
    closeModal,
}: ForgetPasswordFormProps) => {
    // Read translations
    const tAuth = useTranslations('auth');

    const { push } = useRouter();
    const { setOtpEmail, setVerificationToken } = useVerificationStore();
    // set error message
    const [isBlocked, setIsBlocked] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');

    // loading state
    const [loading, setLoading] = useState(false);
    // form handling
    const {
        register,
        handleSubmit,
        formState: { errors, touchedFields },
    } = useForm<FormValues>({
        mode: 'onChange',
    });

    //  submit
    const onSubmit: SubmitHandler<FormValues> = async (formData) => {
        setLoading(true);
        const res = await setForgetPassword(formData);
        setOtpEmail(formData.email);
        setLoading(false);
        // handle error
        const jRes = await res.json();
        if (res.ok) {
            closeModal();
            successHandler(jRes?.message);
            setVerificationToken(jRes.token);
            push(`/reset-password`);
            return;
        } else {
            errorHandler(jRes.errors || jRes.message);
            setIsBlocked(jRes.is_blocked);
            setErrorMessage(jRes.message);
        }
    };

    return (
        <div className="my-3 space-y-5">
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
                            id="email"
                            type="email"
                            {...register('email', {
                                required: tAuth('email_is_required'),
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message: tAuth('invalid_email'),
                                },
                            })}
                            placeholder={tAuth('enter_your_mail')}
                            className={`block w-full rounded-md border  bg-transparent py-1.5 ps-4 text-gray-900  placeholder:text-gray-400 focus:outline-none   sm:text-sm sm:leading-6 ${
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
                {errorMessage && (
                    <p className="text-xs capitalize text-red-500">
                        {errorMessage}
                    </p>
                )}

                <button
                    type="submit"
                    className={`focus:text-green focus:bg-text-green hover:bg-text-primary/90 flex h-9 w-full items-center justify-center gap-2 rounded-md bg-primary text-sm font-semibold capitalize text-white duration-300 focus:outline-none ${
                        isBlocked && 'pointer-events-none bg-primary/50'
                    }`}
                >
                    {loading && (
                        <AiOutlineLoading3Quarters className="h-4 w-4 animate-spin" />
                    )}
                    {tAuth('forget_password')}
                </button>
            </form>
            <div className="flex items-center justify-between text-xs capitalize text-grey-400">
                <p>
                    {tAuth('dont_have_account')}

                    <button
                        onClick={openLoginModal}
                        className="ms-1 text-primary"
                    >
                        {tAuth('sign_in_here')}
                    </button>
                </p>
            </div>
        </div>
    );
};

export default ForgetPasswordForm;
