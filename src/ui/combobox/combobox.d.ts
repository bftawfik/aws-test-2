export interface ComboBoxProps {
    listOfData: { label: string; value: number }[];
    onChange: any;
    value: number;
    title?: string;
    id?: string | undefined;
    filterData: ({ label: string, value: number }) => void;
}
