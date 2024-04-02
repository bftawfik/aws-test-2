import React from 'react';
import Image from 'next/image';
import { classNames, getLangkey } from '@/helpers';
import Link from 'next/link';
import { getUrlLocaleSegment } from '@/helpers/getUrlLocaleSegment';
import { Developer } from '@/types';

export interface DeveloperCardProps extends React.ComponentProps<'div'> {
    developer: Developer;
    transformType?: 'transform-cpu' | 'transform-gpu';
    locale: string;
}

const DeveloperCard = ({
    developer,
    locale,
    transformType,
    ...rest
}: DeveloperCardProps) => {
    // Read localization
    const urlLocaleSegment = getUrlLocaleSegment(locale);

    return (
        <Link
            href={`${urlLocaleSegment}/developers/${developer.slug}`}
            prefetch={false}
        >
            <div
                className={classNames(
                    `hover:border-primary-green group mt-4 flex h-[250px] flex-col items-center justify-center gap-y-4 rounded-lg border border-transparent bg-white drop-shadow-developer-card transition-colors`,
                    transformType ?? ''
                )}
                {...rest}
            >
                <div>
                    <Image
                        alt={
                            getLangkey(developer.name, locale) ||
                            'developer image'
                        }
                        src={developer.logo}
                        width={128}
                        height={128}
                        className="h-32 w-32 object-contain"
                    />
                </div>
                <h3
                    title={getLangkey(developer.name, locale)}
                    className="text-fav-black group-hover:text-primary-green line-clamp-1 px-3 text-center font-semibold transition-colors"
                >
                    {getLangkey(developer.name, locale)}
                </h3>
            </div>
        </Link>
    );
};

export default DeveloperCard;
