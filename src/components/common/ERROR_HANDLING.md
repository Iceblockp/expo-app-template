# Error Handling & Loading States

This document describes the error handling and loading state management system in the template.

## Overview

The template provides a comprehensive error handling system with:

- **Global Error Boundary**: Catches unhandled React errors
- **Error Display Components**: User-friendly error messages with retry functionality
- **Network Status Monitoring**: Real-time network connectivity detection
- **Loading States**: Consistent loading indicators across the app
- **Async Operation Hooks**: Simplified async state management

## Components

### ErrorBoundary

A React Error Boundary component that catches unhandled errors in the component tree.

```tsx
import { ErrorBoundary } from '@/components/common';

function App() {
  return (
    <ErrorBoundary
      onError={(error, errorInfo) => {
        // Log to error tracking service
        console.error('Error caught:', error, errorInfo);
      }}
      onReset={() => {
        // Reset app state if needed
      }}
    >
      <YourApp />
    </ErrorBoundary>
  );
}
```

**Props:**

- `children`: React components to wrap
- `fallback`: Custom fallback UI (optional)
- `onError`: Callback when error is caught (optional)
- `onReset`: Callback when user clicks "Try Again" (optional)

### ErrorDisplay

A flexible error display component with retry functionality.

```tsx
import { ErrorDisplay } from '@/components/common';

function MyComponent() {
  const { error, refetch } = useQuery(...);

  if (error) {
    return (
      <ErrorDisplay
        error={error}
        onRetry={refetch}
        size="md"
      />
    );
  }

  return <Content />;
}
```

**Props:**

- `error`: The error to display (required)
- `message`: Custom error message (optional)
- `title`: Custom title (optional)
- `onRetry`: Retry callback (optional)
- `retryText`: Custom retry button text (optional)
- `showRetry`: Whether to show retry button (default: true)
- `size`: Size variant - 'sm', 'md', 'lg' (default: 'md')
- `style`: Custom container style (optional)

### InlineError

A compact inline error display for forms and smaller components.

```tsx
import { InlineError } from '@/components/common';

function LoginForm() {
  const { error } = useLogin();

  return (
    <View>
      <Input placeholder="Email" />
      <Input placeholder="Password" />
      {error && <InlineError error={error} />}
      <Button>Login</Button>
    </View>
  );
}
```

**Props:**

- `error`: The error to display (required)
- `message`: Custom error message (optional)
- `style`: Custom container style (optional)

### ErrorScreen

A full-screen error display component.

```tsx
import { ErrorScreen } from '@/components/common';

function MyScreen() {
  const { error, refetch } = useQuery(...);

  if (error) {
    return <ErrorScreen error={error} onRetry={refetch} />;
  }

  return <Content />;
}
```

**Props:**

- `error`: The error to display (required)
- `message`: Custom error message (optional)
- `title`: Custom title (optional)
- `onRetry`: Retry callback (optional)
- `retryText`: Custom retry button text (optional)
- `style`: Custom container style (optional)

### NetworkStatus

A banner component that displays network connectivity status.

```tsx
import { NetworkStatus } from '@/components/common';

function App() {
  return (
    <>
      <YourApp />
      <NetworkStatus />
    </>
  );
}
```

**Props:**

- `style`: Custom container style (optional)
- `showWhenOnline`: Show banner when coming back online (default: false)
- `onlineDuration`: Duration to show "back online" message in ms (default: 3000)

### useNetworkStatus Hook

A hook to check network connectivity in your components.

```tsx
import { useNetworkStatus } from '@/components/common';

function MyComponent() {
  const { isConnected, isOffline, isInternetReachable } = useNetworkStatus();

  if (isOffline) {
    return <Text>You are offline</Text>;
  }

  return <Content />;
}
```

**Returns:**

- `isConnected`: Whether device is connected to a network
- `isInternetReachable`: Whether internet is reachable
- `isOffline`: Convenience flag for offline state

## Hooks

### useAsyncOperation

A hook for managing async operations with loading and error states.

```tsx
import { useAsyncOperation } from '@/hooks';

function MyComponent() {
  const { data, loading, error, execute } = useAsyncOperation(
    async (userId: string) => {
      const response = await fetch(`/api/users/${userId}`);
      return response.json();
    },
    {
      onSuccess: data => console.log('Success:', data),
      onError: error => console.error('Error:', error),
      errorContext: 'Fetching user data',
    }
  );

  return (
    <View>
      <Button onPress={() => execute('123')} disabled={loading}>
        Load User
      </Button>
      {loading && <Spinner />}
      {error && <InlineError error={error} />}
      {data && <UserProfile user={data} />}
    </View>
  );
}
```

