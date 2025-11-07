import { useEffect } from 'react';
import { router, useSegments } from 'expo-router';
import { useAppSelector } from '../hooks';
import { selectIsAuthenticated } from '../store';

/**
 * Hook that handles authentication-based navigation guards
 * Redirects users based on their authentication status and current route
 */
export function useAuthGuard() {
  const segments = useSegments();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  useEffect(() => {
    // Wait for navigation to be ready
    if (!segments || segments.length < 1) return;

    const inAuthGroup = segments[0] === 'auth';
    const inOnboardingGroup = segments[0] === 'onboarding';

    // TODO: Add onboarding completion check when onboarding state is implemented
    const hasCompletedOnboarding = true; // Placeholder

    // Use setTimeout to ensure navigation happens after mount
    const timeout = setTimeout(() => {
      // If user is not authenticated and not in auth or onboarding screens
      if (!isAuthenticated && !inAuthGroup && !inOnboardingGroup) {
        // Check if onboarding is completed
        if (!hasCompletedOnboarding) {
          router.replace('/onboarding');
        } else {
          router.replace('/auth/login');
        }
      }

      // If user is authenticated and in auth screens, redirect to main app
      if (isAuthenticated && inAuthGroup) {
        router.replace('/(tabs)');
      }

      // If user is authenticated and in onboarding, redirect to main app
      if (isAuthenticated && inOnboardingGroup) {
        router.replace('/(tabs)');
      }
    }, 0);

    return () => clearTimeout(timeout);
  }, [isAuthenticated, segments]);
}

/**
 * Hook that handles onboarding completion guards
 * Redirects users who haven't completed onboarding
 */
export function useOnboardingGuard() {
  const segments = useSegments();

  useEffect(() => {
    // TODO: Implement onboarding completion check
    const hasCompletedOnboarding = true; // Placeholder
    const inOnboardingGroup = segments[0] === 'onboarding';
    const inAuthGroup = segments[0] === 'auth';
    const inTabsGroup = segments[0] === '(tabs)';

    // If onboarding is not completed and user is not in onboarding screens
    if (
      !hasCompletedOnboarding &&
      !inOnboardingGroup &&
      !inAuthGroup &&
      !inTabsGroup
    ) {
      router.replace('/onboarding');
    }
  }, [segments]);
}

/**
 * Hook that handles feature-based navigation guards
 * Can be used to restrict access to certain features based on user permissions or feature flags
 */
export function useFeatureGuard(
  featureKey: string,
  fallbackRoute: string = '/(tabs)'
) {
  const segments = useSegments();

  useEffect(() => {
    // TODO: Implement feature flag checking logic
    const hasFeatureAccess = true; // Placeholder - should check feature flags or user permissions

    if (!hasFeatureAccess) {
      router.replace(fallbackRoute);
    }
  }, [featureKey, fallbackRoute, segments]);
}

/**
 * Combined navigation guard hook that handles all navigation logic
 * This should be used in the root layout to ensure proper navigation flow
 */
export function useNavigationGuards() {
  useAuthGuard();
  useOnboardingGuard();
}
