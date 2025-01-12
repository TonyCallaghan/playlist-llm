import React from 'react';
import '../styles/Header.css';

const Header: React.FC = () => (
    <header className="text-center py-8">
        <div className="box">
            <div className="inner">
                <h1 className="text-6xl font-extrabold uppercase title-text">
                    PLAYLIST<span>LLM</span>
                </h1>
                <p className="mt-4 font-bold text-2xl max-w-2xl mx-auto subtitle-text">
                    A <span>Spotify</span> playlist generator leveraging the
                    power of <span>AI</span>.
                </p>
            </div>
        </div>
    </header>
);

export default Header;
