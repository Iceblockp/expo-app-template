import React from 'react';

/**
 * Performance monitoring utilities
 */

interface PerformanceMetric {
  name: string;
  startTime: number;
  endTime?: number;
  duration?: number;
}

class PerformanceMonitor {
  private metrics: Map<string, PerformanceMetric> = new Map();
  private enabled: boolean = __DEV__;

  /**
   * Start measuring a performance metric
   */
  start(name: string): void {
    if (!this.enabled) return;

    this.metrics.set(name, {
      name,
      startTime: Date.now(),
    });
  }

  /**
   * End measuring a performance metric
   */
  end(name: string): number | null {
    if (!this.enabled) return null;

    const metric = this.metrics.get(name);
    if (!metric) {
      // eslint-disable-next-line no-console
      console.warn(`Performance metric "${name}" was not started`);
      return null;
    }

    const endTime = Date.now();
    const duration = endTime - metric.startTime;

    metric.endTime = endTime;
    metric.duration = duration;

    if (__DEV__) {
      // eslint-disable-next-line no-console
      console.log(`[Performance] ${name}: ${duration}ms`);
    }

    return duration;
  }

  /**
   * Measure a function execution time
   */
  async measure<T>(name: string, fn: () => T | Promise<T>): Promise<T> {
    if (!this.enabled) {
      return fn();
    }

    this.start(name);
    try {
      const result = await fn();
      this.end(name);
      return result;
    } catch (error) {
      this.end(name);
      throw error;
    }
  }

  /**
   * Get all metrics
   */
  getMetrics(): PerformanceMetric[] {
    return Array.from(this.metrics.values());
  }

  /**
   * Clear all metrics
   */
  clear(): void {
    this.metrics.clear();
  }

  /**
   * Enable or disable monitoring
   */
  setEnabled(enabled: boolean): void {
    this.enabled = enabled;
  }
}

// Singleton instance
export const performanceMonitor = new PerformanceMonitor();

/**
 * Hook to measure component render time
 */
export function useRenderTime(componentName: string): void {
  const renderCount = React.useRef(0);
  const startTime = React.useRef(0);

  React.useEffect(() => {
    if (!__DEV__) return;

    renderCount.current += 1;
    const now = Date.now();

    if (startTime.current > 0) {
      const duration = now - startTime.current;

      if (duration > 16) {
        // Warn if render takes longer than one frame (16ms)
        // eslint-disable-next-line no-console
        console.warn(
          `[Performance] ${componentName} render #${renderCount.current} took ${duration}ms`
        );
      }
    }

    startTime.current = now;
  });
}

/**
 * Measure async operation performance
 */
export async function measureAsync<T>(
  name: string,
  operation: () => Promise<T>
): Promise<T> {
  return performanceMonitor.measure(name, operation);
}

/**
 * Measure sync operation performance
 */
export function measureSync<T>(name: string, operation: () => T): T {
  if (!__DEV__) {
    return operation();
  }

  performanceMonitor.start(name);
  try {
    const result = operation();
    performanceMonitor.end(name);
    return result;
  } catch (error) {
    performanceMonitor.end(name);
    throw error;
  }
}
