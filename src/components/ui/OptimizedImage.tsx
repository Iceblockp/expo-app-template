import React, { useState, useCallback } from 'react';
import {
  Image,
  ImageProps,
  View,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { ImagePriority } from '../../utils/imageOptimization';

export interface OptimizedImageProps extends Omit<ImageProps, 'source'> {
  source: { uri: string } | number;
  priority?: ImagePriority;
  showLoadingIndicator?: boolean;
  fallbackSource?: number;
  onLoadStart?: () => void;
  onLoadEnd?: () => void;
  onError?: (error: any) => void;
}

/**
 * Optimized Image component with loading states and error handling
 */
export function OptimizedImage({
  source,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  priority: _priority = ImagePriority.NORMAL,
  showLoadingIndicator = true,
  fallbackSource,
  onLoadStart,
  onLoadEnd,
  onError,
  style,
  ...props
}: OptimizedImageProps) {
  const [loading, setLoading] = useState(true);
  const [, setError] = useState(false);
  const [imageSource, setImageSource] = useState(source);

  const handleLoadStart = useCallback(() => {
    setLoading(true);
    onLoadStart?.();
  }, [onLoadStart]);

  const handleLoadEnd = useCallback(() => {
    setLoading(false);
    onLoadEnd?.();
  }, [onLoadEnd]);

  const handleError = useCallback(
    (e: any) => {
      setLoading(false);
      setError(true);
      onError?.(e);

      // Use fallback source if available
      if (fallbackSource && imageSource !== fallbackSource) {
        setImageSource(fallbackSource);
        setError(false);
      }
    },
    [fallbackSource, imageSource, onError]
  );

  return (
    <View style={[styles.container, style]}>
      <Image
        {...props}
        source={imageSource}
        style={[styles.image, style]}
        onLoadStart={handleLoadStart}
        onLoadEnd={handleLoadEnd}
        onError={handleError}
      />
      {loading && showLoadingIndicator && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
});
