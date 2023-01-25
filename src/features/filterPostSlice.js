import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  category: 'home',
  searchQuery: '',
};

const filterPost = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
});

export const { setCategory, setSearchQuery } = filterPost.actions;

export const selectFilterPost = (state) => state.filterPost;

export default filterPost.reducer;
