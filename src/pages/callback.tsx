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
            localStorage.setItem('spotifyTokenExpiration', expirationTime.toString())
            console.log('Spotify Access Token:', accessToken);

            window.location.href = '/';
        } else {
            console.error('Token or expiry time was not found in the URL');
        }
    }, []);

    return <p>Authenticating User</p>;
};

export default callback;
