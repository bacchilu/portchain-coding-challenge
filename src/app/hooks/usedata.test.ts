import {renderHook, waitFor} from '@testing-library/react';
import {Mock, vi} from 'vitest';

import {useData} from '.';
import {Vessel} from '../types';
import {useSchedules, useVessels} from './hooks';

vi.mock('./hooks', async () => {
    const originalModule: object = await vi.importActual('./hooks');
    return {
        ...originalModule,
        useVessels: vi.fn(),
        useSchedules: vi.fn(),
    };
});

describe('useData', () => {
    test('Should return loading info when vessels are loading', async () => {
        (useVessels as Mock).mockReturnValue({data: undefined, error: null});
        (useSchedules as Mock).mockReturnValue({data: undefined, info: '', error: null});

        const {result} = renderHook(useData);
        await waitFor(() => {
            expect(result.current.info).toBe('Loading vessels...');
        });
        vi.clearAllMocks();
    });
    test('Should return loading info when schedules are loading', async () => {
        (useVessels as Mock).mockReturnValue({data: [{imo: 9303807, name: 'ABIDJAN EXPRESS'} as Vessel], error: null});
        (useSchedules as Mock).mockReturnValue({data: undefined, info: 'ABIDJAN EXPRESS', error: null});

        const {result} = renderHook(useData);
        await waitFor(() => {
            expect(result.current.info).toBe('Loading schedules... ABIDJAN EXPRESS');
        });
    });
    test('Should return data when both vessels and schedules are loaded', async () => {
        (useVessels as Mock).mockReturnValue({data: [{imo: 9303807, name: 'ABIDJAN EXPRESS'} as Vessel], error: null});
        (useSchedules as Mock).mockReturnValue({data: [1, 2, 3], info: 'ABIDJAN EXPRESS', error: null});

        const {result} = renderHook(useData);
        await waitFor(() => {
            expect(result.current.data).toEqual([1, 2, 3]);
            expect(result.current.error).toBeNull();
        });
    });
    test('Should return an error if vessels encounter an error', async () => {
        (useVessels as Mock).mockReturnValue({data: undefined, error: 'Vessels error message'});
        (useSchedules as Mock).mockReturnValue({data: undefined, info: '', error: null});

        const {result} = renderHook(useData);
        await waitFor(() => {
            expect(result.current.error).toBe('Vessels error message');
        });
    });
    test('Should return an error if schedules encounter an error', async () => {
        (useVessels as Mock).mockReturnValue({data: [{imo: 9303807, name: 'ABIDJAN EXPRESS'} as Vessel], error: null});
        (useSchedules as Mock).mockReturnValue({data: undefined, info: '', error: 'Schedules error message'});

        await waitFor(() => {
            const {result} = renderHook(useData);
            expect(result.current.error).toBe('Schedules error message');
        });
    });
});
