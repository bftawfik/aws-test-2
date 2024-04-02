import { AR_LOCALE, EN_LOCALE } from '@/constants';
import { Locale, ObjectType } from '@/types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createBreakpoint } from 'react-use';

export function classes(classes: Record<string, boolean>): string[] {
    return Object.entries(classes)
        .filter(([_class, expression]) => Boolean(expression))
        .map(([_class]) => _class);
}

export function getLangkey(ob: Locale | string | null, lang: string) {
    if (!ob) {
        return '';
    } else if (typeof ob === 'string') {
        return ob;
    } else {
        switch (lang) {
            case EN_LOCALE: {
                return ob?.en ?? '';
            }
            case AR_LOCALE: {
                return ob?.ar ? ob?.ar ?? '' : ob?.en ?? '';
            }
        }
    }
}

export function classNames(...classes: string[]): string {
    return classes.filter((_class) => Boolean(_class)).join(' ');
}

export function stringifyBoolAttributes(obj: ObjectType) {
    return Object.fromEntries(
        Object.entries(obj).map(([key, value]) => [
            key,
            typeof value === 'boolean' ? String(value) : value,
        ])
    );
}

export function getMatchedKeys(
    ...objects: Record<string, any>[]
): Record<string, any> {
    const commonKeys = Object.keys(objects[0]).filter((key) =>
        objects.every((obj) => obj.hasOwnProperty(key))
    );

    const result = commonKeys.reduce((target, key) => {
        target[key] = objects[0][key];
        return target;
    }, {} as Record<string, any>);

    return result;
}

type ErrorKey = 'name' | 'email' | 'password' | 'password_confirmation';

type CustomError = Record<ErrorKey, string[]> | any;

// Error handler helper method
export function errorHandler(errors: CustomError) {
    if (typeof errors === 'string') {
        toast.error(`${errors}`, {
            theme: 'colored',
        });
    } else {
        for (const key in errors) {
            toast.error(errors[key as ErrorKey][0], {
                theme: 'colored',
            });
        }
    }
}

// Error handler helper method
export function successHandler(successMessage: string) {
    toast.success(successMessage, {
        theme: 'colored',
    });
}

export const getCurrentScreenSize = () => {
    // use media query
    const useBreakpoint = createBreakpoint({ XL: 1280, L: 768, S: 350 });
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const breakpoint = useBreakpoint();
    return breakpoint;
};

export const setOnLocalStorage = (key: string, value: any, type = 'any') => {
    if (type === 'string') {
        localStorage.setItem(key, value);
        return;
    }
    localStorage.setItem(key, JSON.stringify(value));
};

export const getFromLocalStorage = (key: string) => {
    return JSON.parse(localStorage.getItem(key) || 'null');
};
export const formatMapBounds = (bounds: any) => {
    const ne = bounds?.getNorthEast();
    const sw = bounds?.getSouthWest();
    const newBoundsArray = [ne?.lat(), ne?.lng(), sw?.lat(), sw?.lng()];
    return newBoundsArray;
};
export const formatBoundsToBackend = (bounds: number[]) => {
    const form = {
        lat1: bounds[0] || 0,
        lng1: bounds[1] || 0,
        lat2: bounds[2] || 0,
        lng2: bounds[3] || 0,
    };
    return form;
};
// fuction return unique array of list

type ListItem = { id: number; value: string } | any;
export const UniquList = (list: any[], newItem: ListItem) => {
    const isObject = typeof newItem === 'object';
    const itemToCompare = isObject ? newItem.id : newItem;

    const existingIndex = list.findIndex((item) =>
        isObject ? item.id === itemToCompare : item === itemToCompare
    );

    if (existingIndex !== -1) {
        const modifiedList = [...list];
        modifiedList.splice(existingIndex, 1);
        return modifiedList;
    } else {
        return [...list, newItem];
    }
};

export const converSlugToUrlName = (developerSlug: string) => {
    return developerSlug.replaceAll(' ', '').toLowerCase();
};
