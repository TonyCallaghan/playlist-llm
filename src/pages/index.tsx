import React from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Tabs from '../components/Tabs';
import InputFields from '../components/InputFields';
import ResultOptions from '../components/ResultOptions';
import ResultGrid from '../components/ResultGrid';

const Home: React.FC = () => (
    <>
        <Head>
            <title>Playlist LLM</title>
            <meta name="description" content="Generate playlists using AI" />
        </Head>
        <Header />
        <Tabs />
        <InputFields />
        <ResultOptions />
        <ResultGrid results={[]} />
    </>
);

export default Home;
