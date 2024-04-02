import { DeveloperItem } from '@/interfaces/store/SearchStore';

export const sortArray = (array: DeveloperItem[]) => {
    return array.sort(function (a, b) {
        if (a.name < b.name) {
            return -1;
        }
        if (a.name > b.name) {
            return 1;
        }
        return 0;
    });
};

export const sortStringArray = (array: string[]) => {
    return [...array].sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
};
