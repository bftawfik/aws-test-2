'use client';

import { useSearchStore } from '@/store/search';
import { useTempStore } from '@/store/temp-search';

interface ResetStoreWrapperProps {
    children: React.ReactNode;
    classes?: string;
}
const ResetStoreWrapper = ({ children, classes }: ResetStoreWrapperProps) => {
    const { reset } = useSearchStore();
    const { resetTempStore } = useTempStore();
    return (
        <div
            className={classes}
            onClick={() => {
                reset();
                resetTempStore();
            }}
        >
            {children}
        </div>
    );
};

export default ResetStoreWrapper;
