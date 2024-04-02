'use client';
import 'react-toastify/dist/ReactToastify.css';
import { signOut, useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { errorHandler, successHandler } from '@/helpers';
import { useStore } from '@/store/global';
import CompareCircle from '../compare-circle';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

function LayoutClientChildren() {
    // Read translations
    const tAuth = useTranslations('auth');

    const session = useSession();
    const { setModalName, openModal } = useStore();

    const router = useRouter();

    useEffect(() => {
        const handleAuthErrors = async () => {
            if (session?.data?.auth?.failed || session?.data?.auth?.message) {
                setModalName('');
                openModal(false);
                errorHandler(
                    session?.data?.auth?.errors! || session?.data?.auth?.failed
                );
                await signOut({ redirect: false });
                router.refresh();
            }
            if (localStorage.getItem('setSocialLoginDone') === 'true') {
                successHandler(tAuth('successMessage'));
                localStorage.setItem('setSocialLoginDone', '');
            }
        };

        handleAuthErrors();
    }, [tAuth, openModal, router, session, setModalName]);

    return (
        <>
            <ToastContainer />
            <CompareCircle />
        </>
    );
}

export default LayoutClientChildren;
