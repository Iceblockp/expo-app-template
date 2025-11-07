import { useEffect } from 'react';
import { Redirect } from 'expo-router';
import { useAppSelector } from '../src/hooks';
import { selectIsAuthenticated } from '../src/store';

export default function Index() {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  // TODO: Add onboarding completion check when onboarding is implemented
  const hasCompletedOnboarding = true; // Placeholder

  useEffect(() => {
    // Any initialization logic can go here
  }, []);

  // Navigation logic based on app state
  if (!hasCompletedOnboarding) {
    return <Redirect href="/onboarding" />;
  }

  if (!isAuthenticated) {
    return <Redirect href="/auth/login" />;
  }

  return <Redirect href="/(tabs)" />;
}
