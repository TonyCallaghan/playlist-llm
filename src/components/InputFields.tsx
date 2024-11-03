import React from 'react';

const InputFields: React.FC = () => (
    <div className="flex justify-center space-x-4 mt-6">
        <input
            type="text"
            placeholder="Kanye West"
            className="border rounded px-4 py-2 w-full max-w-xs"
        />
        <input
            type="text"
            placeholder="Taylor Swift"
            className="border rounded px-4 py-2 w-full max-w-xs"
        />
    </div>
);

export default InputFields;
