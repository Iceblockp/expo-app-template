import { useState, useCallback } from 'react';
import { logError } from '@/services/api/errorHandling';

export interface AsyncOperationState<T> {
  data: T | null;
  loading: boolean;
  error: unknown | null;
}

export interface UseAsyncOperationReturn<T, Args extends any[]> {
  /**
   * Current data from the operation
   */
  data: T | null;
  /**
   * Whether the operation is currently loading
   */
  loading: boolean;
  /**
   * Error from the operation, if any
   */
  error: unknown | null;
  /**
   * Execute the async operation
   */
  execute: (...args: Args) => Promise<T | null>;
  /**
   * Reset the state
   */
  reset: () => void;
  /**
   * Set data manually
   */
  setData: (data: T | null) => void;
  /**
   * Set error manually
   */
  setError: (error: unknown | null) => void;
}

/**
 * Hook for managing async operations with loading and error states
 *
 * @example
 * ```tsx
 * const { data, loading, error, execute } = useAsyncOperation(
 *   async (userId: string) => {
 *     const response = await fetch(`/api/users/${userId}`);
 *     return response.json();
 *   }
 * );
 *
 * // Later in your component
 * <Button onPress={() => execute('123')} disabled={loading}>
 *   Load User
 * </Button>
 * ```
 */
export const useAsyncOperation = <T, Args extends any[] = []>(
  operation: (...args: Args) => Promise<T>,
  options?: {
    /**
     * Initial data value
     */
    initialData?: T | null;
    /**
     * Callback when operation succeeds
     */
    onSuccess?: (data: T) => void;
    /**
     * Callback when operation fails
     */
    onError?: (error: unknown) => void;
    /**
     * Context for error logging
     */
    errorContext?: string;
  }
): UseAsyncOperationReturn<T, Args> => {
  const [state, setState] = useState<AsyncOperationState<T>>({
    data: options?.initialData ?? null,
    loading: false,
    error: null,
  });

  const execute = useCallback(
    async (...args: Args): Promise<T | null> => {
      setState(prev => ({
        ...prev,
        loading: true,
        error: null,
      }));

      try {
        const result = await operation(...args);

        setState({
          data: result,
          loading: false,
          error: null,
        });

        options?.onSuccess?.(result);

        return result;
      } catch (error) {
        setState({
          data: null,
          loading: false,
          error,
        });

        logError(error, options?.errorContext);
        options?.onError?.(error);

        return null;
      }
    },
    [operation, options]
  );

  const reset = useCallback(() => {
    setState({
      data: options?.initialData ?? null,
      loading: false,
      error: null,
    });
  }, [options?.initialData]);

  const setData = useCallback((data: T | null) => {
    setState(prev => ({
      ...prev,
      data,
    }));
  }, []);

  const setError = useCallback((error: unknown | null) => {
    setState(prev => ({
      ...prev,
      error,
    }));
  }, []);

  return {
    data: state.data,
    loading: state.loading,
    error: state.error,
    execute,
    reset,
    setData,
    setError,
  };
};

/**
 * Hook for managing async operations with automatic retry
 */
export const useAsyncOperationWithRetry = <T, Args extends any[] = []>(
  operation: (...args: Args) => Promise<T>,
  options?: {
    /**
     * Maximum number of retry attempts
     */
    maxRetries?: number;
    /**
     * Delay between retries in milliseconds
     */
    retryDelay?: number;
    /**
     * Whether to use exponential backoff
     */
    exponentialBackoff?: boolean;
    /**
     * Callback when operation succeeds
     */
    onSuccess?: (data: T) => void;
    /**
     * Callback when operation fails
     */
    onError?: (error: unknown) => void;
    /**
     * Context for error logging
     */
    errorContext?: string;
  }
): UseAsyncOperationReturn<T, Args> & { retryCount: number } => {
  const [retryCount, setRetryCount] = useState(0);

  const maxRetries = options?.maxRetries ?? 3;
  const baseDelay = options?.retryDelay ?? 1000;
  const exponentialBackoff = options?.exponentialBackoff ?? true;

  const operationWithRetry = useCallback(
    async (...args: Args): Promise<T> => {
      let lastError: unknown;
      let attempt = 0;

      while (attempt <= maxRetries) {
        try {
          const result = await operation(...args);
          setRetryCount(0); // Reset retry count on success
          return result;
        } catch (error) {
          lastError = error;
          attempt++;
          setRetryCount(attempt);

          if (attempt <= maxRetries) {
            const delay = exponentialBackoff
              ? baseDelay * Math.pow(2, attempt - 1)
              : baseDelay;

            await new Promise(resolve => setTimeout(resolve, delay));
          }
        }
      }

      throw lastError;
    },
    [operation, maxRetries, baseDelay, exponentialBackoff]
  );

  const asyncOperation = useAsyncOperation(operationWithRetry, options);

  return {
    ...asyncOperation,
    retryCount,
  };
};
