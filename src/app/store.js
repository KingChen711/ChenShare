import { configureStore } from '@reduxjs/toolkit';
import useReducer from '../features/userSlice';
import filterPostReducer from '../features/filterPostSlice';
import { rtkQueryChenShareAPI } from '../services/rtkQueryChenShareAPI';

export const store = configureStore({
  reducer: {
    filterPost: filterPostReducer,
    user: useReducer,
    [rtkQueryChenShareAPI.reducerPath]: rtkQueryChenShareAPI.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(rtkQueryChenShareAPI.middleware),
});
