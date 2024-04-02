'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import ActiveLaunch from './active-launch';
import LaunchMiniCard from './mini-card';
import { useQuery } from '@tanstack/react-query';
import getNewLaunches from '@/actions/getNewLaunches';
import { NewLaunch } from '@/types';
import { useLocale } from 'next-intl';

function NewLaunchSection() {
    const [launchData, setLaunch] = useState<NewLaunch>();

    // Read localization
    const locale = useLocale();

    const { data, status, isFetching } = useQuery<{
        data: NewLaunch[];
        status: string;
        isFetching: boolean;
    }>({
        queryKey: ['new_launches'],
        queryFn: () => getNewLaunches(locale, 1, 4),
    });

    useEffect(() => {
        if (status === 'success') {
            setLaunch(data?.data[0]);
        }
    }, [status, data]);

    return (
        <>
            {isFetching ? (
                <div
                    role="status"
                    className="flex h-[400px] w-full animate-pulse items-center justify-center rounded-lg bg-zinc-200 lg:h-[500px] "
                ></div>
            ) : null}

            {data?.data.length ? (
                <div className="w-full rounded-lg">
                    <div className="h-[400px] lg:h-[500px]">
                        <div className="relative h-full text-white">
                            <Image
                                src={
                                    'https://images.unsplash.com/photo-1569288063643-5d29ad64df09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80'
                                }
                                width={500}
                                height={500}
                                className="h-full w-full rounded-lg object-cover object-center"
                                alt={'new_launch'}
                            />

                            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-black/70 p-10">
                                <div className="flex h-full flex-col justify-between gap-y-6">
                                    <ActiveLaunch launch={launchData} />
                                    <div className="hidden gap-x-10 gap-y-4 overflow-hidden rounded-xl bg-black/30  md:grid-cols-2 lg:grid lg:grid-cols-4">
                                        {data?.data?.map((launch) => (
                                            <LaunchMiniCard
                                                key={launch.id}
                                                launch={launch}
                                                isActive={
                                                    launch.id === launchData?.id
                                                }
                                                handleChange={() =>
                                                    setLaunch(launch)
                                                }
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    );
}

export default NewLaunchSection;
