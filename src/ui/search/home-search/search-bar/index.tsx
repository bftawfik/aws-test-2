import React, {
    useState,
    useEffect,
    useRef,
    useMemo,
    useCallback,
} from 'react';
import DeveloperBanner from './banners/developer-banner';
import ProjectBanner from './banners/project-banner';
import LocationBanner from './banners/location-banner';
import { SearchBarProps } from './search-bar';
import { AiOutlinePlus } from 'react-icons/ai';
import OptionsContainer from './options-container';
import { useOnClickOutside } from 'usehooks-ts';
import { useSearchStore } from '@/store/search';
import SearchBadge from './search-badge';
import { BigSearchIcon } from '@/ui/svg';
import { useTempStore } from '@/store/temp-search';
import {
    generateUrl,
    useGenerateUrl,
} from '@/hooks/useGenerateUrl/useGenerateUrl';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMapStore } from '@/store/global';
import { sortArray } from '@/helpers/get-sorted-array';
import { BOUNDS_SHORT, DEFATULT_EMPTY_URL, REVALIDATE_SECONDS } from '@/constants';
import { useTranslations, useLocale } from 'next-intl';

const SearchBar = () => {
    // Read localization
    const locale = useLocale();
    const searchParams = useSearchParams();
    const bounds = searchParams.get(BOUNDS_SHORT) || '';

    // Read translations
    const tGlobal = useTranslations('global');

    const router = useRouter();
    const { tempText, setTempText, resetTempText } = useTempStore();
    const [options, setOptions] = useState<any | undefined>(undefined);
    const [showSelected, setShowSelected] = useState(false);
    const { resetBounds, resetCenter, resetZoomLevel } = useMapStore();

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
        removeText,
        sortByValue,
    } = useSearchStore();

    const urlWithTempText = useGenerateUrl({
        tempText: !tempText
            ? text
            : text.includes(tempText)
            ? text
            : [...text, tempText].sort(),
    });

    const uniqueItems = [...developers, ...locations, ...projects, ...text];
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && tempText) {
            resetBounds();
            resetZoomLevel();
            resetCenter();
            // setText(tempText.toLowerCase());
            resetTempText();
            router.push(urlWithTempText);
        }
    };

    const handleClickOutside = () => {
        setOptions(undefined);
        abortController?.abort();
    };
    const ref = useRef(null);
    useOnClickOutside(ref, handleClickOutside);
    const isProject = projects.length > 0;
    const isLocation = locations.length > 0;
    const isDeveloper = developers.length > 0;
    const isText = text.length > 0;
    const contentData = isProject
        ? projects[0].name
        : isLocation
        ? locations[0].name
        : isDeveloper
        ? developers[0].name
        : isText
        ? text[0]
        : null;

    const SearchBadgeClickHandler = () =>
        isProject
            ? handleRemoveProject(projects[0])
            : isLocation
            ? handleRemoveLocation(locations[0])
            : isDeveloper
            ? handleRemoveDeveloper(developers[0])
            : isText
            ? handleRemoveText(text[0])
            : null;
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
    const handleProject = (project: { id: number; name: string }) => {
        const tempPtojects = projects.some((item) => item.id === project.id)
            ? projects
            : sortArray([...projects, project]);

        const linkUrl = generateUrl(searchState, locale, {
            tempProjects: tempPtojects,
            tempPage: DEFATULT_EMPTY_URL.tempPage,
        });
        // setProjects(project);
        router.push(linkUrl);
    };
    const handleRemoveProject = (project: { id: number; name: string }) => {
        const tempProjects = projects.filter((item) => item.id !== project.id);
        const linkUrl = generateUrl(searchState, locale, {
            tempProjects: tempProjects,
            tempPage: DEFATULT_EMPTY_URL.tempPage,
        });
        // removeProject(project);
        router.push(linkUrl);
    };

    const handleDeveloper = (developer: { id: number; name: string }) => {
        const tempDevelopers = developers.some(
            (item) => item.id === developer.id
        )
            ? developers
            : sortArray([...developers, developer]);

        const linkUrl = generateUrl(searchState, locale, {
            tempDevelopers: tempDevelopers,
            tempPage: DEFATULT_EMPTY_URL.tempPage,
        });
        // setDevelopers(developer);
        router.push(linkUrl);
    };
    const handleRemoveDeveloper = (developer: { id: number; name: string }) => {
        const tempDevelopers = developers.filter(
            (item) => item.id !== developer.id
        );
        const linkUrl = generateUrl(searchState, locale, {
            tempDevelopers: tempDevelopers,
            tempPage: DEFATULT_EMPTY_URL.tempPage,
        });
        // removeDeveloper(developer);
        router.push(linkUrl);
    };
    const handleLocation = (location: { id: number; name: string }) => {
        const tempLocations = locations.some((item) => item.id === location.id)
            ? developers
            : sortArray([...locations, location]);

        const linkUrl = generateUrl(searchState, locale, {
            tempLocations: tempLocations,
            tempPage: DEFATULT_EMPTY_URL.tempPage,
        });
        // setLocations(location);
        router.push(linkUrl);
    };
    const handleRemoveLocation = (location: { id: number; name: string }) => {
        const tempLocations = locations.filter(
            (item) => item.id !== location.id
        );
        const linkUrl = generateUrl(searchState, locale, {
            tempLocations: tempLocations,
            tempPage: DEFATULT_EMPTY_URL.tempPage,
        });
        // removeLocation(location);
        router.push(linkUrl);
    };
    const handleRemoveText = (newtext: string) => {
        const tempValue = text.filter((item) => item !== newtext);
        const linkUrl = generateUrl(searchState, locale, {
            tempText: tempValue,
            tempPage: DEFATULT_EMPTY_URL.tempPage,
        });
        // removeText(newtext);
        router.push(linkUrl);
    };

    return (
        <div ref={ref} className="relative h-full w-full items-center ">
            <div className="flex h-full w-full items-center gap-2 px-3">
                <BigSearchIcon
                    fill="currentColor"
                    className="h-5 w-5 shrink-0 text-[#d6d6d6]"
                />

                <div className="flex items-center">
                    {uniqueItems.length > 1 ? (
                        <>
                            {contentData ? (
                                <SearchBadge
                                    content={contentData}
                                    onClick={SearchBadgeClickHandler}
                                />
                            ) : null}
                            <div
                                className="ms-2 flex  w-24 cursor-pointer items-center  gap-2 rounded-md bg-[#eeeeee] p-1  text-black"
                                onClick={() => setShowSelected(true)}
                            >
                                <p className="line-clamp-1 w-full text-sm text-black">
                                    {uniqueItems.length - 1 + tGlobal('more')}
                                </p>
                                <AiOutlinePlus className="h-6 w-6" />
                            </div>
                        </>
                    ) : (
                        <>
                            {isProject ? (
                                <SearchBadge
                                    key={Math.random()}
                                    content={projects[0].name}
                                    onClick={() =>
                                        handleRemoveProject(projects[0])
                                    }
                                />
                            ) : isLocation ? (
                                <SearchBadge
                                    key={Math.random()}
                                    content={locations[0].name}
                                    onClick={() =>
                                        handleRemoveLocation(locations[0])
                                    }
                                />
                            ) : isDeveloper ? (
                                <SearchBadge
                                    key={Math.random()}
                                    content={developers[0].name}
                                    onClick={() =>
                                        handleRemoveDeveloper(developers[0])
                                    }
                                />
                            ) : isText ? (
                                <SearchBadge
                                    key={Math.random()}
                                    content={text[0]}
                                    onClick={() => handleRemoveText(text[0])}
                                />
                            ) : null}
                        </>
                    )}
                </div>
                <input
                    type="text"
                    className="h-full w-full rounded-md bg-transparent placeholder:text-sm focus:outline-none "
                    placeholder={`${tGlobal('search_for_units')}`}
                    value={tempText || ''}
                    onKeyDown={handleKeyDown}
                    onChange={handleSearchChange}
                />
            </div>
            {showSelected && uniqueItems.length > 0 ? (
                <OptionsContainer onClickOutside={() => setShowSelected(false)}>
                    <div className="flex flex-wrap gap-3 p-2">
                        {developers.map((option) => (
                            <SearchBadge
                                key={option.id}
                                content={option.name}
                                onClick={() => handleRemoveDeveloper(option)}
                            />
                        ))}
                        {locations.map((option) => (
                            <SearchBadge
                                key={option.id}
                                content={option.name}
                                onClick={() => handleRemoveLocation(option)}
                            />
                        ))}
                        {projects.map((option) => (
                            <SearchBadge
                                key={option.id}
                                content={option.name}
                                onClick={() => handleRemoveProject(option)}
                            />
                        ))}
                        {text.map((option) => (
                            <SearchBadge
                                key={option}
                                content={option}
                                onClick={() => handleRemoveText(option)}
                            />
                        ))}
                    </div>
                </OptionsContainer>
            ) : (
                options && (
                    <OptionsContainer onClickOutside={handleClickOutside}>
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
                                    selected={developers.some(
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
                                    selected={projects.some(
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
                                    selected={locations.some(
                                        (loc) => loc.id === option.id
                                    )}
                                    data={option}
                                />
                            </div>
                        ))}
                    </OptionsContainer>
                )
            )}
        </div>
    );
};

export default SearchBar;
