import React from 'react';
import { CloseIcon } from '../svg';

interface ModalHeaderProps {
    closeModalHandler: () => void;
    headerContents?: string | JSX.Element;
    closeBtnLabel?: string;
}

const closeBtnDefaultLabel = 'Close';

const ModalHeader = ({
    closeModalHandler,
    headerContents,
    closeBtnLabel,
}: ModalHeaderProps) => (
    <div className=" flex w-full justify-between">
        {headerContents ? (
            <p className="text-base capitalize">{headerContents}</p>
        ) : null}
        <button
            onClick={closeModalHandler}
            type="button"
            className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none"
        >
            <span className="sr-only">
                {closeBtnLabel || closeBtnDefaultLabel}
            </span>
            <CloseIcon />
        </button>
    </div>
);

export default ModalHeader;
