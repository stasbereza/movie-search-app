import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { TVMazeMovie } from '../../types';

export interface MovieDetailsState {
  selectedMovie: TVMazeMovie | null;
}

const initialState: MovieDetailsState = {
  selectedMovie: null,
};

export const movieDetailsSlice = createSlice({
  name: 'movieDetails',
  initialState,
  reducers: {
    setSelectedMovie: (state, action: PayloadAction<TVMazeMovie | null>) => {
      state.selectedMovie = action.payload;
    },
  },
});

export const { setSelectedMovie } = movieDetailsSlice.actions;

export default movieDetailsSlice.reducer;
