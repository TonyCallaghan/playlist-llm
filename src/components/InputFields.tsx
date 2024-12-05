import React, { useState } from 'react';
import searchSpotifyTracks from '@/pages/api/spotify';

const InputFields: React.FC = () => {
    const [artist1, setArtist1] = useState('');
    const [artist2, setArtist2] = useState('');
    const [songs, setSongs] = useState<string[]>([]);
    const [error, setError] = useState('');

    const handleLogin = async () => {
        const clientID = '2e998fe1e57848b8a0a003bbe111595a'; //remove!
        const redirectUri = 'http://localhost:3000/callback'; //This will need to be changed when live
        const scopes = ['user-read-private', 'playlist-modify-public'];
        const authUrl = `https://accounts.spotify.com/authorize?response_type=token&client_id=${clientID}&scope=${encodeURIComponent(scopes.join(' '))}&redirect_uri=${encodeURIComponent(redirectUri)}`;
        window.location.href = authUrl;
    };

    const handleSubmit = async () => {
        setError('');
        try {
            const response = await fetch('/api/recommended-songs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ artist1, artist2 }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(
                    errorData.error || 'Failed to fetch recommendations',
                );
            }

            const data = await response.json();
            setSongs(data.songs || []);
        } catch (err: any) {
            console.error('Error:', err);
            setError(err.message);
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
            //Expired or no token
            handleLogin();
        } else {
            // Create the playlist array
            const response = {
                playlist: [
                    { song: 'Shape of You', artist: 'Ed Sheeran' },
                    { song: 'Blinding Lights', artist: 'The Weeknd' },
                    { song: 'Bad Guy', artist: 'Billie Eilish' },
                ],
            };
            searchSpotifyTracks(response.playlist);
            handleSubmit(); //GPT API
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
            >
                Send
            </button>

            {error && <div className="text-red-500 mt-4">{error}</div>}

            <ul className="list-disc mt-4">
                {songs.map((song, index) => (
                    <li key={index}>{song}</li>
                ))}
            </ul>
        </div>
    );
};

export default InputFields;
