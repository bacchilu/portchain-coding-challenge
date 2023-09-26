import humanizeDuration from 'humanize-duration';

export const chunkArray = function <T>(array: T[], chunkSize: number) {
    const result = [] as T[][];
    for (let i = 0; i < array.length; i += chunkSize) result.push(array.slice(i, i + chunkSize));

    return result;
};

export const humanizeTimedelta = function (ms: number) {
    return humanizeDuration(ms, {units: ['y', 'mo', 'w', 'd', 'h', 'm'], round: true});
};
