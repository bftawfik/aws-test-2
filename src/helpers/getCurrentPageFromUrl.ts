export const getCurrentPageFromUrl = (slugs: undefined | string[]) => {
    const pageSegment = Number(
        slugs?.find((slug) => slug.indexOf('pg-') === 0)?.replace(/\D/g, '')
    );
    return isNaN(pageSegment) ? 1 : pageSegment;
};
