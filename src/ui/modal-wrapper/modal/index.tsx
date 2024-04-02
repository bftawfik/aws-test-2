'use client';
import { Fragment } from 'react';

import { Dialog, Transition } from '@headlessui/react';

import { ModalProps } from './modal';
import { useStore } from '@/store/global';
import { CloseIcon } from '@/ui/svg';

export default function Modal(props: ModalProps) {
    function closeModal() {
        props.handleCloseModal();
    }
    const { modalIsOpen } = useStore();

    return modalIsOpen ? (
        <>
            <Transition appear show={props.isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        leave="ease-in duration-200"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-slate-200/30 backdrop-blur-sm" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel
                                    className={`flex w-full transform flex-col gap-2 overflow-hidden rounded-2xl bg-white p-6 align-middle shadow-xl transition-all ${
                                        props.classes
                                            ? props.classes
                                            : 'max-w-md'
                                    }`}
                                >
                                    <div className="flex w-full justify-between">
                                        <p className="text-base capitalize">
                                            {props.header}
                                        </p>
                                        <button
                                            onClick={closeModal}
                                            type="button"
                                            className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none"
                                        >
                                            <span className="sr-only">
                                                Close
                                            </span>
                                            <CloseIcon />
                                        </button>
                                    </div>

                                    <div>{props.children}</div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    ) : null;
}
