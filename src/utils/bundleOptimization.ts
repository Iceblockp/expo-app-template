/**
 * Bundle optimization utilities and configuration
 */

/**
 * Dynamically import heavy libraries only when needed
 */
export const DynamicImports = {
  /**
   * Load animation library dynamically
   */
  loadAnimationLibrary: async () => {
    const { default: Animated } = await import('react-native-reanimated');
    return Animated;
  },

  /**
   * Load vector icons dynamically
   */
  loadVectorIcons: async () => {
    const icons = await import('@expo/vector-icons');
    return icons;
  },
};

/**
 * Code splitting configuration for Metro bundler
 */
export const BundleConfig = {
  // Feature flags for conditional loading
  features: {
    analytics: false,
    crashReporting: false,
    advancedAnimations: true,
  },

  // Asset optimization settings
  assets: {
    // Compress images above this size (in bytes)
    imageCompressionThreshold: 100 * 1024, // 100KB
    // Maximum image dimensions
    maxImageWidth: 2048,
    maxImageHeight: 2048,
  },

  // Bundle size limits (in bytes)
  limits: {
    // Warn if main bundle exceeds this size
    mainBundleWarning: 5 * 1024 * 1024, // 5MB
    // Warn if any chunk exceeds this size
    chunkSizeWarning: 1 * 1024 * 1024, // 1MB
  },
};

/**
 * Check if a feature is enabled
 */
export function isFeatureEnabled(
  feature: keyof typeof BundleConfig.features
): boolean {
  return BundleConfig.features[feature];
}

/**
 * Lazy load a module with error handling
 */
export async function lazyLoadModule<T>(
  importFunc: () => Promise<T>,
  fallback?: T
): Promise<T> {
  try {
    return await importFunc();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn('Failed to lazy load module:', error);
    if (fallback) {
      return fallback;
    }
    throw error;
  }
}
