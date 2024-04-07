import Image from 'next/image';
import { ImagePlaceholder } from '@/ui/image-placeholder';
import ReadMore from '@/ui/read-more';
import GalleryComponent from '@/ui/gallery-component';
import ContactusForm from '@/ui/contactus-form';
import InnerMap from '@/ui/neighbothoods/inner-map';
import ScrollHeader from '@/ui/projects/project-inner/scroll-header';
import { AR_LOCALE, DEFAULT_LOCALE, TAB_SHORT } from '@/constants';
import type { Metadata, ResolvingMetadata } from 'next';
import { createTranslator } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { getUrlLocaleSegment } from '@/helpers/getUrlLocaleSegment';
import DeveloperUnitsV2 from '@/ui/projects/ProjectInnerV2/DeveloperUnitsV2/DeveloperUnitsV2';
import ResaleUnitsV2 from '@/ui/projects/ProjectInnerV2/ResaleUnitsV2/ResaleUnitsV2';
// import { getServerSession } from 'next-auth';
import { authOptions } from '@/config/auth-options';
import { getProjectInner } from '@/actions/projects/getProjectInner';
import InnerSectionHeaderV2 from '@/ui/InnersSectionHeaderV2';
import Breadcrumbs from '@/ui/breadcrumbs';
import Error404V2 from '@/ui/empty-states/Error404V2/Error404V2';
import SoldOut from '@/ui/SoldOut/SoldOut';
import ProjectDetailsHeader_V3 from '@/ui/projects/ProjectInnerV2/detailsHeader_V3/DetailsHeader_V3';
import WhatsAppPopup from '@/ui/whatsAppPopup/WhatsAppPopup';

type GenerateMetadataProps = {
    params: { slug: string; locale: string };
};

export async function generateMetadata(
    { params }: GenerateMetadataProps,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const { slug, locale } = params;
    const messages = (
        await import(`../../../../lang/${locale || DEFAULT_LOCALE}.json`)
    ).default;
    const t = createTranslator({ locale, messages });
    // Get Session
    // const session = await getServerSession(authOptions);
    const { data: project } = await getProjectInner(
        slug,
        locale,
        // session?.auth?.meta?.token
        undefined
    );
    const langSegment = locale !== '/en' ? locale : '';
    const siteName = `https://estatebook.com/${langSegment}`;
    const projectLink = `${siteName}/projects/${slug}`;

    return {
        title: project?.meta_title || project?.name,
        description: project?.meta_description || project?.description,
        openGraph: {
            locale: locale,
            type: 'website',
            url: projectLink,
            title: project?.meta_title || project?.name,
            description: project?.meta_description || project?.description,
            images: project?.images,
            siteName: siteName,
        },
    };
}

