import React, {useState} from 'react';

const InputFields: React.FC = () => {
    const [ firstArtist, setfirstArtist] = useState<string>('');
    const [ secondArtist, setsecondArtist] = useState<string>('');
    
    const handleSearch = () => {
        //Just prints to the console for now
        console.log(`Artist 1: ${firstArtist}`);
        console.log(`Artist 2: ${secondArtist}`);
    };
    
    return (
    <div className="flex justify-center space-x-4 mt-6">
        <input
            type="text"
            value={firstArtist}
            onChange={(e) => setfirstArtist(e.target.value)}
            placeholder="Kanye West"
            className="border rounded px-4 py-2 w-full max-w-xs"
        />
        <input
            type="text"
            value={secondArtist}
            onChange={(e) => setsecondArtist(e.target.value)}
            placeholder="Taylor Swift"
            className="border rounded px-4 py-2 w-full max-w-xs"
        />
        <button
            onClick={handleSearch}
            className='bg-blue-600 text-white px-6 py-2 rounded'> 
            Create
        </button>
    </div>
    );
};
export default InputFields;
