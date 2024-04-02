'use client';
import GalleryComponent from '@/ui/gallery-component';
import InnerSectionHeader from '@/ui/inners-section-header';
import React from 'react';
import { useTranslations } from 'next-intl';

const FloorSection = (props: any) => {
    // const images = props.project.floor_plan;
    // Read translations
    const tGlobal = useTranslations('global');

    const images = ['/images/C1.jpg', '/images/C1.jpg', '/images/C1.jpg'];
    // if (props.project.floor_plan.length <= 0) return null;
    return (
        <section className="mt-8 w-full md:mt-16">
            <InnerSectionHeader title={tGlobal('floor_plans')} />
            <div className="mx-auto w-[60%] shadow-sm">
                <GalleryComponent outerView="swiper" images={images} />
            </div>
        </section>
    );
};

export default FloorSection;
