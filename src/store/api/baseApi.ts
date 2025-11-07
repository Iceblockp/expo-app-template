import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import { API_CONFIG } from '../../services/api/client';
import { secureStorage } from '../../services/storage';
// Base API configuration for RTK Query

// Enhanced base query with token refresh logic
const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // Create base query
  const baseQuery = fetchBaseQuery({
    baseUrl: API_CONFIG.baseURL,
    timeout: API_CONFIG.timeout,
    prepareHeaders: async headers => {
      // Get token from secure storage
      const token = await secureStorage.getAccessToken();

      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      // Set default content type
      if (!headers.has('content-type')) {
        headers.set('content-type', 'application/json');
      }

      return headers;
    },
  });

  // Execute the query
  let result = await baseQuery(args, api, extraOptions);

  // Handle 401 Unauthorized - attempt token refresh
  if (result.error && result.error.status === 401) {
    if (__DEV__) {
      console.log('Token expired, attempting refresh...');
    }

    const refreshToken = await secureStorage.getRefreshToken();

    if (refreshToken) {
      // Attempt to refresh the token
      const refreshResult = await baseQuery(
        {
          url: '/auth/refresh',
          method: 'POST',
          body: { refreshToken },
        },
        api,
        extraOptions
      );

      if (refreshResult.data) {
        // Store the new tokens
        const { accessToken, refreshToken: newRefreshToken } =
          refreshResult.data as any;

        await secureStorage.setAccessToken(accessToken);
        if (newRefreshToken) {
          await secureStorage.setRefreshToken(newRefreshToken);
        }

        // Retry the original query with new token
        result = await baseQuery(args, api, extraOptions);
      } else {
        // Refresh failed, clear tokens and redirect to login
        await secureStorage.clearAuthData();

        // You can dispatch a logout action here if needed
        // api.dispatch(authSlice.actions.logout());
      }
    } else {
      // No refresh token available, clear tokens
      await secureStorage.clearAuthData();
    }
  }

  return result;
};

// Create the base API slice
export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['User', 'Auth', 'Profile', 'Settings'],
  endpoints: () => ({}),
});

// Export hooks for usage in functional components
// These will be populated by individual API slices that extend this base API
