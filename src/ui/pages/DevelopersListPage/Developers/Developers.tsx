import SimplePagination from '@/ui/simplePagination';
import DeveloperCard from '@/ui/developers/developer-card';
import getDevelopers from '@/actions/developers/get-developers';
// import NotFound from '@/app/[locale]/[...not-found]/page';
import { getCurrentPageFromUrl } from '@/helpers/getCurrentPageFromUrl';

const pageSize = 28;
const abortController = new AbortController();

const classes = {
    Developers: 'w-full',
    cardsContainer:
        'grid min-h-[500px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4',
};
interface DevelopersProps {
    locale: string;
    slugs: undefined | string[];
    searchText: string | undefined;
    fullUrl: string;
}

const Developers = async ({
    locale,
    slugs,
    searchText,
    fullUrl,
}: DevelopersProps) => {
    let currentPage = getCurrentPageFromUrl(slugs);
    const developersData = await getDevelopers(
        pageSize,
        currentPage,
        locale,
        searchText,
        abortController.signal
    );
    const { data: developers, meta } = developersData || {};
    const totalPages = Math.ceil(meta?.total / pageSize);
    if (currentPage < 1 && searchText) {
        currentPage = 1;
    }
    return currentPage < 1 || currentPage > totalPages ? // <NotFound />
    null : (
        <div className={classes.Developers}>
            <div className={classes.cardsContainer}>
                {developers?.map((developer) => (
                    <DeveloperCard
                        developer={developer}
                        key={developer.id}
                        locale={locale}
                    />
                ))}
            </div>

            <SimplePagination
                pathName={fullUrl || ''}
                currentPage={currentPage}
                totalPages={totalPages}
                locale={locale}
            />
        </div>
    );
};
export default Developers;
