import React, { useState } from 'react';
import ResultsGrid from './ResultGrid';

interface InputFieldsProps {
    activeTab: string;
}

const InputFields: React.FC<InputFieldsProps> = ({ activeTab }) => {
    const [input1, setInput1] = useState('');
    const [input2, setInput2] = useState('');
    const [songs, setSongs] = useState<{ song: string; artist: string }[]>([]);
    const [error, setError] = useState('');

    const handleSubmit = async () => {
        setError('');
        try {
            const response = await fetch('/api/recommended-songs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ type: activeTab, input1, input2 }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(
                    errorData.error || 'Failed to fetch recommendations',
                );
            }

            const data = await response.json();
            console.log('Raw songs data:', data.songs);
            // Format the songs to extract song title and artist
            try {
                const cleanedData = data.songs
                    .join('\n') // Join lines into a single string
                    .replace(/```json|```/g, '') // Remove Markdown code block indicators
                    .trim(); // Remove any leading or trailing whitespace

                console.log('Cleaned songs data:', cleanedData);

                const parsedData = JSON.parse(cleanedData);

                const formattedSongs = parsedData.playlist.map((item: any) => ({
                    song: item.song,
                    artist: item.artist,
                }));

                setSongs(formattedSongs || []);
            } catch (err) {
                console.error('Failed to parse songs:', err);
                setError('Failed to format the song data. Please try again.');
            }
        } catch (err: any) {
            console.error('Error:', err);
            setError(err.message);
        }
    };

    return (
        <div className="flex flex-col items-center space-y-4 mt-6">
            <div className="flex space-x-4">
                <input
                    type="text"
                    value={input1}
                    onChange={e => setInput1(e.target.value)}
                    placeholder={
                        activeTab === 'Artist to Artist'
                        ? 'Artist 1'
                        : activeTab === 'Song to Song'
                        ? 'Song 1'
                        : activeTab === 'Based on Mood'
                        ? 'Mood 1 (e.g., Relaxing)'
                        : 'Genre (e.g., Pop)'
                    }
                    className="border rounded px-4 py-2 w-full max-w-xs"
                />
                <input
                    type="text"
                    value={input2}
                    onChange={e => setInput2(e.target.value)}
                    placeholder={
                        activeTab === 'Artist to Artist'
                        ? 'Artist 2' 
                        : activeTab === 'Song to Song'
                        ? 'Song 2' 
                        : activeTab === 'Based on Mood'
                        ? 'Mood 2 (e.g., Stressed)' 
                        : 'Instrument (e.g, violin)'
                    }
                    className="border rounded px-4 py-2 w-full max-w-xs"
                />
            </div>
            <button
                onClick={handleSubmit}
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                Send
            </button>

            {error && <div className="text-red-500 mt-4">{error}</div>}

            {/* Pass the songs array to ResultsGrid */}
            <ResultsGrid results={songs} />
        </div>
    );
};

export default InputFields;
