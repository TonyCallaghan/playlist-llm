import React, { useState } from 'react';

const tabOptions = [
    'Artist to Artist',
    'Song to Song',
    'Based on Mood',
    'Genre | Instrument',
    'Genre | BPM',
];

const Tabs: React.FC = () => {
    const [activeTab, setActiveTab] = useState(tabOptions[0]);

    return (
        <div className="flex justify-center space-x-2 overflow-auto">
            {tabOptions.map(tab => (
                <button
                    key={tab}
                    className={`px-4 py-2 rounded ${
                        activeTab === tab
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-200 text-gray-700'
                    }`}
                    onClick={() => setActiveTab(tab)}
                >
                    {tab}
                </button>
            ))}
        </div>
    );
};

export default Tabs;
