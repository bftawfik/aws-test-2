'use client';
import { signIn, useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignInPage = ({ params, searchParams }: any) => {
    const { data: session, status } = useSession();

    useEffect(() => {
        if (!(status === 'loading') && !session) {
            signIn(searchParams?.platform);
        }
        if (session) {
            window.close();
            session.auth.id &&
                localStorage.setItem('setSocialLoginDone', 'true');
        }
    }, [session, status, searchParams?.platform]);

    return (
        <>
            <div
                style={{
                    width: '100vw',
                    height: '100vh',
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    right: 0,
                    background: 'white',
                    zIndex: 999999999,
                }}
            ></div>
        </>
    );
};

export default SignInPage;
