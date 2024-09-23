import { memo, useState, useEffect, useRef, useCallback, useMemo, ChangeEvent } from 'react';
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
import { useDebounce } from '../../hooks/useDebounce';
import { useAppSelector, useAppDispatch } from '../../app/hooks';

const SearchableDropdown = () => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const movies = useAppSelector((state) => state.movies.moviesList);
  const selectedMovies = useAppSelector((state) => state.movieDetails.selectedMovies);
  const searchText = useAppSelector((state) => state.search.searchText);
  const dispatch = useAppDispatch();

  const debouncedFetchMovies = useDebounce((value: string) => {
    dispatch(fetchMovies(value));
  }, 500);

  useEffect(() => {
    setSelectedOptions(selectedMovies.map(({ show }) => String(show.id)));
  }, [selectedMovies]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [searchText]);

  const handleSelectMovie = useCallback(
    (event: SelectChangeEvent<typeof selectedOptions>): void => {
      const { value } = event.target;
      const movieIds = typeof value === 'string' ? value.split(',') : value;

      setSelectedOptions(movieIds);
      dispatch(setSelectedMovies(movies.filter(({ show }) => movieIds.includes(String(show.id)))));
    },
    [movies, dispatch]
  );

  const handleSearchTextChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>): void => {
      const { value } = event.target;

      dispatch(setSearchText(value));
      debouncedFetchMovies(value);
    },
    [debouncedFetchMovies, dispatch]
  );

  const handleClearSearchText = useCallback(() => {
    dispatch(setSearchText(''));
  }, [dispatch]);

  const displayedOptions = useMemo(
    () =>
      movies.map(({ show }) => {
        const id = String(show.id);

        return (
          <MenuItem key={id} value={id}>
            {show.name}
          </MenuItem>
        );
      }),
    [movies]
  );

  return (
    <Box sx={{ m: 10 }}>
      <FormControl fullWidth>
        <InputLabel id="search-select-label">Start finding a movie</InputLabel>
        <Select
          multiple
          id="search-select"
          labelId="search-select-label"
          label="Start finding a movie"
          value={selectedOptions}
          MenuProps={{ autoFocus: true }}
          onChange={handleSelectMovie}
          onClose={handleClearSearchText}
        >
          <ListSubheader>
            <TextField
              autoFocus
              fullWidth
              inputRef={inputRef}
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

export const MemoizedSearchableDropdown = memo(SearchableDropdown);
