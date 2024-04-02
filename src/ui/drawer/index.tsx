'use client';
import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { CgClose } from 'react-icons/cg';
import { DrawerProps } from './drawer';
import { useLocale } from 'next-intl';
import { EN_LOCALE } from '@/constants';

export default function Drawer({
    isOpen,
    closeModalHandler,
    title,
    children,
    headerElemnt,
}: DrawerProps) {
    // Read localization
    const locale = useLocale();

    const closeDrawer = () => {
        closeModalHandler();
    };

    return (
        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative " onClose={closeModalHandler}>
                <div className="fixed inset-0 !z-[100] overflow-hidden">
                    <div className="absolute inset-0 w-screen overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 start-0 flex w-screen max-w-full">
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-in-out duration-150"
                                enterFrom={
                                    locale === EN_LOCALE
                                        ? '-translate-x-full'
                                        : 'translate-x-full'
                                }
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-150"
                            >
                                <Dialog.Panel className="pointer-events-auto w-full lg:w-1/2">
                                    <div className="flex h-full flex-col overflow-y-auto bg-white shadow-xl">
                                        <div className="sticky left-0 top-0 z-50 flex items-center justify-end gap-4 bg-white px-4 py-3 sm:px-6">
                                            <Dialog.Title className="text-base font-semibold leading-6 text-gray-900">
                                                {title}
                                            </Dialog.Title>
                                            <div className="flex h-7 items-center gap-4">
                                                {headerElemnt}
                                                <button
                                                    type="button"
                                                    className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none "
                                                    onClick={closeModalHandler}
                                                >
                                                    <CgClose className="h-6 w-6 text-gray-400" />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="relative mt-6 flex-1 px-4 sm:px-6">
                                            {children}
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
}
