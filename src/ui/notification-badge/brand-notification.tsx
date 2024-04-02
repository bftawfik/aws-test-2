import React, { useEffect, useState } from 'react';

const NotificationDot = ({ classes }: { classes: string }) => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return (
        <span
            data-v-21fa8325=""
            className={`absolute flex h-2.5 w-2.5 ${classes} ${
                isScrolled ? '!z-0' : ''
            }`}
        >
            <span
                data-v-21fa8325=""
                className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"
            ></span>{' '}
            <span
                data-v-21fa8325=""
                className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500"
            ></span>
        </span>
    );
};

export default NotificationDot;
