import CompareButton from '@/ui/compare-button';
import WishlistButton from '@/ui/wishlist-button';
import { NextIntlGetTranslatorFunction, Unit } from '@/types';
import { HouseIcon } from '@/ui/svg';
import { getLangkey } from '@/helpers';
import ContentsSwiper from './ContentsSwiper';
import {
    AreaIcon,
    BathIcon,
    BedIcon,
    LocationMarkerOutlineIcon,
} from '@/ui/svg';
import SoldOut from '@/ui/SoldOut/SoldOut';
import Cash from './payment-type/cash';
import Installments from './payment-type/installments';
import Leasing from './payment-type/leasing';

export interface CardContentsProps {
    unit: Unit;
    locale: string;
    tGlobal: NextIntlGetTranslatorFunction;
    tUnitCard: NextIntlGetTranslatorFunction;
    isDrawerContent?: boolean;
}
const CardContents = ({
    unit,
    locale,
    tGlobal,
    tUnitCard,
    isDrawerContent,
}: CardContentsProps) => {
    // Read translations
    const isCommercialUnit = unit?.type === 'commercial';

    return (
        <>
            <div className="group relative h-64 w-full cursor-pointer overflow-hidden rounded-t-xl">
                <div>
                    <ContentsSwiper images={unit?.images || []} />
                </div>
                <div className="absolute top-0 z-10 flex w-full items-center justify-between p-4">
                    {unit?.sale_type === 'sale' ? (
                        <div className="rounded-full bg-white px-3 py-1 text-xs font-medium capitalize">
                            {tGlobal('from_developer') || ''}
                        </div>
                    ) : (
                        <div className="rounded-full bg-white px-3 py-1 text-xs font-medium capitalize">
                            {unit.sale_type || ''}
                        </div>
                    )}
                    <div className="flex items-center gap-x-2 rounded-full text-xs font-medium">
                        <CompareButton item={unit} type="units" />
                        <WishlistButton item={unit} type="unit" />
                    </div>
                </div>
                <div className="absolute bottom-4 z-10 flex w-full items-center justify-between px-4">
                    <div>
                        {unit?.UnitType?.name && (
                            <div className="flex items-center justify-center gap-1 rounded-3xl bg-[#E8FFF5] px-3 py-1 text-xs font-medium capitalize text-black">
                                <HouseIcon />
                                <p className="text-primary-green">
                                    {getLangkey(
                                        unit.UnitType.name || '',
                                        locale
                                    )}
                                </p>
                            </div>
                        )}
                    </div>
                    {unit?.sold_out ? <SoldOut type="unit" /> : null}
                </div>
            </div>
            <div className="group relative overflow-hidden">
                <div>
                    <div className="grid grid-cols-2 bg-[#FAFAFA] px-4 py-2 text-xs font-medium capitalize">
                        {unit?.developer?.name && (
                            <div
                                className="line-clamp-1"
                                title={getLangkey(
                                    unit.developer.name || '',
                                    locale
                                )}
                            >
                                {getLangkey(unit.developer?.name || '', locale)}
                            </div>
                        )}

                        <div>
                            {tUnitCard('delivery') || ''} -
                            {unit.project?.delivery_year || ''}
                        </div>
                    </div>

                    <div className="space-y-4 p-4">
                        <div className="space-y-4">
                            {/* start content */}
                            {unit?.payment_type === 'cash' ? (
                                <Cash
                                    locale={locale}
                                    unit={unit}
                                    tGlobal={tGlobal}
                                    tUnitCard={tUnitCard}
                                    isDrawerContent={isDrawerContent}
                                />
                            ) : unit?.payment_type === 'installments' ? (
                                <Installments
                                    locale={locale}
                                    unit={unit}
                                    tGlobal={tGlobal}
                                    tUnitCard={tUnitCard}
                                    isDrawerContent={isDrawerContent}
                                />
                            ) : unit?.payment_type === 'leasing' ? (
                                <Leasing
                                    locale={locale}
                                    unit={unit}
                                    tGlobal={tGlobal}
                                    tUnitCard={tUnitCard}
                                    isDrawerContent={isDrawerContent}
                                />
                            ) : null}
                            {/* end content */}

                            <div className="flex items-center gap-x-1 text-xs">
                                <LocationMarkerOutlineIcon
                                    width={24}
                                    height={24}
                                    className="h-4 w-4 shrink-0 fill-current text-gray-500"
                                />

                                {unit?.address && (
                                    <p className="line-clamp-1">
                                        {getLangkey(unit.address || '', locale)}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center gap-x-4">
                                <div className="flex items-center gap-x-4">
                                    {!isCommercialUnit && (
                                        <div className="flex items-center gap-x-2 text-xs font-medium">
                                            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-100 bg-gray-50">
                                                <BedIcon />
                                            </div>
                                            {unit.bedroom || ''}
                                        </div>
                                    )}
                                    {!isCommercialUnit && (
                                        <div className="flex items-center gap-x-2 text-xs font-medium">
                                            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-100 bg-gray-50">
                                                <BathIcon />
                                            </div>
                                            {unit.bathroom || ''}
                                        </div>
                                    )}

                                    <div className="flex items-center gap-x-2 text-xs font-medium">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-100 bg-gray-50">
                                            <AreaIcon />
                                        </div>
                                        <p className="space-x-1">
                                            <span>{unit.area || ''}</span>
                                            <span>
                                                {tUnitCard('meter')}
                                                <sup>2</sup>
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CardContents;
