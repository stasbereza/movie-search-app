import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from '../features/movies/moviesSlice';
import searchReducer from '../features/search/searchSlice';
import movieDetailsReducer from '../features/movieDetails/movieDetailsSlice';

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    search: searchReducer,
    movieDetails: movieDetailsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
