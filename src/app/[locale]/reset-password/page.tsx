'use client';
import { useVerificationStore } from '@/store/global';
import ResetPasswordForm from '@/ui/auth/reset-password';
import OtpVerification from '@/ui/auth/verification/otp-verify';
import PasswordChanged from '@/ui/auth/verification/password-changed';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

const ResetPassword = () => {
    const { verificationView, otpEmail } = useVerificationStore();
    const { status } = useSession();
    if (status === 'authenticated' || !otpEmail) return redirect('/');

    return (
        <div className="flex h-screen max-h-[calc(100vh-206px)] items-center justify-center overflow-y-hidden">
            {verificationView === 'verify-with-otp' && <OtpVerification />}
            {verificationView === 'create-new-password' && (
                <ResetPasswordForm />
            )}
            {verificationView === 'password-changed' && <PasswordChanged />}
        </div>
    );
};

export default ResetPassword;
