import React from 'react';
import { GalleryImagesContainerProps } from './gallery-images-container';

const ImageContainer = ({ children, classes }: GalleryImagesContainerProps) => {
    return (
        <div className={`relative overflow-hidden ${classes}`}>{children}</div>
    );
};

export default ImageContainer;
