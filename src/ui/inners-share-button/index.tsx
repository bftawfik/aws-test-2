'use client';
import { Project, Unit } from '@/types';
import React, { useRef, useState } from 'react';
import { useOnClickOutside } from 'usehooks-ts';
import {
    FacebookIcon,
    ShareTogglerSmallIcon,
    TwitterIcon,
    TwitterSolidIcon,
    WhatsAppIcon,
} from '../svg';
import useCurrentUrl from '@/hooks/useCurrentUrl';
import { generateProjectWhatsappTextEncoded } from '@/helpers/generateProjectWhatsappTextEncoded';
import { generateUnitWhatsappTextEncoded } from '@/helpers/generateUnitWhatsappTextEncoded';
interface InnersShareButtonProps {
    item: Project | Unit;
    top?: boolean;
    fromDrawer?: boolean;
}
const InnersShareButton = ({
    item,
    top = false,
    fromDrawer,
}: InnersShareButtonProps) => {
    // Get CurrentUrl
    const currentUrl = useCurrentUrl();

    let shareMessage: string;

    if ('bedroom' in item) {
        const unitItem = item as Unit; // Use type assertion
        shareMessage = generateUnitWhatsappTextEncoded(
            unitItem?.title,
            unitItem?.type,
            unitItem?.price,
            unitItem?.address,
            currentUrl
        );
    } else {
        const projectItem = item as Project; // Use type assertion
        shareMessage = generateProjectWhatsappTextEncoded(
            projectItem?.name,
            projectItem?.start_price,
            projectItem?.address,
            currentUrl
        );
    }

    const links = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}&quote=${shareMessage}`,
        twitter: `https://twitter.com/intent/tweet?text=${shareMessage}`,
        whatsapp: `https://api.whatsapp.com/send?text=${shareMessage}`,
    };

    const ref = useRef(null);
    const [show, setShow] = useState(false);

    const handleClick = () => {
        setShow((prev) => !prev);
    };
    const handleClose = () => {
        show && setShow(false);
    };
    useOnClickOutside(ref, handleClose);

    return (
        <div
            ref={ref}
            className="relative cursor-pointer text-gray-400 lg:flex-none"
        >
            <button
                onClick={handleClick}
                className="group relative flex h-10 w-10 select-none items-center justify-center rounded-full border border-solid bg-white text-xs font-medium duration-300 lg:hover:border-primary lg:hover:bg-primary lg:hover:text-white"
            >
                <ShareTogglerSmallIcon className="duration-400 fill-gray-400 lg:group-hover:fill-white" />
            </button>
            {show && (
                <div
                    className={`absolute !z-40 flex max-w-sm items-center justify-center gap-5 rounded-lg bg-black/20 p-4 shadow-sm backdrop-blur-md lg:max-w-md lg:gap-10  ${
                        top ? 'bottom-12' : 'top-12'
                    } ${
                        fromDrawer
                            ? 'ltr:right-0 rtl:left-0'
                            : 'md:end-0 md:ltr:-right-5 md:rtl:-left-5'
                    }`}
                >
                    <button>
                        <a
                            target="popup"
                            rel="noopener noreferrer"
                            href={links['facebook']}
                            className="share-network-facebook"
                            onClick={() => {
                                window.open(
                                    links['facebook'],
                                    'popup',
                                    'width=600,height=600,scrollbars=no,resizable=no'
                                );
                                return false;
                            }}
                        >
                            <span>
                                <FacebookIcon
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="h-8 w-8 fill-current text-white transition-colors duration-150 hover:text-blue-400"
                                />
                            </span>
                        </a>
                    </button>
                    <button>
                        <a
                            target="popup"
                            rel="noopener noreferrer"
                            href={links['whatsapp']}
                            className="share-network-whatsapp"
                            onClick={() => {
                                window.open(
                                    links['whatsapp'],
                                    'popup',
                                    'width=600,height=600,scrollbars=no,resizable=no'
                                );
                                return false;
                            }}
                        >
                            <span>
                                <WhatsAppIcon
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="h-8 w-8 fill-current text-white transition-colors duration-150 hover:text-green-400"
                                />
                            </span>
                        </a>
                    </button>
                    <button>
                        <a
                            target="popup"
                            rel="noopener noreferrer"
                            href={links['twitter']}
                            onClick={() => {
                                window.open(
                                    links['twitter'],
                                    'popup',
                                    'width=600,height=600,scrollbars=no,resizable=no'
                                );
                                return false;
                            }}
                            className="share-network-twitter"
                        >
                            <span>
                                <TwitterSolidIcon
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="h-8 w-8 fill-current text-white transition-colors duration-150 hover:text-sky-400"
                                />
                            </span>
                        </a>
                    </button>
                </div>
            )}
        </div>
    );
};

export default InnersShareButton;
