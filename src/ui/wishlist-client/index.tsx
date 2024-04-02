'use client';
import React, { useState } from 'react';
import EmptyWishlist from '../empty-states/empty-wishlist';
import { useWishlistStore } from '@/store/global';
import { useEffectOnce } from 'usehooks-ts';
import { useTranslations } from 'next-intl';
import { ProjectCardV2 } from '../projects/ProjectCardV2';
import { Project } from '@/types';
import { getOrigin } from '@/helpers/getOrigin';
import { UnitCard } from '../units/unit-card-v2';
import dynamic from 'next/dynamic';

interface WishlishClientProps {
    locale: string;
}
const WishlishClient = ({ locale }: WishlishClientProps) => {
    const [openTab, setOpenTab] = useState('projects');
    // Read translations
    const tGlobal = useTranslations('global');
    const tUnitCard = useTranslations('unit_card');
    const host = getOrigin();

    // use store
    const { wishlist } = useWishlistStore();

    const wishlist_units = wishlist.filter((item) => item.type === 'unit');
    const wishlist_projects = wishlist.filter(
        (item) => item.type === 'project'
    );
    // We're calling this only once when open the wishlist page to set the tab on the tab which has items
    useEffectOnce(() => {
        // Set openTab based on wishlist data
        if (openTab === 'units' && wishlist_units?.length === 0) {
            setOpenTab('projects');
        } else if (openTab === 'projects' && wishlist_projects?.length === 0) {
            setOpenTab('units');
        }
    });

    return (
        <div>
            <div className="flex flex-col">
                {/* Buttons Units and projects */}
                <ul className="flex gap-x-4">
                    <li>
                        <button
                            onClick={() => setOpenTab('projects')}
                            className={`inline-block h-11  w-32 min-w-[128px] rounded-lg border border-gray-200 px-4 py-2 text-sm capitalize ${
                                openTab === 'projects'
                                    ? 'bg-primary text-white'
                                    : 'bg-white'
                            }`}
                        >
                            {tGlobal('projects')}
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => setOpenTab('units')}
                            className={`inline-block h-11  w-32 min-w-[128px] rounded-lg border border-gray-200 px-4 py-2 text-sm capitalize ${
                                openTab === 'units'
                                    ? 'bg-primary text-white'
                                    : 'bg-white'
                            }`}
                        >
                            {tGlobal('specific_units')}
                        </button>
                    </li>
                </ul>
                <div className="my-6">
                    {openTab === 'projects' && (
                        <div>
                            {wishlist_projects.length ? (
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                                    {(wishlist_projects as Project[]).map(
                                        (project: Project) => (
                                            <ProjectCardV2
                                                key={project.id}
                                                project={project}
                                                tGlobal={tGlobal}
                                                locale={locale}
                                            />
                                        )
                                    )}
                                </div>
                            ) : (
                                <EmptyWishlist />
                            )}
                        </div>
                    )}
                    {openTab === 'units' && (
                        <div>
                            {wishlist_units.length ? (
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                                    {wishlist_units.map((unit: any) => (
                                        <UnitCard
                                            key={unit.id}
                                            unit={unit}
                                            locale={locale}
                                            host={host}
                                            tGlobal={tGlobal}
                                            tUnitCard={tUnitCard}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <EmptyWishlist />
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default dynamic(() => Promise.resolve(WishlishClient), {
    ssr: false,
});
