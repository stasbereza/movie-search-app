import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { TVMazeMovie } from '../../types';

export interface MovieDetailsState {
  selectedMovies: TVMazeMovie[];
}

const initialState: MovieDetailsState = {
  selectedMovies: [],
};

export const movieDetailsSlice = createSlice({
  name: 'movieDetails',
  initialState,
  reducers: {
    setSelectedMovies: (state, action: PayloadAction<TVMazeMovie[]>) => {
      state.selectedMovies = action.payload;
    },
    removeMovie: (state, action: PayloadAction<string>) => {
      state.selectedMovies = state.selectedMovies.filter(
        ({ show }) => String(show.id) !== action.payload
      );
    },
  },
});

export const { setSelectedMovies, removeMovie } = movieDetailsSlice.actions;

export default movieDetailsSlice.reducer;
