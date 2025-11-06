import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ThemeMode = 'light' | 'dark' | 'system';

export interface NotificationSettings {
  push: boolean;
  email: boolean;
  inApp: boolean;
}

export interface AppSettingsState {
  theme: ThemeMode;
  language: string;
  notifications: NotificationSettings;
  isFirstLaunch: boolean;
  onboardingCompleted: boolean;
}

const initialState: AppSettingsState = {
  theme: 'system',
  language: 'en',
  notifications: {
    push: true,
    email: true,
    inApp: true,
  },
  isFirstLaunch: true,
  onboardingCompleted: false,
};

const appSettingsSlice = createSlice({
  name: 'appSettings',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ThemeMode>) => {
      state.theme = action.payload;
    },
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
    updateNotificationSettings: (
      state,
      action: PayloadAction<Partial<NotificationSettings>>
    ) => {
      state.notifications = { ...state.notifications, ...action.payload };
    },
    setFirstLaunch: (state, action: PayloadAction<boolean>) => {
      state.isFirstLaunch = action.payload;
    },
    setOnboardingCompleted: (state, action: PayloadAction<boolean>) => {
      state.onboardingCompleted = action.payload;
    },
    resetSettings: () => {
      return { ...initialState, isFirstLaunch: false };
    },
  },
});

export const {
  setTheme,
  setLanguage,
  updateNotificationSettings,
  setFirstLaunch,
  setOnboardingCompleted,
  resetSettings,
} = appSettingsSlice.actions;

export default appSettingsSlice.reducer;
