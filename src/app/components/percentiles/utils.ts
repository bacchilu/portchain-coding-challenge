import stats from 'stats-lite';

import {PortDetail} from '../../types';

export const evalPercentiles = function (portDetail: PortDetail) {
    const portCalls = portDetail.portCalls.filter((pc) => !pc.isOmitted);
    const durations = portCalls.map((pc) => pc.departure.getTime() - pc.arrival.getTime());
    if (durations.length === 0) return null;
    return {
        p_05: stats.percentile(durations, 0.05),
        p_20: stats.percentile(durations, 0.2),
        p_50: stats.percentile(durations, 0.5),
        p_75: stats.percentile(durations, 0.75),
        p_90: stats.percentile(durations, 0.9),
    };
};
