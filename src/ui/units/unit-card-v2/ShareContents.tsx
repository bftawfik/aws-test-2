'use client';
import { useState } from 'react';
import {
    FacebookIcon,
    LinkIcon,
    ShareTogglerIcon,
    TwitterIcon,
    WhatsAppIcon,
} from '@/ui/svg';
import { useTranslations } from 'next-intl';
import { egCountryCode, whatsapp } from '@/constants';
import { useElementSize } from 'usehooks-ts';

interface ShareContentsProps {
    unitLink: string;
    unitSlug: string;
    encodedWhatsappText: string;
}

const ShareContents = ({
    unitLink,
    unitSlug,
    encodedWhatsappText,
}: ShareContentsProps) => {
    //  toggle share content section
    const [showShareContent, setShowShareContent] = useState(false);

    const [copied, setCopied] = useState(false);
    const tGlobal = useTranslations('global');
    const [elemntRef, { height }] = useElementSize();

    const handleCopy = () => {
        const textArea = document.createElement('textarea');
        textArea.value = unitLink;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 1000);
    };

    const toggleShareContent = () => {
        setShowShareContent(!showShareContent);
    };

    return (
        <>
            <div
                ref={elemntRef}
                onClick={toggleShareContent}
                className="inline-flex cursor-pointer items-center justify-center p-3 hover:bg-[#FAFAFA]"
            >
                <ShareTogglerIcon
                    viewBox="0 0 24 24"
                    width={24}
                    height={24}
                    className="h-7 w-7 fill-current text-[#4CB087]"
                />
            </div>
            {showShareContent ? (
                <div
                    className={`absolute bottom-0 z-10 flex  w-full items-center justify-center gap-x-2 bg-white/80 backdrop-blur-sm transition-transform ${
                        showShareContent ? 'translate-y-0' : 'translate-y-full'
                    } `}
                    style={{
                        bottom: `${height ? height : 60}px`,
                        height: `calc(100% - ${
                            height ? 256 + height : 256 + 60
                        }px)`,
                    }}
                >
                    <a
                        target="popup"
                        rel="noopener noreferrer"
                        onClick={() => {
                            window.open(
                                `https://www.facebook.com/sharer/sharer.php?u=${unitLink}`,
                                'popup',
                                'width=600,height=600,scrollbars=no,resizable=no'
                            );
                            return false;
                        }}
                        href={`https://www.facebook.com/sharer/sharer.php?u=${unitLink}`}
                        className="z-[20] inline-flex h-12 w-12 items-center justify-center rounded-full"
                    >
                        <FacebookIcon
                            width={24}
                            height={24}
                            className="h-6 w-6 fill-current"
                        />
                    </a>
                    <a
                        target="_blank"
                        href={`https://twitter.com/intent/tweet?url=${unitLink}&text=${unitSlug}`}
                        className="inline-flex h-12 w-12 items-center justify-center rounded-full"
                    >
                        <TwitterIcon
                            width={24}
                            height={24}
                            className="h-6 w-6 fill-current"
                        />
                    </a>
                    <a
                        target="_blank"
                        href={`https://wa.me/${egCountryCode}${whatsapp}?text=${encodedWhatsappText}`}
                        className="group inline-flex h-12 w-12 items-center justify-center rounded-full"
                    >
                        <WhatsAppIcon
                            width={24}
                            height={24}
                            className="h-6 w-6 fill-current"
                        />
                    </a>
                    <button
                        className="inline-flex h-12 w-12 items-center justify-center rounded-full"
                        onClick={handleCopy}
                    >
                        {copied ? (
                            <span>{tGlobal('copied')}</span>
                        ) : (
                            <LinkIcon
                                width={24}
                                height={24}
                                className="h-6 w-6 fill-current"
                            />
                        )}
                    </button>
                </div>
            ) : null}
        </>
    );
};
export default ShareContents;
