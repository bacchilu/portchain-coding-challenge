import {PortDetail, Schedule} from '../../types';

export interface PortDetails {
    [id: string]: PortDetail;
}

export const getPortCallsLength = function (d: PortDetail) {
    return d.portCalls.filter((pc) => !pc.isOmitted).length;
};

export const getPortsDetails = function (schedules: Schedule[]) {
    const flattenedSchedule = schedules.reduce((acc, current) => [...acc, ...current], []);
    const portsDict = flattenedSchedule.reduce((acc, current) => {
        const key = current.port.id;
        const prevPortCalls = acc[key] === undefined ? [] : acc[key].portCalls;
        const {arrival, departure, isOmitted} = current;
        const value = [...prevPortCalls, {arrival, departure, isOmitted}];
        return {...acc, [key]: {name: current.port.name, portCalls: value}};
    }, {} as PortDetails);
    return [...Object.keys(portsDict)]
        .sort((a, b) => getPortCallsLength(portsDict[b]) - getPortCallsLength(portsDict[a]))
        .reduce((acc, current) => {
            acc.set(current, portsDict[current]);
            return acc;
        }, new Map<string, PortDetail>());
};

export const evalExtremeValues = function (ports: Map<string, PortDetail>, limit: number) {
    const e = new Set(Array.from(ports).map(([_, portDetail]) => getPortCallsLength(portDetail)));
    const top = [...e].sort((a, b) => b - a).slice(0, limit);
    const bottom = [...e].sort((a, b) => a - b).slice(0, limit);
    return {top, bottom};
};
