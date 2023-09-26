import {render, screen} from '@testing-library/react';
import React from 'react';

import {StatisticsTable} from '.';
import {mockSchedules} from './schedules_mock';

describe('StatisticsTable Component', () => {
    test('Renders table rows correctly', () => {
        render(<StatisticsTable schedules={mockSchedules} />);

        const table = screen.getByRole('table');
        expect(table).toBeInTheDocument();

        const tableRows = screen.getAllByRole('row') as HTMLTableRowElement[];
        expect(tableRows).toHaveLength(4); // 1 header row + 3 data rows

        expect(tableRows[0].cells[1]).toHaveTextContent('Name');
        expect(tableRows[0].cells[2]).toHaveTextContent('Port Calls');

        expect(tableRows[1].cells[0]).toHaveTextContent('BEANR');
        expect(tableRows[1].cells[1]).toHaveTextContent('Antwerpen');

        expect(tableRows[2].cells[0]).toHaveTextContent('MACAS');

        expect(tableRows[3].cells[0]).toHaveTextContent('ITSAL');
    });
});
