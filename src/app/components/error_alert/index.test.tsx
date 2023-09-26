import {render, screen} from '@testing-library/react';
import React from 'react';

import {ErrorAlert} from '.';

describe('ErrorAlert Component', () => {
    test('Renders with the provided message', () => {
        const errorMessage = 'An error occurred!';
        render(<ErrorAlert msg={errorMessage} />);

        const errorText = screen.getByText('An error occurred!');
        expect(errorText).toBeInTheDocument();
    });

    test('Renders with the "alert-danger" class', () => {
        const errorMessage = 'An error occurred!';
        render(<ErrorAlert msg={errorMessage} />);

        const errorAlertDiv = screen.getByRole('alert');
        expect(errorAlertDiv).toHaveClass('alert-danger');
    });

    test('Renders the hr element', () => {
        const errorMessage = 'An error occurred!';
        render(<ErrorAlert msg={errorMessage} />);

        const hrElement = screen.getByRole('separator');
        expect(hrElement).toBeInTheDocument();
    });
});
