import React from 'react';
import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { AiOutlineClose } from 'react-icons/ai';
import { CloseIcon } from '@/ui/svg';
import EstatebookLogo from '@/ui/EstatebookLogo/EstatebookLogo';
interface ContainerProps {
    children: React.ReactNode;
    open: boolean;
    close: () => void;
}

const ContainerComponent = ({ children, open, close }: ContainerProps) => {
    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-drawer" onClose={close}>
                <div className="fixed inset-0" />

                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full">
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-in-out duration-150 sm:duration-150"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-150 sm:duration-150"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="pointer-events-auto w-screen">
                                    <div className="flex h-full flex-col items-center bg-white shadow-xl">
                                        <div className="fixed mb-2 h-10 w-full px-4 py-3 sm:px-6">
                                            <div className="flex items-center justify-between">
                                                <EstatebookLogo
                                                    isNewBranding={true}
                                                />
                                                <button
                                                    type="button"
                                                    className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none "
                                                    onClick={close}
                                                >
                                                    <span className="sr-only">
                                                        Close panel
                                                    </span>
                                                    <CloseIcon />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="h-full w-full flex-1 px-6 pt-12">
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
};

export default ContainerComponent;
