import { App } from './App';
import { store } from './app/store';
import { fetchMovies } from './features/movies/moviesSlice';
import { renderWithProviders } from './utils/test-utils';

test('should use initial movies state while query is an empty string', () => {
  renderWithProviders(<App />, { store });

  store.dispatch(fetchMovies(''));

  expect(store.getState().movies).toEqual({
    moviesList: [],
    status: 'loading',
    error: null,
  });
});
