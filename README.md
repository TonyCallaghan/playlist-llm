# Playlist-LLM

-   This README file will be edited before submission.
-   Some instructions below (Taken from Ostanify project 😉)
-   [Next.js](https://nextjs.org) project using TypeScript + React.
-   Getting Started:

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

-   You can start editing the page by starting at `src/pages/index.tsx`.
-   We have a single web page for now based the lo-fi wireframe in the

## Setup Intructions (This will be removed before submission)

Install Git:

-   [Download here](https://git-scm.com/downloads).

<hr>

#### Example of global setup: (just do once)

-   `git config --global user.name "your github username"`
-   `git config --global user.email "your.email@whatever.ie"`
<hr>

#### Downloading the project to your machine:

-   `git clone`
-   `cd playlist-llm`
<hr>

#### Making Changes: (**DO NOT MERGE TO MAIN!!!!!!!!**)

-   Create a new branch whenever you are making changes:
-   `git checkout -b feature/my-new-feature`

<hr>

#### Adding your changes:

-   `git add README.md`
-   `git commit -m "Title of the changes I did..."`
-   `git push -u origin feature/my-new-feature`
-   `git push` (after)

<hr>

#### Pull requests:

-   Create a pull request on github and **please document the changes that you have made**.
-   Just fill out the key details: - Context (is it related to Frontend/BE/DB/Documentation etc...) - What you changed / implemented? - Correct labels - Screenshots(if neccessary) - Approvals (TBD)
<hr>

##### Approvals:

-   TBD

## Running the project (Option 1: NodeJS)

Clone down this repository. You will need `node` and `npm` installed globally on your machine.

Installation:

`npm install`

To Run Test Suite:

`npm test`

To Start Server:

`npm start`

To Visit App:

`localhost:3000`

## Running the project (Option 2: Docker Container)

Clone down this repository. You will need `Docker` installed and running on your machine.

Create the image from root directory:

`docker build -t playlist-llm .`

Run the Docker container:

`docker run -d -p 3000:80 playlist-llm`

To Visit App:

`localhost:3000`
