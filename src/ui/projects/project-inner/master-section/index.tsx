'use client';
import GalleryComponent from '@/ui/gallery-component';
import InnerSectionHeader from '@/ui/inners-section-header';
import React from 'react';
import { useTranslations, useLocale } from 'next-intl';

const GallerySection = (props: any) => {
    // const images = props.project.master_plans;

    // Read translations
    const tGlobal = useTranslations('global');

    const images = ['/images/C1.jpg', '/images/C1.jpg', '/images/C1.jpg'];
    // if (props.project.master_plans.length <= 0) return null;
    return (
        <section className="mt-8 w-full md:mt-16">
            <InnerSectionHeader title={tGlobal('master_plans')} />
            <div className="mx-auto w-[60%] shadow-sm">
                <GalleryComponent outerView="swiper" images={images} />
            </div>
        </section>
    );
};

export default GallerySection;
