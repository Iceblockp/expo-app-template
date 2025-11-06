import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  loginSuccess,
  logout,
  setTheme,
  selectIsAuthenticated,
  selectCurrentUser,
  selectTheme,
} from '../../store';

export const ReduxExample: React.FC = () => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const currentUser = useAppSelector(selectCurrentUser);
  const theme = useAppSelector(selectTheme);

  const handleLogin = () => {
    const mockUser = {
      id: '1',
      email: 'demo@example.com',
      firstName: 'Demo',
      lastName: 'User',
    };
    dispatch(loginSuccess({ token: 'demo-token', user: mockUser }));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleThemeChange = () => {
    const themes: Array<'light' | 'dark' | 'system'> = [
      'light',
      'dark',
      'system',
    ];
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    const nextTheme = themes[nextIndex];
    if (nextTheme) {
      dispatch(setTheme(nextTheme));
    }
  };

  return (
    <View
      style={{
        padding: 20,
        backgroundColor: '#f5f5f5',
        margin: 10,
        borderRadius: 8,
      }}
    >
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
        Redux Store Demo
      </Text>

      <Text style={{ marginBottom: 5 }}>
        Authentication: {isAuthenticated ? 'Logged In' : 'Logged Out'}
      </Text>

      {currentUser && (
        <Text style={{ marginBottom: 5 }}>
          User: {currentUser.firstName} {currentUser.lastName}
        </Text>
      )}

      <Text style={{ marginBottom: 10 }}>Theme: {theme}</Text>

      <View style={{ flexDirection: 'row', gap: 10, flexWrap: 'wrap' }}>
        {!isAuthenticated ? (
          <TouchableOpacity
            onPress={handleLogin}
            style={{ backgroundColor: '#007AFF', padding: 10, borderRadius: 5 }}
          >
            <Text style={{ color: 'white' }}>Login</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={handleLogout}
            style={{ backgroundColor: '#FF3B30', padding: 10, borderRadius: 5 }}
          >
            <Text style={{ color: 'white' }}>Logout</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          onPress={handleThemeChange}
          style={{ backgroundColor: '#34C759', padding: 10, borderRadius: 5 }}
        >
          <Text style={{ color: 'white' }}>Change Theme</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
