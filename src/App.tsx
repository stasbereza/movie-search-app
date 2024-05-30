import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { SearchableMovieList } from './components/searchableMovieList';
import { MovieDetails } from './features/movieDetails/movieDetails';

export const App = () => (
  <>
    <AppBar position="static" sx={{ marginBottom: '16px', padding: '16px' }}>
      <Typography variant="h6" component="div">
        Movie Mate
      </Typography>
    </AppBar>
    <Container>
      <Routes>
        <Route path="/" element={<SearchableMovieList />} />
        <Route path="/:id" element={<MovieDetails />} />
      </Routes>
    </Container>
  </>
);
