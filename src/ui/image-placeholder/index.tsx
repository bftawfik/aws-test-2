'use client';
import Image from 'next/image';
import { useState } from 'react';
import { ImagePlaceholderProps } from './image-placeholder';

export const ImagePlaceholder = ({
    image,
    classes,
    errorClasses = 'flex h-full w-full items-center justify-center bg-neutral-100 rounded-lg',
}: ImagePlaceholderProps) => {
    const [error, setError] = useState(false);

    const handleError = () => {
        setError(true);
    };

    return (
        <>
            {!error && image !== '' ? (
                <Image
                    src={image}
                    width={300}
                    height={300}
                    onError={handleError}
                    className={classes}
                    alt="image"
                />
            ) : (
                <div className={errorClasses}>
                    <Image
                        style={{ objectFit: 'cover' }}
                        alt="Estatebook logo"
                        src={'/images/eb_logo.svg'}
                        width={128}
                        height={21}
                        className="w-32"
                    />
                </div>
            )}
        </>
    );
};
