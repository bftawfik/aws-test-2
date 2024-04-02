'use client';
import 'react-toastify/dist/ReactToastify.css';

import { useEffect, useState } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { errorHandler, successHandler } from '@/helpers';
import { useVerificationStore } from '@/store/global';
import OtpInput from 'react-otp-input';
import SendOtp from '@/actions/auth/sendOtp';
import setForgetPassword from '@/actions/setForgetPassword';
import { useTranslations } from 'next-intl';
import EstatebookLogo from '@/ui/EstatebookLogo/EstatebookLogo';

const OtpVerification = () => {
    // Read translations
    const tAuth = useTranslations('auth');

    const [otp, setOtp] = useState('');
    // loading state
    const [loading, setLoading] = useState(false);

    const {
        setVerificationView,
        setVerificationToken,
        verificationToken,
        otpEmail,
    } = useVerificationStore();

    // sign up submit
    const handleOtpVerify = async () => {
        setLoading(true);
        const formData = {
            code: otp,
            token: verificationToken,
        };
        const res = await SendOtp(formData);
        const jsonRes = await res.json();
        if (res.ok) {
            successHandler(jsonRes.message);
            setVerificationToken(jsonRes.token);
            setVerificationView('create-new-password');
            return;
        } else {
            errorHandler(jsonRes.errors || jsonRes.message);
        }
        setLoading(false);
    };

    const [count, setCount] = useState(30);
    const [isCounting, setIsCounting] = useState(false);

    useEffect(() => {
        let interval: any;

        if (isCounting && count > 0) {
            interval = setInterval(() => {
                setCount((prevCount) => prevCount - 1);
            }, 1000); // Increment count every 1 second (1000 milliseconds)
        } else {
            clearInterval(interval);
            setIsCounting(false);
        }

        return () => {
            clearInterval(interval);
        };
    }, [isCounting, count]);

    const startTimer = () => {
        setCount(30);
        setIsCounting(true);
    };

    // reset otp
    const handleResetOtp = async () => {
        startTimer();

        if (!isCounting) {
            const form = {
                email: otpEmail,
            };
            const res = await setForgetPassword(form);
            const jsonRes = await res.json();
            if (res.ok) {
                successHandler(jsonRes.message);
                return;
            } else {
                errorHandler(jsonRes.errors || jsonRes.message);
            }
        }
    };

    return (
        <>
            <div className="space-y-3">
                <EstatebookLogo isNewBranding={true} />
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
                <div className="flex flex-col gap-y-1 text-xs capitalize text-grey-400">
                    <p>
                        {tAuth('didnot_received_otp')}
                        <span
                            onClick={handleResetOtp}
                            className={`ms-1 cursor-pointer  ${
                                isCounting
                                    ? 'pointer-events-none text-gray-500'
                                    : 'text-primary'
                            }`}
                        >
                            {tAuth('resend_otp')}
                        </span>
                    </p>
                    <p
                        className={`font-light text-red-500 ${
                            isCounting ? 'inline-flex gap-x-1' : 'hidden'
                        }`}
                    >
                        {tAuth('you_can_try_after')}{' '}
                        <strong className="font-semibold">{count}</strong>
                    </p>
                </div>
                <div className="w-full items-center justify-center">
                    <button
                        onClick={handleOtpVerify}
                        className={`focus:text-green focus:bg-text-green hover:bg-text-primary/90 flex h-11 w-full items-center justify-center gap-2 space-y-2 rounded-md bg-primary text-sm font-semibold capitalize text-white duration-300 focus:outline-none ${
                            isCounting && 'pointer-events-none bg-primary/50'
                        }`}
                    >
                        {loading && (
                            <AiOutlineLoading3Quarters className="h-4 w-4 animate-spin" />
                        )}
                        {tAuth('verify_proceed')}
                    </button>
                </div>
            </div>
        </>
    );
};

export default OtpVerification;
