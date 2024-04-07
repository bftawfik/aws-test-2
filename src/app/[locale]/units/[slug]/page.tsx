import Image from 'next/image';
import ReadMore from '@/ui/read-more';
import Breadcrumbs from '@/ui/breadcrumbs';
import InnerSectionHeader from '@/ui/inners-section-header';
import GalleryComponent from '@/ui/gallery-component';
import ContactusForm from '@/ui/contactus-form';
import ScrollHeader from '@/ui/units/unit-inner/scroll-header';
import FromTheDeveloper from '@/ui/units/unit-inner/from-developer';
import RecommendedUnits from '@/ui/units/unit-inner/recommendedUnits';
import { BathRoomIcon, BedOutlineIcon, DimensionsIcon } from '@/ui/svg';
import {
    AR_LOCALE,
    DEFAULT_LOCALE,
    REVALIDATE_SECONDS,
    TAB_SHORT,
} from '@/constants';
import { InnerMapWIthStaticImage } from '@/ui/InnerMapWIthStaticImage/InnerMapWIthStaticImage';
import type { Metadata, ResolvingMetadata } from 'next';
import CompareButton from '@/ui/compare-button';
import InnersShareButton from '@/ui/inners-share-button';
import WishlistButton from '@/ui/wishlist-button';
// export const metadata = { title: 'projects' };
import { createTranslator } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { getUrlLocaleSegment } from '@/helpers/getUrlLocaleSegment';
import UnitDetailsHeader from '@/ui/units/unit-inner/UnitDetailsHeader/UnitDetailsHeader';
import Error404V2 from '@/ui/empty-states/Error404V2/Error404V2';
import SoldOut from '@/ui/SoldOut/SoldOut';
import SalesOffer from '@/ui/SalesOffer/SalesOffer';
import WhatsAppPopup from '@/ui/whatsAppPopup/WhatsAppPopup';

type GenerateMetadataProps = {
    params: { slug: string; locale: string };
};

async function getUnitInners(slug: string, locale: string) {
    const response = await fetch(
        `${process.env.BASE_URL}/units/${slug}?include=developer,unitType,city,state,project,agent,agent.company,amenities,amenitiesCount`,
        {
            headers: { 'accept-language': locale },
            next: {
                revalidate: REVALIDATE_SECONDS,
            },
        }
    );

    return await response.json();
}

export async function generateMetadata(
    { params }: GenerateMetadataProps,
    parent: ResolvingMetadata
): Promise<Metadata> {
    // read route params
    const { slug, locale } = params;
    const messages = (
        await import(`../../../../lang/${locale || DEFAULT_LOCALE}.json`)
    ).default;
    const t = createTranslator({ locale: locale, messages });
    const { data: unit } = await getUnitInners(slug, locale);
    const langSegment = locale !== '/en' ? locale : '';
    const siteName = `https://estatebook.com/${langSegment}`;
    const projectLink = `${siteName}/units/${slug}`;
    return {
        title: unit?.meta_title || unit?.title,
        description: unit?.meta_description || unit?.description,
        openGraph: {
            locale: locale,
            type: 'website',
            url: projectLink,
            title: unit?.meta_title || unit?.title,
            description: unit?.meta_description || unit?.description,
            images: unit?.images,
            siteName: siteName,
        },
    };
}

