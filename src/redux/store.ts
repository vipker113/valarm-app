import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import loadingReducer from './loadingSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    loading: loadingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
