'use client';
import dynamic from 'next/dynamic';
import { clarity } from 'react-microsoft-clarity';

interface ClarityProps {
    id: string | undefined;
}
const Clarity = ({ id }: ClarityProps) => {
    id && clarity.init(id);
    return null;
};
export default dynamic(() => Promise.resolve(Clarity), {
    ssr: false,
});
