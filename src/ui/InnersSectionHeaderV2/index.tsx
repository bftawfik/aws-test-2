'use server';
import CustomShowAllLink from '../custom-show-all-link';
interface InnersSectionHeader {
    href?: string;
    title: string;
}

const InnerSectionHeaderV2 = ({ href, title }: InnersSectionHeader) => {
    return (
        <div className="mb-2 flex items-center justify-between lg:mb-5">
            <h2 className="text-xl font-semibold  capitalize leading-none text-black  lg:text-2xl">
                {title}
            </h2>
            {href && <CustomShowAllLink hrefUrl={href} />}
        </div>
    );
};

export default InnerSectionHeaderV2;
