import DiscoverViewWrapper from '@/ui/discover/view-wrapper';
import { cookies } from 'next/headers';

interface DiscoverLayoutType {
    children: React.ReactNode;
    map: React.ReactNode;
    search: React.ReactNode;
}

export default async function DiscoverLayout({
    children,
    map,
    search,
}: DiscoverLayoutType) {
    const cookieStore = cookies();
    const cookieDiscoverView = cookieStore.get('discoverView');

    return (
        <div>
            {search}
            <DiscoverViewWrapper cookieDiscoverView={cookieDiscoverView?.value}>
                {children}
                {map}
            </DiscoverViewWrapper>
        </div>
    );
}
