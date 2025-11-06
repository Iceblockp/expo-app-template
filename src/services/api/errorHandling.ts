import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

// Type guards for RTK Query errors
export const isFetchBaseQueryError = (
  error: unknown
): error is FetchBaseQueryError => {
  return typeof error === 'object' && error != null && 'status' in error;
};

export const isErrorWithMessage = (
  error: unknown
): error is { message: string } => {
  return (
    typeof error === 'object' &&
    error != null &&
    'message' in error &&
    typeof (error as any).message === 'string'
  );
};

// Error message extraction utilities
export const getErrorMessage = (error: unknown): string => {
  if (isFetchBaseQueryError(error)) {
    // Handle FetchBaseQueryError
    if ('error' in error) {
      return error.error;
    }

    if ('data' in error && error.data) {
      if (typeof error.data === 'string') {
        return error.data;
      }

      if (typeof error.data === 'object' && 'message' in error.data) {
        return (error.data as any).message;
      }
    }

    return `HTTP ${error.status}`;
  }

  if (isErrorWithMessage(error)) {
    return error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'An unknown error occurred';
};

// HTTP status code utilities
export const getErrorStatus = (error: unknown): number | null => {
  if (isFetchBaseQueryError(error) && typeof error.status === 'number') {
    return error.status;
  }
  return null;
};

// Error classification
export const isNetworkError = (error: unknown): boolean => {
  if (isFetchBaseQueryError(error)) {
    return error.status === 'FETCH_ERROR' || error.status === 'TIMEOUT_ERROR';
  }
  return false;
};

export const isAuthError = (error: unknown): boolean => {
  const status = getErrorStatus(error);
  return status === 401 || status === 403;
};

export const isServerError = (error: unknown): boolean => {
  const status = getErrorStatus(error);
  return status !== null && status >= 500;
};

export const isClientError = (error: unknown): boolean => {
  const status = getErrorStatus(error);
  return status !== null && status >= 400 && status < 500;
};

// User-friendly error messages
export const getUserFriendlyErrorMessage = (error: unknown): string => {
  if (isNetworkError(error)) {
    return 'Network connection error. Please check your internet connection and try again.';
  }

  if (isAuthError(error)) {
    return 'Authentication failed. Please log in again.';
  }

  if (isServerError(error)) {
    return 'Server error occurred. Please try again later.';
  }

  const status = getErrorStatus(error);

  switch (status) {
    case 400:
      return 'Invalid request. Please check your input and try again.';
    case 404:
      return 'The requested resource was not found.';
    case 409:
      return 'Conflict occurred. The resource may have been modified by another user.';
    case 422:
      return 'Validation error. Please check your input.';
    case 429:
      return 'Too many requests. Please wait a moment and try again.';
    default:
      return getErrorMessage(error) || 'An unexpected error occurred.';
  }
};

// Retry logic utilities
export const shouldRetry = (
  error: unknown,
  attemptNumber: number,
  maxAttempts: number = 3
): boolean => {
  if (attemptNumber >= maxAttempts) {
    return false;
  }

  // Don't retry client errors (4xx)
  if (isClientError(error)) {
    return false;
  }

  // Retry network errors and server errors
  return isNetworkError(error) || isServerError(error);
};

// Exponential backoff delay calculation
export const getRetryDelay = (
  attemptNumber: number,
  baseDelay: number = 1000
): number => {
  return Math.min(baseDelay * Math.pow(2, attemptNumber), 30000); // Max 30 seconds
};

// Error logging utility
export const logError = (error: unknown, context?: string) => {
  const errorMessage = getErrorMessage(error);
  const errorStatus = getErrorStatus(error);

  if (__DEV__) {
    console.error('API Error:', {
      message: errorMessage,
      status: errorStatus,
      context,
      error,
      timestamp: new Date().toISOString(),
    });
  }

  // In production, you might want to send this to an error tracking service
  // like Sentry, Bugsnag, or your own logging service
};

// Error boundary helper for React Query
export const createErrorHandler = (context: string) => {
  return (error: unknown) => {
    logError(error, context);

    // You can add additional error handling logic here
    // such as showing toast notifications, redirecting, etc.
  };
};
