import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ResultsGrid from '../components/ResultGrid';

describe('ResultsGrid Component', () => {
    it('renders a message when there are no results', () => {
        render(<ResultsGrid results={[]} />);

        expect(
            screen.getByText('Create a playlist to see results here.'),
        ).toBeInTheDocument();
    });

    it('renders results when provided', () => {
        const mockResults = [
            {
                song: 'Bohemian Rhapsody',
                artist: 'Queen',
                imageUrl: 'https://example.com/bohemian.jpg',
            },
            {
                song: 'Stairway to Heaven',
                artist: 'Led Zeppelin',
                imageUrl: 'https://example.com/stairway.jpg',
            },
        ];

        render(<ResultsGrid results={mockResults} />);

        // Check for song titles
        expect(screen.getByText('Bohemian Rhapsody')).toBeInTheDocument();
        expect(screen.getByText('Stairway to Heaven')).toBeInTheDocument();

        // Check for artist names
        expect(screen.getByText('Queen')).toBeInTheDocument();
        expect(screen.getByText('Led Zeppelin')).toBeInTheDocument();
    });

    it('renders placeholder image when no imageUrl is provided', () => {
        const mockResults = [
            {
                song: 'No Image Song',
                artist: 'Unknown Artist',
                imageUrl: undefined, // No image
            },
        ];

        render(<ResultsGrid results={mockResults} />);

        const placeholderImage = screen.getByAltText('No Image Song');
        expect(placeholderImage).toBeInTheDocument(); // Verifies the image exists
    });

    it('truncates long song titles correctly', () => {
        const mockResults = [
            {
                song: 'This is a very long song title that should be truncated',
                artist: 'Some Artist',
                imageUrl: 'https://example.com/longtitle.jpg',
            },
        ];

        render(<ResultsGrid results={mockResults} />);

        const truncatedTitle = screen.getByText('This is a very long so...');
        expect(truncatedTitle).toBeInTheDocument();
    });
});
