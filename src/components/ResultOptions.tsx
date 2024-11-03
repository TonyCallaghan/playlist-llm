import React from 'react';

const ResultOptions: React.FC = () => (
    <div className="text-center mt-8">
        <h2 className="text-2xl font-semibold mb-4">Results</h2>
        <div className="flex justify-center space-x-4">
            <button className="bg-blue-600 text-white px-6 py-2 rounded">
                Open on Tidal
            </button>
            <button className="bg-green-600 text-white px-6 py-2 rounded">
                Open on Spotify
            </button>
        </div>
    </div>
);

export default ResultOptions;
