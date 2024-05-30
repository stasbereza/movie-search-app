import React, { useState, useEffect, useCallback, useMemo, ChangeEvent } from 'react';
import {
  Box,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  ListSubheader,
  TextField,
  InputAdornment,
  SelectChangeEvent,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { setSearchText } from './searchSlice';
import { fetchMovies } from '../movies/moviesSlice';
import { setSelectedMovies } from '../movieDetails/movieDetailsSlice';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { TVMazeMovie } from '../../types';

const containsText = (title: string, searchText: string): boolean =>
  title.toLowerCase().indexOf(searchText.toLowerCase()) > -1;

export const SearchableDropdown = () => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const movies = useAppSelector((state) => state.movies.moviesList);
  const selectedMovieIds = useAppSelector((state) => state.movieDetails.selectedMovieIds);
  const searchText = useAppSelector((state) => state.search.searchText);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setSelectedOptions(selectedMovieIds);
  }, [selectedMovieIds]);

  const handleSelectMovie = (event: SelectChangeEvent<typeof selectedOptions>): void => {
    const { value } = event.target;
    const movieIds = typeof value === 'string' ? value.split(',') : value;

    setSelectedOptions(movieIds);
    dispatch(setSelectedMovies(movieIds));
  };

  const handleSearchTextChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>): void => {
      const { value } = event.target;

      dispatch(setSearchText(value));
      dispatch(fetchMovies(value));
    },
    [dispatch]
  );

  const displayedOptions = useMemo(
    () =>
      movies
        .filter(({ show }: TVMazeMovie) => containsText(show.name, searchText))
        .map(({ show }) => {
          const id = String(show.id);

          return (
            <MenuItem key={id} value={id}>
              {show.name}
            </MenuItem>
          );
        }),
    [movies, searchText]
  );

  return (
    <Box sx={{ m: 10 }}>
      <FormControl fullWidth>
        <InputLabel id="search-select-label">Start finding a movie</InputLabel>
        <Select
          multiple
          id="search-select"
          labelId="search-select-label"
          value={selectedOptions}
          label="Start finding a movie"
          MenuProps={{ autoFocus: false }}
          onChange={handleSelectMovie}
          onClose={() => setSearchText('')}
        >
          <ListSubheader>
            <TextField
              autoFocus
              fullWidth
              value={searchText}
              size="small"
              placeholder="Type to search for movie..."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              onChange={handleSearchTextChange}
              onKeyDown={(event) => {
                if (event.key !== 'Escape') event.stopPropagation();
              }}
            />
          </ListSubheader>
          {displayedOptions}
        </Select>
      </FormControl>
    </Box>
  );
};
