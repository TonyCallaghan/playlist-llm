import React from 'react';
import Image from 'next/image';

interface Song {
    song: string;
    artist: string;
    imageUrl?: string;
}

interface ResultsGridProps {
    results: Song[];
}

const ResultsGrid: React.FC<ResultsGridProps> = ({ results = [] }) => {
    if (!results || results.length === 0) {
        return <div className="text-center">No results found</div>;
    }

    return (
        <div className="p-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
                {results.map((item, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center text-center h-full"
                    >
                        <div className="flex-grow flex flex-col items-center justify-between">
                            <Image
                                src={item.imageUrl || '/images/placeholder.png'}
                                alt={item.song}
                                className="w-full h-32 object-cover rounded"
                                width={50}
                                height={50}
                            />
                            <h3 className="mt-2 truncate">{item.song}</h3>
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
