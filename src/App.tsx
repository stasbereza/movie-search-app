import React, { useEffect, useCallback } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { SearchableMovieList } from './components/searchableMovieList';
import { MovieDetails } from './features/movieDetails/movieDetails';
import { fetchMoviesSuccess, fetchMoviesFail } from './features/movies/moviesSlice';
import { useAppSelector, useAppDispatch } from './app/hooks';
import { TVMazeMovie } from './types';

export const App = () => {
  const searchText = useAppSelector((state) => state.search.searchText);
  const dispatch = useAppDispatch();

  const searchMovies = useCallback(async () => {
    try {
      const response = await axios.get<TVMazeMovie[]>(
        `https://api.tvmaze.com/search/shows?q=${searchText}`
      );

      dispatch(fetchMoviesSuccess(response.data));
    } catch (error: AxiosError | unknown) {
      dispatch(fetchMoviesFail((error as AxiosError).message));
    }
  }, [searchText, dispatch]);

  useEffect(() => {
    searchText && searchMovies();
  }, [searchText, searchMovies]);

  return (
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
};
