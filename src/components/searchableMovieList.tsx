import React, { useMemo } from 'react';
import Grid from '@mui/material/Grid';
import { MovieItem } from './movieItem';
import { SearchableDropdown } from '../features/search/SearchableDropdown';
import { removeMovie } from '../features/movieDetails/movieDetailsSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks';

export const SearchableMovieList = () => {
  const movies = useAppSelector((state) => state.movies.moviesList);
  const selectedMovieIds = useAppSelector((state) => state.movieDetails.selectedMovieIds);
  const dispatch = useAppDispatch();

  const renderSelectedMovies = useMemo(() => {
    const handleRemoveItem = (id: string): void => {
      dispatch(removeMovie(id));
    };

    return movies
      .filter(({ show }) => selectedMovieIds.includes(String(show.id)))
      .map(({ show }) => (
        <Grid item xs={2} sm={4} md={4} key={show.id}>
          <MovieItem {...show} onRemoveMovie={handleRemoveItem} />
        </Grid>
      ));
  }, [movies, selectedMovieIds, dispatch]);

  return (
    <>
      <SearchableDropdown />
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {renderSelectedMovies}
      </Grid>
    </>
  );
};
