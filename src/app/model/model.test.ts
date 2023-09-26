import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';

import {Model, ScheduleReturned} from '.';
import {Port, PortCall, Schedule, Vessel} from '../types';

const mockAxios = new AxiosMockAdapter(axios);

describe('Model API', () => {
    afterEach(() => {
        mockAxios.reset();
    });

    test('Should fetch vessels successfully', async () => {
        const mockVessels = [
            {imo: 9303807, name: 'ABIDJAN EXPRESS'} as Vessel,
            {imo: 9314935, name: 'AS CAROLINA'} as Vessel,
        ];
        mockAxios.onGet('https://import-coding-challenge-api.portchain.com/api/v2/vessels').reply(200, mockVessels);

        const vessels = await Model.getVessels();
        expect(vessels).toEqual(mockVessels);
    });

    test('Should handle errors when fetching vessels', async () => {
        mockAxios
            .onGet('https://import-coding-challenge-api.portchain.com/api/v2/vessels')
            .reply(500, 'Internal Server Error');

        try {
            await Model.getVessels();
        } catch (error) {
            expect(error).toEqual('Request failed with status code 500');
        }
    });

    test('Should fetch schedules successfully', async () => {
        const imo = 9303807;
        const mockSchedule = {
            portCalls: [
                {
                    port: {id: 'BEANR', name: 'Antwerpen'} as Port,
                    arrival: '2019-01-12T03:42:00+00:00',
                    departure: '2019-01-12T20:48:00+00:00',
                    isOmitted: false,
                },
            ],
        } as ScheduleReturned;
        mockAxios
            .onGet(`https://import-coding-challenge-api.portchain.com/api/v2/schedule/${imo}`)
            .reply(200, JSON.stringify(mockSchedule));

        const schedules = await Model.getSchedules(imo);
        expect(schedules).toEqual([
            {
                port: {id: 'BEANR', name: 'Antwerpen'} as Port,
                arrival: new Date('2019-01-12T03:42:00+00:00'),
                departure: new Date('2019-01-12T20:48:00+00:00'),
                isOmitted: false,
            } as PortCall,
        ] as Schedule);
    });

    test('Should handle errors when fetching schedules', async () => {
        const imo = 123456;
        mockAxios
            .onGet(`https://import-coding-challenge-api.portchain.com/api/v2/schedule/${imo}`)
            .reply(404, 'Not Found');

        try {
            await Model.getSchedules(imo);
        } catch (error) {
            expect(error).toEqual(`Unexpected token 'N', "Not Found" is not valid JSON`);
        }
    });
});
