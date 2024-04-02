import { JsxElement } from 'typescript';

export interface ModalProps {
    classes?: string;
    isOpen: boolean;
    handleCloseModal: () => void;
    children: React.ReactNode;
    header?: string | JSX.Element | undefined;
}
