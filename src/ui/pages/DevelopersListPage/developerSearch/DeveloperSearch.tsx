'use client';
import { BiSearch } from 'react-icons/bi';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { removePageFromUrl } from '@/helpers/getPaginationUrl';

interface DeveloperSearchProps {
    searchText: string | undefined;
    activePath: string;
}

const DeveloperSearch = ({ searchText, activePath }: DeveloperSearchProps) => {
    const [inputText, setInputText] = useState(searchText);
    const router = useRouter();
    const tGlobal = useTranslations('global');

    const changeInputState = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setInputText(value);
    };

    const activeUrlWithoutPage = removePageFromUrl(activePath);
    const isTextChanged = inputText !== searchText;
    const optionalUrlBasedOnText = isTextChanged
        ? activeUrlWithoutPage
        : activePath;

    const handleButtonClick = () => {
        router.push(
            `${optionalUrlBasedOnText}${!!inputText ? `?txt=${inputText}` : ''}`
        );
    };
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && inputText) {
            handleButtonClick();
        }
    };

    useEffect(() => {
        if (inputText === '' && inputText !== searchText) {
            router.push(`${optionalUrlBasedOnText}?`);
        }
    }, [optionalUrlBasedOnText, inputText, router, searchText]);

    return (
        <div className="flex w-full items-center gap-2 overflow-hidden rounded-lg border focus-within:border-[#4CB087] md:max-w-[300px]">
            <BiSearch
                className="ms-1 flex-none font-bold text-[#BEBEBE]"
                size={16}
            />
            <input
                type="text"
                placeholder={tGlobal('search_for_developer')}
                className="h-11 flex-auto bg-white text-xs font-normal outline-none"
                value={inputText || ''}
                onChange={changeInputState}
                onKeyDown={handleKeyDown}
            />
            {inputText && (
                <button onClick={handleButtonClick} className="me-1">
                    <BiSearch
                        size={22}
                        className="h-6 w-6 fill-[#d6d6d6] font-normal"
                    />
                </button>
            )}
        </div>
    );
};
export default DeveloperSearch;
