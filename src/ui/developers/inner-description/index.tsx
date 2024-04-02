'use client';
import ContactusForm from '@/ui/contactus-form';
import ReadMore from '@/ui/read-more';
import Image from 'next/image';
import React from 'react';
import { useGetDevelopersInnersQuery } from '@/actions/useGetDevelopersInnersQuery';
import { useTranslations } from 'next-intl';

interface DescriptionSectionProps {
    slug: any;
    lang: any;
}
const DescriptionSection = ({ slug, lang }: DescriptionSectionProps) => {
    // Read translations
    const tGlobal = useTranslations('global');

    const { data: developer, isFetching } = useGetDevelopersInnersQuery(
        slug,
        lang
    );

    return !developer ? null : (
        <div className="mt-8">
            <div className=" flex w-full items-center gap-3">
                <div className=" flex h-[95px] min-w-[95px] max-w-[95px] items-center justify-center rounded-full bg-white shadow-lg ltr:mr-6 rtl:ml-6">
                    <Image
                        src={developer.logo}
                        alt={developer.name}
                        width={95}
                        height={95}
                        className="max-h-full max-w-[38px]"
                    />
                </div>
                <h1 className="flex text-base font-semibold text-black md:text-xl lg:text-2xl">
                    {developer.name}
                </h1>
            </div>
            <div className="mt-0 grid w-full grid-cols-1 gap-8 gap-x-4 lg:mt-4 lg:grid-cols-3 lg:gap-3">
                <div className="col-span-1 md:col-span-2 lg:col-span-2">
                    {developer.cover_image && (
                        <div className="group relative block h-[250px] w-full overflow-hidden rounded-lg  shadow-sm lg:h-72 ">
                            <Image
                                fill
                                className="h-full w-full object-cover duration-300 group-hover:scale-110"
                                alt={developer.name}
                                src={developer.cover_image}
                            />
                        </div>
                    )}
                    <div className="mt-8 w-full lg:mt-5">
                        <h2 className="text-xl font-semibold capitalize leading-none text-black lg:text-2xl">
                            {tGlobal('description')}
                        </h2>
                        <ReadMore
                            classNames=" mt-4 text-xs text-gray-500 md:text-sm"
                            maxChar={330}
                            text={developer.description}
                        />
                    </div>
                </div>
                <div className="col-span-1 ms-auto w-full">
                    <ContactusForm id={developer.id} type="developer" />
                </div>
            </div>
        </div>
    );
};

export default DescriptionSection;
