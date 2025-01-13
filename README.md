# 🎵 Playlist-LLM 🎵
[![CI/CD Pipeline](https://github.com/TonyCallaghan/playlist-llm/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/TonyCallaghan/playlist-llm/actions/workflows/ci-cd.yml)

### Overview:
- [Introduction](#Introduction)
- [Getting Started](#getting-started)
- [Tech stack](#technology-overview)
- [Usage](#usage)
- [Design](#Design)

## Introduction

Playlist-LLM is a Spotify playlist generator that allows users to discover new artists and tracks using the power of articial intelligence.

| **User Journey**               |                                                                                            |
|-------------------------|-----------------------------------------------------------------------------------------------------------|
| **Enter in a Prompt**   | Start by entering a prompt that describes the music you want to explore.                                 |
| **Generate a Playlist** | OpenAI will analyze your input, and we’ll use this information to generate your new playlist.            |
| **Play / Share / Save** | You can listen to it, share it, or save it to your Spotify account for later. Discover new songs customized just for you! | 


<br>



https://github.com/user-attachments/assets/824b7bff-520e-47e8-a9c5-35069b3e78f3


<br>

## Getting Started

After cloning this repository, you will need to set up a `.env` file and store your [OpenAI API key](https://platform.openai.com/api-keys) in it. The .env can be stored in the root directory. Optionally, you can also store your [Spotify API](https://developer.spotify.com/documentation/web-api/tutorials/getting-started) credentials in this file.

```bash
# Filename: .env

OPENAI_API_KEY=sk-proj-EXAMPLE-KEY-TO-USE

#Optional:
NEXT_PUBLIC_CLIENT_ID=EXAMPLE-ID-TO-USE
NEXT_PUBLIC_CLIENT_SECRET=EXAMPLE-SECRET-TO-USE
```

### Option 1: NodeJS:

You will need `node` and `npm` installed globally on your machine.

Install dependancies:

```bash
npm install
```

To run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

<br>

### Option 2: Docker Container:

You will need `Docker` installed and running on your machine.

Create the image from root directory:

```docker build -t playlist-llm .```

Run the Docker container:

```docker run -d -p 3000:80 playlist-llm```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

<br>

### Additional cmds for reference:
- To run the testing suite: `npm run test`
- To run ESLint: `npm run lint`
- To run prettier: `npm run formatter`
- To prepare everything befoe PRs: `npm run prepare`
- To build site for production: `npm run build`
- To deploy site: `npm run deploy` (requires access)

## Technology Overview:
- Next.JS
- Typescript
- React
- Tailwind

APIs:
- OpenAI
- Spotify

Testing:
- Jest 
- Postman

Deployment:
- firebase

## Usage

The purpose of this project is to offer an alternative way for users to conviently discover new music. An example of this is shown above in the [video](#introduction).

Examples of different prompts:

#### Artist to Artist:
![image](https://github.com/user-attachments/assets/d1f29cca-7131-476a-98e6-54202c45633f)

#### Behind the scenes:

```javascript
generatedPlaylist: {
  tracks: [
    {
      song: 'Danger',
      artist: 'Deathpact',
      imageUrl: 'https://i.scdn.co/image/ab67616d0000b273520590094d8a4d45933cdd78'
    },
    {
      song: 'Strobe - Radio Edit',
      artist: 'deadmau5',
      imageUrl: 'https://i.scdn.co/image/ab67616d0000b273a3dab425d1f330c8dc8c3f59'
    },
    {
      song: "Ghosts 'n' Stuff",
      artist: 'deadmau5',
      imageUrl: 'https://i.scdn.co/image/ab67616d0000b273d49d976721f4dc6b3c6225ad'
    },
    {
      song: 'Opus',
      artist: 'Eric Prydz',
      imageUrl: 'https://i.scdn.co/image/ab67616d0000b27324492f2ba3a1d995e1faf5d8'
    },
    {
      song: 'Sunset Lover',
      artist: 'Petit Biscuit',
      imageUrl: 'https://i.scdn.co/image/ab67616d0000b27344bb39545f5d7176080d17ae'
    },
    {
      song: 'Night Owl - 2014',
      artist: 'Galimatias',
      imageUrl: 'https://i.scdn.co/image/ab67616d0000b273a299ee1568d86d3b368c4aba'
    },
    {
      song: 'Weightless Part 1',
      artist: 'Marconi Union',
      imageUrl: 'https://i.scdn.co/image/ab67616d0000b2732d60677a02438991cc6b25ea'
    },
    {
      song: 'Experience',
      artist: 'Ludovico Einaudi',
      imageUrl: 'https://i.scdn.co/image/ab67616d0000b2736c8ef0538e04f2e28380dcc5'
    },
    {
      song: 'The Lonely Night - Reprise Version',
      artist: 'Moby',
      imageUrl: 'https://i.scdn.co/image/ab67616d0000b273be8d7ee42606954a9019558c'
    },
    {
      song: 'Porcelain',
      artist: 'Moby',
      imageUrl: 'https://i.scdn.co/image/ab67616d0000b273f675ddc7a8c113362f983f8b'
    },
    {
      song: 'Intro',
      artist: 'The xx',
      imageUrl: 'https://i.scdn.co/image/ab67616d0000b27348a95897fd91eb34032a93e3'
    },
    {
      song: 'Sunset',
      artist: 'The xx',
      imageUrl: 'https://i.scdn.co/image/ab67616d0000b2739644aac468fd7844890974d3'
    },
    {
      song: 'Holocene',
      artist: 'Bon Iver',
      imageUrl: 'https://i.scdn.co/image/ab67616d0000b2739a5a33aa7954b5519feb5692'
    },
    {
      song: 'Fljótavík',
      artist: 'Sigur Rós',
      imageUrl: 'https://i.scdn.co/image/ab67616d0000b273d7c64e1270057cd9c22556d5'
    },
    {
      song: 'Svefn-g-englar',
      artist: 'Sigur Rós',
      imageUrl: 'https://i.scdn.co/image/ab67616d0000b27397d4015428c1ae8409236f69'
    },
    {
      song: 'We Move Lightly',
      artist: "Dustin O'Halloran",
      imageUrl: 'https://i.scdn.co/image/ab67616d0000b2737f86e909c35dbdc9b670d7a6'
    },
    {
      song: 'Arrival of the Birds',
      artist: 'The Cinematic Orchestra',
      imageUrl: 'https://i.scdn.co/image/ab67616d0000b273ed59cea75575ea8166c23bdb'
    },
    {
      song: 'Time',
      artist: 'Hans Zimmer',
      imageUrl: 'https://i.scdn.co/image/ab67616d0000b273a883e26f90ab617c91b90e56'
    },
    {
      song: 'Nuvole Bianche',
      artist: 'Ludovico Einaudi',
      imageUrl: 'https://i.scdn.co/image/ab67616d0000b273c0c021c0ac135d923b3a0ddc'
    },
    {
      song: 'Divenire',
      artist: 'Ludovico Einaudi',
      imageUrl: 'https://i.scdn.co/image/ab67616d0000b273f58c2d280edcb6931a108fbd'
    }
  ]
}
```

#### Other Examples:

![image](https://github.com/user-attachments/assets/fd3ba93c-31fa-4365-b719-76b6912cb9fb)

![image](https://github.com/user-attachments/assets/b7a5e187-7e51-4f52-8dc5-01ab2a6a993f)

![image](https://github.com/user-attachments/assets/f21b936a-8bfe-45c5-bd81-186784d2b9df)

![image](https://github.com/user-attachments/assets/0e607e93-a7b0-406a-a0f1-2c68d47a0fb3)



<br>








## Design

#### Original Lofi Wireframe:
![image](https://github.com/user-attachments/assets/52ad43a2-889d-4a28-9d06-618edfefb418)


<div style="text-align: center; font-size: 48px;">⬇️</div>

#### Finished Product:
![image](https://github.com/user-attachments/assets/0690a683-76ab-4dcf-a6b8-f99003ac3f8e)

#### Data flow:
![image](https://github.com/user-attachments/assets/c0313358-f873-4407-a0e0-cffbb4dc048a)