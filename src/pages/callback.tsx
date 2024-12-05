import React, { useEffect } from 'react';

const callback: React.FC = () => {
    useEffect(() => {
        const hash = window.location.hash;
        const params = new URLSearchParams(hash.substring(1));
        const accessToken = params.get('access_token');
        const expiresIn = params.get('expires_in');

        if (accessToken && expiresIn) {
            const expirationTime = Date.now() + parseInt(expiresIn) * 1000;
            localStorage.setItem('spotifyAuthToken', accessToken);
            localStorage.setItem(
                'spotifyTokenExpiration',
                expirationTime.toString(),
            );
            console.log('Spotify Access Token:', accessToken);

            getUserId(accessToken).then(userId => {
                localStorage.setItem('spotifyUserId', userId);
            });

            window.location.href = '/';
        } else {
            console.error('Token or expiry time was not found in the URL');
        }
    }, []);

    return <p>Authenticating User</p>;
};

const getUserId = async (token: string) => {
    const endpoint = 'https://api.spotify.com/v1/me';

    try {
        const response = await fetch(endpoint, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to load');
        }

        const data = await response.json();
        const userId = data.id;
        console.log('UserID ', userId);
        return userId;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export default callback;
