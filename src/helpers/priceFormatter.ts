const MILLION = 1000000;
const ONE_HUNDRED_THOUSAND = 100000;
const THOUSAND = 1000;
const MILLION_SUFFIX = 'M';
const THOUSAND_SUFFIX = 'K';

export const priceFormatter = (price: number): string => {
    if (price >= MILLION) {
        return Math.round(price / ONE_HUNDRED_THOUSAND) / 10 + MILLION_SUFFIX;
    } else if (price >= THOUSAND) {
        return Math.round(price / THOUSAND) / 10 + THOUSAND_SUFFIX;
    } else {
        return price.toFixed(1);
    }
};
