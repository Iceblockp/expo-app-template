import { useCallback } from 'react';
import { useRouter } from 'expo-router';
import { useAppDispatch, useAppSelector } from './useRedux';
import {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useForgotPasswordMutation,
  type LoginRequest,
  type RegisterRequest,
  type ForgotPasswordRequest,
} from '@/store/api/authApi';
import {
  loginStart,
  loginSuccess,
  loginFailure,
  logout as logoutAction,
} from '@/store/slices/authSlice';
import { secureStorage } from '@/services/storage';

/**
 * Custom hook for authentication operations
 * Integrates RTK Query mutations with Redux state and secure storage
 */
export const useAuth = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const authState = useAppSelector(state => state.auth);

  const [loginMutation] = useLoginMutation();
  const [registerMutation] = useRegisterMutation();
  const [logoutMutation] = useLogoutMutation();
  const [forgotPasswordMutation] = useForgotPasswordMutation();

  /**
   * Login user
   */
  const login = useCallback(
    async (credentials: LoginRequest) => {
      try {
        dispatch(loginStart());

        const response = await loginMutation(credentials).unwrap();

        // Store tokens in secure storage
        await secureStorage.setAccessToken(response.accessToken);
        await secureStorage.setRefreshToken(response.refreshToken);
        await secureStorage.setUserData(response.user);

        // Update Redux state
        dispatch(
          loginSuccess({
            token: response.accessToken,
            user: response.user,
          })
        );

        // Navigate to main app
        router.replace('/(tabs)');

        return { success: true };
      } catch (error: any) {
        const errorMessage =
          error?.data?.message || error?.message || 'Login failed';
        dispatch(loginFailure(errorMessage));
        return { success: false, error: errorMessage };
      }
    },
    [dispatch, loginMutation, router]
  );

  /**
   * Register new user
   */
  const register = useCallback(
    async (userData: RegisterRequest) => {
      try {
        dispatch(loginStart());

        const response = await registerMutation(userData).unwrap();

        // Store tokens in secure storage
        await secureStorage.setAccessToken(response.accessToken);
        await secureStorage.setRefreshToken(response.refreshToken);
        await secureStorage.setUserData(response.user);

        // Update Redux state
        dispatch(
          loginSuccess({
            token: response.accessToken,
            user: response.user,
          })
        );

        // Navigate to main app
        router.replace('/(tabs)');

        return { success: true };
      } catch (error: any) {
        const errorMessage =
          error?.data?.message || error?.message || 'Registration failed';
        dispatch(loginFailure(errorMessage));
        return { success: false, error: errorMessage };
      }
    },
    [dispatch, registerMutation, router]
  );

  /**
   * Logout user
   */
  const logout = useCallback(async () => {
    try {
      // Call logout API
      await logoutMutation().unwrap();
    } catch (error) {
      // Continue with logout even if API call fails
      console.error('Logout API error:', error);
    } finally {
      // Clear secure storage
      await secureStorage.clearAuthData();

      // Clear Redux state
      dispatch(logoutAction());

      // Navigate to login
      router.replace('/auth/login');
    }
  }, [dispatch, logoutMutation, router]);

  /**
   * Request password reset
   */
  const forgotPassword = useCallback(
    async (data: ForgotPasswordRequest) => {
      try {
        const response = await forgotPasswordMutation(data).unwrap();
        return { success: true, message: response.message };
      } catch (error: any) {
        const errorMessage =
          error?.data?.message ||
          error?.message ||
          'Failed to send reset email';
        return { success: false, error: errorMessage };
      }
    },
    [forgotPasswordMutation]
  );

  return {
    login,
    register,
    logout,
    forgotPassword,
    isAuthenticated: authState.isAuthenticated,
    user: authState.user,
    loading: authState.loading,
    error: authState.error,
  };
};
