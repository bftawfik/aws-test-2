import { SingleHouseIcon } from '@/ui/svg';

export const DeveloperSkeleton = () => {
    return (
        <div className="drop-shadow relative h-56 max-w-sm animate-pulse overflow-hidden  rounded-lg bg-zinc-200">
            <div className="h-full w-full">
                <div className="absolute flex h-full w-full items-center justify-center">
                    <SingleHouseIcon
                        width={32}
                        height={32}
                        viewBox="0 0 52 52"
                    />
                </div>
                <div className="absolute top-2 w-full items-center  space-y-2 p-2">
                    <div className="h-5 w-3/4 rounded-full bg-zinc-50 "></div>
                    <div className="h-5 w-1/2 rounded-full bg-zinc-50"></div>
                </div>
            </div>
        </div>
    );
};
