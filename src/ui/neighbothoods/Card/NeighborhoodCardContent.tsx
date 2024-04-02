import { getLangkey } from '@/helpers';
import { Location, NextIntlGetTranslatorFunction } from '@/types';
import { ImagePlaceholder } from '@/ui/image-placeholder';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';

interface NeighborhoodCardContentProps {
    location: Location;
    locale: string;
    className?: string;
    tGlobal: NextIntlGetTranslatorFunction;
}
const NeighborhoodCardContent = ({
    locale,
    tGlobal,
    ...props
}: NeighborhoodCardContentProps) => {
    return (
        <div
            className={`drop-shadow group relative overflow-hidden rounded-lg bg-white text-white ${props.className}`}
        >
            <div className="absolute top-0 z-20 h-full w-full space-y-2 bg-gradient-to-b from-black/70 to-gray-50/10 p-4">
                {props.location?.name && locale && (
                    <h2 className="line-clamp-1 text-xl font-bold">
                        {getLangkey(props.location?.name, locale)}
                    </h2>
                )}

                <div className="flex items-center gap-x-2 text-sm">
                    {props.location?.projects_count ? (
                        <>
                            {props.location?.projects_count}{' '}
                            {tGlobal('single_project')}
                            <HiOutlineArrowNarrowRight className="h-4 w-4 rtl:rotate-180" />
                        </>
                    ) : (
                        ''
                    )}
                </div>
            </div>

            <ImagePlaceholder
                classes="absolute inset-0 z-10 h-full w-full rounded-lg object-cover object-center transition-transform duration-500 group-hover:scale-110"
                image={props?.location?.image ?? ''}
            />
        </div>
    );
};

export default NeighborhoodCardContent;
