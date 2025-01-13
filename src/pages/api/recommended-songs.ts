// pages/api/recommended-songs.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { OpenAI } from 'openai';

interface Song {
    song: string;
    artist: string;
}

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

    const {
        activeTab,
        artist1,
        artist2,
        song1,
        song2,
        mood,
        genre,
        instrument,
        bpm,
        token,
        userId,
    } = req.body;

    let prompt = '';

    if (activeTab === 'Artist to Artist') {
        prompt = `You are a music recommendation engine.
                    I'll provide 2 artists potentially from different genres, your task is to generate a playlist (20 songs) connecting these artists through a progression of songs.
                    Each song in the playlist should represent a logical bridge between the styles of genres of the two artists.
                    The connection can be based on elements such as similar sounds, collaborations, influences, or any other meaningful link.
                    The first song must be artist 1, the last song should be artist 2 and you should bridge the gap.
                    
                    Based on the following two artists: 
                    1. ${artist1}
                    2. ${artist2}
                    `;
    } else if (activeTab === 'Song to Song') {
        prompt = `You are a music recommendation engine.
                    I'll provide 2 songs potentially from different genres, your task is to generate a playlist (20 songs) connecting these songs through a progression of songs.
                    Each song in the playlist should represent a logical bridge between the styles of genres of the two artists.
                    The connection can be based on elements such as similar sounds, collaborations, influences, or any other meaningful link.
                    The first song must be song 1, the last song should be song 2 and you should bridge the gap.
                    
                    Based on the following two songs: 
                    1. ${song1}
                    2. ${song2}
                     `;
    } else if (activeTab === 'Mood') {
        prompt = `You are a music recommendation engine.
                    I'll provide an input provided by a user, your task is to generate a playlist (20 songs) that really represents this input.
                    The input could be a mood, a feeling or an expression. it could mention an activity or a specific genre or era.
                    The playlist should try to only include songs that match the specific input provided. 

                    Based on the following input: 
                    User input = ${mood}.

                    Only includes songs that correspond to: ${mood}.
                    `;
    } else if (activeTab === 'Instrument') {
        prompt = `You are a music recommendation engine.
                    You will generate a playlist (20 songs) that belongs to a certain genre and features the "${instrument}" instrument throughout within all songs of the playlist.
                    The playlist should only contain songs of that genre. you should try to only include songs that you are certain contain the given instrument.

                    Based on the following input: 
                    genre = ${genre}
                    instrument = ${instrument}
                  
                  `;
    } else if (activeTab === 'Genre | BPM') {
        if (!genre) {
            return res.status(400).json({
                error: 'Genre is required for Genre | BPM recommendations.',
            });
        }
        prompt = `You are a music recommendation engine.
                    Generate a playlist (20 songs) that belongs to a certain genre with a "${bpm}" bpm.
                    The playlist should only contain songs of that genre. you should try to only include songs that you are certain match that tempo / bpm.
                    
                    Based on the following input: 
                    genre = ${genre}
                    instrument = ${bpm}
                    
                    `;
    }

    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-4',
            messages: [
                {
                    role: 'system',
                    content: `You are a music recommendation engine. Always follow the user's input. Try not to include generic or unrelated songs.`,
                },
                {
                    role: 'user',
                    content: `
                    ${prompt}

                    For each song, include:
                    - The song's name
                    - The artist's name

                    Strict rules:
                    - Provide 20 songs.
                    - Do NOT repeat songs in the playlist.
                    - Do NOT include an artist more than twice.
                    - Do NOT include feat or featuring artists or special characters.

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
            top_p: 0.2,
        });
        console.log('Generated Prompt:', prompt);
        console.log('Body:', req.body);
        console.log('OpenAI Response:', response);

        const songsContent = response.choices[0]?.message?.content;

        if (!songsContent) {
            throw new Error('No content received from OpenAI.');
        }

        // Step 2: Parse the Generated Songs
        let formattedSongs: Song[] = [];
        try {
            const cleanedData = songsContent
                .toLowerCase()
                .replace(/```json|```/g, '') // Remove Markdown code block indicators if any
                .trim(); // Remove any leading or trailing whitespace

            const parsedData = JSON.parse(cleanedData);

            if (!parsedData.playlist || !Array.isArray(parsedData.playlist)) {
                throw new Error(
                    'Invalid playlist structure received from OpenAI.',
                );
            }

            formattedSongs = parsedData.playlist.map((item: any) => ({
                song: item.song,
                artist: item.artist,
            }));
        } catch (parseError) {
            console.error('Failed to parse songs:', parseError);
            return res.status(500).json({
                error: 'Failed to format the song data. Please try again.',
            });
        }

        console.log('Formatted Songs:', formattedSongs);

        // Step 3: Send the Playlist to spotify.ts for Spotify Integration
        // Construct the base URL dynamically
        const protocol = req.headers['x-forwarded-proto'] || 'http';
        const host = req.headers.host;
        const baseUrl = `${protocol}://${host}`;

        const spotifyResponse = await fetch(`${baseUrl}/api/spotify`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                playlist: formattedSongs,
                token: token,
                userId: userId,
            }),
        });

        if (!spotifyResponse.ok) {
            const errorData = await spotifyResponse.json();
            throw new Error(
                errorData.error || 'Failed to create Spotify playlist.',
            );
        }

        const spotifyData = await spotifyResponse.json();

        console.log('Spotify Data:', spotifyData);

        // Step 4: Return the Final Playlist Data to the Frontend
        res.status(200).json({ playlist: spotifyData });
    } catch (error: any) {
        console.error('Error in recommended-songs.ts:', error);
        res.status(500).json({
            error:
                error.message ||
                'Failed to generate song recommendations and create Spotify playlist.',
        });
    }
}
