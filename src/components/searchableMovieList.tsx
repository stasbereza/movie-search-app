import React from 'react';
import { SearchBar } from '../features/search/searchBar';
import { MovieItem } from './movieItem';
import { useAppSelector } from '../app/hooks';

export const SearchableMovieList = () => {
  const selectedMovie = useAppSelector((state) => state.movieDetails.selectedMovie);

  return (
    <>
      <SearchBar />
      {selectedMovie && <MovieItem item={selectedMovie} />}
    </>
  );
};
