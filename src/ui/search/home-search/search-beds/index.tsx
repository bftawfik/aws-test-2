import BlockedCheckbox from '@/ui/blocked-checkbox';
import { SearchBedsProps } from './search-beds';
import CustomDropdown from '@/ui/custom-dropdown';
import DropdownAction from '@/ui/dropdown-action';
import React from 'react';
import { useSearchStore } from '@/store/search';
import BorderedCheckbox from '@/ui/bordered-checkbox';
import { useTempStore } from '@/store/temp-search';
import { UniquList } from '@/helpers';
import { BedOutlineIcon, RoomBedIcon } from '@/ui/svg';
import { BathWaterIcon } from '@/ui/svg';
import { useGenerateUrl } from '@/hooks/useGenerateUrl/useGenerateUrl';
import { useRouter } from 'next/navigation';
import { DEFATULT_EMPTY_URL } from '@/constants';
import { useTranslations, useLocale } from 'next-intl';
import NotificationDot from '@/ui/notification-badge/brand-notification';

const SearchBeds = () => {
    // Read localization
    const locale = useLocale();

    // Read translations
    const tGlobal = useTranslations('global');

    const roomsAndBaths = [
        ...Array.from({ length: 5 }, (_, index) => index + 1),
    ];
    const router = useRouter();
    const { beds, baths, setBeds, setBaths, resetBeds, resetBaths } =
        useSearchStore();
    const {
        tempBeds,
        tempBaths,
        setTempBeds,
        setTempBaths,
        resetTempBeds,
        resetTempBaths,
        setAllTempBaths,
        setAllTempBeds,
    } = useTempStore();
    const updateUrl = useGenerateUrl({
        tempBeds: !tempBeds ? beds : tempBeds.sort(),
        tempBaths: !tempBaths ? baths : tempBaths.sort(),
        tempPage: DEFATULT_EMPTY_URL.tempPage,
    });
    const updateBeds = (bedsNum: number) => {
        tempBeds === null
            ? setAllTempBeds(UniquList(beds, bedsNum))
            : setTempBeds(bedsNum);
    };
    const updateBaths = (bathsNum: number) => {
        tempBaths === null
            ? setAllTempBaths(UniquList(baths, bathsNum))
            : setTempBaths(bathsNum);
    };
    const bedsList = tempBeds ? tempBeds : beds;
    const bathsList = tempBaths ? tempBaths : baths;
    const resetUrl = useGenerateUrl({
        tempBeds: DEFATULT_EMPTY_URL.tempBeds,
        tempBaths: DEFATULT_EMPTY_URL.tempBaths,
        tempPage: DEFATULT_EMPTY_URL.tempPage,
    });
    const handleReset = () => {
        resetTempBeds();
        resetTempBaths();
        // resetBeds();
        // resetBaths();
        router.push(resetUrl);
    };

    const handleBedsAndBathsValue = () => {
        // setBaths(bathsList);
        // setBeds(bedsList);
        router.push(updateUrl);
        resetTempBeds();
        resetTempBaths();
    };

    // Filter updated check
    const updated = beds.length > 0 || baths.length > 0;

    return (
        <div className="group flex h-16 cursor-pointer items-center border-e border-gray-100 transition-colors hover:bg-gray-50">
            <div className="relative inline-block h-16">
                {updated && <NotificationDot classes="z-50 end-0 -top-1" />}
                <div className="h-full w-full ">
                    <CustomDropdown
                        icon={<BedOutlineIcon />}
                        label={tGlobal('beds_and_baths')}
                    >
                        <div className="z-50 w-44 origin-center overflow-hidden rounded-b-lg bg-white">
                            <div className="space-y-4">
                                {/* Rooms */}
                                <div className="space-y-4">
                                    <h3 className="flex items-center gap-x-1 text-sm">
                                        <RoomBedIcon />
                                        {tGlobal('specific_rooms')}
                                    </h3>
                                    <ul className="grid grid-cols-3 gap-2">
                                        <BorderedCheckbox
                                            label={`${tGlobal('all')}`}
                                            styleType="fill"
                                            onChange={() => setAllTempBeds([])}
                                            checked={bedsList.length <= 0}
                                            value="All_Beds"
                                            id="All_Beds"
                                        />

                                        {roomsAndBaths.map((room) => (
                                            <BlockedCheckbox
                                                label={
                                                    room === 5
                                                        ? room + '+'
                                                        : room.toString()
                                                }
                                                onChange={() =>
                                                    updateBeds(room)
                                                }
                                                checked={bedsList.includes(
                                                    room
                                                )}
                                                key={`rooms-${room}`}
                                                id={`rooms-${room}`}
                                                variant="outline"
                                                className="text-center"
                                            />
                                        ))}
                                    </ul>
                                </div>

                                {/* Baths */}
                                <div className="space-y-4">
                                    <h3 className="flex items-center gap-x-1 text-sm">
                                        <BathWaterIcon />
                                        {tGlobal('specific_baths')}
                                    </h3>
                                    <ul className="grid grid-cols-3 gap-2">
                                        <BorderedCheckbox
                                            label={`${tGlobal('all')}`}
                                            styleType="fill"
                                            onChange={() => setAllTempBaths([])}
                                            checked={bathsList.length <= 0}
                                            value="All_baths"
                                            id="All_baths"
                                        />
                                        {roomsAndBaths.map((bath) => (
                                            <BlockedCheckbox
                                                label={
                                                    bath === 5
                                                        ? bath + '+'
                                                        : bath.toString()
                                                }
                                                onChange={() =>
                                                    updateBaths(+bath)
                                                }
                                                checked={bathsList.includes(
                                                    +bath
                                                )}
                                                key={`baths-${bath}`}
                                                id={`baths-${bath}`}
                                                variant="outline"
                                            />
                                        ))}
                                    </ul>
                                </div>
                                <DropdownAction
                                    apply={handleBedsAndBathsValue}
                                    reset={handleReset}
                                />
                            </div>
                        </div>
                    </CustomDropdown>
                </div>
            </div>
        </div>
    );
};

export default SearchBeds;
