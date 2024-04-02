'use client';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import setSignUp from '@/actions/setSignUp';
import { errorHandler, successHandler } from '@/helpers';
import PasswordShow from '@/ui/show-hide-password';
import ar from 'react-phone-number-input/locale/ar.json';
import en from 'react-phone-number-input/locale/en.json';
import FacebookLogin from '../facebook-login';
import GoogleLogin from '../google-login';
import 'react-phone-number-input/style.css';
import { useTranslations, useLocale } from 'next-intl';
import { AR_LOCALE } from '@/constants';
import { useSession } from 'next-auth/react';

interface SignUpFormProps {
    openLoginModal: () => void;
    closeModal: () => void;
    locale: string;
}

type FormValues = {
    name: string;
    email: string;
    mobile: string;
    password: string;
    password_confirmation: string;
};

const SignUpForm = ({
    openLoginModal,
    closeModal,
    locale,
}: SignUpFormProps) => {
    // Read translations
    const tAuth = useTranslations('auth');
    const tContactUs = useTranslations('contact_us');

    const getPhoneLocale = locale === AR_LOCALE ? ar : en;

    const [passwords, setPasswords] = useState({
        password: '',
        password_confirmation: '',
    });
    // loading state
    const [loading, setLoading] = useState(false);
    const isCorrectPassword =
        passwords.password === passwords.password_confirmation;

    // form handling
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, touchedFields },
        control,
    } = useForm<FormValues>({
        mode: 'onChange',
    });
    const password = watch('password'); // Get the value of the 'password' field

    // sign up submit
    const onSubmit: SubmitHandler<FormValues> = async (formData) => {
        setLoading(true);
        const res = await setSignUp({ ...formData });
        setLoading(false);

        // handle error
        if (res?.errors) {
            errorHandler(res.errors);
            return;
        }
        successHandler('Register Done Successfully');
        closeModal();
    };

    const { data: session, status } = useSession();

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
        <div className="space-y-3">
            <span className="text-xs capitalize text-grey-400">
                {tAuth('fill_the_following_form')}
            </span>
            <form
                className="flex flex-col gap-y-3"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="space-y-1">
                    <label
                        htmlFor="name"
                        className="block text-sm leading-6 text-gray-900"
                    >
                        {tAuth('name')}
                    </label>
                    <div>
                        <input
                            id="name"
                            type="name"
                            {...register('name', {
                                required: tAuth('name_is_required'),
                            })}
                            placeholder={tAuth('enter_your_name')}
                            className={`block w-full rounded-md border bg-transparent py-1.5 ps-4 text-gray-900 placeholder:text-xs placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6 ${
                                touchedFields.name && errors.name
                                    ? 'border-red-500'
                                    : 'border-grey-200 focus:ring-1 focus:ring-primary'
                            }`}
                        />
                        {touchedFields.name && errors.name && (
                            <p className="my-1 text-xs text-red-500">
                                {errors.name.message}
                            </p>
                        )}
                    </div>
                </div>
                {/* TODO: enable it when google and facebook apps become active */}

                <div className="sign_up_mobile_field flex flex-col gap-1 space-y-1">
                    <span className="block text-sm leading-6 text-gray-900">
                        {tContactUs('phone_number')} *
                    </span>
                    <Controller
                        render={({ field: { onChange, value, name } }) => (
                            <div
                                className={`rounded-md border ${
                                    errors.mobile && 'border !border-red-500'
                                }`}
                            >
                                <PhoneInput
                                    id="mobile"
                                    labels={getPhoneLocale}
                                    name={name}
                                    international
                                    defaultCountry="EG"
                                    value={value}
                                    placeholder="Enter phone number"
                                    onChange={(value: any) => onChange(value)}
                                    className={`flex h-9 items-center text-sm font-light outline-none ${
                                        errors.mobile && 'border border-none'
                                    }`}
                                />
                            </div>
                        )}
                        control={control}
                        name="mobile"
                        rules={{
                            required: tContactUs('field_required'),
                            validate: (value) =>
                                isValidPhoneNumber(value) ||
                                tContactUs('phone_validation'),
                        }}
                    />
                    {errors.mobile && (
                        <p
                            className="text-xs font-light capitalize text-red-500"
                            role="alert"
                        >
                            {errors.mobile.message}
                        </p>
                    )}
                </div>
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
                            className={`block w-full rounded-md border bg-transparent py-1.5 ps-4 text-gray-900 placeholder:text-xs  placeholder:text-gray-400 focus:outline-none   sm:text-sm sm:leading-6 ${
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
                    <label
                        htmlFor="password"
                        className="block text-sm leading-6 text-gray-900"
                    >
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
                <div className="space-y-1">
                    <label
                        htmlFor="password_confirmation"
                        className="block text-sm leading-6 text-gray-900"
                    >
                        {tAuth('confirm_password')}
                    </label>
                    <div>
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
                                            message: tAuth(
                                                'password_8_characters'
                                            ),
                                        },
                                    })}
                                />
                            )}
                            rules={{
                                required: true,
                                validate: (value) =>
                                    value === password ||
                                    'Passwords do not match',
                            }}
                        />
                        {errors.password_confirmation && (
                            <p className="my-1 text-xs text-red-500">
                                {errors.password_confirmation.message}
                            </p>
                        )}
                    </div>
                </div>
                <button
                    type="submit"
                    className="focus:text-green focus:bg-text-green hover:bg-text-primary/90 flex h-9 w-full items-center justify-center gap-2 rounded-md bg-primary text-sm font-semibold capitalize text-white duration-300 focus:outline-none"
                >
                    {loading && (
                        <AiOutlineLoading3Quarters className="h-4 w-4 animate-spin" />
                    )}

                    {tAuth('sign_up')}
                </button>
            </form>
            <div className="flex items-center justify-between text-xs capitalize text-grey-400">
                <p>
                    {tAuth('if_you_have_account')}
                    <button
                        onClick={openLoginModal}
                        className="ms-1 text-primary"
                    >
                        {tAuth('sign_in_here')}
                    </button>
                </p>
            </div>

            <div className="inline-flex w-full items-center justify-center">
                <hr className="my-2 h-px w-full border-0 bg-gray-200 " />
                <span className="absolute left-1/2 -translate-x-1/2 bg-white px-3 uppercase text-grey-500">
                    {tAuth('or')}
                </span>
            </div>
            <div className="flex gap-4">
                <FacebookLogin locale={locale} />
                <GoogleLogin locale={locale} />
            </div>
        </div>
    );
};

export default SignUpForm;
