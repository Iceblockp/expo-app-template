import React, { useMemo } from 'react';
import {
  View,
  ActivityIndicator,
  ViewStyle,
  ViewProps,
  Animated,
} from 'react-native';
import { useTheme } from '@/theme/provider';
import { Typography } from './Typography';

export type LoadingSize = 'sm' | 'md' | 'lg';

// Spinner Component
export interface SpinnerProps extends Omit<ViewProps, 'style'> {
  /**
   * Size of the spinner
   */
  size?: LoadingSize | number;
  /**
   * Color of the spinner
   */
  color?: string;
  /**
   * Custom container style
   */
  style?: ViewStyle;
}

/**
 * Spinner loading component
 */
export const Spinner: React.FC<SpinnerProps> = ({
  size = 'md',
  color,
  style,
  ...props
}) => {
  const theme = useTheme();

  const sizeMap = {
    sm: 'small' as const,
    md: 'large' as const,
    lg: 'large' as const,
  };

  const spinnerSize = typeof size === 'string' ? sizeMap[size] : size;
  const spinnerColor = color || theme.colors.primary[500];

  return (
    <View
      style={[
        {
          alignItems: 'center',
          justifyContent: 'center',
        },
        style,
      ]}
      accessibilityRole="progressbar"
      {...props}
    >
      <ActivityIndicator size={spinnerSize} color={spinnerColor} />
    </View>
  );
};

// Skeleton Component
export interface SkeletonProps extends Omit<ViewProps, 'style'> {
  /**
   * Width of the skeleton
   */
  width?: ViewStyle['width'];
  /**
   * Height of the skeleton
   */
  height?: number;
  /**
   * Border radius of the skeleton
   */
  borderRadius?: number;
  /**
   * Custom skeleton style
   */
  style?: ViewStyle;
  /**
   * Whether to animate the skeleton
   */
  animated?: boolean;
}

/**
 * Skeleton loading component for placeholder content
 */
export const Skeleton: React.FC<SkeletonProps> = ({
  width = '100%',
  height = 20,
  borderRadius = 4,
  style,
  animated = true,
  ...props
}) => {
  const theme = useTheme();

  const animatedValue = useMemo(() => new Animated.Value(0), []);

  React.useEffect(() => {
    if (animated) {
      const animation = Animated.loop(
        Animated.sequence([
          Animated.timing(animatedValue, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: false,
          }),
          Animated.timing(animatedValue, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: false,
          }),
        ])
      );
      animation.start();
      return () => animation.stop();
    }
    return undefined;
  }, [animated, animatedValue]);

  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [theme.colors.neutral[200], theme.colors.neutral[300]],
  });

  const skeletonStyle: ViewStyle = {
    width,
    height,
    borderRadius,
    backgroundColor: animated ? undefined : theme.colors.neutral[200],
    ...style,
  };

  if (animated) {
    return (
      <Animated.View
        style={[skeletonStyle, { backgroundColor }]}
        accessibilityRole="none"
        {...props}
      />
    );
  }

  return <View style={skeletonStyle} accessibilityRole="none" {...props} />;
};
// Progress Component
export interface ProgressProps extends Omit<ViewProps, 'style'> {
  /**
   * Progress value (0-100)
   */
  value: number;
  /**
   * Maximum value
   */
  max?: number;
  /**
   * Height of the progress bar
   */
  height?: number;
  /**
   * Color of the progress bar
   */
  color?: string;
  /**
   * Background color of the progress track
   */
  backgroundColor?: string;
  /**
   * Border radius of the progress bar
   */
  borderRadius?: number;
  /**
   * Custom container style
   */
  style?: ViewStyle;
  /**
   * Whether to show progress text
   */
  showText?: boolean;
  /**
   * Custom progress text
   */
  text?: string;
}

/**
 * Progress bar component
 */
export const Progress: React.FC<ProgressProps> = ({
  value,
  max = 100,
  height = 8,
  color,
  backgroundColor,
  borderRadius = 4,
  style,
  showText = false,
  text,
  ...props
}) => {
  const theme = useTheme();

  const progressColor = color || theme.colors.primary[500];
  const trackColor = backgroundColor || theme.colors.neutral[200];
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  const containerStyle: ViewStyle = {
    width: '100%',
    ...style,
  };

  const trackStyle: ViewStyle = {
    height,
    backgroundColor: trackColor,
    borderRadius,
    overflow: 'hidden',
  };

  const fillStyle: ViewStyle = {
    height: '100%',
    width: `${percentage}%`,
    backgroundColor: progressColor,
    borderRadius,
  };

  const progressText = text || `${Math.round(percentage)}%`;

  return (
    <View
      style={containerStyle}
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 0, max, now: value }}
      {...props}
    >
      <View style={trackStyle}>
        <View style={fillStyle} />
      </View>
      {showText && (
        <Typography
          variant="caption"
          color="secondary"
          align="center"
          style={{ marginTop: theme.spacing[1] }}
        >
          {progressText}
        </Typography>
      )}
    </View>
  );
};

// Loading Screen Component
export interface LoadingScreenProps {
  /**
   * Loading message to display
   */
  message?: string;
  /**
   * Size of the spinner
   */
  size?: LoadingSize;
  /**
   * Custom container style
   */
  style?: ViewStyle;
}

/**
 * Full screen loading component
 */
export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  message = 'Loading...',
  size = 'lg',
  style,
}) => {
  const theme = useTheme();

  return (
    <View
      style={[
        {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: theme.colors.background,
          padding: theme.spacing[4],
        },
        style,
      ]}
    >
      <Spinner size={size} />
      {message && (
        <Typography
          variant="body"
          color="secondary"
          align="center"
          style={{ marginTop: theme.spacing[4] }}
        >
          {message}
        </Typography>
      )}
    </View>
  );
};
