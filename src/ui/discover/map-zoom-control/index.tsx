'use client';
import { useMapStore } from '@/store/global';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { MapZoomControlProps, ZoomButtons } from './map-zoom-control';
import { useMouse } from 'react-use';
import {
    NEIGHBORHOODS_ZOOM_LEVEL,
    PROJECTS_ZOOM_LEVEL,
    UNITS_ZOOM_LEVEL,
} from '@/constants';
import { useGenerateUrl } from '@/hooks/useGenerateUrl/useGenerateUrl';
import { useSearchStore } from '@/store/search';
import { useTranslations } from 'next-intl';

const MapZoomControl = ({ className }: MapZoomControlProps) => {
    const zoomNumber = 22;
    const [maxZoomLimit, setMaxZoomLimit] = useState(false);
    const [minZoomLimit, setMinZoomLimit] = useState(false);
    const { zoomLevel, setZoomLevel, bounds, resetBounds, resetCenter } =
        useMapStore();
    const router = useRouter();
    useEffect(() => {
        zoomLevel! >= zoomNumber
            ? setMaxZoomLimit(true)
            : setMaxZoomLimit(false);
        zoomLevel === 0 ? setMinZoomLimit(true) : setMinZoomLimit(false);
    }, [zoomLevel, bounds]);

    // use Mouse position
    const divRef = React.useRef(null);
    const { elX: curserX, elY: curserY, elW, elH } = useMouse(divRef);
    const tGlobal = useTranslations('global');
    const zoomLevelsButtons = [
        {
            id: 5,
            name: 'units',
            value: tGlobal('units'),
            zoomLevel: UNITS_ZOOM_LEVEL,
            color: '#7DAFFF',
            url: useGenerateUrl({ tempTab: 'units' }),
        },
        {
            id: 4,
            name: 'projects',
            value: tGlobal('projects'),
            zoomLevel: PROJECTS_ZOOM_LEVEL,
            color: '#F0BC3C',
            url: useGenerateUrl({ tempTab: 'projects' }),
        },
        {
            id: 3,
            name: 'neighborhoods',
            value: tGlobal('neighborhoods'),
            zoomLevel: NEIGHBORHOODS_ZOOM_LEVEL,
            color: '#74D8AF',
            url: useGenerateUrl({ tempTab: 'neighborhoods' }),
        },
    ];
    const buttonPosition = (value: number) => {
        const startPosition = 25;
        const step = 12;
        const final = startPosition + step * value - 1;
        return final;
    };

    // check active button
    const { tab } = useSearchStore();
    const setActiveButton = (el: ZoomButtons) => {
        if (el.name === tab) {
            return true;
        } else if (el.name === 'units' && !tab) {
            return true;
        }
        return false;
    };

    const getListZoomLevel = () => {
        const clickPercent = Math.round(((elH - curserY) / elH) * 22);
        if (clickPercent) {
            setZoomLevel(clickPercent);
        }
    };
    const upZoomLevel = () => {
        setZoomLevel(zoomLevel! + 1);
    };
    const downZoomLevel = () => {
        setZoomLevel(zoomLevel! - 1);
    };
    const handleZoomChange = (button: {
        id: number;
        name: string;
        zoomLevel: number;
        color: string;
        url: string;
    }) => {
        setZoomLevel(button.zoomLevel);
        resetBounds();
        resetCenter();
        router.push(button.url);
    };

    return (
        <>
            <div
                className={`mx-auto my-3 flex h-auto w-6 flex-col items-center gap-x-1 gap-y-2 rounded-md bg-grey-100 shadow ${className}`}
            >
                <button
                    onClick={upZoomLevel}
                    className={`h-6 w-full cursor-pointer select-none rounded-md bg-white hover:bg-custom-light ${
                        maxZoomLimit && 'pointer-events-none bg-grey-300'
                    }`}
                >
                    {maxZoomLimit}+
                </button>

                <ul
                    ref={divRef}
                    onClick={getListZoomLevel}
                    className="mx-auto flex h-full w-full rotate-180 cursor-pointer flex-wrap space-y-2 px-1"
                >
                    {Array.from(Array(zoomNumber), (_, idx) => {
                        return (
                            <li
                                key={`dash-${idx + 1}`}
                                value={idx + 1}
                                className={`block h-1 w-8 cursor-pointer rounded-sm ${
                                    idx < zoomLevel!
                                        ? 'bg-grey-500'
                                        : 'bg-grey-200'
                                }`}
                            ></li>
                        );
                    })}
                </ul>
                <div className="flex flex-col gap-y-5">
                    {zoomLevelsButtons.map((button) => (
                        <button
                            key={`button-${button.id}`}
                            className={`absolute rounded-md bg-white px-2 py-[3px] text-[10px] capitalize ltr:right-8 rtl:left-8 ${
                                setActiveButton(button)
                                    ? 'text-white'
                                    : 'text-slate-700'
                            }  hover:bg-slate-200`}
                            style={{
                                bottom: buttonPosition(button.zoomLevel) + 'px',
                                backgroundColor: setActiveButton(button)
                                    ? button.color
                                    : '',
                            }}
                            onClick={() => {
                                handleZoomChange(button);
                            }}
                        >
                            {button.value}
                        </button>
                    ))}
                </div>
                <button
                    onClick={downZoomLevel}
                    className={`h-6 w-full cursor-pointer select-none rounded-lg bg-white hover:bg-custom-light ${
                        minZoomLimit && 'pointer-events-none bg-grey-300'
                    }`}
                >
                    -
                </button>
            </div>
        </>
    );
};

export default MapZoomControl;
