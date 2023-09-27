import {render, screen} from '@testing-library/react';
import React from 'react';

import {Spinner} from '.';

describe('Spinner Component', () => {
    test('Renders with the provided message', () => {
        const loadingMessage = 'Loading...';
        render(<Spinner msg={loadingMessage} />);

        const loadingText = screen.getByText('Loading...');
        expect(loadingText).toBeInTheDocument();
    });

    test('Renders with the "spinner-grow" class', () => {
        const loadingMessage = 'Loading...';
        render(<Spinner msg={loadingMessage} />);

        const spinnerDiv = screen.getByRole('status');
        expect(spinnerDiv).toBeInTheDocument();
    });
});
