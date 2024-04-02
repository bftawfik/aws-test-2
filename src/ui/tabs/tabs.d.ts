export interface Item {
    value: string;
    content: JSX.Element;
}

export interface TabItem {
    [key: string]: Item;
}
export interface TabsProps {
    list: TabItem;
    classes?: string | undefined;
    activeTab?: number;
}
