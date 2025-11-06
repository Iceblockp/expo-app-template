import { configureStore } from '@reduxjs/toolkit';
import { authReducer, appSettingsReducer } from './slices';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    appSettings: appSettingsReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types for serializable check
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production', // Enable Redux DevTools in development
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Export everything from slices for convenience
export * from './slices';
export { StoreProvider } from './StoreProvider';
export * from './selectors';
