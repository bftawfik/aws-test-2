import { SingleHouseIcon } from '@/ui/svg';

export const ProjectSkeleton = () => {
    return (
        <div className="w-full rounded-xl border border-gray-100 bg-white shadow">
            <div className="group relative h-56 w-full animate-pulse cursor-pointer overflow-hidden rounded-t-xl bg-zinc-200">
                <div className="flex h-full w-full items-center justify-center">
                    <SingleHouseIcon
                        width={32}
                        height={32}
                        viewBox="0 0 52 52"
                    />
                </div>
                <div className="absolute top-0 flex w-full items-center justify-between p-4">
                    <div className="h-10 w-10 overflow-hidden rounded-full bg-white "></div>
                    <div className="flex items-center gap-x-2 rounded-full">
                        <div className="group inline-flex h-8 w-8 items-center justify-center rounded-full bg-white transition-colors"></div>
                        <div className="group inline-flex h-8 w-8 items-center justify-center rounded-full bg-white"></div>
                    </div>
                </div>

                <div className="absolute bottom-4 w-full px-4">
                    <div className="h-4 w-40 rounded-lg bg-white px-2 py-1"></div>
                </div>
            </div>
            <div className="grid w-full grid-cols-4 gap-3 p-3">
                <div className="col-span-2 flex items-center gap-x-3">
                    <div className="h-10 w-10 overflow-hidden rounded-full border border-gray-50 shadow-md"></div>
                    <div className="h-4 w-24 rounded-lg bg-zinc-200 px-2 py-1"></div>
                </div>

                <div className="col-span-2 items-center space-y-2 ">
                    <div className="h-3 w-28 rounded-lg bg-zinc-200 px-2"></div>
                    <div className="w-30 h-4 rounded-lg bg-zinc-200 px-2"></div>
                </div>
            </div>
        </div>
    );
};
