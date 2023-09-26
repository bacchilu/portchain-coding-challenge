import {PortDetail} from '../../types';
import {portsMapMock} from './port_map_mock';
import {mockSchedules} from './schedules_mock';
import {evalExtremeValues, getPortCallsLength, getPortsDetails} from './utils';

const mockPortDetail = {
    name: 'Norfolk',
    portCalls: [
        {
            arrival: new Date('2019-04-21 09:42:00'),
            departure: new Date('2019-04-22 10:48:00'),
            isOmitted: false,
        },
        {
            arrival: new Date('2019-01-06 12:00:00'),
            departure: new Date('2019-01-07 17:00:00'),
            isOmitted: true,
        },
        {
            arrival: new Date('2019-01-25 07:00:00'),
            departure: new Date('2019-01-26 22:36:00'),
            isOmitted: false,
        },
        {
            arrival: new Date('2019-02-03 12:00:00'),
            departure: new Date('2019-02-04 17:00:00'),
            isOmitted: true,
        },
        {
            arrival: new Date('2019-03-03 12:00:00'),
            departure: new Date('2019-03-04 17:00:00'),
            isOmitted: true,
        },
        {
            arrival: new Date('2019-04-14 17:48:00'),
            departure: new Date('2019-04-16 04:48:00'),
            isOmitted: false,
        },
        {
            arrival: new Date('2019-04-21 11:00:00'),
            departure: new Date('2019-04-22 16:00:00'),
            isOmitted: true,
        },
    ],
} as PortDetail;

describe('getPortCallsLength', () => {
    test('Returns the correct length of non-omitted port calls', () => {
        const length = getPortCallsLength(mockPortDetail);
        expect(length).toBe(3);
    });
});

describe('getPortsDetails', () => {
    test('Returns ports details as a Map', () => {
        const portsMap = getPortsDetails(mockSchedules);
        expect(portsMap.size).toBe(3);
        expect(portsMap.get('BEANR')).toBeDefined();
        expect(portsMap.get('MACAS')).toBeDefined();
        expect(portsMap.get('ITSAL')).toBeDefined();
    });
});

describe('evalExtremeValues', () => {
    test('Returns top and bottom values', () => {
        const limit = 2;
        const {top, bottom} = evalExtremeValues(portsMapMock, limit);
        expect(top).toEqual([4, 3]);
        expect(bottom).toEqual([1, 3]);
    });
});
