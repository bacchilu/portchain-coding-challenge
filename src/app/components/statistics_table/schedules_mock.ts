import {Port, PortCall, Schedule} from '../../types';

export const mockSchedules = [
    [
        {
            port: {id: 'BEANR', name: 'Antwerpen'} as Port,
            arrival: new Date('2019-01-12 03:42:00'),
            departure: new Date('2019-01-12 20:48:00'),
            isOmitted: false,
        } as PortCall,
        {
            port: {id: 'BEANR', name: 'Antwerpen'} as Port,
            arrival: new Date('2019-01-14 05:18:00'),
            departure: new Date('2019-01-14 18:00:00'),
            isOmitted: false,
        } as PortCall,
        {
            port: {id: 'MACAS', name: 'Casablanca'} as Port,
            arrival: new Date('2019-01-18 21:48:00'),
            departure: new Date('2019-01-19 22:54:00'),
            isOmitted: false,
        } as PortCall,
    ] as Schedule,
    [
        {
            port: {id: 'ITSAL', name: 'Salerno'} as Port,
            arrival: new Date('2018-12-30 11:18:00'),
            departure: new Date('2018-12-31 04:54:00'),
            isOmitted: false,
        } as PortCall,
    ] as Schedule,
];