const Project = async ({ params }: any) => {
    const { locale } = params;
    const tGlobal = await getTranslations('global');
    const urlLocaleSegment = getUrlLocaleSegment(locale);
    // Get Session
    // TODO: hide server session until solve forge problem
    // const session = await getServerSession(authOptions);
    const slug = params?.slug;
    const { data: project } = await getProjectInner(
        slug,
        locale,
        // session?.auth?.meta?.token
        undefined
    );
    const pages = [
        { name: tGlobal('home'), href: `${urlLocaleSegment}/`, current: false },
        {
            name: tGlobal('projects'),
            href: `${urlLocaleSegment}/discover/${TAB_SHORT}-projects`,
            current: false,
        },
        { name: project?.name, href: '/', current: true },
    ];

    const projectUpdatedAt = project.updated_at;
    const formatedUpdatedDate = projectUpdatedAt
        ? new Date(projectUpdatedAt).toLocaleDateString(
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
            {project ? (
                <main className="es-container pb-12 lg:pb-24">
                    <Breadcrumbs pages={pages} />

                    <section className="mt-6 flex flex-col items-start gap-x-4 md:flex-row">
                        <h1 className="text[18px] font-semibold capitalize leading-none text-black md:text-xl lg:text-2xl">
                            {project?.name}
                        </h1>
                        {formatedUpdatedDate ? (
                            <span className="pt-2 text-[12px] text-black/60 md:text-sm">
                                {`(${tGlobal(
                                    'last_updated'
                                )} : ${formatedUpdatedDate})`}
                            </span>
                        ) : null}
                        {project?.sold_out ? <SoldOut type="project" /> : null}
                    </section>
                    <ScrollHeader project={project} />

                    <ProjectDetailsHeader_V3
                        project={project}
                        locale={locale}
                    />

                    <GalleryComponent images={project?.images} />

                    <section className="grid w-full grid-cols-3 gap-2 gap-x-4">
                        <div className="col-span-3 lg:col-span-2">
                            <aside className="mt-10 w-full lg:mt-12">
                                <InnerSectionHeaderV2
                                    title={tGlobal('description') || ''}
                                />
                                <ReadMore
                                    wrapperType="div"
                                    classNames="line-clamp mt-4 text-sm text-gray-500"
                                    text={project?.description || ''}
                                />
                            </aside>
                            <aside className="mt-10 w-full lg:mt-12">
                                <InnerSectionHeaderV2
                                    title={tGlobal('property_details') || ''}
                                />
                                <div className="grid w-full grid-cols-2 gap-2 gap-x-4 md:grid-cols-3">
                                    <div className="col-span-1">
                                        <div className="mt-8">
                                            <span className="text-sm font-light capitalize text-gray-500">
                                                {tGlobal('delivery') || ''}
                                            </span>
                                            <div className="mt-2 text-lg font-medium capitalize text-black">
                                                {project?.start_delivery?.slice(
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
                                                {project?.payment_method || ''}
                                            </div>
                                        </div>
                                    </div>
                                    {project?.maintenance_fees && (
                                        <div className="col-span-1">
                                            <div className="mt-8">
                                                <span className="text-sm font-light capitalize text-gray-500">
                                                    {tGlobal(
                                                        'maintenance_fees'
                                                    ) || ''}
                                                </span>
                                                <div className="mt-2 text-lg font-medium capitalize text-black">
                                                    {project?.maintenance_fees ||
                                                        ''}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </aside>

                            <aside className="mt-16 w-full">
                                <InnerSectionHeaderV2
                                    title={tGlobal('property_types') || ''}
                                />
                                <div className="lg:mt-124 mt-10 grid w-full gap-4 md:grid-cols-2 lg:grid-cols-4">
                                    {project?.unit_types?.map(
                                        (unit_type: any) => (
                                            <div
                                                className="drop-shadow-theme flex h-[102px] items-center gap-4 rounded-lg border border-[#E4E4E4] px-3"
                                                key={unit_type.id}
                                            >
                                                <div className="h-12 w-12">
                                                    <ImagePlaceholder
                                                        classes="rounded-xl transition duration-500 group-hover:scale-110"
                                                        image={unit_type?.icon}
                                                        errorClasses=" h-full w-full flex items-center justify-center bg-neutral-100 p-1"
                                                    />
                                                </div>
                                                <div className="flex-auto">
                                                    <h4 className="text-base font-medium text-black">
                                                        {unit_type?.name || ''}
                                                    </h4>
                                                </div>
                                            </div>
                                        )
                                    )}
                                </div>
                            </aside>

                            <aside className="mt-16 w-full">
                                <InnerSectionHeaderV2
                                    title={tGlobal('developed_by') || ''}
                                />
                                <div className="mt-7 flex items-center">
                                    <div className="w-auto">
                                        <div className="me-4 flex h-[78px] min-w-[78px] max-w-[78px] items-center justify-center overflow-hidden rounded-full border border-gray-100 bg-white p-2">
                                            {project?.developer?.logo && (
                                                <Image
                                                    src={
                                                        project?.developer?.logo
                                                    }
                                                    width={300}
                                                    height={300}
                                                    className="h-full w-full rounded-full object-cover object-center transition duration-500 group-hover:scale-110"
                                                    alt={
                                                        project?.developer?.name
                                                            ?.en || '' + ' logo'
                                                    }
                                                />
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <div className="text-base font-medium text-black">
                                            {project?.developer?.name || ''}
                                        </div>
                                        <div>
                                            <ReadMore
                                                classNames="mt-2 text-xs text-gray-500"
                                                text={
                                                    project?.developer
                                                        ?.description || ''
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                            </aside>
                            <section className="mt-8 w-full md:mt-16">
                                <InnerSectionHeaderV2
                                    title={tGlobal('amenities')}
                                />
                                <ul className="mt-3 grid grid-cols-2  gap-4 lg:grid-cols-8">
                                    {project?.amenities?.map((amenity: any) => (
                                        <li key={amenity.id}>
                                            <div className="flex h-[102px] items-center justify-center rounded-lg border border-[#E4E4E4]">
                                                <div className="h-full w-full">
                                                    <div className="flex h-full w-full items-center justify-center">
                                                        <Image
                                                            src={amenity?.logo}
                                                            width={300}
                                                            height={300}
                                                            alt=""
                                                            className="h-12 w-12"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <h4 className="mt-5 text-center text-base font-normal text-black">
                                                {amenity?.name || ''}
                                            </h4>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                            <section className="mt-8 w-full md:mt-16">
                                <InnerSectionHeaderV2
                                    title={tGlobal('location') || ''}
                                />
                                <InnerMap coords={project?.coords} zoom={12} />
                            </section>
                        </div>

                        <div className="col-span-3 mt-12 lg:col-span-1 lg:ms-auto">
                            <div className="sticky top-24">
                                <ContactusForm
                                    id={project?.id}
                                    type="project"
                                />
                            </div>
                        </div>
                    </section>

                    <DeveloperUnitsV2 project={project} locale={locale} />
                    <ResaleUnitsV2 project={project} locale={locale} />
                </main>
            ) : (
                <Error404V2 />
            )}
            {project ? (
                <WhatsAppPopup type="project" item={project} locale={locale} />
            ) : null}
        </>
    );
};

export default Project;
