'use client';
import { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useForm } from 'react-hook-form';
import { PasswordShowProps } from './show-hide-password';
import { useTranslations, useLocale } from 'next-intl';

function PasswordShow({
    value,
    id,
    name,
    onInputChange,
    ...rest
}: PasswordShowProps) {
    // Read translations
    const tAuth = useTranslations('auth');

    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const {
        register,
        watch,
        formState: { errors, touchedFields },
    } = useForm({
        mode: 'all',
    });

    const inputValue = watch('password');

    return (
        <>
            <div className="relative rounded-md shadow-sm">
                <input
                    {...rest}
                    id={id}
                    type={showPassword ? 'text' : 'password'}
                    value={inputValue}
                    autoComplete="off"
                    defaultValue=""
                    onInput={(e) =>
                        onInputChange &&
                        onInputChange((e?.target as HTMLInputElement)?.value)
                    }
                    placeholder={tAuth('enter_your_password')}
                    className={`block w-full rounded-md border bg-transparent py-1.5 ps-4 text-gray-900 placeholder:text-xs  placeholder:text-gray-400 focus:outline-none   sm:text-sm sm:leading-6 ${
                        touchedFields[id] && errors[id]
                            ? 'border-red-500'
                            : 'border-grey-200 focus:ring-1 focus:ring-primary'
                    }`}
                />
                <div
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 end-2 flex cursor-pointer items-center pr-3"
                >
                    {showPassword ? (
                        <AiOutlineEye className="h-5 w-5 text-grey-500" />
                    ) : (
                        <AiOutlineEyeInvisible className="h-5 w-5 text-grey-500" />
                    )}
                </div>
            </div>
        </>
    );
}

export default PasswordShow;
