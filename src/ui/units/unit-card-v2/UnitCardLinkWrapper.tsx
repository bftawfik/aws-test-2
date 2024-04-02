import Link from 'next/link';

interface UnitCardLinkWrapperProps {
    url: string;
    children: React.ReactNode;
}
const UnitCardLinkWrapper = ({ url, children }: UnitCardLinkWrapperProps) => {
    return (
        <Link prefetch={false} href={url}>
            {children}
        </Link>
    );
};
export default UnitCardLinkWrapper;
