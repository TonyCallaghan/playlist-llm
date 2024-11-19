import type { NextApiRequest, NextApiResponse } from 'next';
import { OpenAI } from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { artist1, artist2 } = req.body;

    if (!artist1 || !artist2) {
        return res.status(400).json({ error: 'Both artist1 and artist2 are required.' });
    }

    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-4o',
            messages: [
                {
                    role: 'user',
                    content: `You are a music recommendation engine.
                    I'll provide 2 artists potentially from different genres, your task is to generate a playlist connecting these artists through a progression of songs.
                    Each song in the playlist should represent a logical bridge between the styles of genres of the two artists.
                    The connection can be based on elements such as similar sounds, collaborations, influences, or any other meaningful link.
                    The first song must be artist 1, the last song should be artist 2 and you should bridge the gap.
                    Don't include an artist more than twice.
                    Based on the following two artists: 
                    1. ${artist1}
                    2. ${artist2}
                    
                    Provide 10 songs. 
                    
                    For each song, include:
                    - The song's name
                    - The artist's name
                    
                    Format the response as JSON with the following structure:
                    {
                        "playlist": [
                            {
                                "song": "Song Name",
                                "artist": "Artist Name"
                            },
                        ...
                        ]
                    }`,
                },
            ],
            max_tokens: 1000,
            temperature: 0.1,
            top_p: 0.1
        });

        console.log('OpenAI Response:', response);

        const songs = response.choices[0]?.message?.content?.split('\n');
        
        console.log('OpenAI Actual Response*******************:', songs);

        res.status(200).json({ songs });
    } catch (error: any) {
        console.error('Error calling OpenAI API:', error);
        res.status(500).json({ error: 'Failed to generate song recommendations.' });
    }
}
