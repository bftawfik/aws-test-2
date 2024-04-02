'use client';
import { AuthProviderProps } from './auth-provider';
import { SessionProvider } from 'next-auth/react';

const AuthProvider = ({ children }: AuthProviderProps) => {
    return <SessionProvider>{children}</SessionProvider>;
};

export default AuthProvider;
