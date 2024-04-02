'use server';
import { getLangkey } from '@/helpers';
import ReadMore from '@/ui/read-more';
import Image from 'next/image';
import { InnerMapWIthStaticImage } from '@/ui/InnerMapWIthStaticImage/InnerMapWIthStaticImage';
import ContactusForm from '@/ui/contactus-form';
import AmenitiesShow from '@/ui/AmenitiesShow/AmenitiesShow';
import DrawerGallery from '@/ui/gallery-component/DrawerGallery/DrawerGallery';
import { ImagePlaceholder } from '@/ui/image-placeholder';
import getNumberFormat from '@/helpers/get-number-format';
import { getTranslations } from 'next-intl/server';
import { BathRoomIcon, BedOutlineIcon, DimensionsIcon } from '@/ui/svg';
import { Unit } from '@/types';
import InnerSectionHeaderV2 from '@/ui/InnersSectionHeaderV2';
import SoldOut from '@/ui/SoldOut/SoldOut';

const SSRDrawerUnitContent = async ({
    unit,
    locale,
}: {
    unit: Unit;
    locale: string;
}) => {
    const tGlobal = await getTranslations('global');
    const tUnitCard = await getTranslations('unit_card');

    const checkCommercialUnitType = unit?.type === 'commercial';

    return (
        <>
            <div className="mb-5 flex items-center gap-x-4">
                <h1 className="text-xl font-semibold capitalize leading-none text-black lg:text-2xl">
                    {getLangkey(unit.title, locale)}
                </h1>

                {unit?.sold_out ? <SoldOut type="unit" /> : null}
            </div>

            <div className={`flex flex-col gap-y-12 md:mt-8`}>
                <div className="flex items-center gap-x-4">
                    <div className="h-20 w-20 rounded-full drop-shadow-header">
                        <ImagePlaceholder
                            classes="max-w-full max-h-full rounded-full"
                            image={unit?.project?.logo || ''}
                            errorClasses="h-full w-full flex items-center justify-center bg-neutral-100 p-1"
                        />
                    </div>
                    <div>
                        <span className="text-base font-normal capitalize text-custom-grey">
                            {tGlobal('starting_from')}
                        </span>
                        <div className="text-2xl font-bold text-black">
                            {getNumberFormat(unit?.price)}

                            <span className="text-xl font-normal uppercase">
                                {tGlobal('egp') || ''}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                    {unit?.bedroom && !checkCommercialUnitType && (
                        <div className="flex items-center gap-x-2">
                            <div className="flex h-10 min-w-[40px] max-w-[40px] items-center justify-center rounded-sm border border-solid bg-gray-100">
                                <BedOutlineIcon />
                            </div>
                            <span className="flex gap-x-1 text-sm font-medium uppercase text-custom-grey">
                                <span>{unit?.bedroom || ''}</span>
                                <span> {tGlobal('rooms') || ''}</span>
                            </span>
                        </div>
                    )}
                    {unit?.bathroom && !checkCommercialUnitType && (
                        <div className="flex items-center gap-x-2">
                            <div className="flex h-10 min-w-[40px] max-w-[40px] items-center justify-center rounded-sm border border-solid bg-gray-100">
                                <BathRoomIcon />
                            </div>
                            <span className="flex gap-x-1 text-sm font-medium uppercase text-custom-grey">
                                <span>{unit?.bathroom || ''}</span>
                                <span>{tGlobal('baths') || ''}</span>
                            </span>
                        </div>
                    )}
                    {unit?.area && (
                        <div className="flex items-center gap-x-2">
                            <div className="flex h-10 min-w-[40px] max-w-[40px] items-center justify-center rounded-sm border border-solid bg-gray-100">
                                <DimensionsIcon />
                            </div>
                            <span className="flex gap-x-1 truncate text-sm font-medium uppercase text-custom-grey">
                                <span> {unit?.area || ''}</span>
                                <span> {tGlobal('meter') || ''}</span>
                                <sup>2</sup>
                            </span>
                        </div>
                    )}
                </div>
                <DrawerGallery images={unit?.images} locale={locale} />
                <aside className="w-full">
                    <InnerSectionHeaderV2
                        title={tGlobal('property_details') || ''}
                    />
                    <div className="grid w-full grid-cols-3 gap-2 gap-x-4">
                        <div className="col-span-1">
                            <div className="mt-8">
                                <span className="text-sm font-light capitalize text-gray-500">
                                    {tGlobal('unit_code') || ''}
                                </span>
                                <div className="mt-2 text-lg font-medium capitalize text-black">
                                    {unit?.reference || ''}
                                </div>
                            </div>
                        </div>
                        <div className="col-span-1">
                            <div className="mt-8">
                                <span className="text-sm font-light capitalize text-gray-500">
                                    {tGlobal('project') || ''}
                                </span>
                                <div className="mt-2 text-lg font-medium capitalize text-black">
                                    {getLangkey(unit?.project?.name, locale)}
                                </div>
                            </div>
                        </div>
                        <div className="col-span-1">
                            <div className="mt-8">
                                <span className="text-sm font-light capitalize text-gray-500">
                                    {tGlobal('delivery') || ''}
                                </span>
                                <div className="mt-2 text-lg font-medium capitalize text-black">
                                    {unit?.project?.start_delivery?.slice(
                                        0,
                                        4
                                    ) || ''}
                                </div>
                            </div>
                        </div>
                        <div className="col-span-1">
                            <div className="mt-8">
                                <span className="text-sm font-light capitalize text-gray-500">
                                    {tGlobal('payment_option') || ''}
                                </span>
                                <div className="mt-2 text-lg font-medium capitalize text-black">
                                    {tUnitCard(
                                        unit?.payment_type?.toLowerCase() || ''
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>
                <div className="mt-8 w-full md:mt-16">
                    <InnerSectionHeaderV2
                        title={tGlobal('description') || ''}
                    />
                    <p className="line-clamp mt-4 text-sm text-gray-500">
                        <ReadMore
                            maxChar={300}
                            text={unit?.description || ''}
                        />
                    </p>
                </div>
                <aside>
                    <InnerSectionHeaderV2
                        title={tGlobal('developed_by') || ''}
                    />
                    <div className="mt-7 flex items-center">
                        <div className="w-auto">
                            <div className="me-4 flex h-[78px] min-w-[78px] max-w-[78px] items-center justify-center overflow-hidden rounded-full border border-gray-100 bg-white p-2">
                                {unit?.developer?.logo && (
                                    <Image
                                        src={unit?.developer?.logo}
                                        width={300}
                                        height={300}
                                        className="h-full w-full rounded-full object-cover object-center transition duration-500 group-hover:scale-110"
                                        alt={
                                            unit?.developer?.name?.en ||
                                            '' + ' logo'
                                        }
                                    />
                                )}
                            </div>
                        </div>

                        <div>
                            <div className="text-base font-medium text-black">
                                {getLangkey(unit?.developer?.name, locale)}
                            </div>
                            <p className="mt-2 text-xs text-gray-500">
                                <ReadMore
                                    maxChar={300}
                                    text={
                                        getLangkey(
                                            unit.developer.description || '',
                                            locale
                                        ) as string | ''
                                    }
                                />
                            </p>
                        </div>
                    </div>
                </aside>
                <div className="mt-8 w-full md:mt-16">
                    <InnerSectionHeaderV2 title={tGlobal('location') || ''} />
                    <InnerMapWIthStaticImage
                        marker={{ lat: +unit.lat, lng: +unit.lng }}
                        staticImage={unit?.static_image_map}
                    />
                </div>
                <div>
                    <ContactusForm
                        id={unit?.id}
                        type="unit"
                        classes="lg:w-full"
                    />
                </div>
                {unit?.amenities?.length ? (
                    <AmenitiesShow amenities={unit.amenities} />
                ) : null}
            </div>
        </>
    );
};

export default SSRDrawerUnitContent;
