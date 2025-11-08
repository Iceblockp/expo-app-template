import React, { ComponentType, lazy, Suspense } from 'react';
import { View, ActivityIndicator } from 'react-native';

/**
 * Lazy load a component with a loading fallback
 * @param importFunc - Dynamic import function
 * @param fallback - Optional custom loading component
 * @returns Lazy loaded component wrapped in Suspense
 */
export function lazyLoad<T extends ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  fallback?: React.ReactNode
) {
  const LazyComponent = lazy(importFunc);

  const LazyWrapper = (props: React.ComponentProps<T>) => (
    <Suspense fallback={fallback || <DefaultLoadingFallback />}>
      <LazyComponent {...props} />
    </Suspense>
  );

  LazyWrapper.displayName = 'LazyLoadedComponent';

  return LazyWrapper;
}

/**
 * Default loading fallback component
 */
const DefaultLoadingFallback = () => {
  return (
    <View className="flex-1 items-center justify-center bg-background">
      <ActivityIndicator size="large" />
    </View>
  );
};

DefaultLoadingFallback.displayName = 'DefaultLoadingFallback';

/**
 * Preload a lazy component to improve perceived performance
 * @param importFunc - Dynamic import function
 */
export function preloadComponent<T extends ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>
) {
  return importFunc();
}
