// // Basic test for CICD
// import { render, screen } from '@testing-library/react';
// import '@testing-library/jest-dom';
// import Header from '../components/Header';

// describe('Header', () => {
//     test('renders the word "Playlist"', () => {
//         render(<Header />);
//         const regex = /Playlist/i;
//         const playlistElement = screen.getAllByText(regex);
//         expect(playlistElement.length).toBeGreaterThan(0);
//     });
// });

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Header from '../components/Header';

describe('Header', () => {
    it('renders a heading with the correct text', () => {
        render(<Header />);

        // Find the heading element (h1) and check its text content
        const heading = screen.getByRole('heading', { level: 1 });
        expect(heading).toBeInTheDocument();
        expect(heading).toHaveTextContent('PLAYLIST');
    });
});
