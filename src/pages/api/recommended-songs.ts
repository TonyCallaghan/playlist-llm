import type { NextApiRequest, NextApiResponse } from 'next';
import { OpenAI } from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { type, input1, input2 } = req.body;

    if (!input1 || !input2) { 
        return res.status(400).json({ error: 'Required inputs are missing.' }); // **CHANGED**
    }
    let prompt = '';

    if (type === 'Artist to Artist') {
        prompt = `You are a music recommendation engine.
                    I'll provide 2 artists potentially from different genres, your task is to generate a playlist connecting these artists through a progression of songs.
                    Each song in the playlist should represent a logical bridge between the styles of genres of the two artists.
                    The connection can be based on elements such as similar sounds, collaborations, influences, or any other meaningful link.
                    The first song must be artist 1, the last song should be artist 2 and you should bridge the gap.
                    Don't include an artist more than twice.
                    Based on the following two artists: 
                    1. ${input1}
                    2. ${input2}
                    
                    Provide 20 songs. 
                    
                    For each song, include:
                    - The song's name
                    - The artist's name
                    
                    `;
    } 
    else if (type === 'Song to Song') {
        prompt = `You are a music recommendation engine.
                    I'll provide 2 songs potentially from different genres, your task is to generate a playlist connecting these songs through a progression of songs.
                    Each song in the playlist should represent a logical bridge between the styles of genres of the two artists.
                    The connection can be based on elements such as similar sounds, collaborations, influences, or any other meaningful link.
                    The first song must be song 1, the last song should be song 2 and you should bridge the gap.
                    Don't include an artist more than twice.
                    Based on the following two songs: 
                    1. ${input1}
                    2. ${input2}
                    
                    Provide 20 songs. 
                    
                    For each song, include:
                    - The song's name
                    - The artist's name
                    
                    `;
    } 
    else if (type === 'Based on Mood') {
        prompt = `You are a music recommendation engine.
                    I'll provide 2 moods, your task is to generate a playlist connecting these moods through a progression of songs.
                    Each song in the playlist should represent a logical bridge between the two moods.
                    The playlist should start with songs matching the mood "${input1}" and gradually transition to songs that represent the mood "${input2}". 
                    Don't include an artist more than twice.
                    Based on the following two moods: 
                    1. ${input1}
                    2. ${input2}
                    
                    Provide 20 songs. 
                    
                    For each song, include:
                    - The song's name
                    - The artist's name`;
    }
    else if (type === 'Genre | Instrument') {
        prompt = `You are a music recommendation engine.
                  Generate a playlist of 20 songs that belong to the "${input1}" genre and feature the "${input2}" instrument throughout the song.
                  For each song, include:
                  - The song's name
                  - The artist's name.`;
    }    
    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'user',
                    content: `${prompt}. Format the response as JSON with the following structure:
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
            top_p: 0.1,
        });

        console.log('OpenAI Response:', response);

        const songs = response.choices[0]?.message?.content?.split('\n');

        console.log('OpenAI Actual Response*******************:', songs);

        res.status(200).json({ songs });
    } catch (error: any) {
        console.error('Error calling OpenAI API:', error);
        res.status(500).json({
            error: 'Failed to generate song recommendations.',
        });
    }
}
