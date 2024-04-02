export interface GalleryPreviewProps {
    images: string[];
    open: boolean;
    activeIndex: number;
    outerView: string;
    handleOpen: (index?: number) => void;
    showAllPhotosDisplay?: boolean;
}
