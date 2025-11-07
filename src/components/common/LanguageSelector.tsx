import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useLocalization } from '@/hooks';
import { LANGUAGES, type LanguageCode } from '@/locales';
import { useTheme } from '@/theme';

interface LanguageSelectorProps {
  onLanguageChange?: (language: LanguageCode) => void;
}

/**
 * LanguageSelector component
 * Displays available languages and allows users to switch between them
 */
export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  onLanguageChange,
}) => {
  const { language, setLanguage, isChangingLanguage, t } =
    useLocalization('settings');
  const { colors } = useTheme();

  const handleLanguageChange = async (lang: LanguageCode) => {
    if (lang === language || isChangingLanguage) return;

    await setLanguage(lang);
    onLanguageChange?.(lang);
  };

  return (
    <View style={styles.container}>
      <Text
        style={[styles.title, { color: colors.text.primary }]}
        className="text-lg font-semibold mb-3"
      >
        {t('language.select')}
      </Text>

      {Object.entries(LANGUAGES).map(([code, info]) => {
        const isSelected = code === language;
        const languageCode = code as LanguageCode;

        return (
          <TouchableOpacity
            key={code}
            style={[
              styles.languageItem,
              {
                backgroundColor: isSelected
                  ? colors.primary[50]
                  : colors.surface,
                borderColor: isSelected
                  ? colors.primary[600]
                  : colors.neutral[300],
              },
            ]}
            onPress={() => handleLanguageChange(languageCode)}
            disabled={isChangingLanguage}
            className="p-4 rounded-lg mb-2 border"
          >
            <View style={styles.languageContent}>
              <View style={styles.languageInfo}>
                <Text
                  style={[
                    styles.languageName,
                    {
                      color: isSelected
                        ? colors.primary[600]
                        : colors.text.primary,
                    },
                  ]}
                  className="text-base font-medium"
                >
                  {info.nativeName}
                </Text>
                <Text
                  style={[
                    styles.languageCode,
                    { color: colors.text.secondary },
                  ]}
                  className="text-sm"
                >
                  {info.name}
                </Text>
              </View>

              {isSelected && (
                <View
                  style={[
                    styles.checkmark,
                    { backgroundColor: colors.primary[600] },
                  ]}
                  className="w-6 h-6 rounded-full items-center justify-center"
                >
                  <Text style={styles.checkmarkText}>✓</Text>
                </View>
              )}
            </View>

            {info.isRTL && (
              <Text
                style={[styles.rtlBadge, { color: colors.text.secondary }]}
                className="text-xs mt-1"
              >
                RTL
              </Text>
            )}
          </TouchableOpacity>
        );
      })}

      {isChangingLanguage && (
        <Text
          style={[styles.changingText, { color: colors.text.secondary }]}
          className="text-sm text-center mt-2"
        >
          {t('common:app.loading')}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  title: {
    marginBottom: 12,
  },
  languageItem: {
    marginBottom: 8,
    borderWidth: 1,
  },
  languageContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  languageInfo: {
    flex: 1,
  },
  languageName: {
    marginBottom: 2,
  },
  languageCode: {
    fontSize: 12,
  },
  checkmark: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmarkText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  rtlBadge: {
    fontSize: 10,
    marginTop: 4,
  },
  changingText: {
    textAlign: 'center',
    marginTop: 8,
  },
});
