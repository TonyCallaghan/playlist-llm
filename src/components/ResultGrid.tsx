import React from 'react';

const ResultsGrid: React.FC = () => {
  const results = Array(20).fill({
    song: 'Song Title',
    artist: 'Artist Name',
    imageUrl: '/images/placeholder.png',
  });

  return (
    <div className="p-4">
      <div className="grid grid-flow-row auto-rows-fr grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6">
        {results.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center h-full"
          >
            <div className="flex-grow flex flex-col items-center justify-between">
              <img
                src={item.imageUrl}
                alt={item.song}
                className="w-full h-32 object-cover rounded"
              />
              <h3 className="mt-2 truncate">{item.song}</h3>
              <p className="text-gray-600 truncate">{item.artist}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultsGrid;
