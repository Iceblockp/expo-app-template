import { useEffect } from 'react';
import { Redirect } from 'expo-router';
import { useAppSelector } from '../src/hooks';
import { selectIsAuthenticated, selectOnboardingCompleted } from '../src/store';

export default function Index() {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const hasCompletedOnboarding = useAppSelector(selectOnboardingCompleted);

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
