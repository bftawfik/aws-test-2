import { NextIntlGetTranslatorFunction, Unit } from '@/types';
interface LeasingProps {
    unit: Unit;
    locale: string;
    tGlobal: NextIntlGetTranslatorFunction;
    tUnitCard: NextIntlGetTranslatorFunction;
    isDrawerContent?: boolean;
}
const Leasing = ({
    locale,
    unit,
    tGlobal,
    tUnitCard,
    isDrawerContent,
}: LeasingProps) => {
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
                            {tUnitCard('leasing_only') || ''}
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-y-6 capitalize">
                <div className="space-y-2">
                    <div>
                        <div className="text-xs text-gray-500">
                            {/* <p>rental</p> */}
                            <span>{tUnitCard('rental') || ''}</span>
                        </div>
                        <p className="font-bold">
                            {tUnitCard('monthly') || ''}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Leasing;
