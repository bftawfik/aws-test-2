import React from 'react';
import Modal from 'react-modal';
import ModalHeader from './ModalHeader';

interface ReactModalProps {
    isOpen: boolean;
    closeModalHandler: () => void;
    header?: string | JSX.Element;
    closeTimeoutMS?: number;
    classes?: string;
    children: React.ReactNode;
    aditionalOverlayClasses?: string;
}

const ARIA_HIDE_APP = false;
const DEFAULT_CLOSE_TIMEOUT_MS = 0;

const ReactModal = ({
    isOpen,
    closeModalHandler,
    header,
    closeTimeoutMS,
    classes,
    children,
    aditionalOverlayClasses,
}: ReactModalProps) => (
    <Modal
        overlayClassName={`fixed flex h-screen items-center justify-center inset-0 bg-slate-200/30 backdrop-blur-sm z-50 transition-opacity ease-in-out duration-300 transition-opacity ease-in-out duration-300 ${aditionalOverlayClasses}`}
        className={`pointer-events-auto flex w-full transform flex-col gap-2 overflow-hidden rounded-2xl bg-white p-6 align-middle shadow-xl outline-none transition-all ${
            classes ? classes : 'max-w-md'
        }`}
        closeTimeoutMS={closeTimeoutMS || DEFAULT_CLOSE_TIMEOUT_MS}
        isOpen={!!isOpen}
        onRequestClose={closeModalHandler}
        ariaHideApp={ARIA_HIDE_APP}
        appElement={
            typeof document !== 'undefined'
                ? (document.getElementById('root') as HTMLElement)
                : undefined
        }
    >
        <ModalHeader
            closeModalHandler={closeModalHandler}
            headerContents={header}
        />
        <div>{children}</div>
    </Modal>
);

export default ReactModal;
