// components/InputFields.tsx

import React, { useState } from 'react';
import ResultsGrid from './ResultGrid';
import ResultOptions from './ResultOptions'; // Ensure you import ResultOptions

const InputFields: React.FC = () => {
    const [artist1, setArtist1] = useState('');
    const [artist2, setArtist2] = useState('');
    const [songs, setSongs] = useState<{ song: string; artist: string; imageUrl?: string }[]>([]);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async () => {
        const clientID = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID || '2e998fe1e57848b8a0a003bbe111595a'; // Secure this
        const redirectUri = 'http://localhost:3000/callback'; // Update for production
        const scopes = ['user-read-private', 'playlist-modify-public'];
        const authUrl = `https://accounts.spotify.com/authorize?response_type=token&client_id=${clientID}&scope=${encodeURIComponent(scopes.join(' '))}&redirect_uri=${encodeURIComponent(redirectUri)}`;
        window.open(authUrl, '_blank', 'width=500,height=500');
    };

    const handleSubmit = async () => {
        setError('');
        setIsLoading(true);
        try {
            const token = localStorage.getItem('spotifyAuthToken');
            const userId = localStorage.getItem('spotifyUserId');

            if (!token || !userId) {
                throw new Error('Spotify authentication required.');
            }

            const response = await fetch('/api/recommended-songs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ artist1, artist2, token, userId }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to fetch recommendations');
            }

            const data = await response.json();
            console.log('Final Playlist Data:', data.playlist);

            // Store the playlist ID in localStorage for ResultOptions.tsx
            if (data.playlist && data.playlist.playlistId) {
                localStorage.setItem('SpotifyPlaylistId', data.playlist.playlistId);
            }

            // Update songs with the detailed track information
            setSongs(data.playlist.tracks || []);
        } catch (err: any) {
            console.error('Error:', err);
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleClick = () => {
        const currentTime = Date.now();
        const tokenExpiration = localStorage.getItem('spotifyTokenExpiration');
        const token = localStorage.getItem('spotifyAuthToken');

        if (
            !token ||
            !tokenExpiration ||
            currentTime >= parseInt(tokenExpiration)
        ) {
            // Expired or no token
            handleLogin();
        } else {
            handleSubmit(); // Fetch recommendations and create Spotify playlist
        }
    };

    return (
        <div className="flex flex-col items-center space-y-4 mt-6">
            <div className="flex space-x-4">
                <input
                    type="text"
                    value={artist1}
                    onChange={e => setArtist1(e.target.value)}
                    placeholder="Kanye West"
                    className="border rounded px-4 py-2 w-full max-w-xs"
                />
                <input
                    type="text"
                    value={artist2}
                    onChange={e => setArtist2(e.target.value)}
                    placeholder="Taylor Swift"
                    className="border rounded px-4 py-2 w-full max-w-xs"
                />
            </div>
            <button
                onClick={handleClick}
                className="bg-blue-500 text-white px-4 py-2 rounded"
                disabled={isLoading}
            >
                {isLoading ? 'Processing...' : 'Send'}
            </button>

            {error && <div className="text-red-500 mt-4">{error}</div>}

            {/* Pass the songs array to ResultsGrid */}
            <ResultsGrid results={songs} />

            {/* Include ResultOptions component */}
            {songs.length > 0 && <ResultOptions />}
        </div>
    );
};

export default InputFields;
