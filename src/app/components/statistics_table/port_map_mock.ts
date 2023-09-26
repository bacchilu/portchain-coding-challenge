import {PortDetail} from '../../types';

export const portsMapMock = new Map([
    [
        'DEHAM',
        {
            name: 'Hamburg',
            portCalls: [
                {
                    arrival: new Date('2019-01-14T05:18:00.000Z'),
                    departure: new Date('2019-01-14T18:00:00.000Z'),
                    isOmitted: false,
                },
                {
                    arrival: new Date('2019-02-21T13:12:00.000Z'),
                    departure: new Date('2019-02-22T03:00:00.000Z'),
                    isOmitted: false,
                },
                {
                    arrival: new Date('2019-03-28T07:00:00.000Z'),
                    departure: new Date('2019-03-29T14:06:00.000Z'),
                    isOmitted: false,
                },
            ],
        } as PortDetail,
    ],
    [
        'MAPTM',
        {
            name: 'Tanger Med',
            portCalls: [
                {
                    arrival: new Date('2019-01-22T02:10:00.000Z'),
                    departure: new Date('2019-01-22T23:50:00.000Z'),
                    isOmitted: false,
                },
                {
                    arrival: new Date('2019-02-15T21:18:00.000Z'),
                    departure: new Date('2019-02-16T08:18:00.000Z'),
                    isOmitted: false,
                },
                {
                    arrival: new Date('2019-02-28T18:46:00.000Z'),
                    departure: new Date('2019-03-01T14:00:00.000Z'),
                    isOmitted: false,
                },
                {
                    arrival: new Date('2019-03-22T07:42:00.000Z'),
                    departure: new Date('2019-03-22T20:06:00.000Z'),
                    isOmitted: false,
                },
            ],
        } as PortDetail,
    ],
    [
        'JPTYO',
        {
            name: 'Tokyo',
            portCalls: [
                {
                    arrival: new Date('2019-01-18T11:30:00.000Z'),
                    departure: new Date('2019-01-19T07:42:00.000Z'),
                    isOmitted: false,
                },
            ],
        } as PortDetail,
    ],
]);
