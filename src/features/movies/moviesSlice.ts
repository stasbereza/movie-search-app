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
  },
});

export const { fetchMoviesSuccess, fetchMoviesFail } = moviesSlice.actions;

export default moviesSlice.reducer;
