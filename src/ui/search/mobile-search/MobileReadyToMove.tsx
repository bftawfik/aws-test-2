import BorderedCheckbox from '@/ui/bordered-checkbox';
import React, { useEffect } from 'react';
import { useSearchStore } from '@/store/search';
import { useTranslations } from 'next-intl';
import { useTempStore } from '@/store/temp-search';

const MobileReadyToMove = () => {
    // Read translations
    const tGlobal = useTranslations('global');

    const { readyToMove } = useSearchStore();
    const { tempReadyToMove, setTempReadyToMove } = useTempStore();

    const handleReadyToMoveChange = () => {
        setTempReadyToMove(!tempReadyToMove);
    };
    useEffect(() => {
        if (readyToMove) {
            setTempReadyToMove(readyToMove);
        }
    }, [readyToMove, setTempReadyToMove]);
    return (
        <div className="flex">
            <ul>
                <BorderedCheckbox
                    id={'readyToMoveMobile'}
                    onChange={handleReadyToMoveChange}
                    checked={tempReadyToMove}
                    value="Ready to move"
                    withBox={true}
                    label={`${tGlobal('ready_to_move')}`}
                />
            </ul>
        </div>
    );
};

export default MobileReadyToMove;
