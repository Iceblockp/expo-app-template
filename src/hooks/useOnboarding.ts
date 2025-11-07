import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from './useRedux';
import { setOnboardingCompleted } from '../store/slices/appSettingsSlice';
import { selectOnboardingCompleted } from '../store/selectors';

interface UseOnboardingReturn {
  isOnboardingCompleted: boolean;
  completeOnboarding: () => void;
  resetOnboarding: () => void;
}

/**
 * Custom hook for managing onboarding state
 * Provides easy access to onboarding completion status and actions
 */
export const useOnboarding = (): UseOnboardingReturn => {
  const dispatch = useAppDispatch();
  const isOnboardingCompleted = useAppSelector(selectOnboardingCompleted);

  const completeOnboarding = useCallback(() => {
    dispatch(setOnboardingCompleted(true));
  }, [dispatch]);

  const resetOnboarding = useCallback(() => {
    dispatch(setOnboardingCompleted(false));
  }, [dispatch]);

  return {
    isOnboardingCompleted,
    completeOnboarding,
    resetOnboarding,
  };
};
