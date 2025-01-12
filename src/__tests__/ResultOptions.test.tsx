import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import ResultOptions from '../components/ResultOptions';

describe('ResultOptions Component', () => {
    let setSongsMock: jest.Mock;

    beforeAll(() => {
        // Mock window.open, navigator.clipboard, and window.alert
        window.open = jest.fn();
        window.alert = jest.fn();
        Object.assign(navigator, {
            clipboard: {
                writeText: jest.fn().mockResolvedValue(undefined),
            },
        });
    });

    beforeEach(() => {
        setSongsMock = jest.fn();
        localStorage.clear(); // Clear localStorage before each test
    });

    it('renders the component with all buttons', () => {
        render(<ResultOptions setSongs={setSongsMock} />);
        expect(screen.getByLabelText('Reset Tokens')).toBeInTheDocument();
        expect(screen.getByText('Spotify')).toBeInTheDocument();
        expect(screen.getByLabelText('Share Playlist')).toBeInTheDocument();
    });

    it('resets tokens and songs when the reset button is clicked', () => {
        render(<ResultOptions setSongs={setSongsMock} />);
        const resetButton = screen.getByLabelText('Reset Tokens');
        fireEvent.click(resetButton);
        expect(localStorage.getItem('spotifyAuthToken')).toBeNull();
        expect(localStorage.getItem('spotifyTokenExpiration')).toBeNull();
        expect(localStorage.getItem('SpotifyPlaylistId')).toBeNull();
        expect(setSongsMock).toHaveBeenCalledWith([]);
    });

    it('opens a Spotify playlist when the Spotify button is clicked', () => {
        localStorage.setItem('SpotifyPlaylistId', 'mockPlaylistID');
        render(<ResultOptions setSongs={setSongsMock} />);
        const spotifyButton = screen.getByText('Spotify');
        fireEvent.click(spotifyButton);
        expect(window.open).toHaveBeenCalledWith(
            'https://open.spotify.com/playlist/mockPlaylistID',
            '_blank'
        );
    });

    it('shows an alert when no playlist is found on Spotify button click', () => {
        render(<ResultOptions setSongs={setSongsMock} />);
        const spotifyButton = screen.getByText('Spotify');
        fireEvent.click(spotifyButton);
        expect(window.alert).toHaveBeenCalledWith(
            'No playlist found. Please create a playlist first.'
        );
    });

    it('copies playlist link to clipboard when the share button is clicked', async () => {
        localStorage.setItem('SpotifyPlaylistId', 'mockPlaylistID');
        render(<ResultOptions setSongs={setSongsMock} />);
        const shareButton = screen.getByLabelText('Share Playlist');
        fireEvent.click(shareButton);
        expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
            'https://open.spotify.com/playlist/mockPlaylistID'
        );
        const copiedPopup = await screen.findByText('Copied link!');
        expect(copiedPopup).toBeInTheDocument();
    });

    it('shows an alert when no playlist is found on share button click', () => {
        render(<ResultOptions setSongs={setSongsMock} />);
        const shareButton = screen.getByLabelText('Share Playlist');
        fireEvent.click(shareButton);
        expect(window.alert).toHaveBeenCalledWith(
            'No playlist found. Please create a playlist first.'
        );
    });
});
