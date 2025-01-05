// components/ResultOptions.tsx

import React from 'react';
import { FaRedo, FaShareAlt } from 'react-icons/fa';
import { SiSpotify } from 'react-icons/si';

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
            <div className="flex justify-center items-center space-x-4">
                {/* Reset Button */}
                <button
                    onClick={handleResetTokens}
                    className="flex justify-center items-center w-12 h-12 bg-[#212121] text-white rounded-md hover:text-[#6d5dfc]"
                    aria-label="Reset Tokens"
                >
                    <FaRedo size={20} />
                </button>
    
                {/* Spotify Button */}
                <button
                    onClick={openPlaylist}
                    className="flex justify-center items-center w-40 h-12 bg-[#212121] text-white rounded-md hover:text-[#6d5dfc]"
                >
                    <SiSpotify size={24} className="mr-2" />
                    Spotify
                </button>
    
                {/* Share Button */}
                <button
                    onClick={openPlaylist}
                    className="flex justify-center items-center w-12 h-12 bg-[#212121] text-white rounded-md hover:text-[#6d5dfc]"
                    aria-label="Share Playlist"
                >
                    <FaShareAlt size={20} />
                </button>
            </div>
        </div>
    );
};

export default ResultOptions;
