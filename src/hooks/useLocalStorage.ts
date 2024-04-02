import {
    SetStateAction,
    useState,
    Dispatch,
    useEffect,
    useCallback,
} from 'react';

const useLocalStorage = <S>(
    key: string,
    defaultValue: S
): [S, Dispatch<SetStateAction<S>>] => {
    const calcStateValue = (defaultValue: S, key: string) => () => {
        try {
            const lsValue = localStorage?.getItem(key);
            if (lsValue) {
                return JSON.parse(lsValue);
            } else {
                localStorage?.setItem(key, JSON.stringify(defaultValue));
                return defaultValue;
            }
        } catch (error) {
            if (typeof window !== 'undefined') {
                localStorage?.setItem(key, JSON.stringify(defaultValue));
            }
            return defaultValue;
        }
    };

    const updateState = useCallback(
        (
                localStorageValue: S,
                setLocalStorageValue: Dispatch<SetStateAction<S>>,
                key: string
            ) =>
            () => {
                try {
                    const lsValue = localStorage?.getItem(key);
                    const localStorageValueStr =
                        JSON.stringify(localStorageValue);
                    if (lsValue && lsValue !== localStorageValueStr) {
                        const newValue = JSON.parse(lsValue);
                        setLocalStorageValue(newValue);
                    }
                } catch (error) {}
            },
        []
    );

    const [localStorageValue, setLocalStorageValue] = useState<S>(
        calcStateValue(defaultValue, key)
    );

    useEffect(() => {
        window.addEventListener(
            'storage',
            updateState(localStorageValue, setLocalStorageValue, key)
        );

        return () => {
            window.removeEventListener(
                'storage',
                updateState(localStorageValue, setLocalStorageValue, key)
            );
        };
    }, [updateState, localStorageValue, setLocalStorageValue, key]);

    const setLocalStorageStateValue = (valueOrSetter: SetStateAction<S>) => {
        let newValue: S;
        if (typeof valueOrSetter === 'function') {
            newValue = (valueOrSetter as Function)(localStorageValue);
        } else {
            newValue = valueOrSetter as S;
        }
        localStorage.setItem(key, JSON.stringify(newValue));
        window?.dispatchEvent(new Event('storage'));
        setLocalStorageValue(newValue);
    };
    return [localStorageValue, setLocalStorageStateValue];
};

export default useLocalStorage;
