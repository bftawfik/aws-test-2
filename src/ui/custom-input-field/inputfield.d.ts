export interface InputFieldProps {
    label: string;
    value: number;
    type: string;
    min?: number;
    max?: number;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (e: ChangeEvent<HTMLInputElement>) => void;
    className?: string;
}
