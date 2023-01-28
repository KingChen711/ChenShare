import { configureStore } from '@reduxjs/toolkit';
import useReducer from '../features/userSlice';
import filterPostReducer from '../features/filterPostSlice';
import { chenShareAPI } from '../services/chenShareAPI';

export const store = configureStore({
  reducer: {
    filterPost: filterPostReducer,
    user: useReducer,
    [chenShareAPI.reducerPath]: chenShareAPI.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(chenShareAPI.middleware),
});
