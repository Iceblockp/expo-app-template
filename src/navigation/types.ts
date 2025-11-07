export type RootStackParamList = {
  index: undefined;
  'auth/login': undefined;
  'auth/register': undefined;
  'auth/forgot-password': undefined;
  'onboarding/index': undefined;
  '(tabs)': undefined;
};

export type AuthStackParamList = {
  login: undefined;
  register: undefined;
  'forgot-password': undefined;
};

export type TabsParamList = {
  home: undefined;
  profile: undefined;
  settings: undefined;
};

export type HomeStackParamList = {
  index: undefined;
  details: undefined;
  notifications: undefined;
};

export type ProfileStackParamList = {
  index: undefined;
  edit: undefined;
  preferences: undefined;
};

export type SettingsStackParamList = {
  index: undefined;
  appearance: undefined;
  language: undefined;
  about: undefined;
};

export type OnboardingStackParamList = {
  index: undefined;
};

// Navigation prop types for screens
export type RootStackScreenProps<T extends keyof RootStackParamList> = {
  route: { params: RootStackParamList[T] };
  navigation: any; // Will be properly typed when using useNavigation hook
};

export type AuthStackScreenProps<T extends keyof AuthStackParamList> = {
  route: { params: AuthStackParamList[T] };
  navigation: any;
};

export type TabsScreenProps<T extends keyof TabsParamList> = {
  route: { params: TabsParamList[T] };
  navigation: any;
};

// Augment the React Navigation types for type-safe navigation
// This allows Expo Router to provide type-safe navigation throughout the app
declare module '@react-navigation/native' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface RootParamList extends RootStackParamList {}
}
