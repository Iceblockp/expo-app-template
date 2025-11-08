import React, { useEffect, useRef, useCallback } from 'react';

/**
 * Memory management utilities for React Native
 */

/**
 * Hook to safely set state only if component is mounted
 * Prevents memory leaks from async operations
 */
export function useSafeState<T>(
  initialState: T
): [T, (value: T | ((prev: T) => T)) => void] {
  const [state, setState] = React.useState<T>(initialState);
  const isMountedRef = useRef(true);

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const setSafeState = useCallback((value: T | ((prev: T) => T)) => {
    if (isMountedRef.current) {
      setState(value);
    }
  }, []);

  return [state, setSafeState];
}

/**
 * Hook to cleanup async operations on unmount
 */
export function useAsyncCleanup() {
  const cleanupFunctionsRef = useRef<Array<() => void>>([]);

  const addCleanup = useCallback((cleanup: () => void) => {
    cleanupFunctionsRef.current.push(cleanup);
  }, []);

  useEffect(() => {
    return () => {
      cleanupFunctionsRef.current.forEach(cleanup => cleanup());
      cleanupFunctionsRef.current = [];
    };
  }, []);

  return addCleanup;
}

/**
 * Hook to debounce expensive operations
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = React.useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

/**
 * Hook to throttle expensive operations
 */
export function useThrottle<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T {
  const lastRunRef = useRef<number>(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined
  );

  const throttledCallback = useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now();
      const timeSinceLastRun = now - lastRunRef.current;

      if (timeSinceLastRun >= delay) {
        callback(...args);
        lastRunRef.current = now;
      } else {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
          callback(...args);
          lastRunRef.current = Date.now();
        }, delay - timeSinceLastRun);
      }
    },
    [callback, delay]
  ) as T;

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return throttledCallback;
}

/**
 * Hook to track component mount status
 */
export function useIsMounted(): () => boolean {
  const isMountedRef = useRef(true);

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  return useCallback(() => isMountedRef.current, []);
}

/**
 * Memory cleanup utilities
 */
export const MemoryUtils = {
  /**
   * Clear large data structures from memory
   */
  clearLargeData: (data: any) => {
    if (Array.isArray(data)) {
      data.length = 0;
    } else if (typeof data === 'object' && data !== null) {
      Object.keys(data).forEach(key => {
        delete data[key];
      });
    }
  },

  /**
   * Check if memory usage is high (placeholder for native implementation)
   */
  isMemoryHigh: (): boolean => {
    // This would require native module implementation
    return false;
  },

  /**
   * Request garbage collection (development only)
   */
  requestGC: () => {
    if (__DEV__ && typeof global !== 'undefined' && 'gc' in global) {
      (global as any).gc();
    }
  },
};

/**
 * Hook to automatically cleanup intervals
 */
export function useInterval(callback: () => void, delay: number | null) {
  const savedCallbackRef = useRef(callback);

  useEffect(() => {
    savedCallbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay === null) {
      return;
    }

    const id = setInterval(() => savedCallbackRef.current(), delay);

    return () => clearInterval(id);
  }, [delay]);
}

/**
 * Hook to automatically cleanup timeouts
 */
export function useTimeout(callback: () => void, delay: number | null) {
  const savedCallbackRef = useRef(callback);

  useEffect(() => {
    savedCallbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay === null) {
      return;
    }

    const id = setTimeout(() => savedCallbackRef.current(), delay);

    return () => clearTimeout(id);
  }, [delay]);
}
