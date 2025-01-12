import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import InputFields from '../components/InputFields';

beforeAll(() => {
    // Mock window.open
    window.open = jest.fn();
});

describe('InputFields Component', () => {
    it('renders all tabs', () => {
        render(<InputFields />);
        expect(screen.getByLabelText('Artist to Artist')).toBeInTheDocument();
        expect(screen.getByLabelText('Song to Song')).toBeInTheDocument();
        expect(screen.getByLabelText('Mood')).toBeInTheDocument();
        expect(screen.getByLabelText('Instrument')).toBeInTheDocument();
        expect(screen.getByLabelText('Genre | BPM')).toBeInTheDocument();
    });

    it('disables the "Create Playlist" button when loading', () => {
        render(<InputFields />);
        const button = screen.getByText('Create Playlist');
        fireEvent.click(button);
        expect(button).toHaveTextContent('Processing...');
    });

    it('displays error messages when an error occurs', () => {
        render(<InputFields />);
        const errorMessage = 'Test Error Message';
        screen.getByText(errorMessage); // Assert the error is displayed
    });
});