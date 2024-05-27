import React, { ChangeEvent, MouseEvent, useState, useEffect, useCallback, useMemo } from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';
import { setSearchText } from './searchSlice';
import { removeMovie } from '../movies/moviesSlice';
import { setSelectedMovie } from '../movieDetails/movieDetailsSlice';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { TVMazeMovie } from '../../types';

export const SearchBar = () => {
  const [selectedMovieId, setSelectedMovieId] = useState('');
  const movies = useAppSelector((state) => state.movies.moviesList);
  const searchText = useAppSelector((state) => state.search.searchText);
  const dispatch = useAppDispatch();

  const selectMovie = useCallback(() => {
    if (!movies.length) return;

    const foundMovie =
      selectedMovieId &&
      movies.find(({ show }: TVMazeMovie) => String(show.id) === selectedMovieId);

    if (!foundMovie) {
      dispatch(setSelectedMovie(null));
      return;
    }

    dispatch(setSelectedMovie(foundMovie));
  }, [selectedMovieId, movies, dispatch]);

  useEffect(() => {
    selectMovie();
  }, [selectMovie]);

  const handleSearchTextChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>): void => {
      dispatch(setSearchText(event.target.value));
    },
    [dispatch]
  );

  const handleSelectMovie = (event: SelectChangeEvent): void => {
    setSelectedMovieId(event.target.value);
  };

  const handleDeleteMovie = useCallback(
    (event: MouseEvent<HTMLButtonElement>, id: string): void => {
      event.stopPropagation();

      dispatch(removeMovie(id));

      if (selectedMovieId === String(id)) {
        setSelectedMovieId('');
      }
    },
    [selectedMovieId, dispatch]
  );

  const dropdownListOptions = useMemo(
    () =>
      movies.map(({ show }) => {
        const id = String(show.id);

        const onDeleteMovie = (event: MouseEvent<HTMLButtonElement>) => {
          handleDeleteMovie(event, id);
        };

        return (
          <MenuItem key={show.id} value={id} sx={{ justifyContent: 'space-between' }}>
            {show.name}
            <IconButton onClick={onDeleteMovie}>
              <DeleteIcon aria-label="delete" />
            </IconButton>
          </MenuItem>
        );
      }),
    [handleDeleteMovie, movies]
  );

  return (
    <Box sx={{ marginBottom: '16px' }}>
      <Box noValidate component="form" autoComplete="off" sx={{ marginBottom: '16px' }}>
        <TextField
          id="search"
          value={searchText}
          label="Search for movie"
          variant="outlined"
          sx={{ width: 500 }}
          onChange={handleSearchTextChange}
        />
      </Box>
      <FormControl fullWidth>
        <InputLabel id="movieslist-dropdown-label">Choose a movie</InputLabel>
        <Select
          labelId="movieslist-dropdown-label"
          value={selectedMovieId}
          label="Choose a movie"
          onChange={handleSelectMovie}
        >
          {dropdownListOptions}
        </Select>
      </FormControl>
    </Box>
  );
};
