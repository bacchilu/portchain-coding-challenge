import {render, screen} from '@testing-library/react';
import React from 'react';

import {Percentiles} from '.';
import {PortDetail} from '../../types';
import {evalPercentiles} from './utils';

const mockPortDetail = {
    name: 'Antwerpen',
    portCalls: [
        {arrival: new Date(2019, 0, 12, 3, 43, 0), departure: new Date(2019, 0, 12, 20, 48, 0), isOmitted: false},
        {arrival: new Date(2019, 2, 13, 15, 12, 0), departure: new Date(2019, 2, 15, 9, 6, 0), isOmitted: false},
        {arrival: new Date(2019, 4, 22, 6, 0, 0), departure: new Date(2019, 4, 23, 11, 0, 0), isOmitted: false},
    ],
} as PortDetail;

const emptyPortDetail = {
    name: 'TEST',
    portCalls: [{arrival: new Date(2023, 0, 1, 8, 0, 0), departure: new Date(2023, 0, 1, 12, 0, 0), isOmitted: true}],
} as PortDetail;

describe('Percentiles Component', () => {
    test('Renders percentiles correctly when data is available', () => {
        render(<Percentiles portDetail={mockPortDetail} />);

        expect(screen.getByText('5°')).toBeInTheDocument();
        expect(screen.getByText('20°')).toBeInTheDocument();
        expect(screen.getByText('50°')).toBeInTheDocument();
        expect(screen.getByText('75°')).toBeInTheDocument();
        expect(screen.getByText('90°')).toBeInTheDocument();

        const element = screen.getByText('5°');
        expect(element.nextElementSibling).toBeTruthy();
        expect(element.nextElementSibling!.tagName).toBe('EM');
    });

    test('Does not render when data is unavailable', () => {
        render(<Percentiles portDetail={emptyPortDetail} />);

        expect(screen.queryByText('5°')).not.toBeInTheDocument();
        expect(screen.queryByText('20°')).not.toBeInTheDocument();
        expect(screen.queryByText('50°')).not.toBeInTheDocument();
        expect(screen.queryByText('75°')).not.toBeInTheDocument();
        expect(screen.queryByText('90°')).not.toBeInTheDocument();
    });
});

describe('evalPercentiles Function', () => {
    test('Returns null when there are no valid port calls', () => {
        const result = evalPercentiles(emptyPortDetail);
        expect(result).toBeNull();
    });

    test('Returns null when there are no port calls', () => {
        const result = evalPercentiles({name: 'TEST', portCalls: []} as PortDetail);
        expect(result).toBeNull();
    });

    test('Calculates percentiles correctly when valid port calls are available', () => {
        const result = evalPercentiles(mockPortDetail);

        expect(result).toEqual({
            p_05: 46485000,
            p_20: 65790000,
            p_50: 104400000,
            p_75: 139230000,
            p_90: 150840000,
        });
    });
});
