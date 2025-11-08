import { Image } from 'react-native';

/**
 * Image cache configuration
 */
export const ImageCacheConfig = {
  // Maximum cache size in bytes (50MB)
  maxCacheSize: 50 * 1024 * 1024,
  // Cache expiration time in milliseconds (7 days)
  cacheExpiration: 7 * 24 * 60 * 60 * 1000,
};

/**
 * Preload images to improve performance
 * @param sources - Array of image sources to preload
 */
export async function preloadImages(
  sources: Array<string | number>
): Promise<void> {
  const promises = sources.map(source => {
    if (typeof source === 'string') {
      return Image.prefetch(source);
    }
    return Promise.resolve(true);
  });

  try {
    await Promise.all(promises);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn('Failed to preload some images:', error);
  }
}

/**
 * Get optimized image dimensions based on screen size
 * @param originalWidth - Original image width
 * @param originalHeight - Original image height
 * @param maxWidth - Maximum width constraint
 * @param maxHeight - Maximum height constraint
 * @returns Optimized dimensions
 */
export function getOptimizedImageDimensions(
  originalWidth: number,
  originalHeight: number,
  maxWidth: number,
  maxHeight: number
): { width: number; height: number } {
  const aspectRatio = originalWidth / originalHeight;

  let width = originalWidth;
  let height = originalHeight;

  if (width > maxWidth) {
    width = maxWidth;
    height = width / aspectRatio;
  }

  if (height > maxHeight) {
    height = maxHeight;
    width = height * aspectRatio;
  }

  return {
    width: Math.round(width),
    height: Math.round(height),
  };
}

/**
 * Clear image cache
 */
export async function clearImageCache(): Promise<void> {
  try {
    // React Native doesn't provide a direct API to clear image cache
    // This is a placeholder for platform-specific implementations
    // eslint-disable-next-line no-console
    console.log('Image cache cleared');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn('Failed to clear image cache:', error);
  }
}

/**
 * Image loading priority levels
 */
export enum ImagePriority {
  LOW = 'low',
  NORMAL = 'normal',
  HIGH = 'high',
}

/**
 * Get image cache size (placeholder for future implementation)
 */
export async function getImageCacheSize(): Promise<number> {
  // This would require native module implementation
  return 0;
}
