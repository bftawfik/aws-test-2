export const LinkIcon: React.FC<SvgProps> = ({
    height,
    width,
    fill,
    className,
}) => (
    <svg
        height={height}
        width={width}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
    >
        <path d="m18.364 15.535-1.414-1.414 1.414-1.414a5 5 0 0 0-7.07-7.071L9.878 7.05 8.465 5.636l1.414-1.414a7 7 0 0 1 9.9 9.9l-1.415 1.413Zm-2.828 2.829-1.414 1.414a7 7 0 1 1-9.9-9.9l1.414-1.414 1.415 1.414-1.415 1.415a5 5 0 0 0 7.071 7.07l1.415-1.413 1.414 1.414Zm-.707-10.607 1.414 1.414-7.071 7.072-1.414-1.415 7.07-7.07Z" />{' '}
    </svg>
);
