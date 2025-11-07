import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';

// Import translation files
import enCommon from './en/common.json';
import enAuth from './en/auth.json';
import enOnboarding from './en/onboarding.json';
import enSettings from './en/settings.json';

import esCommon from './es/common.json';
import esAuth from './es/auth.json';
import esOnboarding from './es/onboarding.json';
import esSettings from './es/settings.json';

import arCommon from './ar/common.json';
import arAuth from './ar/auth.json';
import arOnboarding from './ar/onboarding.json';
import arSettings from './ar/settings.json';

// Define available languages
export const LANGUAGES = {
  en: { name: 'English', nativeName: 'English', isRTL: false },
  es: { name: 'Spanish', nativeName: 'Español', isRTL: false },
  ar: { name: 'Arabic', nativeName: 'العربية', isRTL: true },
} as const;

export type LanguageCode = keyof typeof LANGUAGES;

// Define translation resources
const resources = {
  en: {
    common: enCommon,
    auth: enAuth,
    onboarding: enOnboarding,
    settings: enSettings,
  },
  es: {
    common: esCommon,
    auth: esAuth,
    onboarding: esOnboarding,
    settings: esSettings,
  },
  ar: {
    common: arCommon,
    auth: arAuth,
    onboarding: arOnboarding,
    settings: arSettings,
  },
} as const;

// Get device language
const getDeviceLanguage = (): LanguageCode => {
  const deviceLocale = Localization.getLocales()[0];
  const languageCode = deviceLocale?.languageCode || 'en';

  // Check if the device language is supported
  if (languageCode in LANGUAGES) {
    return languageCode as LanguageCode;
  }

  // Default to English if not supported
  return 'en';
};

// Initialize i18next
i18n.use(initReactI18next).init({
  resources,
  lng: getDeviceLanguage(),
  fallbackLng: 'en',
  defaultNS: 'common',
  ns: ['common', 'auth', 'onboarding', 'settings'],
  interpolation: {
    escapeValue: false, // React already escapes values
  },
  react: {
    useSuspense: false,
  },
});

export default i18n;
