'use client';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import parse from 'html-react-parser';
interface ReadMoreProps {
    text: string;
    maxChar?: number;
    wrapperType?: string;
    classNames?: string;
}
function ReadMore({
    text,
    maxChar = 200,
    wrapperType = 'p',
    classNames,
}: ReadMoreProps) {
    // Read translations
    const tGlobal = useTranslations('global');

    const [showAll, setShowAll] = useState(false);

    const toggleShowAll = () => setShowAll(!showAll);

    const truncatedText = text.slice(0, maxChar);
    const displayText = showAll ? text : truncatedText;
    const buttonText = showAll ? tGlobal('read_less') : tGlobal('read_more');
    const WrapperElement = wrapperType as keyof JSX.IntrinsicElements;
    return (
        <WrapperElement className={classNames}>
            <span>{parse(displayText)}</span>
            {text.length > maxChar && <span>{showAll ? ' ' : '...'}</span>}
            {text.length > maxChar && (
                <button
                    className="text-sm font-normal  text-primary underline"
                    onClick={toggleShowAll}
                >
                    {buttonText}
                </button>
            )}
        </WrapperElement>
    );
}

export default ReadMore;
