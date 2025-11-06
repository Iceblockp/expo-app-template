import { QueryClient, DefaultOptions } from '@tanstack/react-query';
import { API_CONFIG } from './client';

// Default query options
const defaultQueryOptions: DefaultOptions = {
  queries: {
    // Stale time - how long data is considered fresh
    staleTime: 5 * 60 * 1000, // 5 minutes

    // Cache time - how long data stays in cache after component unmounts
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)

    // Retry configuration
    retry: (failureCount, error: any) => {
      // Don't retry on 4xx errors (client errors)
      if (error?.status >= 400 && error?.status < 500) {
        return false;
      }

      // Retry up to 3 times for other errors
      return failureCount < API_CONFIG.retryAttempts;
    },

    // Retry delay with exponential backoff
    retryDelay: attemptIndex =>
      Math.min(API_CONFIG.retryDelay * Math.pow(2, attemptIndex), 30000),

    // Refetch on window focus (useful for web)
    refetchOnWindowFocus: false,

    // Refetch on reconnect
    refetchOnReconnect: true,

    // Refetch on mount if data is stale
    refetchOnMount: true,
  },
  mutations: {
    // Retry mutations once on failure
    retry: 1,

    // Retry delay for mutations
    retryDelay: API_CONFIG.retryDelay,
  },
};

// Create and configure the query client
export const queryClient = new QueryClient({
  defaultOptions: defaultQueryOptions,
});

// Query keys factory for consistent key management
export const queryKeys = {
  // Auth related queries
  auth: {
    all: ['auth'] as const,
    user: () => [...queryKeys.auth.all, 'user'] as const,
    verify: () => [...queryKeys.auth.all, 'verify'] as const,
  },

  // User related queries
  users: {
    all: ['users'] as const,
    profile: (userId: string) =>
      [...queryKeys.users.all, 'profile', userId] as const,
    preferences: (userId: string) =>
      [...queryKeys.users.all, 'preferences', userId] as const,
    notifications: (userId: string, page?: number) =>
      [...queryKeys.users.all, 'notifications', userId, { page }] as const,
  },

  // App related queries
  app: {
    all: ['app'] as const,
    config: () => [...queryKeys.app.all, 'config'] as const,
    features: () => [...queryKeys.app.all, 'features'] as const,
  },
} as const;

// Error handling utilities
export const queryErrorHandler = (error: any) => {
  if (__DEV__) {
    console.error('Query error:', error);
  }

  // You can add global error handling here
  // For example, show toast notifications, log to analytics, etc.

  if (error?.status === 401) {
    // Handle unauthorized errors globally
    if (__DEV__) {
      console.log('Unauthorized access detected');
    }
    // You might want to redirect to login or clear auth state
  }

  if (error?.status >= 500) {
    // Handle server errors
    if (__DEV__) {
      console.log('Server error detected');
    }
    // You might want to show a generic error message
  }
};

// Mutation error handler
export const mutationErrorHandler = (error: any) => {
  if (__DEV__) {
    console.error('Mutation error:', error);
  }

  // Handle mutation-specific errors
  // You can show user-friendly error messages here
};

// Utility function to invalidate related queries
export const invalidateQueries = {
  auth: () => queryClient.invalidateQueries({ queryKey: queryKeys.auth.all }),
  user: (userId?: string) => {
    if (userId) {
      queryClient.invalidateQueries({
        queryKey: queryKeys.users.profile(userId),
      });
    } else {
      queryClient.invalidateQueries({ queryKey: queryKeys.users.all });
    }
  },
  app: () => queryClient.invalidateQueries({ queryKey: queryKeys.app.all }),
};

// Prefetch utilities for common queries
export const prefetchQueries = {
  userProfile: async (userId: string) => {
    await queryClient.prefetchQuery({
      queryKey: queryKeys.users.profile(userId),
      queryFn: () => {
        // This would typically call your API
        // For now, we'll leave it as a placeholder
        return Promise.resolve(null);
      },
    });
  },
};
