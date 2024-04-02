export interface ModalWrapperProps {
    isOpen?: boolean;
    children: React.ReactNode;
    classes?: string;
    title?: string | JSX.Element | undefined;
}
