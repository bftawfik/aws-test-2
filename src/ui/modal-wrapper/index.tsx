'use client';
import React, { useState } from 'react';

import { useStore } from '@/store/global';

import Modal from './modal';
import { ModalWrapperProps } from './modal-wrapper';

function ModalWraapper({ children, classes, title }: ModalWrapperProps) {
    const handleCloseModal = () => {
        openModal(false);
    };
    const { modalIsOpen, openModal, modalName } = useStore();

    return modalIsOpen ? (
        <>
            <Modal
                header={title!}
                isOpen={modalIsOpen}
                classes={classes!}
                handleCloseModal={handleCloseModal}
            >
                {children}
            </Modal>
        </>
    ) : null;
}

export default ModalWraapper;
