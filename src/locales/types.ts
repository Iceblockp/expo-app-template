import type { LANGUAGES } from './i18n.config';

// Language types
export type LanguageCode = keyof typeof LANGUAGES;

export interface LanguageInfo {
  name: string;
  nativeName: string;
  isRTL: boolean;
}

// Translation namespace types
export type TranslationNamespace =
  | 'common'
  | 'auth'
  | 'onboarding'
  | 'settings';

// Common translation keys
export type CommonTranslationKeys =
  | 'app.name'
  | 'app.welcome'
  | 'app.loading'
  | 'app.error'
  | 'app.retry'
  | 'app.cancel'
  | 'app.save'
  | 'app.delete'
  | 'app.edit'
  | 'app.done'
  | 'app.back'
  | 'app.next'
  | 'app.skip'
  | 'app.continue'
  | 'app.submit'
  | 'app.confirm'
  | 'app.yes'
  | 'app.no'
  | 'errors.generic'
  | 'errors.network'
  | 'errors.timeout'
  | 'errors.unauthorized'
  | 'errors.notFound'
  | 'errors.serverError'
  | 'validation.required'
  | 'validation.email'
  | 'validation.password'
  | 'validation.passwordMatch'
  | 'validation.minLength'
  | 'validation.maxLength';

// Auth translation keys
export type AuthTranslationKeys =
  | 'login.title'
  | 'login.subtitle'
  | 'login.email'
  | 'login.password'
  | 'login.forgotPassword'
  | 'login.submit'
  | 'login.noAccount'
  | 'login.signUp'
  | 'login.success'
  | 'login.error'
  | 'register.title'
  | 'register.subtitle'
  | 'register.firstName'
  | 'register.lastName'
  | 'register.email'
  | 'register.password'
  | 'register.confirmPassword'
  | 'register.submit'
  | 'register.hasAccount'
  | 'register.signIn'
  | 'register.success'
  | 'register.error'
  | 'forgotPassword.title'
  | 'forgotPassword.subtitle'
  | 'forgotPassword.email'
  | 'forgotPassword.submit'
  | 'forgotPassword.backToLogin'
  | 'forgotPassword.success'
  | 'forgotPassword.error';

// Onboarding translation keys
export type OnboardingTranslationKeys =
  | 'welcome.title'
  | 'welcome.description'
  | 'step1.title'
  | 'step1.description'
  | 'step2.title'
  | 'step2.description'
  | 'step3.title'
  | 'step3.description'
  | 'getStarted'
  | 'skip'
  | 'next'
  | 'back';

// Settings translation keys
export type SettingsTranslationKeys =
  | 'title'
  | 'appearance.title'
  | 'appearance.theme'
  | 'appearance.light'
  | 'appearance.dark'
  | 'appearance.system'
  | 'language.title'
  | 'language.select'
  | 'language.current'
  | 'notifications.title'
  | 'notifications.push'
  | 'notifications.email'
  | 'notifications.sms'
  | 'account.title'
  | 'account.profile'
  | 'account.privacy'
  | 'account.security'
  | 'account.logout'
  | 'about.title'
  | 'about.version'
  | 'about.terms'
  | 'about.privacy'
  | 'about.support';

// Combined translation keys type
export type TranslationKeys =
  | CommonTranslationKeys
  | AuthTranslationKeys
  | OnboardingTranslationKeys
  | SettingsTranslationKeys;
