import React, { useEffect, useState } from 'react';
import { I18nextProvider } from 'react-i18next';
import { I18nManager, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n, { LANGUAGES, type LanguageCode } from './i18n.config';

const LANGUAGE_STORAGE_KEY = '@app:language';

interface LocalizationProviderProps {
  children: React.ReactNode;
}

/**
 * LocalizationProvider component
 * Wraps the app with i18next provider and handles initial language setup
 */
export const LocalizationProvider: React.FC<LocalizationProviderProps> = ({
  children,
}) => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    initializeLanguage();
  }, []);

  const initializeLanguage = async () => {
    try {
      // Load saved language preference
      const savedLanguage = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);

      if (savedLanguage && savedLanguage in LANGUAGES) {
        const lang = savedLanguage as LanguageCode;
        await i18n.changeLanguage(lang);

        // Set RTL layout if needed
        const isRTL = LANGUAGES[lang].isRTL;
        if (I18nManager.isRTL !== isRTL) {
          I18nManager.allowRTL(isRTL);
          I18nManager.forceRTL(isRTL);
        }
      } else {
        // Use device language (already set in i18n.config.ts)
        const currentLang = i18n.language as LanguageCode;
        const isRTL = LANGUAGES[currentLang]?.isRTL || false;

        if (I18nManager.isRTL !== isRTL) {
          I18nManager.allowRTL(isRTL);
          I18nManager.forceRTL(isRTL);
        }
      }
    } catch (error) {
      console.error('Failed to initialize language:', error);
    } finally {
      setIsReady(true);
    }
  };

  if (!isReady) {
    // Return a loading view while initializing
    return <View style={{ flex: 1 }} />;
  }

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
};
