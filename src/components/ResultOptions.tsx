// components/ResultOptions.tsx

import React from 'react';

const ResultOptions: React.FC = () => {
    const handleResetTokens = () => {
        // This is purely for testing, will remove later
        console.log(
            'Spotify AuthToken: ' + localStorage.getItem('spotifyAuthToken'),
        );
        localStorage.removeItem('spotifyAuthToken');
        localStorage.removeItem('spotifyTokenExpiration');
        localStorage.removeItem('SpotifyPlaylistId'); // Remove playlist ID as well
        console.log('Tokens and Playlist ID have been reset!!');
    };

    const openPlaylist = () => {
        const playlistID = localStorage.getItem('SpotifyPlaylistId');
        console.log('Retrieved Playlist ID:', playlistID);

        if (playlistID) {
            const spotifyLink = `https://open.spotify.com/playlist/${encodeURIComponent(playlistID)}`;
            window.open(spotifyLink, '_blank');
        } else {
            alert('No playlist found. Please create a playlist first.');
        }
    };

    return (
        <div className="text-center mt-8">
            <h2 className="text-2xl font-semibold mb-4">Results</h2>
            <div className="flex justify-center space-x-4">
                <button
                    onClick={handleResetTokens}
                    className="bg-orange-600 text-white px-6 py-2 rounded"
                >
                    Reset Tokens
                </button>
                <button
                    onClick={openPlaylist}
                    className="bg-green-600 text-white px-6 py-2 rounded"
                >
                    Open on Spotify
                </button>
            </div>
        </div>
    );
};

export default ResultOptions;
