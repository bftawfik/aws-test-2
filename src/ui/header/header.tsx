'use client';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { useState } from 'react';
import { BsHeart } from 'react-icons/bs';
import { HiOutlineUserCircle } from 'react-icons/hi';
import useUserAgent from '@/hooks/useUserAgent';
import { User } from '@/types';
import LocaleSwitcher from '@/ui/header/locale-switcher';
import MobileButton from '@/ui/header/mobile-button';
import {
    DiscoverIcon,
    LanguageIcon,
    ProfileIcon,
    WishlistIcon,
} from '@/ui/svg';
import { useRouter } from 'next/navigation';
import ReactModal from '../ReactModal/ReactModal';
import LoginForm from '../auth/LoginForm/LoginForm';
import {
    LOGIN_MODAL_NAME,
    SIGNUP_MODAL_NAME,
    FORGET_PASSWORD_MODAL_NAME,
} from '@/constants/modalNames';
import SignUpForm from '../auth/SignUpForm/SignUpForm';
import ForgetPasswordForm from '../auth/ForgetPasswordForm/ForgetPasswordForm';
import { AR_LOCALE, PROJECTS_LINK } from '@/constants';
import { useTranslations, useLocale } from 'next-intl';
import { getUrlLocaleSegment } from '@/helpers/getUrlLocaleSegment';
import ResetStoreWrapper from '../ResetStoreWrapper/ResetStoreWrapper';
import { FaCompass } from 'react-icons/fa';
import Image from 'next/image';
import EstatebookLogo from '../EstatebookLogo/EstatebookLogo';

interface HeaderProps {}

export const Header = React.forwardRef(
    (props: HeaderProps, ref: React.Ref<HTMLElement>) => {
        // Read localization
        const locale = useLocale();

        // Read translations
        const tAuth = useTranslations('auth');
        const tHeader = useTranslations('header');

        const urlLocaleSegment = getUrlLocaleSegment(locale);
        const isArabic = locale === AR_LOCALE;
        const languageText = isArabic ? 'English' : 'العربية';

        // use session
        // const { data: session, status } = useSession();
        const router = useRouter();

        // Modal state
        const [openModalName, setOpenModalName] = useState<string | null>(null);
        const [showLogoutMenu, setShowLogoutMenu] = useState<boolean>(false);

        const isLogin = openModalName === LOGIN_MODAL_NAME;
        const isSignUp = openModalName === SIGNUP_MODAL_NAME;
        const isForgetPassword = openModalName === FORGET_PASSWORD_MODAL_NAME;

        const modalHeader = () => {
            if (isLogin) return tAuth('welcome_back');
            if (isSignUp) return tAuth('create_account');
            if (isForgetPassword)
                return tAuth('enter_your_mail_to_reset_password');
        };

        const [modalOpen, setModalOpen] = useState(false);

        const openLoginModal = () => {
            setOpenModalName(LOGIN_MODAL_NAME);
            setModalOpen(true);
        };
        const closeModal = () => {
            setModalOpen(false);
            setOpenModalName(null);
        };
        // open sign up modal
        const openSignUpModal = () => {
            setModalOpen(true);
            setOpenModalName(SIGNUP_MODAL_NAME);
        };
        // open forget password modal
        const openForgetPasswordModal = () => {
            setModalOpen(true);
            setOpenModalName(FORGET_PASSWORD_MODAL_NAME);
        };
        const userAgent = useUserAgent();
        const appStore =
            userAgent?.os.name?.toLocaleLowerCase() === 'ios'
                ? process.env.NEXT_PUBLIC_APPLE_STORE_APP_URL
                : process.env.NEXT_PUBLIC_PLAY_STORE_APP_URL;

        const toggleLogoutMenu = () => {
            setShowLogoutMenu(!showLogoutMenu);
        };
        return (
            <>
                <div className="fixed inset-x-0 bottom-0 z-40 border-t bg-white md:hidden">
                    <div className="es-container flex items-center justify-evenly py-3">
                        <Link
                            href={`${urlLocaleSegment}/discover`}
                            className="flex flex-col items-center gap-y-1 text-xs font-semibold"
                            prefetch={false}
                        >
                            <FaCompass className="h-6 w-6 fill-current text-emerald-500" />
                            {tHeader('discover')}
                        </Link>
                        <Link
                            href={`${urlLocaleSegment}/wishlist`}
                            className="flex flex-col items-center gap-y-1 text-xs font-semibold"
                            prefetch={false}
                        >
                            <BsHeart className="h-6 w-6 fill-current text-gray-400" />
                            {tHeader('wishlist')}
                        </Link>

                        <button
                            onClick={openLoginModal}
                            className="flex flex-col items-center text-xs font-semibold"
                        >
                            <HiOutlineUserCircle className="h-8 w-8 gap-y-1 text-[#BFBFBF]" />
                            {tHeader('login')}
                        </button>
                    </div>
                </div>
            </>
        );
    }
);

Header.displayName = 'Header';
