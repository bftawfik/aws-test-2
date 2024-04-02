'use client';
import React, { useState } from 'react';
import 'react-phone-number-input/style.css';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import { Controller, useForm } from 'react-hook-form';
import { FormData } from './contactus';
import ar from 'react-phone-number-input/locale/ar.json';
import en from 'react-phone-number-input/locale/en.json';
import setContactUs from '@/actions/setContactForm';
import { classNames, errorHandler, successHandler } from '@/helpers';
import { LoadingAnimationIcon } from '../svg';
import { useTranslations, useLocale } from 'next-intl';
import { AR_LOCALE } from '@/constants';

const ContactusForm = ({
    id,
    type,
    classes,
}: {
    id: number;
    type: string;
    classes?: string;
}) => {
    const emailRegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    // Read localization
    const locale = useLocale();

    // Read translations
    const tContactUs = useTranslations('contact_us');

    const {
        control,
        register,
        setValue,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();

    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = handleSubmit(async (data) => {
        setIsLoading(true);

        const contactUsData = {
            ...data,
            interested_in: type,
            model_id: id,
            model_type: type,
        };
        const res = await setContactUs(contactUsData);

        if (res.ok) {
            successHandler(`${tContactUs('contact_thanks_message')}`);
            reset();
        } else {
            const jRes = await res.json();
            if (jRes?.errors) {
                errorHandler(jRes.errors);
            }
        }

        setIsLoading(false);
    });

    return (
        <div
            className={`h-auto w-full rounded-xl border border-[#E5E5E5] p-7 shadow-sm lg:w-[380px] ${classes}`}
        >
            <p className="text-lg font-medium">
                {tContactUs('request_more_info')}
            </p>
            <div className="pt-6">
                <form onSubmit={onSubmit}>
                    <div className="my-2 flex  flex-col gap-1">
                        <span className="text-xs font-normal capitalize text-black/70 md:text-sm">
                            {tContactUs('full_name')} *
                        </span>
                        <input
                            {...register('name', {
                                required: tContactUs('field_required'),
                                minLength: {
                                    value: 3,
                                    message: tContactUs('full_name_min'),
                                },
                            })}
                            placeholder={tContactUs('full_name')}
                            type="text"
                            className={` h-12 rounded-xl border px-3 text-xs font-light outline-none md:text-sm ${
                                errors.name && 'border-red-500'
                            }`}
                        />
                        {errors.name?.type === 'required' && (
                            <p
                                className="text-xs font-light text-red-500"
                                role="alert"
                            >
                                {errors.name.message}
                            </p>
                        )}
                    </div>
                    <div className="my-2 flex flex-col gap-1">
                        <span className="text-xs font-normal capitalize text-black/70 md:text-sm">
                            {tContactUs('email')}
                        </span>
                        <input
                            {...register('email', {
                                pattern: {
                                    value: emailRegExp,
                                    message: tContactUs('email_validation'),
                                },
                            })}
                            placeholder={tContactUs('email')}
                            type="email"
                            className={`h-12 rounded-xl border px-3 text-xs font-light outline-none md:text-sm ${
                                errors.email && 'border-red-500'
                            }`}
                            aria-invalid={errors.email ? 'true' : 'false'}
                        />
                        {errors.email && (
                            <p
                                className="text-xs font-light text-red-500"
                                role="alert"
                            >
                                {errors.email.message}
                            </p>
                        )}
                    </div>
                    <div className="my-2 flex flex-col gap-1">
                        <span className="text-xs font-normal capitalize text-black/70 md:text-sm">
                            {tContactUs('phone_number')} *
                        </span>
                        <Controller
                            render={(props) => (
                                <div
                                    className={` rounded-xl border ${
                                        errors.mobile &&
                                        'border !border-red-500'
                                    }`}
                                >
                                    <PhoneInput
                                        labels={locale === AR_LOCALE ? ar : en}
                                        name={props.field.name}
                                        international
                                        defaultCountry="EG"
                                        value={props.field.value}
                                        placeholder="Enter phone number"
                                        onChange={(value: any) =>
                                            props.field.onChange(value)
                                        }
                                        className={`h-12 text-sm font-light outline-none ${
                                            errors.mobile &&
                                            'border border-none'
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
                                className="text-xs font-light text-red-500"
                                role="alert"
                            >
                                {errors.mobile.message}
                            </p>
                        )}
                    </div>
                    <div className="my-2 flex  h-28 flex-col gap-1">
                        <span className="text-xs font-normal text-black/70 md:text-sm">
                            {tContactUs('message')} *
                        </span>
                        <textarea
                            {...register('message', {
                                required: tContactUs('message_validation'),
                            })}
                            className={`h-24 resize-none rounded-xl border p-2 text-xs font-light outline-none md:text-sm ${
                                errors.message && 'border-red-500'
                            }`}
                        ></textarea>
                        {errors.message && (
                            <p
                                className="text-xs font-light text-red-500"
                                role="alert"
                            >
                                {errors.message.message}
                            </p>
                        )}
                    </div>
                    <button
                        className="mt-3 flex w-full items-center justify-center gap-4 rounded-xl border bg-[#4CB087] p-4 text-white duration-100 hover:border hover:border-[#4CB087] hover:bg-white hover:text-[#4CB087]"
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <LoadingAnimationIcon />
                        ) : (
                            tContactUs('send')
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ContactusForm;
