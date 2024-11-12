import { configureStore } from '@reduxjs/toolkit';
import requestReducer from '@/store/requestSlice';

export const store = configureStore({
  reducer: {
    // Added reducers
    counter: requestReducer,
  },
});

// Store type for .ts
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
