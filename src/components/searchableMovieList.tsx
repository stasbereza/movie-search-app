import { useMemo } from 'react';
import Grid from '@mui/material/Grid';
import { MovieItem } from './movieItem';
import { MemoizedSearchableDropdown } from '../features/search/SearchableDropdown';
import { removeMovie } from '../features/movieDetails/movieDetailsSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks';

export const SearchableMovieList = () => {
  const selectedMovies = useAppSelector((state) => state.movieDetails.selectedMovies);
  const dispatch = useAppDispatch();

  const movies = useMemo(() => {
    const handleRemoveItem = (id: string): void => {
      dispatch(removeMovie(id));
    };

    return (
      selectedMovies
        .map(({ show }) => (
          <Grid item xs={2} sm={4} md={4} key={show.id}>
            <MovieItem {...show} onRemoveMovie={handleRemoveItem} />
          </Grid>
        ))
    );
  }, [selectedMovies, dispatch]);

  return (
    <>
      <MemoizedSearchableDropdown />
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {movies}
      </Grid>
    </>
  );
};
