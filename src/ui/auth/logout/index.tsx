'use client';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const Logout = () => {
    const router = useRouter();
    const handleLogout = () => {
        signOut();
        router.refresh();
    };

    return (
        <button
            className="text-main-black rounded-lg bg-gray-200 px-3 py-2 text-sm font-medium transition-colors hover:bg-gray-300"
            onClick={handleLogout}
        >
            Logout
        </button>
    );
};

export default Logout;
