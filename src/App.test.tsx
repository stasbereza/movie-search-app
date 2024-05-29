import { App } from './App';
import { store as appStore } from './app/store';
import { fetchMoviesSuccess } from './features/movies/moviesSlice';
import { renderWithProviders } from './utils/test-utils';
import { fetchedMovies } from './mock/mockMovies';

test('should use movies state to render correct movies list', () => {
  const store = appStore;
  store.dispatch(fetchMoviesSuccess(fetchedMovies));

  renderWithProviders(<App />, { store });

  expect(store.getState().movies).toEqual({ moviesList: fetchedMovies, error: null });
});
