export const addKeyToSearchParams = (
    key: string,
    value: string,
    searchParams: URLSearchParams
) => {
    const isPresent = searchParams?.has(key);
    if (isPresent) {
        const keyValue = searchParams.get(key);
        if (keyValue === value) {
            return searchParams;
        }
        searchParams.delete(key);
    }
    searchParams.append(key, value);
    return searchParams;
};
