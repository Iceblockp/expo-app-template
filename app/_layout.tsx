import '../global.css';
import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { ThemeProvider, useTheme } from '../src/theme';
import { StoreProvider } from '../src/store';
import { QueryProvider } from '../src/services/api';
import { useNavigationGuards } from '../src/navigation';
import { LocalizationProvider } from '../src/locales';
import { ErrorBoundary, NetworkStatus } from '../src/components/common';

// Prevent the splash screen from auto-hiding before asset loading is complete
SplashScreen.preventAutoHideAsync();

function RootLayoutNav() {
  const { isDark } = useTheme();

  // Apply navigation guards
  useNavigationGuards();

  useEffect(() => {
    // Hide splash screen after providers are loaded
    SplashScreen.hideAsync();
  }, []);

  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <NetworkStatus />
    </>
  );
}

export default function RootLayout() {
  return (
    <ErrorBoundary>
      <LocalizationProvider>
        <StoreProvider>
          <ThemeProvider>
            <QueryProvider>
              <RootLayoutNav />
            </QueryProvider>
          </ThemeProvider>
        </StoreProvider>
      </LocalizationProvider>
    </ErrorBoundary>
  );
}
