import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useLocalization } from '@/hooks';
import { LanguageSelector } from './LanguageSelector';
import { useTheme } from '@/theme';

/**
 * LocalizationExample component
 * Demonstrates i18n usage with translation examples
 */
export const LocalizationExample: React.FC = () => {
  const { t } = useTranslation(['common', 'auth', 'settings']);
  const { language, isRTL } = useLocalization();
  const { colors } = useTheme();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
    >
      <View style={styles.section}>
        <Text
          style={[styles.sectionTitle, { color: colors.text.primary }]}
          className="text-xl font-bold mb-4"
        >
          Internationalization Demo
        </Text>

        <View style={[styles.infoBox, { backgroundColor: colors.surface }]}>
          <Text style={[styles.label, { color: colors.text.secondary }]}>
            Current Language:
          </Text>
          <Text style={[styles.value, { color: colors.text.primary }]}>
            {language.toUpperCase()}
          </Text>

          <Text
            style={[
              styles.label,
              { color: colors.text.secondary, marginTop: 8 },
            ]}
          >
            Text Direction:
          </Text>
          <Text style={[styles.value, { color: colors.text.primary }]}>
            {isRTL ? 'Right-to-Left (RTL)' : 'Left-to-Right (LTR)'}
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text
          style={[styles.sectionTitle, { color: colors.text.primary }]}
          className="text-lg font-semibold mb-3"
        >
          Translation Examples
        </Text>

        <View style={[styles.exampleBox, { backgroundColor: colors.surface }]}>
          <Text style={[styles.exampleLabel, { color: colors.text.secondary }]}>
            Common:
          </Text>
          <Text style={[styles.exampleText, { color: colors.text.primary }]}>
            {t('common:app.welcome')} - {t('common:app.loading')}
          </Text>
        </View>

        <View style={[styles.exampleBox, { backgroundColor: colors.surface }]}>
          <Text style={[styles.exampleLabel, { color: colors.text.secondary }]}>
            Auth:
          </Text>
          <Text style={[styles.exampleText, { color: colors.text.primary }]}>
            {t('auth:login.title')} / {t('auth:register.title')}
          </Text>
        </View>

        <View style={[styles.exampleBox, { backgroundColor: colors.surface }]}>
          <Text style={[styles.exampleLabel, { color: colors.text.secondary }]}>
            Settings:
          </Text>
          <Text style={[styles.exampleText, { color: colors.text.primary }]}>
            {t('settings:appearance.theme')} - {t('settings:language.title')}
          </Text>
        </View>

        <View style={[styles.exampleBox, { backgroundColor: colors.surface }]}>
          <Text style={[styles.exampleLabel, { color: colors.text.secondary }]}>
            Validation:
          </Text>
          <Text style={[styles.exampleText, { color: colors.text.primary }]}>
            {t('common:validation.required')}
          </Text>
        </View>

        <View style={[styles.exampleBox, { backgroundColor: colors.surface }]}>
          <Text style={[styles.exampleLabel, { color: colors.text.secondary }]}>
            Interpolation:
          </Text>
          <Text style={[styles.exampleText, { color: colors.text.primary }]}>
            {t('common:validation.minLength', { min: 8 })}
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <LanguageSelector />
      </View>

      <View style={styles.section}>
        <Text
          style={[styles.note, { color: colors.text.secondary }]}
          className="text-sm italic"
        >
          Note: Changing to a RTL language (Arabic) will require an app reload
          to apply the layout direction change.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 12,
  },
  infoBox: {
    padding: 12,
    borderRadius: 8,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  value: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 4,
  },
  exampleBox: {
    marginBottom: 12,
    padding: 12,
    borderRadius: 8,
  },
  exampleLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
  },
  exampleText: {
    fontSize: 14,
  },
  note: {
    lineHeight: 20,
  },
});
