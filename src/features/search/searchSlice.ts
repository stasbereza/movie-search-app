import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface SearchState {
  searchText: string;
}

const initialState: SearchState = {
  searchText: '',
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchText: (state, action: PayloadAction<string>) => {
      state.searchText = action.payload;
    },
  },
});

export const { setSearchText } = searchSlice.actions;

export default searchSlice.reducer;
