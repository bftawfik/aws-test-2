import { SingleHouseIcon } from '@/ui/svg';

export const UnitsSkeleton = () => {
    return (
        <div className="w-full rounded-xl border border-gray-100 bg-white shadow">
            <div className="group relative h-56 w-full animate-pulse cursor-pointer overflow-hidden rounded-t-xl bg-zinc-200">
                <div className="absolute top-0 flex w-full items-center justify-between p-4">
                    <div className="h-7 w-20 rounded-full bg-white px-3 py-1 text-xs font-medium"></div>
                    <div className="flex items-center gap-x-2 rounded-full text-xs font-medium">
                        <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white transition-colors"></div>
                        <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white"></div>
                    </div>
                </div>
                <div className="flex h-full w-full items-center justify-center">
                    <SingleHouseIcon
                        width={32}
                        height={32}
                        viewBox="0 0 52 52"
                    />
                </div>
            </div>

            <div className="group relative overflow-hidden">
                <div className="grid grid-cols-2 bg-[#FAFAFA] px-4 py-2 text-xs font-semibold">
                    <div className="h-5 w-24 rounded-3xl bg-zinc-200"></div>

                    <div className="w-30 h-5 rounded-3xl bg-zinc-200"></div>
                </div>

                <div className="space-y-4 p-4">
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-x-4">
                            <div className="flex flex-col gap-y-3">
                                <div className="w-30 h-3 rounded-3xl bg-zinc-200"></div>
                                <div className="h-3 w-28 rounded-3xl bg-zinc-200"></div>
                            </div>

                            <div className="flex flex-col gap-y-3">
                                <div className="w-30 h-3 rounded-3xl bg-zinc-200"></div>
                                <div className="h-3 w-28 rounded-3xl bg-zinc-200"></div>
                            </div>
                        </div>
                        <div className="h-3.5 w-full rounded-3xl bg-zinc-200"></div>
                    </div>
                    <div>
                        <div className="flex items-center gap-x-4">
                            <div className="flex items-center gap-x-4">
                                <div className="flex items-center gap-x-2 text-xs font-medium">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-100 bg-gray-100"></div>
                                </div>

                                <div className="flex items-center gap-x-2 text-xs font-medium">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-100 bg-gray-100"></div>
                                </div>

                                <div className="flex items-center gap-x-2 text-xs font-medium">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-100 bg-gray-100"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-3 items-center overflow-hidden rounded-b-lg border-t border-t-gray-100 p-2">
                <div className="m-auto h-8 w-8 rounded-full  bg-gray-100 p-3 "></div>
                <div className="m-auto h-8 w-8 rounded-full  bg-gray-100 p-3 "></div>
                <div className=" m-auto h-8 w-8 rounded-full  bg-gray-100 p-3 "></div>
            </div>
        </div>
    );
};
