'use client';
import { Fragment, useState } from 'react';
import { BsFilterLeft, BsFilterRight } from 'react-icons/bs';

import { MobileDrawer } from '@/ui/header/mobile-drawer';
import { Dialog, Transition } from '@headlessui/react';
import { useLocale } from 'next-intl';
import { AR_LOCALE, EN_LOCALE } from '@/constants';

export default function MobileButton() {
    // Read localization
    const locale = useLocale();

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const isArabic = locale === AR_LOCALE;
    const menuIcon = isArabic ? (
        <BsFilterRight className="right h-8 w-8" />
    ) : (
        <BsFilterLeft className="h-8 w-8" />
    );
    return (
        <>
            <button
                onClick={() => setMobileMenuOpen(true)}
                className="me-2.5 block md:hidden"
                type="button"
            >
                {menuIcon}
            </button>

            <Transition show={mobileMenuOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="z-50 w-full lg:hidden"
                    open={mobileMenuOpen}
                    onClose={() => setMobileMenuOpen(false)}
                >
                    <Transition.Child
                        as={Fragment}
                        enter="ease-in-out duration-600"
                        enterFrom={`transition-all  ${
                            locale === EN_LOCALE
                                ? '-translate-x-full'
                                : 'translate-x-full'
                        }`}
                        enterTo={`duration-600 ${
                            locale === EN_LOCALE
                                ? '-translate-x-0'
                                : 'translate-x-0'
                        }`}
                        leave="ease-out-in duration-600"
                        leaveFrom={`duration-600 ${
                            locale === EN_LOCALE
                                ? '-translate-x-0'
                                : 'translate-x-0'
                        }`}
                        leaveTo={`transition-all ${
                            locale === EN_LOCALE
                                ? '-translate-x-full'
                                : 'translate-x-full'
                        }`}
                    >
                        <Dialog.Panel className="fixed inset-y-0 left-0 z-50 w-full overflow-y-auto bg-white transition duration-150 ease-out">
                            <MobileDrawer
                                setMobileMenuOpen={setMobileMenuOpen}
                            />
                        </Dialog.Panel>
                    </Transition.Child>
                </Dialog>
            </Transition>
        </>
    );
}
