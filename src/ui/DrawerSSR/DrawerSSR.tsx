import { CgClose } from 'react-icons/cg';
import Link from 'next/link';

export interface DrawerSSRProps {
    isOpen: boolean | undefined;
    currentUrl: string;
    title?: string;
    children: React.ReactNode;
    headerElemnt?: JSX.Element | React.ReactNode;
}

const DrawerSSR = ({
    isOpen = false,
    title = '',
    children,
    headerElemnt,
    currentUrl,
}: DrawerSSRProps) => {
    if (!isOpen) return null;

    return (
        <section>
            <div className="relative ">
                <div className="fixed inset-0 !z-[100] overflow-hidden">
                    <div className="absolute inset-0 w-screen overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 start-0 flex w-screen max-w-full justify-between">
                            {/* Drawer Details */}
                            <div className="pointer-events-auto w-full lg:w-1/2">
                                <div className="flex h-full flex-col overflow-y-auto bg-white shadow-xl">
                                    <div className="sticky left-0 top-0 z-50 flex items-center justify-end gap-4 bg-white px-4 py-3 sm:px-6">
                                        <h2 className="text-base font-semibold leading-6 text-gray-900">
                                            {title}
                                        </h2>
                                        <div className="flex h-7 items-center gap-4">
                                            {headerElemnt}
                                            <Link
                                                type="button"
                                                className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none "
                                                href={currentUrl}
                                            >
                                                <CgClose className="h-6 w-6 text-gray-400" />
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="relative mt-6 flex-1 px-4 sm:px-6">
                                        {children}
                                    </div>
                                </div>
                            </div>
                            <Link
                                href={currentUrl}
                                className="pointer-events-auto h-full flex-1"
                            ></Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
export default DrawerSSR;
