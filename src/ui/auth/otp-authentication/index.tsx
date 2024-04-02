'use client';

import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import setSignUp from '@/actions/setSignUp';
import { errorHandler, successHandler } from '@/helpers';
import OtpInput from 'react-otp-input';
import ReactModal from '@/ui/ReactModal/ReactModal';
import { useTranslations, useLocale } from 'next-intl';

type FormValues = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
};

const OtpAuthentication = () => {
    // Read localization
    const locale = useLocale();

    // Read translations
    const tAuth = useTranslations('auth');

    const [isOpen, setIsOpen] = useState(false);

    const [passwords, setPasswords] = useState({
        password: '',
        password_confirmation: '',
    });
    const [otp, setOtp] = useState('');

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

    // sign up submit
    const onSubmit: SubmitHandler<FormValues> = async (formData) => {
        setLoading(true);
        const res = await setSignUp({ ...formData, ...passwords });

        setLoading(false);

        // handle error
        if (res?.errors) {
            errorHandler(res.errors);
            return;
        }
        // handle success
        successHandler('Register Done Successfully');
        // openModal('loginPopup');
    };

    return (
        <>
            <ReactModal
                isOpen={isOpen}
                closeModalHandler={() => setIsOpen(false)}
                header={tAuth('otp_verification')}
            >
                <div className="space-y-3">
                    <span className="text-xs capitalize text-grey-400">
                        {tAuth('enter_otp')}
                    </span>

                    <OtpInput
                        value={otp}
                        onChange={setOtp}
                        numInputs={6}
                        renderSeparator={<span>-</span>}
                        inputStyle=" !w-10 h-10 text-sm text-black border rounded-sm m-2 outline-primary"
                        renderInput={(props) => <input {...props} />}
                    />

                    <div className="flex items-center justify-between text-xs capitalize text-grey-400">
                        <p>
                            {tAuth('didnot_received_otp')}
                            <button
                                // onClick={() => {
                                //     openModal('otpVerification');
                                // }}
                                className="ms-1 text-primary"
                            >
                                {tAuth('resend_otp')}
                            </button>
                        </p>
                    </div>
                    <div className="w-full items-center justify-center">
                        <button className="focus:text-green  focus:bg-text-green hover:bg-text-primary/90 flex h-11 w-full items-center justify-center gap-2 space-y-2 rounded-md bg-primary text-sm font-semibold capitalize text-white duration-300 focus:outline-none">
                            {tAuth('verify_proceed')}
                        </button>
                    </div>
                </div>
            </ReactModal>
        </>
    );
};

export default OtpAuthentication;
