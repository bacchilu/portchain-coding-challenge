import React from 'react';

import {FetchManager} from './model';
import {Schedule, Vessel} from './types';

const useSchedules = function (vessels: Vessel[] | undefined) {
    const [schedules, setSchedules] = React.useState<Schedule[] | undefined>(undefined);
    const [error, setError] = React.useState<string | null>(null);
    const [info, setInfo] = React.useState('');

    const progressCb = function (vessel: Vessel) {
        setInfo(vessel.name);
    };

    React.useEffect(() => {
        if (vessels === undefined) return;
        const f = async function () {
            try {
                const res = await FetchManager.getChunkedSchedulesList(vessels, progressCb);
                setSchedules(res);
            } catch (error) {
                setError(error as string);
            }
        };
        f();
    }, [vessels]);

    return {data: schedules, info, error};
};

const useVessels = function () {
    const [vessels, setVessels] = React.useState<Vessel[] | undefined>(undefined);
    const [error, setError] = React.useState<string | null>(null);

    React.useEffect(() => {
        const f = async function () {
            try {
                const res = await FetchManager.getVessels();
                setVessels(res);
            } catch (error) {
                setError(error as string);
            }
        };
        f();
    }, []);

    return {data: vessels, error};
};

export const useData = function () {
    const {data: vessels, error: vesselsError} = useVessels();
    const {data: schedules, info: schedulesInfo, error: schedulesError} = useSchedules(vessels);

    let info = '';
    if (vessels === undefined) info = 'Loading vessels...';
    if (vessels !== undefined) info = `Loading schedules... ${schedulesInfo}`;

    return {data: schedules, info, error: vesselsError || schedulesError};
};
