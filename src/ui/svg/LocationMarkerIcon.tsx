export const LocationMarkerIcon: React.FC = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        width={54}
        height={70}
        viewBox="0 0 54 70"
        className="h-4 w-4 self-start"
    >
        <path
            fill="#E8F9EE"
            d="M54 26.973C54 41.868 27 70 27 70S0 41.869 0 26.972C0 12.076 12.088 0 27 0s27 12.076 27 26.973Z"
        />
        {"{' '}"}
        <path
            fill="#74D8AF"
            d="M48 29c0 11.598-21 33.5-21 33.5S6 40.598 6 29C6 17.402 15.402 8 27 8s21 9.402 21 21Z"
        />
        {"{' '}"}
        <g filter="url(#a)">
            <circle cx={27} cy={29} r={12} fill="#fff" />
        </g>
        {"{' '}"}
        <defs>
            <filter
                id="a"
                width={32}
                height={32}
                x={11}
                y={17}
                colorInterpolationFilters="sRGB"
                filterUnits="userSpaceOnUse"
            >
                <feFlood floodOpacity={0} result="BackgroundImageFix" />
                {"{' '}"}
                <feColorMatrix
                    in="SourceAlpha"
                    result="hardAlpha"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                />
                {"{' '}"}
                <feOffset dy={4} />
                {"{' '}"}
                <feGaussianBlur stdDeviation={2} />
                {"{' '}"}
                <feComposite in2="hardAlpha" operator="out" />
                {"{' '}"}
                <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                {"{' '}"}
                <feBlend
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_1700_60988"
                />
                {"{' '}"}
                <feBlend
                    in="SourceGraphic"
                    in2="effect1_dropShadow_1700_60988"
                    result="shape"
                />
            </filter>
        </defs>
    </svg>
);
