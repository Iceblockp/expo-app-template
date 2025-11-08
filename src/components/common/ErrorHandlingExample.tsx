import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Typography } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Spinner } from '@/components/ui/Loading';
import { ErrorDisplay, InlineError, ErrorScreen } from './ErrorDisplay';
import { useNetworkStatus } from './NetworkStatus';
import {
  useAsyncOperation,
  useAsyncOperationWithRetry,
} from '@/hooks/useAsyncOperation';
import { useTheme } from '@/theme/provider';

/**
 * Example component demonstrating error handling and loading states
 */
export const ErrorHandlingExample: React.FC = () => {
  const theme = useTheme();
  const { isConnected, isOffline } = useNetworkStatus();
  const [showErrorScreen, setShowErrorScreen] = useState(false);

  // Example: Basic async operation with loading and error states
  const {
    data: userData,
    loading: userLoading,
    error: userError,
    execute: fetchUser,
  } = useAsyncOperation(async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Simulate random error
    if (Math.random() > 0.7) {
      throw new Error('Failed to fetch user data');
    }

    return {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
    };
  });

  // Example: Async operation with automatic retry
  const {
    data: postsData,
    loading: postsLoading,
    error: postsError,
    execute: fetchPosts,
    retryCount,
  } = useAsyncOperationWithRetry(
    async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Simulate error that might succeed on retry
      if (Math.random() > 0.5) {
        throw new Error('Network timeout');
      }

      return [
        { id: '1', title: 'Post 1' },
        { id: '2', title: 'Post 2' },
      ];
    },
    {
      maxRetries: 3,
      retryDelay: 1000,
      exponentialBackoff: true,
    }
  );

  if (showErrorScreen) {
    return (
      <ErrorScreen
        error={new Error('Something went wrong')}
        onRetry={() => setShowErrorScreen(false)}
      />
    );
  }

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}
      contentContainerStyle={{
        padding: theme.spacing[4],
      }}
    >
      <Typography variant="heading2" style={{ marginBottom: theme.spacing[4] }}>
        Error Handling & Loading States
      </Typography>

      {/* Network Status */}
      <Card style={{ marginBottom: theme.spacing[4] }}>
        <Typography
          variant="heading3"
          style={{ marginBottom: theme.spacing[2] }}
        >
          Network Status
        </Typography>
        <Typography variant="body" color="secondary">
          Connected: {isConnected ? '✅' : '❌'}
        </Typography>
        <Typography variant="body" color="secondary">
          Offline: {isOffline ? '✅' : '❌'}
        </Typography>
      </Card>

      {/* Basic Async Operation */}
      <Card style={{ marginBottom: theme.spacing[4] }}>
        <Typography
          variant="heading3"
          style={{ marginBottom: theme.spacing[2] }}
        >
          Basic Async Operation
        </Typography>

        {userLoading && (
          <View style={{ padding: theme.spacing[4] }}>
            <Spinner size="md" />
            <Typography
              variant="body"
              color="secondary"
              align="center"
              style={{ marginTop: theme.spacing[2] }}
            >
              Loading user data...
            </Typography>
          </View>
        )}

        {userError ? (
          <InlineError
            error={userError}
            style={{ marginBottom: theme.spacing[2] }}
          />
        ) : null}

        {userData && (
          <View style={{ marginBottom: theme.spacing[2] }}>
            <Typography variant="body">Name: {userData.name}</Typography>
            <Typography variant="body">Email: {userData.email}</Typography>
          </View>
        )}

        <Button
          title={userLoading ? 'Loading...' : 'Fetch User'}
          variant="primary"
          onPress={() => fetchUser()}
          disabled={userLoading}
        />
      </Card>

      {/* Async Operation with Retry */}
      <Card style={{ marginBottom: theme.spacing[4] }}>
        <Typography
          variant="heading3"
          style={{ marginBottom: theme.spacing[2] }}
        >
          Async Operation with Retry
        </Typography>

        {postsLoading && (
          <View style={{ padding: theme.spacing[4] }}>
            <Spinner size="md" />
            <Typography
              variant="body"
              color="secondary"
              align="center"
              style={{ marginTop: theme.spacing[2] }}
            >
              Loading posts... {retryCount > 0 && `(Retry ${retryCount}/3)`}
            </Typography>
          </View>
        )}

        {postsError ? (
          <ErrorDisplay
            error={postsError}
            onRetry={() => fetchPosts()}
            size="sm"
            style={{ marginBottom: theme.spacing[2] }}
          />
        ) : null}

        {postsData && (
          <View style={{ marginBottom: theme.spacing[2] }}>
            {postsData.map(post => (
              <Typography key={post.id} variant="body">
                • {post.title}
              </Typography>
            ))}
          </View>
        )}

        <Button
          title={postsLoading ? 'Loading...' : 'Fetch Posts'}
          variant="primary"
          onPress={() => fetchPosts()}
          disabled={postsLoading}
        />
      </Card>

      {/* Error Display Examples */}
      <Card style={{ marginBottom: theme.spacing[4] }}>
        <Typography
          variant="heading3"
          style={{ marginBottom: theme.spacing[2] }}
        >
          Error Display Examples
        </Typography>

        <Typography variant="body" style={{ marginBottom: theme.spacing[2] }}>
          Small Error Display:
        </Typography>
        <ErrorDisplay
          error={new Error('This is a small error')}
          size="sm"
          onRetry={() => console.log('Retry clicked')}
          style={{ marginBottom: theme.spacing[3] }}
        />

        <Typography variant="body" style={{ marginBottom: theme.spacing[2] }}>
          Medium Error Display:
        </Typography>
        <ErrorDisplay
          error={new Error('This is a medium error')}
          size="md"
          onRetry={() => console.log('Retry clicked')}
          style={{ marginBottom: theme.spacing[3] }}
        />

        <Typography variant="body" style={{ marginBottom: theme.spacing[2] }}>
          Inline Error:
        </Typography>
        <InlineError
          error={new Error('This is an inline error message')}
          style={{ marginBottom: theme.spacing[3] }}
        />

        <Button
          title="Show Full Error Screen"
          variant="outline"
          onPress={() => setShowErrorScreen(true)}
        />
      </Card>

      {/* Loading States Examples */}
      <Card style={{ marginBottom: theme.spacing[4] }}>
        <Typography
          variant="heading3"
          style={{ marginBottom: theme.spacing[2] }}
        >
          Loading States
        </Typography>

        <Typography variant="body" style={{ marginBottom: theme.spacing[2] }}>
          Small Spinner:
        </Typography>
        <Spinner size="sm" style={{ marginBottom: theme.spacing[3] }} />

        <Typography variant="body" style={{ marginBottom: theme.spacing[2] }}>
          Medium Spinner:
        </Typography>
        <Spinner size="md" style={{ marginBottom: theme.spacing[3] }} />

        <Typography variant="body" style={{ marginBottom: theme.spacing[2] }}>
          Large Spinner:
        </Typography>
        <Spinner size="lg" style={{ marginBottom: theme.spacing[3] }} />
      </Card>
    </ScrollView>
  );
};
