import { getLangkey } from '@/helpers';
import ReadMore from '@/ui/read-more';
import Image from 'next/image';
import AmenitiesShow from '@/ui/AmenitiesShow/AmenitiesShow';
import DrawerGallery from '@/ui/gallery-component/DrawerGallery/DrawerGallery';
import { ImagePlaceholder } from '@/ui/image-placeholder';
import getNumberFormat from '@/helpers/get-number-format';
import { NextIntlGetTranslatorFunction, Project } from '@/types';
import InnerSectionHeaderV2 from '@/ui/InnersSectionHeaderV2';
import SoldOut from '@/ui/SoldOut/SoldOut';

interface SSRDrawerProjectContentProps {
    project: Project;
    locale: string;
    tGlobal: NextIntlGetTranslatorFunction;
}

const SSRDrawerProjectContent = ({
    project,
    locale,
    tGlobal,
}: SSRDrawerProjectContentProps) => {
    return (
        <>
            <div className="mb-5 flex items-center gap-x-4">
                <h1 className="text-xl font-semibold capitalize leading-none text-black lg:text-2xl">
                    {getLangkey(project.name, locale)}
                </h1>

                {project?.sold_out ? <SoldOut type="project" /> : null}
            </div>
            <div className={`flex flex-col gap-y-12 md:mt-8`}>
                <div className="items-center gap-4 md:flex">
                    <div className="flex h-20 w-20 items-center rounded-full bg-white drop-shadow-header">
                        <ImagePlaceholder
                            classes="max-w-full max-h-full rounded-full w-full"
                            image={project?.logo || ''}
                            errorClasses="h-full w-full flex items-center justify-center bg-neutral-100 p-1"
                        />
                    </div>
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-4 md:flex-nowrap">
                        <div>
                            <span className="text-base font-normal capitalize text-custom-grey">
                                {tGlobal('starting_from')}
                            </span>
                            <div className="flex items-center gap-x-2 text-2xl font-bold text-black">
                                <span>
                                    {getNumberFormat(project?.start_price)}
                                </span>

                                <span className="text-xl font-normal uppercase">
                                    {tGlobal('egp') || ''}
                                </span>
                            </div>
                        </div>
                        <div>
                            <span className="text-base font-normal capitalize text-custom-grey">
                                {tGlobal('min_down_payment')}
                            </span>
                            <div className="flex items-center gap-x-2 text-2xl font-bold text-black">
                                <span>
                                    {getNumberFormat(project?.min_down_payment)}
                                </span>

                                <span className="text-xl font-normal uppercase">
                                    {tGlobal('egp') || ''}
                                </span>
                            </div>
                        </div>
                        <div>
                            <span className="text-base font-normal capitalize text-custom-grey">
                                {tGlobal('min_monthly_payment')}
                            </span>
                            <div className="flex items-center gap-x-2 text-2xl font-bold text-black">
                                <span>
                                    {getNumberFormat(
                                        project?.min_month_payment
                                    )}
                                </span>

                                <span className="text-xl font-normal uppercase">
                                    {tGlobal('egp') || ''}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <DrawerGallery images={project?.images} locale={locale} />
                <div className="w-full">
                    <InnerSectionHeaderV2
                        title={tGlobal('description') || ''}
                    />
                    <p className="line-clamp mt-4 text-sm text-gray-500">
                        <ReadMore
                            maxChar={300}
                            text={
                                getLangkey(project?.description, locale) || ''
                            }
                        />
                    </p>
                </div>
                <aside className="mt-10 w-full lg:mt-12">
                    <InnerSectionHeaderV2
                        title={tGlobal('property_details') || ''}
                    />
                    <div className="grid w-full grid-cols-3 gap-2 gap-x-4">
                        <div className="col-span-1">
                            <span className="text-sm font-light capitalize text-gray-500">
                                {tGlobal('delivery') || ''}
                            </span>
                            <div className="mt-2 text-lg font-medium capitalize text-black">
                                {project?.start_delivery?.slice(0, 4) || ''}
                            </div>
                        </div>
                        <div className="col-span-1">
                            <span className="text-sm font-light capitalize text-gray-500">
                                {tGlobal('payment_option') || ''}
                            </span>
                            <div className="mt-2 text-lg font-medium capitalize text-black">
                                {project?.payment_method || ''}
                            </div>
                        </div>
                        {project?.maintenance_fees && (
                            <div className="col-span-1">
                                <span className="text-sm font-light capitalize text-gray-500">
                                    {tGlobal('maintenance_fees') || ''}
                                </span>
                                <div className="mt-2 text-lg font-medium capitalize text-black">
                                    {project?.maintenance_fees || ''}
                                </div>
                            </div>
                        )}
                    </div>
                </aside>
                <aside>
                    <InnerSectionHeaderV2
                        title={tGlobal('developed_by') || ''}
                    />
                    <div className="mt-7 flex items-center">
                        <div className="w-auto">
                            <div className="me-4 flex h-[78px] min-w-[78px] max-w-[78px] items-center justify-center overflow-hidden rounded-full border border-gray-100 bg-white p-2">
                                {project?.developer?.logo && (
                                    <Image
                                        src={project?.developer?.logo}
                                        width={300}
                                        height={300}
                                        className="h-full w-full rounded-full object-cover object-center transition duration-500 group-hover:scale-110"
                                        alt={
                                            project?.developer?.name?.en ||
                                            '' + ' logo'
                                        }
                                    />
                                )}
                            </div>
                        </div>

                        <div>
                            <div className="text-base font-medium text-black">
                                {getLangkey(project?.developer?.name, locale)}
                            </div>
                            <p className="mt-2 text-xs text-gray-500">
                                <ReadMore
                                    maxChar={300}
                                    text={
                                        getLangkey(
                                            project?.developer?.description ||
                                                '',
                                            locale
                                        ) as string | ''
                                    }
                                />
                            </p>
                        </div>
                    </div>
                </aside>
                <div>
                    {project?.amenities?.length ? (
                        <AmenitiesShow amenities={project.amenities} />
                    ) : null}
                </div>
            </div>
        </>
    );
};

export default SSRDrawerProjectContent;
