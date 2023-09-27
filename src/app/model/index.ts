import axios, {AxiosError} from 'axios';

import {Port, PortCall, Schedule, Vessel} from '../types';
import {chunkArray} from '../utils';

export interface ScheduleReturned {
    portCalls: {
        port: Port;
        arrival: string;
        departure: string;
        isOmitted: boolean;
    }[];
}

const parseSchedule = function (item: ScheduleReturned) {
    return item.portCalls.map(
        (pc) =>
            ({
                port: pc.port,
                arrival: new Date(pc.arrival),
                departure: new Date(pc.departure),
                isOmitted: pc.isOmitted,
            } as PortCall)
    ) as Schedule;
};

export const Model = {
    getVessels: async function () {
        try {
            const res = await axios.get<Vessel[]>('https://import-coding-challenge-api.portchain.com/api/v2/vessels');
            return res.data;
        } catch (error) {
            throw (error as AxiosError).message;
        }
    },
    getSchedules: async function (imo: number) {
        try {
            const res = await axios.get<Schedule>(
                `https://import-coding-challenge-api.portchain.com/api/v2/schedule/${imo}`,
                {
                    transformResponse: [
                        (data: string) => {
                            const parsedData = JSON.parse(data) as ScheduleReturned;
                            return parseSchedule(parsedData);
                        },
                    ],
                }
            );
            return res.data;
        } catch (error) {
            throw (error as AxiosError).message;
        }
    },
};

export const FetchManager = (function () {
    const CHUNK_SIZE = 3;

    const getSchedulesList = async function (vessels: Vessel[], progressCb: (v: Vessel) => void) {
        const getSchedules = async function (vessel: Vessel) {
            progressCb(vessel);
            const res = await Model.getSchedules(vessel.imo);
            return res;
        };

        return await Promise.all(vessels.map((v) => getSchedules(v)));
    };

    return {
        getChunkedSchedulesList: async function (vessels: Vessel[], progressCb: (v: Vessel) => void) {
            const chunks = chunkArray(vessels, CHUNK_SIZE);
            let res = [] as Schedule[];
            for (const chunk of chunks) res = [...res, ...(await getSchedulesList(chunk, progressCb))];
            return res;
        },
        getVessels: Model.getVessels,
    };
})();
