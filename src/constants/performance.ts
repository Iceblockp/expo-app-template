/**
 * Performance configuration constants
 */

export const PerformanceConfig = {
  /**
   * Image optimization settings
   */
  images: {
    // Maximum cache size in MB
    maxCacheSize: 50,
    // Cache expiration in days
    cacheExpiration: 7,
    // Compression quality (0-1)
    compressionQuality: 0.8,
    // Maximum dimensions
    maxWidth: 2048,
    maxHeight: 2048,
  },

  /**
   * List rendering optimization
   */
  lists: {
    // Initial items to render
    initialNumToRender: 10,
    // Items per batch
    maxToRenderPerBatch: 10,
    // Window size multiplier
    windowSize: 5,
    // Update batching period in ms
    updateCellsBatchingPeriod: 50,
    // Remove clipped subviews
    removeClippedSubviews: true,
  },

  /**
   * Animation settings
   */
  animations: {
    // Use native driver when possible
    useNativeDriver: true,
    // Default animation duration in ms
    defaultDuration: 300,
    // Reduce motion for accessibility
    reduceMotion: false,
  },

  /**
   * Network optimization
   */
  network: {
    // Request timeout in ms
    timeout: 30000,
    // Retry attempts
    maxRetries: 3,
    // Cache duration in ms
    cacheDuration: 5 * 60 * 1000, // 5 minutes
  },

  /**
   * Memory management
   */
  memory: {
    // Enable memory monitoring
    enableMonitoring: __DEV__,
    // Warning threshold in MB
    warningThreshold: 100,
    // Clear cache on memory warning
    clearCacheOnWarning: true,
  },

  /**
   * Bundle optimization
   */
  bundle: {
    // Enable code splitting
    enableCodeSplitting: true,
    // Lazy load heavy modules
    lazyLoadModules: true,
    // Remove console logs in production
    removeConsoleLogs: !__DEV__,
  },

  /**
   * Render optimization
   */
  rendering: {
    // Enable concurrent features
    enableConcurrentFeatures: true,
    // Debounce delay for expensive operations in ms
    debounceDelay: 300,
    // Throttle delay for scroll events in ms
    throttleDelay: 16,
  },
} as const;

/**
 * Performance thresholds for monitoring
 */
export const PerformanceThresholds = {
  // Component render time in ms
  renderTime: 16,
  // API response time in ms
  apiResponseTime: 1000,
  // Screen transition time in ms
  screenTransition: 300,
  // Image load time in ms
  imageLoad: 2000,
} as const;

/**
 * Feature flags for performance features
 */
export const PerformanceFeatures = {
  // Enable lazy loading
  lazyLoading: true,
  // Enable image optimization
  imageOptimization: true,
  // Enable list virtualization
  listVirtualization: true,
  // Enable memory monitoring
  memoryMonitoring: __DEV__,
  // Enable performance tracking
  performanceTracking: __DEV__,
} as const;
