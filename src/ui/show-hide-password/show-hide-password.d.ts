export interface PasswordShowProps {
    id: string;
    name?: string;
    value?: string;
    className?: string;
    register?: any;
    onInputChange?: (val: string) => string | void;
}
