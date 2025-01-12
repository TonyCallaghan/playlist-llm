import React, { useState } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import InputFields from '../components/InputFields';
// import ResultOptions from '../components/ResultOptions';
// import ResultGrid from '../components/ResultGrid';

const Home: React.FC = () => (
    <>
        <Head>
            <title>Playlist LLM</title>
            <meta name="description" content="Generate playlists using AI" />
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0"
            />
        </Head>
        <Header />
        <InputFields />
        {/* <ResultGrid results={[]} />
        <ResultOptions /> */}
    </>
);

export default Home;
