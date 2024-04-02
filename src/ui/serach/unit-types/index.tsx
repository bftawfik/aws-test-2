import BlockedCheckbox from '@/ui/blocked-checkbox';
import DropdownAction from '@/ui/dropdown-action';
import { DownArrowIcon, TypeIcon } from '@/ui/svg';

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
}

const residentialTypes = [
    'Family House',
    'Quattro',
    'Loft',
    'Apartment',
    'Cabin',
    'Chalet',
    'Studio',
    'Duplex',
    'Penthouse',
    'Townhouse',
    'Twin House',
    'Standalone Villa',
];

export default function UnitTypesSearch() {
    return (
        <>
            {/* Unit types */}
            <div className="group flex h-16 cursor-pointer items-center border-e border-gray-100 transition-colors hover:bg-gray-50">
                <div className="relative inline-block h-16">
                    <span className="absolute end-2 top-2 flex h-2 w-2 items-center justify-center">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
                    </span>

                    <div className="h-full">
                        <button className="inline-flex h-full appearance-none items-center gap-x-1 p-4 text-sm">
                            <div className="flex items-center gap-x-1">
                                <TypeIcon />
                                Type
                            </div>
                            <DownArrowIcon />
                        </button>
                    </div>

                    {/* Dropdown menu */}
                    <div
                        className={classNames(
                            'scale-up-center absolute end-0 z-20 hidden w-96 origin-center overflow-hidden rounded-b-lg bg-white p-2 ring-1 ring-gray-100 group-hover:block'
                        )}
                    >
                        <div className="p-2">
                            <nav
                                className="relative z-10 flex overflow-hidden rounded-t-lg border border-gray-100"
                                aria-label="Tabs"
                                role="tablist"
                            >
                                <button
                                    type="button"
                                    className="active relative min-w-0 flex-1 overflow-hidden border-b-2 border-e border-b-emerald-500 bg-gray-50 p-4 text-center text-xs font-medium transition-colors hover:bg-gray-50 focus:z-10"
                                    id="bar-with-underline-item-1"
                                    data-hs-tab="#bar-with-underline-1"
                                    aria-controls="bar-with-underline-1"
                                    role="tab"
                                >
                                    Residential
                                </button>

                                <button
                                    type="button"
                                    className="relative min-w-0 flex-1 overflow-hidden border-b-2 border-b-gray-100 px-4 py-4 text-center text-xs font-medium text-gray-500 transition-colors hover:border-b-gray-300 hover:bg-gray-50 focus:z-10"
                                    id="bar-with-underline-item-2"
                                    data-hs-tab="#bar-with-underline-2"
                                    aria-controls="bar-with-underline-2"
                                    role="tab"
                                >
                                    Commercial
                                </button>
                            </nav>

                            <div className="mt-4 cursor-default space-y-4">
                                {/* <!-- Tab Content 1 --> */}
                                <div className="scrollbar max-h-52 overflow-auto">
                                    <div
                                        id="bar-with-underline-1"
                                        role="tabpanel"
                                        className="grid grid-cols-2 gap-3 pe-2"
                                        aria-labelledby="bar-with-underline-item-1"
                                    >
                                        {residentialTypes.map((type) => (
                                            <BlockedCheckbox
                                                id={`residential-${type}`}
                                                label={type}
                                                key={type}
                                                variant="outline"
                                                className="p-3 text-xs"
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
