// components/ResultOptions.tsx

import React, { useState } from 'react';
import { FaShareAlt } from 'react-icons/fa';
import { SiSpotify } from 'react-icons/si';
import { RiLogoutBoxLine } from 'react-icons/ri';

interface ResultOptionsProps {
    setSongs: React.Dispatch<React.SetStateAction<any[]>>; // Allows reset button to delete all songs
}

const ResultOptions: React.FC<ResultOptionsProps> = ({ setSongs }) => {
    const [showCopiedPopup, setShowCopiedPopup] = useState(false);

    const handleResetTokens = () => {
        localStorage.removeItem('spotifyAuthToken');
        localStorage.removeItem('spotifyTokenExpiration');
        localStorage.removeItem('SpotifyPlaylistId');
        setSongs([]);
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

    const copyPlaylistLink = () => {
        const playlistID = localStorage.getItem('SpotifyPlaylistId');
        console.log('Retrieved Playlist ID:', playlistID);

        if (playlistID) {
            const spotifyLink = `https://open.spotify.com/playlist/${encodeURIComponent(playlistID)}`;
            navigator.clipboard.writeText(spotifyLink).then(() => {
                setShowCopiedPopup(true); // Show the popup
                setTimeout(() => setShowCopiedPopup(false), 5000); // Hide after 5 seconds
            });
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
                    <RiLogoutBoxLine size={24} />
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
                <div className="relative">
                    <button
                        onClick={copyPlaylistLink}
                        className="flex justify-center items-center w-12 h-12 bg-[#212121] text-white rounded-md hover:text-[#6d5dfc]"
                        aria-label="Share Playlist"
                    >
                        <FaShareAlt size={20} />
                    </button>
                    {showCopiedPopup && (
                        <div className="absolute top-[-40px] left-0 bg-black text-white text-sm px-2 py-1 rounded-md shadow-md">
                            Copied link!
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ResultOptions;
