export interface BreadcrumbProps {
    pages: Array<Type>;
}

interface Type {
    name: string;
    href: string;
    current: boolean;
}
