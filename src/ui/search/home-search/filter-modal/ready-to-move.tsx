import BorderedCheckbox from '@/ui/bordered-checkbox';
import React from 'react';
import { useSearchStore } from '@/store/search';
import { useTranslations } from 'next-intl';
interface readyToMoveProps {
    handleChange: () => void;
    id?: string;
}
const ReadyToMove = ({ handleChange, id = 'ready' }: readyToMoveProps) => {
    // Read translations
    const tGlobal = useTranslations('global');

    const { readyToMove } = useSearchStore();

    return (
        <div className="flex">
            <ul>
                <BorderedCheckbox
                    id={id}
                    onChange={handleChange}
                    checked={readyToMove}
                    value="Ready to move"
                    withBox={true}
                    label={`${tGlobal('ready_to_move')}`}
                />
            </ul>
        </div>
    );
};

export default ReadyToMove;
