export interface DrawerProps {
    isOpen: boolean;
    closeModalHandler: () => void;
    title?: string;
    children: React.ReactNode;
    headerElemnt?: JSX.Element | React.ReactNode;
}
