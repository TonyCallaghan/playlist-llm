const searchSpotifyTracks = async (
    playlist: { song: string; artist: string }[],
) => {
    const token = localStorage.getItem('spotifyAuthToken');
    const userId = localStorage.getItem('spotifyUserId');

    const playlistID = await createSpotifyPlaylist(token!, userId!);

    const trackUris: string[] = [];
    const trackDetails: { song: string; artist: string; imageUrl: string }[] =
        [];

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
            }
        } catch (error) {
            console.error(
                `Error searching for "${song}" by "${artist}":`,
                error,
            );
        }
    }
    await addTracksToPlaylist(token!, playlistID, trackUris);
    return trackDetails;
};

//Creates Playlist and returns PlaylistID
const createSpotifyPlaylist = async (token: string, userId: string) => {
    const endpoint = `https://api.spotify.com/v1/users/${userId}/playlists`;

    const body = {
        name: 'PlaylistLLM',
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
        console.log(data.id);
        return data.id;
    } catch (error) {
        console.error('Error creating playlist:', error);
        return null;
    }
};

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

export default searchSpotifyTracks;