**Parameters:**

- `operation`: Async function to execute
- `options`: Configuration object
  - `initialData`: Initial data value (optional)
  - `onSuccess`: Success callback (optional)
  - `onError`: Error callback (optional)
  - `errorContext`: Context for error logging (optional)

**Returns:**

- `data`: Current data from the operation
- `loading`: Whether operation is in progress
- `error`: Error from the operation, if any
- `execute`: Function to execute the operation
- `reset`: Function to reset the state
- `setData`: Function to set data manually
- `setError`: Function to set error manually

### useAsyncOperationWithRetry

A hook for managing async operations with automatic retry logic.

```tsx
import { useAsyncOperationWithRetry } from '@/hooks';

function MyComponent() {
  const { data, loading, error, execute, retryCount } =
    useAsyncOperationWithRetry(
      async () => {
        const response = await fetch('/api/data');
        return response.json();
      },
      {
        maxRetries: 3,
        retryDelay: 1000,
        exponentialBackoff: true,
      }
    );

  return (
    <View>
      <Button onPress={execute} disabled={loading}>
        Fetch Data
      </Button>
      {loading && (
        <Text>Loading... {retryCount > 0 && `(Retry ${retryCount}/3)`}</Text>
      )}
      {error && <ErrorDisplay error={error} onRetry={execute} />}
      {data && <DataDisplay data={data} />}
    </View>
  );
}
```

**Parameters:**

- `operation`: Async function to execute
- `options`: Configuration object
  - `maxRetries`: Maximum retry attempts (default: 3)
  - `retryDelay`: Delay between retries in ms (default: 1000)
  - `exponentialBackoff`: Use exponential backoff (default: true)
  - `onSuccess`: Success callback (optional)
  - `onError`: Error callback (optional)
  - `errorContext`: Context for error logging (optional)

**Returns:**

- All returns from `useAsyncOperation`
- `retryCount`: Current retry attempt number

## Error Handling Utilities

The template includes utility functions for error handling in `src/services/api/errorHandling.ts`:

### Type Guards

```tsx
import {
  isFetchBaseQueryError,
  isErrorWithMessage,
  isNetworkError,
  isAuthError,
  isServerError,
  isClientError,
} from '@/services/api/errorHandling';

if (isNetworkError(error)) {
  // Handle network error
}

if (isAuthError(error)) {
  // Handle authentication error
}
```

### Error Message Extraction

```tsx
import {
  getErrorMessage,
  getUserFriendlyErrorMessage,
  getErrorStatus,
} from '@/services/api/errorHandling';

const message = getUserFriendlyErrorMessage(error);
const status = getErrorStatus(error);
```

### Retry Logic

```tsx
import { shouldRetry, getRetryDelay } from '@/services/api/errorHandling';

if (shouldRetry(error, attemptNumber)) {
  const delay = getRetryDelay(attemptNumber);
  setTimeout(() => retry(), delay);
}
```

### Error Logging

```tsx
import { logError } from '@/services/api/errorHandling';

try {
  await fetchData();
} catch (error) {
  logError(error, 'Fetching user data');
}
```

## Loading Components

The template provides several loading components in `src/components/ui/Loading.tsx`:

### Spinner

```tsx
import { Spinner } from '@/components/ui/Loading';

<Spinner size="sm" />
<Spinner size="md" />
<Spinner size="lg" />
<Spinner size={40} color="#FF0000" />
```

### Skeleton

```tsx
import { Skeleton } from '@/components/ui/Loading';

<Skeleton width="100%" height={20} />
<Skeleton width={200} height={40} borderRadius={8} />
<Skeleton animated={false} />
```

### Progress

```tsx
import { Progress } from '@/components/ui/Loading';

<Progress value={50} max={100} />
<Progress value={75} showText />
<Progress value={30} color="#FF0000" height={12} />
```

### LoadingScreen

```tsx
import { LoadingScreen } from '@/components/ui/Loading';

<LoadingScreen message="Loading your data..." size="lg" />;
```

## Best Practices

### 1. Always Handle Errors

