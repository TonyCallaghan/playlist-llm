import React, { useState } from 'react';

const tabOptions = [
    'Artist to Artist',
    'Song to Song',
    'Based on Mood',
    'Genre | Instrument',
];

interface TabsProps {
    setActiveTab: (tab: string) => void;
}

const Tabs: React.FC<TabsProps> = ({ setActiveTab }) => {
    const [activeTab, setTab] = useState(tabOptions[0]);
    const handleTabClick = (tab: string) => {
        setTab(tab);
        setActiveTab(tab);
    };
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
                    onClick={() => handleTabClick(tab)}
                >
                    {tab}
                </button>
            ))}
        </div>
    );
};

export default Tabs;
