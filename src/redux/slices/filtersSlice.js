import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isSelectFilter: '-createdAt',
  page: 1,
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    filtersValue: (state, action) => {
      state.isSelectFilter = action.payload;
    },
    currentPage: (state, action) => {
      state.page = action.payload;
    },
  },
});

export const { filtersValue, currentPage } = filterSlice.actions;

export const filterReducer = filterSlice.reducer;
