import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice';
import memoReducer from './features/memoSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    memo: memoReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch