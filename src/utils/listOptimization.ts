import React, { useMemo, useCallback } from 'react';

/**
 * List optimization utilities for FlatList and SectionList
 */

/**
 * Default optimization configuration for lists
 */
export const ListOptimizationConfig = {
  // Initial number of items to render
  initialNumToRender: 10,
  // Number of items to render per batch
  maxToRenderPerBatch: 10,
  // Render ahead distance in pixels
  windowSize: 5,
  // Update cells batch period in ms
  updateCellsBatchingPeriod: 50,
  // Remove clipped subviews for better memory usage
  removeClippedSubviews: true,
};

/**
 * Hook to optimize FlatList rendering
 */
export function useOptimizedList<T>(_data: T[], itemHeight?: number) {
  const keyExtractor = useCallback((item: T, index: number) => {
    // Use item id if available, otherwise use index
    if (item && typeof item === 'object' && 'id' in item) {
      return String((item as any).id);
    }
    return String(index);
  }, []);

  const getItemLayout = useMemo(() => {
    if (!itemHeight) return undefined;

    return (_: ArrayLike<T> | null | undefined, index: number) => ({
      length: itemHeight,
      offset: itemHeight * index,
      index,
    });
  }, [itemHeight]);

  return {
    keyExtractor,
    getItemLayout,
    ...ListOptimizationConfig,
  };
}

/**
 * Hook to memoize list items
 */
export function useMemoizedListItem<T>(
  renderItem: (item: T, index: number) => React.ReactElement,
  dependencies: any[] = []
) {
  return useCallback(
    ({ item, index }: { item: T; index: number }) => renderItem(item, index),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    dependencies
  );
}

/**
 * Chunk large arrays for better performance
 */
export function chunkArray<T>(array: T[], chunkSize: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
}

/**
 * Virtual scrolling configuration
 */
export const VirtualScrollConfig = {
  // Overscan count for smoother scrolling
  overscan: 3,
  // Estimated item size for dynamic content
  estimatedItemSize: 50,
  // Scroll throttle in ms
  scrollThrottle: 16,
};

/**
 * Hook to implement infinite scroll pagination
 */
export function useInfiniteScroll<T>(
  data: T[],
  loadMore: () => Promise<void>,
  hasMore: boolean
) {
  const [loading, setLoading] = React.useState(false);

  const handleEndReached = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      await loadMore();
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, loadMore]);

  return {
    data,
    loading,
    handleEndReached,
    onEndReachedThreshold: 0.5,
  };
}
