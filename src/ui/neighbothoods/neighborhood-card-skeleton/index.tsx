import { SingleHouseIcon } from '@/ui/svg';

export const NeighborhoodSkeleton = () => {
    return (
        <div className="group me-2 flex min-h-[209px] w-full flex-col overflow-hidden rounded-xl bg-[#EEEEEE]">
            <div className="flex w-full flex-col gap-2 px-4 py-4">
                <div className="h-4 w-48 animate-pulse rounded-full bg-white"></div>
                <div className="h-4 w-[121px] animate-pulse rounded-full bg-white"></div>
            </div>
            <div className="flex h-full w-full animate-pulse items-center justify-center">
                <SingleHouseIcon width={52} height={52} viewBox="0 0 52 52" />
            </div>
        </div>
    );
};
