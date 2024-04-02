import { getLangkey } from '@/helpers';
import getNumberFormat from '@/helpers/get-number-format';
import { NextIntlGetTranslatorFunction, Unit } from '@/types';
interface CashProps {
    unit: Unit;
    locale: string;
    tGlobal: NextIntlGetTranslatorFunction;
    tUnitCard: NextIntlGetTranslatorFunction;
    isDrawerContent?: boolean;
}
const Cash = ({
    locale,
    unit,
    tGlobal,
    tUnitCard,
    isDrawerContent,
}: CashProps) => {
    return (
        <div className="grid grid-cols-2">
            <div className="flex flex-col gap-y-3 capitalize">
                <div className="space-y-2">
                    <div>
                        <div className="text-xs text-gray-500">
                            <p>{tUnitCard('starting_from') || ''}</p>
                        </div>
                        <p
                            className={`line-clamp-1 space-x-1 font-bold ${
                                isDrawerContent ? 'text-base' : 'text-lg'
                            }`}
                        >
                            {getNumberFormat(unit?.price)}

                            <span className="ms-1 text-xs">
                                {tGlobal('egp') || ''}
                            </span>
                        </p>
                    </div>
                    {unit?.project?.name && (
                        <p className="line-clamp-1 rounded-lg text-xs ltr:mr-2 rtl:ml-2">
                            {getLangkey(unit.project.name || '', locale)}
                        </p>
                    )}
                </div>
            </div>

            <div className="flex flex-col gap-y-6 capitalize">
                <div className="space-y-2">
                    <div>
                        <div className="text-xs text-gray-500">
                            <span>{tUnitCard('payment') || ''}</span>
                        </div>
                        <p className="font-bold">{tUnitCard('cash') || ''}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Cash;
