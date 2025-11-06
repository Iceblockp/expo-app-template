import { baseApi } from './baseApi';

// Auth API types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    avatar?: string;
  };
  accessToken: string;
  refreshToken: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  password: string;
}

// Auth API endpoints
export const authApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    // Login endpoint
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: credentials => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['Auth', 'User'],
    }),

    // Register endpoint
    register: builder.mutation<AuthResponse, RegisterRequest>({
      query: userData => ({
        url: '/auth/register',
        method: 'POST',
        body: userData,
      }),
      invalidatesTags: ['Auth', 'User'],
    }),

    // Logout endpoint
    logout: builder.mutation<void, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
      invalidatesTags: ['Auth', 'User', 'Profile'],
    }),

    // Forgot password endpoint
    forgotPassword: builder.mutation<
      { message: string },
      ForgotPasswordRequest
    >({
      query: data => ({
        url: '/auth/forgot-password',
        method: 'POST',
        body: data,
      }),
    }),

    // Reset password endpoint
    resetPassword: builder.mutation<{ message: string }, ResetPasswordRequest>({
      query: data => ({
        url: '/auth/reset-password',
        method: 'POST',
        body: data,
      }),
    }),

    // Refresh token endpoint
    refreshToken: builder.mutation<
      { accessToken: string; refreshToken?: string },
      { refreshToken: string }
    >({
      query: data => ({
        url: '/auth/refresh',
        method: 'POST',
        body: data,
      }),
    }),

    // Verify token endpoint
    verifyToken: builder.query<{ valid: boolean; user?: any }, void>({
      query: () => '/auth/verify',
      providesTags: ['Auth'],
    }),

    // Get current user profile
    getCurrentUser: builder.query<AuthResponse['user'], void>({
      query: () => '/auth/me',
      providesTags: ['User'],
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useRefreshTokenMutation,
  useVerifyTokenQuery,
  useGetCurrentUserQuery,
} = authApi;
