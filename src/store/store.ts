import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // localStorage as default
import requestReducer from '@/store/requestSlice';

// Persist configuration
const persistConfig = {
  key: 'root',
  storage,
};

// Persisted reducer for store configuration with redux-persist
const persistedReducer = persistReducer(persistConfig, requestReducer);

export const store = configureStore({
  reducer: {
    // Added reducers
    requests: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'], // We don't want to persist this action
        ignoredPaths: ['register'], // We don't want to persist this path
      },
    }),
  
});

// Persistor for store configuration with redux-persist
export const persistor = persistStore(store);

// Store type for .ts
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
