import { RootState } from './index';

// Auth selectors
export const selectAuth = (state: RootState) => state.auth;
export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;
export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectAuthToken = (state: RootState) => state.auth.token;
export const selectAuthLoading = (state: RootState) => state.auth.loading;
export const selectAuthError = (state: RootState) => state.auth.error;

// App Settings selectors
export const selectAppSettings = (state: RootState) => state.appSettings;
export const selectTheme = (state: RootState) => state.appSettings.theme;
export const selectLanguage = (state: RootState) => state.appSettings.language;
export const selectNotificationSettings = (state: RootState) =>
  state.appSettings.notifications;
export const selectIsFirstLaunch = (state: RootState) =>
  state.appSettings.isFirstLaunch;
export const selectOnboardingCompleted = (state: RootState) =>
  state.appSettings.onboardingCompleted;
