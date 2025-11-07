import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { I18nManager } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Updates from 'expo-updates';
import { LANGUAGES, type LanguageCode } from '@/locales/i18n.config';
import type { TranslationNamespace } from '@/locales/types';

const LANGUAGE_STORAGE_KEY = '@app:language';

interface UseLocalizationReturn {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => Promise<void>;
  t: (key: string, options?: any) => string;
  isRTL: boolean;
  availableLanguages: typeof LANGUAGES;
  isChangingLanguage: boolean;
}

/**
 * Custom hook for managing localization
 * Provides language switching with persistence and RTL support
 */
export const useLocalization = (
  namespace?: TranslationNamespace
): UseLocalizationReturn => {
  const { t, i18n } = useTranslation(namespace);
  const [isChangingLanguage, setIsChangingLanguage] = useState(false);

  const currentLanguage = i18n.language as LanguageCode;
  const isRTL = LANGUAGES[currentLanguage]?.isRTL || false;

  // Load saved language preference on mount
  useEffect(() => {
    loadSavedLanguage();
  }, []);

  // Sync RTL layout with current language
  useEffect(() => {
    if (I18nManager.isRTL !== isRTL) {
      I18nManager.allowRTL(isRTL);
      I18nManager.forceRTL(isRTL);
    }
  }, [isRTL]);

  const loadSavedLanguage = async () => {
    try {
      const savedLanguage = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (savedLanguage && savedLanguage in LANGUAGES) {
        await i18n.changeLanguage(savedLanguage);
      }
    } catch (error) {
      console.error('Failed to load saved language:', error);
    }
  };

  const setLanguage = useCallback(
    async (lang: LanguageCode) => {
      if (!(lang in LANGUAGES)) {
        console.warn(`Language ${lang} is not supported`);
        return;
      }

      setIsChangingLanguage(true);

      try {
        // Save language preference
        await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, lang);

        // Change i18n language
        await i18n.changeLanguage(lang);

        // Check if RTL direction changed
        const newIsRTL = LANGUAGES[lang].isRTL;
        const currentIsRTL = I18nManager.isRTL;

        // If RTL direction changed, we need to reload the app
        if (newIsRTL !== currentIsRTL) {
          I18nManager.allowRTL(newIsRTL);
          I18nManager.forceRTL(newIsRTL);

          // Reload the app to apply RTL changes
          // Note: In development, this will restart the app
          // In production, consider showing a message to the user
          if (!__DEV__) {
            await Updates.reloadAsync();
          } else {
            console.warn(
              'RTL direction changed. Please reload the app manually in development mode.'
            );
          }
        }
      } catch (error) {
        console.error('Failed to change language:', error);
      } finally {
        setIsChangingLanguage(false);
      }
    },
    [i18n]
  );

  return {
    language: currentLanguage,
    setLanguage,
    t,
    isRTL,
    availableLanguages: LANGUAGES,
    isChangingLanguage,
  };
};
