// pages/api/spotify.ts

import type { NextApiRequest, NextApiResponse } from 'next';

// Define the Song interface
interface Song {
    song: string;
    artist: string;
    imageUrl?: string;
}

// Define the request body interface
interface SpotifyRequestBody {
    playlist: Song[];
    token: string;
    userId: string;
}

/**
 * Creates a Spotify playlist and returns the playlist ID.
 * @param token - Spotify access token.
 * @param userId - Spotify user ID.
 * @param playlistName - Name of the playlist to create.
 * @returns The created playlist's ID or null if failed.
 */
const createSpotifyPlaylist = async (
    token: string,
    userId: string,
    playlistName: string = 'PlaylistLLM',
): Promise<string | null> => {
    const endpoint = `https://api.spotify.com/v1/users/${userId}/playlists`;

    const body = {
        name: playlistName,
        public: true,
    };

    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            throw new Error(`Error creating playlist: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Created Playlist ID:', data.id);
        return data.id;
    } catch (error) {
        console.error('Error creating playlist:', error);
        return null;
    }
};

/**
 * Searches Spotify for each song in the playlist and retrieves their URIs and details.
 * @param playlist - Array of songs to search.
 * @param token - Spotify access token.
 * @returns An object containing track URIs and detailed track information.
 */
const searchSpotifyTracks = async (
    playlist: Song[],
    token: string,
): Promise<{ trackUris: string[]; trackDetails: Song[] }> => {
    const trackUris: string[] = [];
    const trackDetails: Song[] = [];

    for (const item of playlist) {
        const { song, artist } = item;
        const endpoint = `https://api.spotify.com/v1/search?q=track:${encodeURIComponent(song)}+artist:${encodeURIComponent(artist)}&type=track&limit=1`;

        try {
            const response = await fetch(endpoint, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error(`Spotify API error: ${response.statusText}`);
            }

            const data = await response.json();
            const track = data.tracks.items[0];

            if (track) {
                trackUris.push(track.uri);

                const trackName = track.name;
                const artistName = track.artists[0].name;
                const imageUrl = track.album.images?.[0]?.url;

                trackDetails.push({
                    song: trackName,
                    artist: artistName,
                    imageUrl,
                });

                console.log(
                    `Found track: ${track.name} by ${track.artists[0].name}`,
                );
            } else {
                console.warn(`No track found for "${song}" by "${artist}".`);
            }
        } catch (error) {
            console.error(
                `Error searching for "${song}" by "${artist}":`,
                error,
            );
        }
    }

    return { trackUris, trackDetails };
};

/**
 * Adds an array of track URIs to a Spotify playlist.
 * @param token - Spotify access token.
 * @param playlistId - ID of the playlist to add tracks to.
 * @param trackUris - Array of track URIs to add.
 */
const addTracksToPlaylist = async (
    token: string,
    playlistId: string,
    trackUris: string[],
) => {
    const endpoint = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;

    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                uris: trackUris, // Array of track URIs
            }),
        });

        if (!response.ok) {
            throw new Error(
                `Error adding tracks to playlist: ${response.statusText}`,
            );
        }

        console.log('Tracks added successfully!');
    } catch (error) {
        console.error('Error adding tracks:', error);
    }
};

/**
 * API Route Handler for Spotify Integration.
 * Expects a POST request with `playlist`, `token`, and `userId` in the request body.
 */
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { playlist, token, userId } = req.body as SpotifyRequestBody;

    if (!playlist || !token || !userId) {
        return res
            .status(400)
            .json({ error: 'Playlist, token, and userId are required.' });
    }

    try {
        // Step 1: Create Spotify Playlist
        const playlistId = await createSpotifyPlaylist(token, userId);

        if (!playlistId) {
            throw new Error('Failed to create Spotify playlist.');
        }

        // Step 2: Search for Tracks on Spotify
        const { trackUris, trackDetails } = await searchSpotifyTracks(
            playlist,
            token,
        );

        if (trackUris.length === 0) {
            throw new Error('No tracks found to add to the playlist.');
        }

        // Step 3: Add Tracks to the Playlist
        await addTracksToPlaylist(token, playlistId, trackUris);

        // Step 4: Return Playlist Details
        res.status(200).json({ playlistId, tracks: trackDetails });
    } catch (error: any) {
        console.error('Error in spotify.ts:', error);
        res.status(500).json({
            error: error.message || 'Failed to process Spotify playlist.',
        });
    }
}
