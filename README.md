# Movie Mate App

A React-Redux application for searching movies using the TV Maze Movie API. This app allows users to search for movies, view detailed information about them, and remove movies from the list.

## Table of Contents

- [Features](#features)
- [Instalation](#instalation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [API](#api)

## Features

- Search for movies using TVMaze API
- Select a movie from the dropdown menu
- View information about selected movie
- View detailed information about each movie on a separate page
- Remove movies from dropdown menu and detals page

## Installation

1. Navigate to the project directory:

```bash
cd movie-mate-app
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

The application will open in your default web browser at [http://localhost:3000](http://localhost:3000).

## Usage

1. Search for a movie:

- Enter a movie title in the search bar
- A list of movies matching the search term will be displayed within the dropdown below the searchbox

2. View movie details:

- Click on a movie from the search results to view details about it
- Click on a movie name from to view more details about it on separate Details page

3. Manage movies:

- Click the "Delete" icon button within movie's dropdown item to remove it from the list
- Click the "Delete" icon button on a movie's detail page to remove movie from the dropdowm list

## Folder Structure

```bash
movie-mate-app/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── app/
│   │   ├── hooks.ts
│   │   ├── store.ts
│   ├── components/
│   │   ├── movieItem.tsx
│   │   ├── searchableMovieList.tsx
│   ├── features/
│   │   ├── movieDetails/
│   │   │   ├── moviesDetails.tsx
│   │   │   └── moviesDetailsSlice.ts
│   │   ├── movies/
│   │   │   ├── moviesSlice.ts
│   │   ├── search/
│   │   │   ├── searchBar.ts
│   │   │   └── searchSlice.ts
│   │   └── ...
│   ├── App.tsx
│   ├── index.tsx
│   └── ...
├── .gitignore
├── package.json
├── README.md
└── ...
```

## API

This application uses the [TV Maze API](https://www.tvmaze.com/api) to search for movies and retrieve detailed information.

Example API Request

To search for movies by title:

```http
GET https://api.tvmaze.com/search/shows?q=<search_term>
```