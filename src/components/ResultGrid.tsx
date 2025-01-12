import React from 'react';
import Image from 'next/image';
// import { mockResults } from '../__tests__/mockDataFile';
import '../styles/ResultGrid.css';

// Interfaces
interface Song {
    song: string;
    artist: string;
    imageUrl?: string;
}

interface ResultsGridProps {
    results: Song[];
}

const ResultsGrid: React.FC<ResultsGridProps> = ({ results = [] }) => {
    // Use mockResults if results is empty for testing purposes
    // results = results.length > 0 ? results : mockResults;

    // Prompt user to enter something
    if (!results || results.length === 0) {
        return (
            <div className="text-center">
                Create a playlist to see results here.
            </div>
        );
    }

    // Create the results grid -> 5 cols > 3 cols > 2 cols
    return (
        <div className="p-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
                {results.map((item, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center text-center h-full result-item"
                    >
                        <div className="flex-grow flex flex-col items-center justify-between">
                            <Image
                                src={item.imageUrl || '/images/placeholder.png'}
                                alt={item.song}
                                className="object-cover rounded result-artwork"
                                width={200}
                                height={200}
                            />

                            {/* Limit amount of characters to display (25)*/}
                            <h4 className="mt-2 truncate">
                                {item.song.length > 25
                                    ? `${item.song.slice(0, 22)}...`
                                    : item.song}
                            </h4>
                            <p className="text-gray-600 truncate">
                                {item.artist}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ResultsGrid;
