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
                <header
                    ref={ref}
                    className="sticky top-0 z-50 mx-auto flex h-[70px] w-full bg-white drop-shadow-header md:h-[75px]"
                >
                    <div className="es-container flex h-full w-full items-center justify-between">
                        <div className="flex items-center">
                            {/* <MobileButton /> */}
                            {/* <ResetStoreWrapper>
                                <Link
                                    href={`${urlLocaleSegment}/`}
                                    prefetch={false}
                                >
                                    <EstatebookLogo isNewBranding={true} />
                                </Link>
                            </ResetStoreWrapper> */}

                            <nav className="ms-2 hidden items-center text-xs font-normal md:flex lg:ms-10 lg:text-sm">
                                <Link
                                    href={`${urlLocaleSegment}/discover`}
                                    className="me-5 flex items-center rounded-lg bg-primary px-[18px] py-2 text-center duration-75 hover:opacity-90 lg:me-10"
                                    prefetch={false}
                                >
                                    <DiscoverIcon />
                                    <span className="ms-2 text-white">
                                        {tHeader('discover')}
                                    </span>
                                </Link>
                                <Link
                                    className="text-medium-gray me-5 hover:text-primary lg:me-8"
                                    href={`${urlLocaleSegment}${PROJECTS_LINK}`}
                                    prefetch={false}
                                >
                                    {tHeader('projects')}
                                </Link>
                                {/* <ResetStoreWrapper>
                                    <Link
                                        href={`${urlLocaleSegment}/developers`}
                                        className="text-medium-gray me-5 hover:text-primary lg:me-10"
                                        prefetch={false}
                                    >
                                        {tHeader('developers')}
                                    </Link>
                                </ResetStoreWrapper> */}
                            </nav>
                        </div>
                        <div>
                            <div className="hidden items-center md:flex">
                                {/* <LocaleSwitcher>
                                    <span className="text-medium-gray me-3 font-cairo text-xs font-normal lg:text-sm">
                                        {languageText}
                                    </span>
                                    <LanguageIcon />
                                </LocaleSwitcher>
                                <ResetStoreWrapper classes="ms-3.5">
                                    <Link
                                        href={`${urlLocaleSegment}/wishlist`}
                                        className=""
                                        prefetch={false}
                                    >
                                        <WishlistIcon />
                                    </Link>
                                </ResetStoreWrapper> */}

                                {/* {status === 'authenticated' &&
                                !session?.auth?.message &&
                                !session?.auth?.failed ? (
                                    <div>
                                        <div className="group flex cursor-pointer items-center rounded-xl transition-colors">
                                            <div className="relative">
                                                <div className="">
                                                    <button className="inline-flex h-full appearance-none items-center gap-x-1 p-4">
                                                        <div className="flex items-center gap-x-1 text-sm">
                                                            {(
                                                                session?.auth
                                                                    ?.data as User
                                                            )?.name ||
                                                                session?.auth
                                                                    ?.name}
                                                        </div>
                                                    </button>
                                                </div>

                                                <ul className="scale-up-center absolute end-0 hidden w-full min-w-[90px] origin-center overflow-hidden rounded-lg bg-white py-2 ring-1 ring-gray-100 group-hover:block">
                                                    <button
                                                        onClick={async () => {
                                                            await signOut({
                                                                redirect: false,
                                                            });
                                                            await router.refresh();
                                                        }}
                                                        className="w-full px-4 py-2 text-sm text-red-500 transition-colors hover:bg-gray-50"
                                                    >
                                                        {tHeader('logout')}
                                                    </button>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <button
                                            onClick={openLoginModal}
                                            className="ms-3.5 flex items-center rounded-lg border px-3 py-2"
                                        >
                                            <ProfileIcon />
                                            <span className="ms-3 text-xs font-medium text-grey-500 lg:text-sm">
                                                {' '}
                                                {tHeader('login')}
                                            </span>
                                        </button>
                                    </>
                                )} */}
                                <button
                                    onClick={openLoginModal}
                                    className="ms-3.5 flex items-center rounded-lg border px-3 py-2"
                                >
                                    <ProfileIcon />
                                    <span className="ms-3 text-xs font-medium text-grey-500 lg:text-sm">
                                        {' '}
                                        {tHeader('login')}
                                    </span>
                                </button>
                            </div>
                            <div className="block md:hidden">
                                <Link
                                    href={appStore!}
                                    target="_blank"
                                    className="rounded-lg bg-primary px-2.5 py-1.5 text-xs font-semibold uppercase text-white"
                                    prefetch={false}
                                >
                                    {tHeader('getapp')}
                                </Link>
                            </div>
                        </div>
                    </div>
                </header>
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

                        {/* {status === 'authenticated' &&
                        !session?.auth?.message ? (
                            <div className="flex flex-col items-center gap-y-1 text-xs font-semibold">
                                <button
                                    className="flex h-full appearance-none flex-col items-center"
                                    onClick={toggleLogoutMenu}
                                >
                                    {(session?.auth?.data as User)?.avatar ||
                                    session?.auth?.avatar ? (
                                        <Image
                                            alt="user"
                                            src={
                                                (session?.auth?.data as User)
                                                    ?.avatar ||
                                                session?.auth?.avatar
                                            }
                                            width={156}
                                            height={21}
                                            className="h-8 w-8"
                                            priority
                                        />
                                    ) : (
                                        <HiOutlineUserCircle className="h-8 w-8 gap-y-1 text-[#BFBFBF]" />
                                    )}
                                    <p>
                                        {(session?.auth?.data as User)?.name ||
                                            session?.auth?.name}
                                    </p>
                                </button>

                                {showLogoutMenu ? (
                                    <ul className=" absolute bottom-16 z-40 flex min-w-[90px] origin-center justify-center overflow-hidden rounded-lg bg-white py-2 ring-1 ring-gray-100">
                                        <button
                                            onClick={async () => {
                                                toggleLogoutMenu();
                                                await signOut({
                                                    redirect: false,
                                                });
                                                await router.refresh();
                                            }}
                                            className="px-2 py-1 text-xs text-red-500 transition-colors hover:bg-gray-50"
                                        >
                                            {tHeader('logout')}
                                        </button>
                                    </ul>
                                ) : null}
                            </div>
                        ) : (
                            <button
                                onClick={openLoginModal}
                                className="flex flex-col items-center text-xs font-semibold"
                            >
                                <HiOutlineUserCircle className="h-8 w-8 gap-y-1 text-[#BFBFBF]" />
                                {tHeader('login')}
                            </button>
                        )} */}
                        <button
                            onClick={openLoginModal}
                            className="flex flex-col items-center text-xs font-semibold"
                        >
                            <HiOutlineUserCircle className="h-8 w-8 gap-y-1 text-[#BFBFBF]" />
                            {tHeader('login')}
                        </button>
                    </div>
                </div>
                {/* <ReactModal
                    isOpen={modalOpen && !!openModalName}
                    closeModalHandler={closeModal}
                    header={modalHeader()}
                >
                    {isLogin ? (
                        <LoginForm
                            closeModal={closeModal}
                            openSignUpModal={openSignUpModal}
                            openForgetPasswordModal={openForgetPasswordModal}
                            locale={locale}
                        />
                    ) : null}
                    {isSignUp ? (
                        <SignUpForm
                            openLoginModal={openLoginModal}
                            closeModal={closeModal}
                            locale={locale}
                        />
                    ) : null}
                    {isForgetPassword ? (
                        <ForgetPasswordForm
                            openLoginModal={openLoginModal}
                            closeModal={closeModal}
                        />
                    ) : null}
                </ReactModal> */}
            </>
        );
    }
);

Header.displayName = 'Header';
