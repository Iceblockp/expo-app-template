import React, { Component, ErrorInfo, ReactNode } from 'react';
import { View, ScrollView } from 'react-native';
import { Typography } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { useTheme } from '@/theme/provider';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  onReset?: () => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * Error Boundary component to catch unhandled React errors
 */
class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error to console in development
    if (__DEV__) {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    // Call custom error handler if provided
    this.props.onError?.(error, errorInfo);

    // In production, you might want to send this to an error tracking service
    // like Sentry, Bugsnag, or your own logging service
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
    });

    this.props.onReset?.();
  };

  override render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <ErrorBoundaryFallback
          error={this.state.error}
          onReset={this.handleReset}
        />
      );
    }

    return this.props.children;
  }
}

/**
 * Default fallback UI for ErrorBoundary
 */
const ErrorBoundaryFallback: React.FC<{
  error: Error | null;
  onReset: () => void;
}> = ({ error, onReset }) => {
  const theme = useTheme();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
        padding: theme.spacing[4],
        justifyContent: 'center',
      }}
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            maxWidth: 400,
            width: '100%',
            alignItems: 'center',
          }}
        >
          <Typography
            variant="heading2"
            align="center"
            style={{ marginBottom: theme.spacing[2] }}
          >
            Oops! Something went wrong
          </Typography>

          <Typography
            variant="body"
            color="secondary"
            align="center"
            style={{ marginBottom: theme.spacing[4] }}
          >
            We&apos;re sorry for the inconvenience. The app encountered an
            unexpected error.
          </Typography>

          {__DEV__ && error && (
            <View
              style={{
                width: '100%',
                padding: theme.spacing[3],
                backgroundColor: theme.colors.error[50],
                borderRadius: theme.spacing[2],
                borderWidth: 1,
                borderColor: theme.colors.error[200],
                marginBottom: theme.spacing[4],
              }}
            >
              <Typography
                variant="caption"
                style={{
                  fontFamily: 'monospace',
                  color: theme.colors.error[700],
                }}
              >
                {error.message}
              </Typography>
              {error.stack && (
                <Typography
                  variant="caption"
                  style={{
                    fontFamily: 'monospace',
                    color: theme.colors.error[600],
                    marginTop: theme.spacing[2],
                  }}
                  numberOfLines={10}
                >
                  {error.stack}
                </Typography>
              )}
            </View>
          )}

          <Button
            title="Try Again"
            variant="primary"
            onPress={onReset}
            style={{ width: '100%' }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default ErrorBoundary;