```tsx
// ❌ Bad
const { data } = useQuery('users', fetchUsers);

// ✅ Good
const { data, error, isLoading } = useQuery('users', fetchUsers);

if (isLoading) return <Spinner />;
if (error) return <ErrorDisplay error={error} />;
return <UserList users={data} />;
```

### 2. Provide Retry Functionality

```tsx
// ✅ Good
<ErrorDisplay error={error} onRetry={refetch} />
```

### 3. Use User-Friendly Messages

```tsx
// ❌ Bad
<Text>{error.message}</Text>;

// ✅ Good
import { getUserFriendlyErrorMessage } from '@/services/api/errorHandling';

<Text>{getUserFriendlyErrorMessage(error)}</Text>;
```

### 4. Show Loading States

```tsx
// ✅ Good
{
  loading && <Spinner />;
}
{
  !loading && data && <Content data={data} />;
}
```

### 5. Log Errors for Debugging

```tsx
import { logError } from '@/services/api/errorHandling';

try {
  await operation();
} catch (error) {
  logError(error, 'Operation context');
  // Show error to user
}
```

### 6. Use Error Boundaries

Wrap your app or major sections with ErrorBoundary to catch unhandled errors:

```tsx
<ErrorBoundary>
  <YourFeature />
</ErrorBoundary>
```

### 7. Monitor Network Status

For apps that require connectivity, use the NetworkStatus component:

```tsx
function App() {
  return (
    <>
      <YourApp />
      <NetworkStatus />
    </>
  );
}
```

## Integration with React Query

The error handling system works seamlessly with React Query:

```tsx
import { useQuery } from '@tanstack/react-query';
import { ErrorDisplay } from '@/components/common';
import { Spinner } from '@/components/ui/Loading';

function UserProfile({ userId }: { userId: string }) {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(userId),
  });

  if (isLoading) {
    return <Spinner size="lg" />;
  }

  if (error) {
    return <ErrorDisplay error={error} onRetry={refetch} />;
  }

  return <ProfileView user={data} />;
}
```

## Integration with Redux

The error handling system works with Redux Toolkit Query:

```tsx
import { useGetUserQuery } from '@/store/api/userApi';
import { ErrorDisplay } from '@/components/common';
import { Spinner } from '@/components/ui/Loading';

function UserProfile({ userId }: { userId: string }) {
  const { data, error, isLoading, refetch } = useGetUserQuery(userId);

  if (isLoading) {
    return <Spinner size="lg" />;
  }

  if (error) {
    return <ErrorDisplay error={error} onRetry={refetch} />;
  }

  return <ProfileView user={data} />;
}
```

## Customization

### Custom Error Messages

You can provide custom error messages for specific error types:

```tsx
import { getErrorStatus } from '@/services/api/errorHandling';

function getCustomErrorMessage(error: unknown): string {
  const status = getErrorStatus(error);

  switch (status) {
    case 404:
      return 'User not found. Please check the user ID.';
    case 403:
      return 'You do not have permission to view this user.';
    default:
      return getUserFriendlyErrorMessage(error);
  }
}

<ErrorDisplay error={error} message={getCustomErrorMessage(error)} />;
```

### Custom Error Boundary Fallback

```tsx
<ErrorBoundary
  fallback={
    <View>
      <Text>Custom error UI</Text>
      <Button onPress={handleReset}>Reset</Button>
    </View>
  }
>
  <YourApp />
</ErrorBoundary>
```

### Custom Loading Indicators

```tsx
import { ActivityIndicator } from 'react-native';

function CustomSpinner() {
  return (
    <View style={{ padding: 20 }}>
      <ActivityIndicator size="large" color="#custom-color" />
      <Text>Loading...</Text>
    </View>
  );
}
```

## Error Tracking Integration

To integrate with error tracking services like Sentry:

```tsx
// In ErrorBoundary
<ErrorBoundary
  onError={(error, errorInfo) => {
    // Send to Sentry
    Sentry.captureException(error, {
      contexts: {
        react: {
          componentStack: errorInfo.componentStack,
        },
      },
    });
  }}
>
  <YourApp />
</ErrorBoundary>;

// In error handling utilities
import * as Sentry from '@sentry/react-native';

export const logError = (error: unknown, context?: string) => {
  if (__DEV__) {
    console.error('Error:', error, context);
  } else {
    Sentry.captureException(error, {
      tags: { context },
    });
  }
};
```
