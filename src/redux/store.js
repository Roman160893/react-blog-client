import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './slices/authSlice';
import { filterReducer } from './slices/filtersSlice';
import { postReducer } from './slices/postsSlice';

const store = configureStore({
  reducer: {
    posts: postReducer,
    auth: authReducer,
    filter: filterReducer,
  },
});

export default store;
