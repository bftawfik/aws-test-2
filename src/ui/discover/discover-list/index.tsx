'use client';
import { UnitCard } from '@/ui/units/unit-card';
import React, { useEffect, useState } from 'react';
import { useLocale } from 'next-intl';

const DiscoverList = ({ units }: { units: any[] }) => {
    const [unitData, setUnitData] = useState(units);
    // Read localization
    const locale = useLocale();

    // const fetcher = (url: any) => fetch(url).then((res) => res.json());

    // const { data, error, isLoading } = useSWR(
    //     'https://api.theestatebook.net/api/v1/get-units?page=1&per_page=30',
    //     fetcher
    // );
    useEffect(() => {}, []);

    // const {
    //     data: products,
    //     error,
    //     isLoading,
    // } = useFetch('get-units?page=1&per_page=30');

    const cards = React.useMemo(() => {
        return unitData?.map((unit: any) => (
            <UnitCard key={unit.id} unit={unit} />
        ));
    }, [unitData]);

    return <>{cards}</>;
};

export default DiscoverList;
