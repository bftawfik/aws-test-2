'use client';
import { Tab } from '@headlessui/react';
import { TabsProps } from './tabs';
import { classNames } from '@/helpers';
import { useState } from 'react';

export default function Tabs(props: TabsProps) {
    const [selectedIndex, setSelectedIndex] = useState(props.activeTab || 0);
    return (
        <div className={`w-full max-w-md  sm:px-0 ${props.classes}`}>
            <Tab.Group
                selectedIndex={selectedIndex}
                onChange={setSelectedIndex}
            >
                <Tab.List className="focus:ring-none flex w-full gap-3 border-b border-gray-200 focus:outline-none">
                    {Object.keys(props.list).map((tab) => (
                        <Tab
                            key={tab}
                            className={({ selected }) =>
                                classNames(
                                    'w-full py-2.5 text-sm capitalize leading-5 focus:outline-none',
                                    selected
                                        ? 'bg-gray-50 text-primary'
                                        : 'border-transparent  hover:bg-gray-50'
                                )
                            }
                        >
                            {tab}
                        </Tab>
                    ))}
                </Tab.List>

                <Tab.Panels className="my-3 ">
                    {Object.values(props.list).map((item, idx) => (
                        <Tab.Panel
                            key={'tab-' + idx}
                            className={classNames(
                                'rounded-xl bg-white p-3',
                                'focus:outline-none '
                            )}
                        >
                            {item.content}
                        </Tab.Panel>
                    ))}
                </Tab.Panels>
            </Tab.Group>
        </div>
    );
}
