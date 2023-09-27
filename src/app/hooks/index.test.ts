import {renderHook, waitFor} from '@testing-library/react';
import {vi} from 'vitest';

import {useSchedules, useVessels} from '.';
import {mockSchedules} from '../components/statistics_table/schedules_mock';
import {FetchManager} from '../model';
import {Vessel} from '../types';

const mockVessels = [{imo: 9303807, name: 'ABIDJAN EXPRESS'} as Vessel, {imo: 9314935, name: 'AS CAROLINA'} as Vessel];

vi.mock('../model', () => ({
    FetchManager: {
        getVessels: async function () {
            return mockVessels;
        },
        getChunkedSchedulesList: async function (vessels: Vessel[], progressCb: (v: Vessel) => void) {
            return mockSchedules;
        },
    },
}));

describe('useVessels', () => {
    afterEach(() => {
        vi.clearAllMocks();
    });

    test('Initial rendering', async () => {
        const {result} = renderHook(useVessels);

        await waitFor(() => {
            expect(result.current.data).toBeUndefined();
            expect(result.current.error).toBeNull();
        });
    });

    test('Should fetch vessels and return data', async () => {
        const {result} = renderHook(useVessels);

        await waitFor(() => {
            expect(result.current.data).toEqual(mockVessels);
            expect(result.current.error).toBeNull();
        });
    });

    test('Should handle error when fetching vessels', async () => {
        FetchManager.getVessels = async () => {
            throw 'Failed to fetch vessels';
        };
        const {result} = renderHook(useVessels);

        await waitFor(() => {
            expect(result.current.data).toBeUndefined();
            expect(result.current.error).toEqual('Failed to fetch vessels');
        });
    });
});

describe('useSchedules', () => {
    afterEach(() => {
        vi.clearAllMocks();
    });

    test('Fetches schedules and sets data correctly', async () => {
        const {result} = renderHook(() => useSchedules(mockVessels));

        await waitFor(() => {
            expect(result.current.data).toEqual(mockSchedules);
        });
        expect(result.current.info).toBe('');
        expect(result.current.error).toBe(null);
    });

    test('Handles errors correctly', async () => {
        FetchManager.getChunkedSchedulesList = async function (vessels: Vessel[], progressCb: (v: Vessel) => void) {
            throw 'Sample Error';
        };

        const {result} = renderHook(() => useSchedules(mockVessels));

        expect(result.current.data).toBeUndefined();
        expect(result.current.info).toBe('');
        await waitFor(() => {
            expect(result.current.error).toBe('Sample Error');
        });
    });
});
