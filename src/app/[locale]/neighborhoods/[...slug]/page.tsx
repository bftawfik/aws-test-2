import NeighborhoodInnerBreadcrumbs from '@/ui/breadcrumbs/NeighborhoodInnerBreadcrumbs/NeighborhoodInnerBreadcrumbs';
import Error404V2 from '@/ui/empty-states/Error404V2/Error404V2';
import NeighborhoodProjectsSeciton from '@/ui/neighbothoods/NeighborhoodProjectsSeciton/NeighborhoodProjectsSeciton';
import { NeighborhoodHeaderSection } from '@/ui/neighbothoods/SSR/HeaderSection/NeighborhoodHeaderSection';
import NeighborhoodGallerySectionSSR from '@/ui/neighbothoods/SSR/NeighborhoodGallerySectionSSR/NeighborhoodGallerySectionSSR';
import { NeighborhoodMapSection } from '@/ui/neighbothoods/SSR/NeighborhoodMapSection/NeighborhoodMapSection';
import { Metadata } from 'next';
import React from 'react';
type GenerateMetadataProps = {
    params: {
        slug: string[];
        locale: string;
    };
};
async function getSingleLocation(slug: string, lang: string) {
    const response = await fetch(
        `${process.env.BASE_URL}/locations/${slug}
        `,
        {
            headers: { 'accept-language': lang },
        }
    );

    return await response.json();
}
export async function generateMetadata({
    params,
}: GenerateMetadataProps): Promise<Metadata> {
    const { locale } = params;
    const neighborhoodSlug: string = params.slug[0];
    const { data: neighborhood } = await getSingleLocation(
        neighborhoodSlug,
        locale
    );
    const langSegment = locale !== '/en' ? locale : '';
    const siteName = `https://estatebook.com/${langSegment}`;
    const neighborhoodLink = `${siteName}/neighborhoods/${neighborhoodSlug}`;
    return {
        title: neighborhood?.meta_title || neighborhood?.name,
        description:
            neighborhood?.meta_description || neighborhood?.description,
        openGraph: {
            locale: locale,
            type: 'website',
            url: neighborhoodLink,
            title: neighborhood?.meta_title || neighborhood?.name,
            description:
                neighborhood?.meta_description || neighborhood?.description,
            images: neighborhood?.images,
            siteName: siteName,
        },
    };
}

const Neighborhoods = async ({
    params,
}: {
    params: { slug: string[]; locale: string };
}) => {
    const { locale } = params;
    const neighborhoodSlug: string = params.slug[0];
    const { data: neighborhood } = await getSingleLocation(
        neighborhoodSlug,
        locale
    );
    return (
        <>
            {neighborhood ? (
                <div className="es-container mt-8 px-3 lg:mt-10">
                    <NeighborhoodInnerBreadcrumbs
                        locale={locale}
                        slug={neighborhoodSlug}
                    />
                    <NeighborhoodHeaderSection
                        neighborhoodName={neighborhood?.name}
                    />
                    <NeighborhoodGallerySectionSSR
                        images={neighborhood?.images}
                    />
                    <NeighborhoodMapSection
                        locale={locale}
                        coords={neighborhood?.coords}
                    />
                    <NeighborhoodProjectsSeciton slug={neighborhoodSlug} />
                </div>
            ) : (
                <Error404V2 />
            )}
        </>
    );
};

export default Neighborhoods;
