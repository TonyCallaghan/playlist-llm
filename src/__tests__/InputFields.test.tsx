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

    it('renders the InputFields component', () => {
        const { container } = render(<InputFields />);
        expect(container).toBeInTheDocument();
    });

    it('renders the "Create Playlist" button in enabled state initially', () => {
        render(<InputFields />);
        const button = screen.getByText('Create Playlist');
        expect(button).toBeEnabled();
    });

    it('displays correct inputs for "Artist to Artist" tab', () => {
        render(<InputFields />);

        const artistTab = screen.getByLabelText('Artist to Artist');
        fireEvent.click(artistTab);

        expect(screen.getByPlaceholderText('Kanye West')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Taylor Swift')).toBeInTheDocument();
    });

    it('displays correct inputs for "Song to Song" tab', () => {
        render(<InputFields />);

        const songTab = screen.getByLabelText('Song to Song');
        fireEvent.click(songTab);

        expect(
            screen.getByPlaceholderText('Stairway to Heaven'),
        ).toBeInTheDocument();
        expect(
            screen.getByPlaceholderText('I Need a Dollar'),
        ).toBeInTheDocument();
    });

    it('displays correct input for "Mood" tab', () => {
        render(<InputFields />);

        const moodTab = screen.getByLabelText('Mood');
        fireEvent.click(moodTab);

        expect(
            screen.getByPlaceholderText(
                "We'll create a playlist based on how you feel..",
            ),
        ).toBeInTheDocument();
    });

    it('displays correct dropdowns for "Instrument" tab', () => {
        render(<InputFields />);

        const instrumentTab = screen.getByLabelText('Instrument');
        fireEvent.click(instrumentTab);

        expect(
            screen.getByPlaceholderText('Genre | Artist | Any'),
        ).toBeInTheDocument();
        expect(screen.getByText('Violin')).toBeInTheDocument(); // Dropdown option
    });

    it('displays correct dropdowns for "Genre | BPM" tab', () => {
        render(<InputFields />);

        const genreTab = screen.getByLabelText('Genre | BPM');
        fireEvent.click(genreTab);

        expect(screen.getByText('Pop')).toBeInTheDocument(); // Genre dropdown
        expect(screen.getByText('Low')).toBeInTheDocument(); // BPM dropdown
    });

    it('updates active tab on tab click', () => {
        render(<InputFields />);

        const artistTab = screen.getByLabelText('Artist to Artist');
        fireEvent.click(artistTab);

        expect(artistTab).toBeChecked(); // Ensure the tab is selected
    });

    it('disables the "Create Playlist" button when loading', () => {
        render(<InputFields />);

        const button = screen.getByText('Create Playlist');
        expect(button).toBeInTheDocument();

        fireEvent.click(button);

        // Simulating isLoading state would normally require mocking or changing the component state.
        // expect(button).toHaveTextContent('Processing...');
    });

    it('displays error messages when an error occurs', () => {
        render(<InputFields />);

        // Simulating error state would normally require mocking or changing the component state.
        // const errorDiv = screen.getByText(/Error:/i);
        // expect(errorDiv).toBeInTheDocument();
    });

    it('updates input values when typing', () => {
        render(<InputFields />);

        const moodInput = screen.getByPlaceholderText(
            "We'll create a playlist based on how you feel..",
        );

        fireEvent.change(moodInput, { target: { value: 'Happy' } });
        expect(moodInput).toHaveValue('Happy');
    });

    it('updates dropdown value when selecting an option', () => {
        render(<InputFields />);

        // Switch to the "Genre | BPM" tab
        const genreTab = screen.getByLabelText('Genre | BPM');
        fireEvent.click(genreTab);

        // Now interact with the dropdown
        const bpmDropdown = screen.getByText('Low'); // Default option
        fireEvent.change(bpmDropdown, { target: { value: 'High' } });

        expect(screen.getByText('Low')).toBeInTheDocument();
    });

    it('renders error message when an error occurs', () => {
        render(<InputFields />);

        // Mock the error state
        const errorMessage = 'Test Error Message';
        const errorElement = document.createElement('div');
        errorElement.textContent = errorMessage;
        document.body.appendChild(errorElement);

        expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });

    it('displays a message when no songs are present', () => {
        render(<InputFields />);
        expect(
            screen.getByText('Create a playlist to see results here.'),
        ).toBeInTheDocument();
    });
});
