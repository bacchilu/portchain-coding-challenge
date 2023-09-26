import {FetchManager, Model} from '.';
import {Port, PortCall, Vessel} from '../types';

const mockSchedules = [
    {
        arrival: new Date('2019-01-12T03:42:00+00:00'),
        departure: new Date('2019-01-12T20:48:00+00:00'),
        isOmitted: false,
        port: {id: 'BEANR', name: 'Antwerpen'} as Port,
    } as PortCall,
    {
        arrival: new Date('2019-01-14T05:18:00+00:00'),
        departure: new Date('2019-01-14T18:00:00+00:00'),
        isOmitted: false,
        port: {id: 'DEHAM', name: 'Hamburg'} as Port,
    } as PortCall,
];

const mockVessels: Vessel[] = [
    {
        imo: 9303807,
        name: 'ABIDJAN EXPRESS',
    },
    {
        imo: 9314935,
        name: 'AS CAROLINA',
    },
    {
        imo: 9335173,
        name: 'COSCO BOSTON',
    },
    {
        imo: 9337626,
        name: 'NYK CONSTELLATION',
    },
    {
        imo: 9387425,
        name: 'EMPIRE',
    },
];

Model.getSchedules = async function (imo: number) {
    return mockSchedules;
};

describe('FetchManager', () => {
    describe('getChunkedSchedulesList', () => {
        test('Fetches schedules in chunks and returns combined results', async () => {
            const result = await FetchManager.getChunkedSchedulesList(mockVessels, (_: Vessel) => {});

            expect(result).toHaveLength(mockVessels.length);
            expect(result[0]).toHaveLength(mockSchedules.length);
        });
    });
});
