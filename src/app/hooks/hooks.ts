import React from 'react';

import {FetchManager} from '../model';
import {Schedule, Vessel} from '../types';

export const useSchedules = function (vessels: Vessel[] | undefined) {
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

export const useVessels = function () {
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
