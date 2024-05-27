import { AxiosError } from 'axios';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { TVMazeMovie } from '../../types';

export interface MoviesState {
  moviesList: TVMazeMovie[];
  error: AxiosError | unknown;
}

const initialState: MoviesState = {
  moviesList: [],
  error: null,
};

export const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    fetchMoviesSuccess: (state, action: PayloadAction<TVMazeMovie[]>) => {
      state.moviesList = action.payload;
    },
    fetchMoviesFail: (state, action: PayloadAction<AxiosError | unknown>) => {
      state.error = action.payload;
    },
    removeMovie: (state, action: PayloadAction<string>) => {
      state.moviesList = state.moviesList.filter(
        (movie) => String(movie.show.id) !== action.payload
      );
    },
  },
});

export const { fetchMoviesSuccess, fetchMoviesFail, removeMovie } = moviesSlice.actions;

export default moviesSlice.reducer;
