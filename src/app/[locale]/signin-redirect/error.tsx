'use client';

import GenericError from '@/ui/empty-states/GenericError/GenericError';
export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return <GenericError />;
}