const Units = async ({ params }: any) => {
    const { locale } = params;
    const tGlobal = await getTranslations('global');
    const tUnitCard = await getTranslations('unit_card');

    const { data: unit } = await getUnitInners(params?.slug, locale);
    const urlLocaleSegment = getUrlLocaleSegment(locale);

    const pages = [
        { name: tGlobal('home'), href: `${urlLocaleSegment}/`, current: false },
        {
            name: tGlobal('units'),
            href: `${urlLocaleSegment}/discover/${TAB_SHORT}-units`,
            current: false,
        },
        { name: unit?.title, href: `{/${params?.slug}}`, current: true },
    ];

    // check if unit type is commercial
    const checkCommercialUnitType = unit?.type === 'commercial';
    const unitUpdatedAt = unit.updated_at;
    const formatedUpdatedDate = unitUpdatedAt
        ? new Date(unitUpdatedAt).toLocaleDateString(
              locale === AR_LOCALE ? 'ar-eg' : 'en-uk',
              {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric',
                  hour12: true,
              }
          )
        : undefined;
    return (
        <>
            {unit ? (
                <main className="es-container pb-12 lg:pb-24">
                    <Breadcrumbs pages={pages} />

                    <section className="mt-6 flex flex-col items-start gap-x-4 md:flex-row">
                        <h1 className="text-xl font-semibold capitalize leading-none text-black lg:text-2xl">
                            {unit?.title || ''}
                        </h1>
                        {formatedUpdatedDate ? (
                            <span className="pt-2 text-[12px] text-black/60 md:text-sm">
                                {`(${tGlobal(
                                    'last_updated'
                                )} : ${formatedUpdatedDate})`}{' '}
                            </span>
                        ) : null}

                        {unit?.sold_out ? <SoldOut type="unit" /> : null}
                    </section>
                    <ScrollHeader unit={unit} />

                    <UnitDetailsHeader unit={unit} />
                    <div className="flex flex-col flex-wrap justify-between gap-4 md:flex-row">
                        <div className="flex flex-wrap gap-y-2">
                            {unit?.bedroom && !checkCommercialUnitType && (
                                <div className="flex items-center gap-2">
                                    <div className="flex h-10 min-w-[40px] max-w-[40px] items-center justify-center rounded-sm border border-solid bg-gray-100">
                                        <BedOutlineIcon />
                                    </div>
                                    <span className="text-text-gray text-sm font-medium uppercase ltr:mr-3 rtl:ml-3">
                                        {`${unit?.bedroom || ''} ${
                                            tGlobal('rooms') || ''
                                        }`}
                                    </span>
                                </div>
                            )}
                            {unit?.bathroom && !checkCommercialUnitType && (
                                <div className="flex items-center gap-2">
                                    <div className="flex h-10 min-w-[40px] max-w-[40px] items-center justify-center rounded-sm border border-solid bg-gray-100">
                                        <BathRoomIcon />
                                    </div>
                                    <span className="text-text-gray text-sm font-medium uppercase ltr:mr-3 rtl:ml-3">
                                        {`${unit?.bathroom || ''} ${
                                            tGlobal('baths') || ''
                                        }`}
                                    </span>
                                </div>
                            )}
                            {unit?.area && (
                                <div className="flex items-center gap-2">
                                    <div className="flex h-10 min-w-[40px] max-w-[40px] items-center justify-center rounded-sm border border-solid bg-gray-100">
                                        <DimensionsIcon />
                                    </div>
                                    <span className="text-text-gray truncate text-sm font-medium uppercase ltr:mr-3 rtl:ml-3">
                                        {`${unit?.area || ''} ${
                                            tGlobal('meter') || ''
                                        }`}
                                        <sup>2</sup>
                                    </span>
                                </div>
                            )}
                        </div>
                        <nav className="flex items-center gap-2 self-start sm:mt-6 md:self-end  ">
                            <CompareButton
                                usage="inner"
                                item={unit}
                                type="units"
                            />
                            <WishlistButton
                                usage="inner"
                                item={unit}
                                type="unit"
                            />
                            <InnersShareButton item={unit} />
                        </nav>
                    </div>

                    <GalleryComponent images={unit?.images} />
                    <div className="my-4">
                        <SalesOffer unit={unit} />
                    </div>
                    <section className="grid w-full grid-cols-3 gap-2 gap-x-4">
                        <div className="col-span-3 lg:col-span-2">
                            <div className="mt-8 w-full md:mt-16">
                                <InnerSectionHeader
                                    title={tGlobal('description') || ''}
                                />
                                <ReadMore
                                    classNames="line-clamp mt-4 text-sm text-gray-500"
                                    maxChar={300}
                                    text={unit?.description || ''}
                                />
                            </div>
                            <aside className="mt-16 w-full">
                                <InnerSectionHeader
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
                                                        unit?.developer?.name
                                                            ?.en || '' + ' logo'
                                                    }
                                                />
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <div className="text-base font-medium text-black">
                                            {unit?.developer?.name || ''}
                                        </div>
                                        <div>
                                            <ReadMore
                                                classNames="mt-2 text-xs text-gray-500"
                                                maxChar={300}
                                                text={
                                                    unit?.developer
                                                        ?.description || ''
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                            </aside>
                            <aside className="mt-10 w-full lg:mt-12">
                                <InnerSectionHeader
                                    title={tGlobal('property_details') || ''}
                                />
                                <div className="grid w-full grid-cols-2 gap-2 gap-x-4 md:grid-cols-3">
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
                                                {unit?.project?.name || ''}
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
                                                {tGlobal('payment_option') ||
                                                    ''}
                                            </span>
                                            <div className="mt-2 text-lg font-medium capitalize text-black">
                                                {tUnitCard(
                                                    unit?.payment_type?.toLowerCase() ||
                                                        ''
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </aside>
                            <div className="mt-8 w-full md:mt-16">
                                <InnerSectionHeader
                                    title={tGlobal('location') || ''}
                                />

                                <InnerMapWIthStaticImage
                                    marker={{ lat: +unit.lat, lng: +unit.lng }}
                                    coords={unit.coords}
                                    staticImage={unit?.static_image_map}
                                />
                            </div>
                        </div>
                        <div className="col-span-3 mt-12 lg:col-span-1 lg:ms-auto">
                            <div className="sticky top-24">
                                <ContactusForm id={unit?.id} type="unit" />
                            </div>
                        </div>
                    </section>

                    {/* <FloorSection unit={unit} /> */}

                    <aside className="mt-16 w-full">
                        <InnerSectionHeader
                            title={tGlobal('from_the_developer') || ''}
                        />
                        <FromTheDeveloper
                            developerId={unit?.developer?.id}
                            locale={locale}
                        />
                    </aside>
                    <aside className="mt-16 w-full">
                        <InnerSectionHeader
                            title={tGlobal('recommended_units') || ''}
                        />
                        <RecommendedUnits locale={locale} />
                    </aside>
                </main>
            ) : (
                <Error404V2 />
            )}
            {unit ? (
                <WhatsAppPopup type="unit" item={unit} locale={locale} />
            ) : null}
        </>
    );
};

export default Units;
