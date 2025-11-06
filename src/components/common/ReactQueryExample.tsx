import React from 'react';
import { View, Text, Alert } from 'react-native';
import { Button } from '../ui/Button';
import { Spinner } from '../ui/Loading';
import {
  useGetCurrentUserQuery,
  useLoginMutation,
  useGetUserProfileQuery,
} from '../../store';

interface ReactQueryExampleProps {
  userId?: string;
}

export const ReactQueryExample: React.FC<ReactQueryExampleProps> = ({
  userId,
}) => {
  // Example of using RTK Query hooks
  const {
    data: currentUser,
    isLoading: isLoadingCurrentUser,
    error: currentUserError,
    refetch: refetchCurrentUser,
  } = useGetCurrentUserQuery();

  const {
    data: userProfile,
    isLoading: isLoadingProfile,
    error: profileError,
  } = useGetUserProfileQuery(userId || 'default', {
    skip: !userId, // Skip query if no userId provided
  });

  const [login, { isLoading: isLoggingIn, error: loginError }] =
    useLoginMutation();

  const handleLogin = async () => {
    try {
      const result = await login({
        email: 'test@example.com',
        password: 'password123',
      }).unwrap();

      Alert.alert('Success', 'Login successful!');
      if (__DEV__) {
        console.log('Login result:', result);
      }
    } catch (error) {
      Alert.alert('Error', 'Login failed');
      if (__DEV__) {
        console.error('Login error:', error);
      }
    }
  };

  const handleRefresh = () => {
    refetchCurrentUser();
  };

  if (isLoadingCurrentUser || isLoadingProfile) {
    return (
      <View className="flex-1 justify-center items-center p-4">
        <Spinner size="lg" />
        <Text className="mt-4 text-center text-gray-600">
          Loading user data...
        </Text>
      </View>
    );
  }

  return (
    <View className="p-4 space-y-4">
      <Text className="text-xl font-bold text-center mb-4">
        React Query + RTK Query Example
      </Text>

      {/* Current User Section */}
      <View className="bg-white rounded-lg p-4 shadow-sm">
        <Text className="text-lg font-semibold mb-2">Current User</Text>
        {currentUserError ? (
          <Text className="text-red-500">
            Error: {JSON.stringify(currentUserError)}
          </Text>
        ) : currentUser ? (
          <View>
            <Text>Email: {currentUser.email}</Text>
            <Text>
              Name: {currentUser.firstName} {currentUser.lastName}
            </Text>
            {currentUser.avatar && <Text>Avatar: {currentUser.avatar}</Text>}
          </View>
        ) : (
          <Text className="text-gray-500">No user data available</Text>
        )}

        <Button
          title="Refresh User Data"
          onPress={handleRefresh}
          variant="outline"
          className="mt-2"
        />
      </View>

      {/* User Profile Section */}
      {userId && (
        <View className="bg-white rounded-lg p-4 shadow-sm">
          <Text className="text-lg font-semibold mb-2">User Profile</Text>
          {profileError ? (
            <Text className="text-red-500">
              Error: {JSON.stringify(profileError)}
            </Text>
          ) : userProfile ? (
            <View>
              <Text>ID: {userProfile.id}</Text>
              <Text>Email: {userProfile.email}</Text>
              <Text>
                Created: {new Date(userProfile.createdAt).toLocaleDateString()}
              </Text>
              <Text>Theme: {userProfile.preferences?.theme || 'Not set'}</Text>
              <Text>
                Language: {userProfile.preferences?.language || 'Not set'}
              </Text>
            </View>
          ) : (
            <Text className="text-gray-500">No profile data available</Text>
          )}
        </View>
      )}

      {/* Login Example */}
      <View className="bg-white rounded-lg p-4 shadow-sm">
        <Text className="text-lg font-semibold mb-2">Login Example</Text>
        <Text className="text-sm text-gray-600 mb-3">
          This demonstrates a mutation with loading states and error handling.
        </Text>

        {loginError && (
          <Text className="text-red-500 mb-2">
            Login Error: {JSON.stringify(loginError)}
          </Text>
        )}

        <Button
          title={isLoggingIn ? 'Logging in...' : 'Test Login'}
          onPress={handleLogin}
          disabled={isLoggingIn}
          variant="primary"
        />
      </View>

      {/* Query Status Info */}
      <View className="bg-gray-50 rounded-lg p-4">
        <Text className="text-lg font-semibold mb-2">Query Status</Text>
        <Text>Current User Loading: {isLoadingCurrentUser ? 'Yes' : 'No'}</Text>
        <Text>Profile Loading: {isLoadingProfile ? 'Yes' : 'No'}</Text>
        <Text>Login Loading: {isLoggingIn ? 'Yes' : 'No'}</Text>
        <Text className="mt-2 text-sm text-gray-600">
          This component demonstrates RTK Query integration with automatic
          caching, background refetching, and optimistic updates.
        </Text>
      </View>
    </View>
  );
};
