import React from 'react';
import { View, ViewStyle } from 'react-native';
import { Typography } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { useTheme } from '@/theme/provider';
import {
  getUserFriendlyErrorMessage,
  isNetworkError,
  isAuthError,
  isServerError,
} from '@/services/api/errorHandling';

export interface ErrorDisplayProps {
  /**
   * The error to display
   */
  error: unknown;
  /**
   * Custom error message to display instead of auto-generated one
   */
  message?: string;
  /**
   * Title for the error display
   */
  title?: string;
  /**
   * Callback when retry button is pressed
   */
  onRetry?: () => void;
  /**
   * Custom retry button text
   */
  retryText?: string;
  /**
   * Whether to show the retry button
   */
  showRetry?: boolean;
  /**
   * Custom container style
   */
  style?: ViewStyle;
  /**
   * Size variant
   */
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Error display component with retry functionality
 */
export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
  error,
  message,
  title,
  onRetry,
  retryText = 'Try Again',
  showRetry = true,
  style,
  size = 'md',
}) => {
  const theme = useTheme();

  const errorMessage = message || getUserFriendlyErrorMessage(error);
  const errorTitle = title || getErrorTitle(error);

  const sizeStyles = {
    sm: {
      padding: theme.spacing[2],
      titleVariant: 'body' as const,
      messageVariant: 'caption' as const,
      iconSize: 32,
    },
    md: {
      padding: theme.spacing[4],
      titleVariant: 'heading3' as const,
      messageVariant: 'body' as const,
      iconSize: 48,
    },
    lg: {
      padding: theme.spacing[6],
      titleVariant: 'heading2' as const,
      messageVariant: 'body' as const,
      iconSize: 64,
    },
  };

  const currentSize = sizeStyles[size];

  return (
    <View
      style={[
        {
          padding: currentSize.padding,
          alignItems: 'center',
          justifyContent: 'center',
        },
        style,
      ]}
    >
      {/* Error Icon */}
      <View
        style={{
          width: currentSize.iconSize,
          height: currentSize.iconSize,
          borderRadius: currentSize.iconSize / 2,
          backgroundColor: theme.colors.error[100],
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: theme.spacing[3],
        }}
      >
        <Typography
          variant="heading1"
          style={{
            color: theme.colors.error[500],
            fontSize: currentSize.iconSize * 0.5,
          }}
        >
          ⚠️
        </Typography>
      </View>

      {/* Error Title */}
      <Typography
        variant={currentSize.titleVariant}
        align="center"
        style={{ marginBottom: theme.spacing[2] }}
      >
        {errorTitle}
      </Typography>

      {/* Error Message */}
      <Typography
        variant={currentSize.messageVariant}
        color="secondary"
        align="center"
        style={{ marginBottom: theme.spacing[4] }}
      >
        {errorMessage}
      </Typography>

      {/* Retry Button */}
      {showRetry && onRetry && (
        <Button
          title={retryText}
          variant="primary"
          onPress={onRetry}
          style={{ minWidth: 120 }}
        />
      )}
    </View>
  );
};

/**
 * Get appropriate error title based on error type
 */
const getErrorTitle = (error: unknown): string => {
  if (isNetworkError(error)) {
    return 'Connection Error';
  }

  if (isAuthError(error)) {
    return 'Authentication Error';
  }

  if (isServerError(error)) {
    return 'Server Error';
  }

  return 'Error';
};

/**
 * Inline error display for forms and smaller components
 */
export interface InlineErrorProps {
  /**
   * The error to display
   */
  error: unknown;
  /**
   * Custom error message
   */
  message?: string;
  /**
   * Custom container style
   */
  style?: ViewStyle;
}

export const InlineError: React.FC<InlineErrorProps> = ({
  error,
  message,
  style,
}) => {
  const theme = useTheme();

  const errorMessage = message || getUserFriendlyErrorMessage(error);

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          padding: theme.spacing[2],
          backgroundColor: theme.colors.error[50],
          borderRadius: theme.spacing[1],
          borderLeftWidth: 3,
          borderLeftColor: theme.colors.error[500],
        },
        style,
      ]}
    >
      <Typography
        variant="caption"
        style={{
          color: theme.colors.error[700],
          flex: 1,
        }}
      >
        {errorMessage}
      </Typography>
    </View>
  );
};

/**
 * Full screen error display
 */
export interface ErrorScreenProps {
  /**
   * The error to display
   */
  error: unknown;
  /**
   * Custom error message
   */
  message?: string;
  /**
   * Custom title
   */
  title?: string;
  /**
   * Callback when retry button is pressed
   */
  onRetry?: () => void;
  /**
   * Custom retry button text
   */
  retryText?: string;
  /**
   * Custom container style
   */
  style?: ViewStyle;
}

export const ErrorScreen: React.FC<ErrorScreenProps> = ({
  error,
  message,
  title,
  onRetry,
  retryText,
  style,
}) => {
  const theme = useTheme();

  return (
    <View
      style={[
        {
          flex: 1,
          backgroundColor: theme.colors.background,
          alignItems: 'center',
          justifyContent: 'center',
        },
        style,
      ]}
    >
      <ErrorDisplay
        error={error}
        {...(message && { message })}
        {...(title && { title })}
        {...(onRetry && { onRetry })}
        {...(retryText && { retryText })}
        size="lg"
      />
    </View>
  );
};
