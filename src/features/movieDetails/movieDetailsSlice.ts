import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface MovieDetailsState {
  selectedMovieIds: string[];
}

const initialState: MovieDetailsState = {
  selectedMovieIds: [],
};

export const movieDetailsSlice = createSlice({
  name: 'movieDetails',
  initialState,
  reducers: {
    setSelectedMovies: (state, action: PayloadAction<string[]>) => {
      state.selectedMovieIds = action.payload;
    },
    removeMovie: (state, action: PayloadAction<string>) => {
      state.selectedMovieIds = state.selectedMovieIds.filter(
        (movieId) => movieId !== action.payload
      );
    },
  },
});

export const { setSelectedMovies, removeMovie } = movieDetailsSlice.actions;

export default movieDetailsSlice.reducer;
