import React, { useState } from 'react';
import ResultsGrid from './ResultGrid';
import ResultOptions from './ResultOptions';
import '../styles/InputFields.css';

const InputFields: React.FC = () => {
    const [activeTab, setActiveTab] = useState('Mood'); // Default tab is 'Mood'
    const [artist1, setArtist1] = useState('');
    const [artist2, setArtist2] = useState('');
    const [song1, setSong1] = useState('');
    const [song2, setSong2] = useState('');
    const [mood, setMood] = useState('');
    const [genre, setGenre] = useState('');
    const [instrument, setInstrument] = useState('');
    const [bpm, setBpm] = useState('low');
    const [songs, setSongs] = useState<
        { song: string; artist: string; imageUrl?: string }[]
    >([]);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async () => {
        const clientID =
            process.env.CLIENT_ID || '2e998fe1e57848b8a0a003bbe111595a'; // Secure this
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
                body: JSON.stringify({
                    artist1,
                    artist2,
                    song1,
                    song2,
                    mood,
                    genre,
                    instrument,
                    bpm,
                    token,
                    userId,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(
                    errorData.error || 'Failed to fetch recommendations',
                );
            }

            const data = await response.json();
            console.log('Final Playlist Data:', data.playlist);

            // Store the playlist ID in localStorage for ResultOptions.tsx
            if (data.playlist && data.playlist.playlistId) {
                localStorage.setItem(
                    'SpotifyPlaylistId',
                    data.playlist.playlistId,
                );
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
        <div className="flex flex-col items-center space-y-4 mt-4 Input-fields">
            {/* *** Tabs *** */}
            {/* Artist to Artist */}
            <div className="segmented-control">
                <input
                    type="radio"
                    id="tab-1"
                    name="tabs"
                    checked={activeTab === 'Artist to Artist'}
                    onChange={() => setActiveTab('Artist to Artist')}
                />
                <label htmlFor="tab-1">Artist to Artist</label>

                {/* Song to Song */}
                <input
                    type="radio"
                    id="tab-2"
                    name="tabs"
                    checked={activeTab === 'Song to Song'}
                    onChange={() => setActiveTab('Song to Song')}
                />
                <label htmlFor="tab-2">Song to Song</label>

                {/* Based on Mood */}
                <input
                    type="radio"
                    id="tab-3"
                    name="tabs"
                    checked={activeTab === 'Mood'}
                    onChange={() => setActiveTab('Mood')}
                />
                <label htmlFor="tab-3">Mood</label>

                {/* Instrument */}
                <input
                    type="radio"
                    id="tab-4"
                    name="tabs"
                    checked={activeTab === 'Instrument'}
                    onChange={() => setActiveTab('Instrument')}
                />
                <label htmlFor="tab-4">Instrument</label>

                {/* Genre with BPM  */}
                <input
                    type="radio"
                    id="tab-5"
                    name="tabs"
                    checked={activeTab === 'Genre | BPM'}
                    onChange={() => setActiveTab('Genre | BPM')}
                />
                <label htmlFor="tab-5">Genre | BPM</label>

                <div className="segmented-control__indicator" />
            </div>

            <br></br>

            {/* Artist to Artist | input & Placeholders */}
            {activeTab === 'Artist to Artist' && (
                <div className="flex space-x-4 inputs">
                    <input
                        type="text"
                        value={artist1}
                        onChange={e => setArtist1(e.target.value)}
                        placeholder="Kanye West"
                        maxLength={20}
                        className="border rounded px-4 py-2 w-full max-w-xs"
                    />
                    <input
                        type="text"
                        value={artist2}
                        onChange={e => setArtist2(e.target.value)}
                        placeholder="Taylor Swift"
                        maxLength={20}
                        className="border rounded px-4 py-2 w-full max-w-xs"
                    />
                </div>
            )}

            {/* Song to Song | input & Placeholders */}
            {activeTab === 'Song to Song' && (
                <div className="flex space-x-4 inputs">
                    <input
                        type="text"
                        value={song1}
                        onChange={e => setSong1(e.target.value)}
                        placeholder="Stairway to Heaven"
                        maxLength={25}
                        className="border rounded px-4 py-2 w-full max-w-xs"
                    />
                    <input
                        type="text"
                        value={song2}
                        onChange={e => setSong2(e.target.value)}
                        placeholder="I Need a Dollar"
                        maxLength={25}
                        className="border rounded px-4 py-2 w-full max-w-xs"
                    />
                </div>
            )}

            {/* Mood | input & Placeholders */}
            {activeTab === 'Mood' && (
                <div className="flex space-x-4 inputs">
                    <input
                        type="text"
                        value={mood}
                        onChange={e => setMood(e.target.value)}
                        placeholder="We'll create a playlist based on how you feel.."
                        maxLength={45}
                        className="border rounded px-4 py-2 w-[500px]"
                    />
                </div>
            )}

            {/* Instrument | input & Placeholders */}
            {activeTab === 'Instrument' && (
                <div className="flex space-x-4 inputs">
                    <input
                        type="text"
                        value={genre}
                        onChange={e => setGenre(e.target.value)}
                        placeholder="Genre | Artist | Any"
                        maxLength={15}
                        className="border rounded px-4 py-2 w-full max-w-xs"
                    />

                    {/* Instrument Dropdown */}
                    <select
                        value={instrument}
                        onChange={e => setInstrument(e.target.value)}
                        className="border rounded px-4 py-2 w-full max-w-xs"
                    >
                        <option value="violin">Violin</option>
                        <option value="guitar">Guitar</option>
                        <option value="piano">Piano</option>
                        <option value="drums">Drums</option>
                        <option value="bass">Bass</option>
                        <option value="saxophone">Saxophone</option>
                        <option value="trumpet">Trumpet</option>
                        <option value="flute">Flute</option>
                        <option value="cello">Cello</option>
                        <option value="clarinet">Clarinet</option>
                        <option value="keyboard">Keyboard</option>
                        <option value="harmonica">Harmonica</option>
                        <option value="ukulele">Ukulele</option>
                        <option value="banjo">Banjo</option>
                        <option value="accordion">Accordion</option>
                        <option value="harp">Harp</option>
                        <option value="mandolin">Mandolin</option>
                        <option value="trombone">Trombone</option>
                        <option value="oboe">Oboe</option>
                        <option value="tambourine">Tambourine</option>
                        <option value="bassoon">Bassoon</option>
                        <option value="synthesizer">Synthesizer</option>
                        <option value="marimba">Marimba</option>
                        <option value="congas">Congas</option>
                        <option value="xylophone">Xylophone</option>
                    </select>
                </div>
            )}

            {/* Genre & BPM | input & Placeholders */}
            {activeTab === 'Genre | BPM' && (
                <div className="flex space-x-4 inputs">
                    {/* Genre Dropdown */}
                    <select
                        value={genre}
                        onChange={e => setGenre(e.target.value)}
                        className="border rounded px-4 py-2 w-full max-w-xs"
                    >
                        <option value="">Genre</option>
                        <option value="pop">Pop</option>
                        <option value="rock">Rock</option>
                        <option value="jazz">Jazz</option>
                        <option value="classical">Classical</option>
                        <option value="hip-hop">Hip-Hop</option>
                        <option value="electronic">Electronic</option>
                        <option value="country">Country</option>
                        <option value="reggae">Reggae</option>
                        <option value="blues">Blues</option>
                        <option value="folk">Folk</option>
                        <option value="metal">Metal</option>
                        <option value="punk">Punk</option>
                        <option value="soul">Soul</option>
                        <option value="rnb">R&B</option>
                        <option value="latin">Latin</option>
                        <option value="funk">Funk</option>
                        <option value="gospel">Gospel</option>
                        <option value="disco">Disco</option>
                        <option value="techno">Techno</option>
                        <option value="house">House</option>
                        <option value="indie">Indie</option>
                        <option value="grunge">Grunge</option>
                        <option value="trap">Trap</option>
                        <option value="ska">Ska</option>
                        <option value="ambient">Ambient</option>
                    </select>
                    <select
                        value={bpm}
                        onChange={e => setBpm(e.target.value)}
                        className="border rounded px-4 py-2 w-full max-w-xs"
                    >
                        <option value="low">Low</option>
                        <option value="mid">Mid</option>
                        <option value="high">High</option>
                    </select>
                </div>
            )}

            <br></br>

            {/* Submit Button */}
            <button
                onClick={handleClick}
                className="px-4 py-2 rounded send-button"
                disabled={isLoading}
            >
                {isLoading ? 'Processing...' : 'Create Playlist'}
            </button>

            {error && <div className="error">{error}</div>}

            {/* ResultOptions + ResultsGrid added after input has been processed */}
            {songs.length > 0 && <ResultOptions setSongs={setSongs} />}

            {/* Pass the songs array to ResultsGrid*/}
            <ResultsGrid results={songs} />

            <br></br>
        </div>
    );
};

export default InputFields;
