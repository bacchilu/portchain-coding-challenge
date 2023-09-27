import {useSchedules, useVessels} from './hooks';

export const useData = function () {
    const {data: vessels, error: vesselsError} = useVessels();
    const {data: schedules, info: schedulesInfo, error: schedulesError} = useSchedules(vessels);

    let info = '';
    if (vessels === undefined) info = 'Loading vessels...';
    if (vessels !== undefined) info = `Loading schedules... ${schedulesInfo}`;

    return {data: schedules, info, error: vesselsError || schedulesError};
};
