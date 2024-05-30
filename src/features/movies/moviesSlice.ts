import axios, { AxiosError } from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { TVMazeMovie } from '../../types';

enum RequestStatus {
  LOADING = 'loading',
  SUCCESS = 'succeeded',
  FAILED = 'failed',
  IDLE = 'idle',
}

export interface MoviesState {
  moviesList: TVMazeMovie[];
  status: RequestStatus;
  error: AxiosError | unknown;
}

const initialState: MoviesState = {
  moviesList: [],
  status: RequestStatus.IDLE,
  error: null,
};

export const fetchMovies = createAsyncThunk('movies/fetchMovies', async (query: string) => {
  const response = await axios.get(`https://api.tvmaze.com/search/shows?q=${query}`);
  return response.data;
});

export const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = RequestStatus.LOADING;
      })
      .addCase(fetchMovies.fulfilled, (state, action: PayloadAction<TVMazeMovie[]>) => {
        state.status = RequestStatus.SUCCESS;
        state.moviesList = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action: PayloadAction<AxiosError | unknown>) => {
        state.status = RequestStatus.FAILED;
        state.error = action.payload;
      });
  },
});

export default moviesSlice.reducer;
