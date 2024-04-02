import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { BiSearch } from 'react-icons/bi';
import { SearchBarModalProps } from './search-bar-modal.d';
import DeveloperBanner from '../../home-search/search-bar/banners/developer-banner';
import ProjectBanner from '../../home-search/search-bar/banners/project-banner';
import LocationBanner from '../../home-search/search-bar/banners/location-banner';
import ContainerComponent from '../contianer';
import { useSearchStore } from '@/store/search';
import SearchBadge from '../../home-search/search-bar/search-badge';
import { ResetIcon } from '@/ui/svg';
import { useTempStore } from '@/store/temp-search';
import { useMapStore } from '@/store/global';
import {
    generateUrl,
    useGenerateUrl,
} from '@/hooks/useGenerateUrl/useGenerateUrl';
import { useRouter, useSearchParams } from 'next/navigation';
import {
    BOUNDS_SHORT,
    DEFATULT_EMPTY_URL,
    REVALIDATE_SECONDS,
} from '@/constants';
import { sortArray, sortStringArray } from '@/helpers/get-sorted-array';
import { useTranslations, useLocale } from 'next-intl';

const SearchBarModal = () => {
    // Read localization
    const locale = useLocale();
    const searchParams = useSearchParams();
    const bounds = searchParams.get(BOUNDS_SHORT) || '';

    // Read translations
    const tGlobal = useTranslations('global');

    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState<any | undefined>(undefined);
    const { tempText, setTempText, resetTempText } = useTempStore();
    const { resetBounds, resetCenter, resetZoomLevel } = useMapStore();
    const router = useRouter();
    // check if reset button clicked
    const [resetIsClicked, setResetIsClicked] = useState(false);
    const {
        tempLocations,
        tempProjects,
        tempDevelopers,
        tempTextList,
        setTempProjects,
        setTempDevelopers,
        setTempLocations,
        setTempTextList,
        resetAlltempStore,
    } = useTempStore();

    const abortController = useMemo(() => {
        if (tempText) {
            return new AbortController();
        }
    }, [tempText]);
    const fetchData = useCallback(async () => {
        try {
            const response = await fetch(
                `https://api.theestatebook.net/api/v1/search_criteria?filter[name]=${tempText}`,
                {
                    headers: { 'Accept-Language': locale },
                    signal: abortController?.signal, // Add request to abort controller for cancelling
                    next: {
                        revalidate: REVALIDATE_SECONDS,
                    },
                }
            );
            const result = await response.json();

            setOptions(result);
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error(
                'Cancelled previous request or fetching error',
                error
            );
        }
    }, [tempText, locale, abortController]);
    useEffect(() => {
        if (tempText) {
            fetchData();
        } else {
            setOptions(undefined);
        }
    }, [tempText, fetchData]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        abortController?.abort();
        setTempText(e.target.value);
    };

    const {
        text,
        setText,
        removeText,
        developers,
        projects,
        locations,
        setDevelopers,
        setLocations,
        setProjects,
        removeDeveloper,
        removeLocation,
        removeProject,
        setAllDevelopers,
        setAllLocations,
        setAllProjects,
        resetText,
        tab,
        readyToMove,
        amenities,
        unitFeatures,
        saleType,
        type,
        unitTypeList,
        area,
        beds,
        baths,
        price,
        downPayment,
        installment,
        sortByValue,
    } = useSearchStore();

    const searchState = {
        tab,
        text,
        amenities,
        unitFeatures,
        saleType,
        type,
        unitTypeList,
        area,
        beds,
        baths,
        price,
        downPayment,
        installment,
        developers,
        locations,
        projects,
        readyToMove,
        bounds,
        sortByValue,
    };

    const resetUrl = generateUrl(searchState, locale, DEFATULT_EMPTY_URL);

    const handleModal = () => {
        setOpen(!open);
        if (resetIsClicked) {
            resetAlltempStore();
            router.push(resetUrl);
        }
    };
    // const urlWithTempText = useGenerateUrl({
    //     tempText: !tempText
    //         ? text
    //         : text.includes(tempText)
    //         ? text
    //         : [...text, tempText].sort(),
    // });
    // const uniqueItems = [...developers, ...locations, ...projects, ...text];

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && tempText) {
            resetBounds();
            resetZoomLevel();
            resetCenter();
            const tempTextValues = !tempText
                ? tempTextList
                : tempTextList.includes(tempText)
                ? tempTextList
                : [...tempTextList, tempText].sort();
            setTempTextList(tempTextValues);
            // setText(tempText.toLowerCase());
            resetTempText();
            // router.push(urlWithTempText);
        }
    };

    const resetData = () => {
        resetAlltempStore();
        setResetIsClicked(true);
    };
    const handleProject = (project: { id: number; name: string }) => {
        const tempProjectsArray = tempProjects.some(
            (item) => item.id === project.id
        )
            ? tempProjects
            : sortArray([...tempProjects, project]);
        setTempProjects(tempProjectsArray);
    };
    const handleRemoveProject = (project: { id: number; name: string }) => {
        const tempProjectsList = tempProjects.filter(
            (item) => item.id !== project.id
        );

        setTempProjects(tempProjectsList);
        // router.push(linkUrl);
    };

    const handleDeveloper = (developer: { id: number; name: string }) => {
        const tempDevelopersList = tempDevelopers.some(
            (item) => item.id === developer.id
        )
            ? tempDevelopers
            : sortArray([...tempDevelopers, developer]);

        setTempDevelopers(tempDevelopersList);
        // setDevelopers(developer);
        // router.push(linkUrl);
    };
    const handleRemoveDeveloper = (developer: { id: number; name: string }) => {
        const tempDevelopersList = tempDevelopers.filter(
            (item) => item.id !== developer.id
        );
        setTempDevelopers(tempDevelopersList);
        // router.push(linkUrl);
    };
    const handleLocation = (location: { id: number; name: string }) => {
        const tempLocationsList = tempLocations.some(
            (item) => item.id === location.id
        )
            ? tempLocations
            : sortArray([...tempLocations, location]);

        setTempLocations(tempLocationsList);
    };
    const handleRemoveLocation = (location: { id: number; name: string }) => {
        const tempLocationsList = tempLocations.filter(
            (item) => item.id !== location.id
        );
        setTempLocations(tempLocationsList);
        // router.push(linkUrl);
    };
    const handleRemoveText = (newtext: string) => {
        const tempValue = tempTextList.filter((item) => item !== newtext);
        // const linkUrl = generateUrl(searchState, locale, {
        //     tempText: tempValue,
        //     tempPage: DEFATULT_EMPTY_URL.tempPage,
        // });
        setTempTextList(tempValue);
        // removeText(newtext);
        // router.push(linkUrl);
    };

    const handleApply = () => {
        const applyUrl = generateUrl(searchState, locale, {
            tempDevelopers: sortArray([
                ...(tempDevelopers ? tempDevelopers : developers),
            ]),
            tempProjects: sortArray([
                ...(tempProjects ? tempProjects : projects),
            ]),
            tempLocations: sortArray([
                ...(tempLocations ? tempLocations : locations),
            ]),
            tempText: sortStringArray(tempTextList),
        });
        // handleOpen();
        router.push(applyUrl);
        // resetTempStore();
        // resetData();
    };

    useEffect(() => {
        setTempProjects(projects);
        setTempDevelopers(developers);
        setTempLocations(locations);
        setTempTextList(text);
    }, [
        projects,
        setTempProjects,
        developers,
        setTempDevelopers,
        locations,
        setTempLocations,
        text,
        setTempTextList,
    ]);

    return (
        <>
            <button
                className="flex h-full flex-auto items-center gap-2 rounded-lg px-2 py-2 text-center focus:outline-none"
                type="button"
                onClick={handleModal}
            >
                <BiSearch
                    size={22}
                    className="h-6 w-6 fill-[#d6d6d6] font-normal"
                />
                <p className="line-clamp-1 text-start text-sm  text-gray-400">{`${tGlobal(
                    'search_for_units'
                )}`}</p>
            </button>

            <ContainerComponent open={open} close={handleModal}>
                <div className="h-full w-full overflow-y-auto pb-[70px]">
                    <div className="mt-4 flex h-10 w-full items-center gap-2 rounded-lg  border border-gray-200 p-1 shadow-sm">
                        <BiSearch className="h-6 w-6 fill-[#d6d6d6]" />
                        <input
                            value={tempText || ''}
                            onKeyDown={handleKeyDown}
                            onChange={handleSearchChange}
                            className="w-full text-base outline-none placeholder:text-sm"
                            placeholder={`${tGlobal('search_for_units')}`}
                        />
                    </div>
                    <div className="my-1 flex max-h-[30%] w-full flex-wrap gap-1 overflow-y-auto border-b p-1">
                        {tempDevelopers.map((option) => (
                            <SearchBadge
                                key={Math.random()}
                                content={option.name}
                                onClick={() => handleRemoveDeveloper(option)}
                            />
                        ))}
                        {tempLocations.map((option) => (
                            <SearchBadge
                                key={Math.random()}
                                content={option.name}
                                onClick={() => handleRemoveLocation(option)}
                            />
                        ))}
                        {tempProjects.map((option) => (
                            <SearchBadge
                                key={Math.random()}
                                content={option.name}
                                onClick={() => handleRemoveProject(option)}
                            />
                        ))}
                        {tempTextList.map((option) => (
                            <SearchBadge
                                key={Math.random()}
                                content={option}
                                onClick={() => handleRemoveText(option)}
                            />
                        ))}
                    </div>

                    {options && (
                        <div className="m-1 max-h-[55vh] overflow-y-auto">
                            {options.developers?.map((option: any) => (
                                <div
                                    key={option.id}
                                    className="cursor-pointer p-2 hover:bg-gray-100"
                                    onClick={() => {
                                        handleDeveloper({
                                            id: option.id,
                                            name: option.name.toLowerCase(),
                                        });
                                        resetTempText();
                                    }}
                                >
                                    <DeveloperBanner
                                        selected={tempDevelopers.some(
                                            (dev) => dev.id === option.id
                                        )}
                                        data={option}
                                    />
                                </div>
                            ))}
                            {options.projects?.map((option: any) => (
                                <div
                                    key={option.id}
                                    className="cursor-pointer p-2 hover:bg-gray-100"
                                    onClick={() => {
                                        handleProject({
                                            id: option.id,
                                            name: option.name.toLowerCase(),
                                        });
                                        resetTempText();
                                    }}
                                >
                                    <ProjectBanner
                                        selected={tempProjects.some(
                                            (pro) => pro.id === option.id
                                        )}
                                        data={option}
                                    />
                                </div>
                            ))}
                            {options.locations?.map((option: any) => (
                                <div
                                    key={option.id}
                                    className="cursor-pointer p-2 hover:bg-gray-100"
                                    onClick={() => {
                                        handleLocation({
                                            id: option.id,
                                            name: option.name.toLowerCase(),
                                        });
                                        resetTempText();
                                    }}
                                >
                                    <LocationBanner
                                        selected={tempLocations.some(
                                            (loc) => loc.id === option.id
                                        )}
                                        data={option}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                    <div className="fixed bottom-0 left-0 right-0 grid h-14  w-full grid-cols-2 items-center gap-2 bg-white p-3">
                        <button
                            onClick={resetData}
                            className="group inline-flex appearance-none items-center justify-center gap-2 rounded-lg border border-primary/60 bg-white px-3 py-2 text-xs capitalize hover:bg-primary hover:text-white"
                        >
                            <ResetIcon />
                            {tGlobal('reset_all')}
                        </button>
                        <button
                            onClick={handleApply}
                            className="inline-flex appearance-none items-center justify-center rounded-lg border border-emerald-500 bg-primary px-3 py-2 text-xs font-bold capitalize text-white  hover:bg-emerald-600"
                        >
                            {tGlobal('show_results')}
                        </button>
                    </div>
                </div>
            </ContainerComponent>
        </>
    );
};

export default SearchBarModal;
