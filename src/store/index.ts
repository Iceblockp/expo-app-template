import { configureStore } from '@reduxjs/toolkit';
import { authReducer, appSettingsReducer } from './slices';
import { baseApi } from './api/baseApi';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    appSettings: appSettingsReducer,
    // Add the RTK Query API reducer
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types for serializable check
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
        // Ignore RTK Query action types
        ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
      },
    })
      // Add the RTK Query middleware
      .concat(baseApi.middleware),
  devTools: process.env.NODE_ENV !== 'production', // Enable Redux DevTools in development
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Export everything from slices for convenience
export * from './slices';
export { StoreProvider } from './StoreProvider';
export * from './selectors';

// Export RTK Query API hooks and utilities
export {
  baseApi,
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useRefreshTokenMutation,
  useVerifyTokenQuery,
  useGetCurrentUserQuery,
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
  useUpdateUserPreferencesMutation,
  useUploadAvatarMutation,
  useDeleteUserAccountMutation,
  useGetUserNotificationsQuery,
  useMarkNotificationReadMutation,
} from './api';
