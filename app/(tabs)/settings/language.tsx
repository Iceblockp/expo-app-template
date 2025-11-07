import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useThemedStyles } from '../../../src/hooks';
import { useTheme } from '../../../src/theme';
import { useLocalization } from '../../../src/hooks/useLocalization';

interface LanguageOption {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

const languages: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦' },
];

export default function LanguageScreen() {
  const { colors } = useTheme();
  const { language, setLanguage } = useLocalization();

  const styles = useThemedStyles(theme => ({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    content: {
      padding: theme.spacing[4],
    },
    section: {
      marginBottom: theme.spacing[6],
    },
    sectionTitle: {
      fontSize: theme.typography.fontSize.lg,
      fontWeight: theme.typography.fontWeight.semibold,
      color: theme.colors.text.primary,
      marginBottom: theme.spacing[3],
    },
    sectionDescription: {
      fontSize: theme.typography.fontSize.sm,
      color: theme.colors.text.secondary,
      marginBottom: theme.spacing[4],
      lineHeight: 20,
    },
    languageOption: {
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.lg,
      padding: theme.spacing[4],
      marginBottom: theme.spacing[3],
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 2,
      borderColor: 'transparent',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1,
    },
    languageOptionActive: {
      borderColor: theme.colors.primary[500],
      backgroundColor: theme.colors.primary[50],
    },
    flag: {
      fontSize: 32,
      marginRight: theme.spacing[3],
    },
    languageContent: {
      flex: 1,
    },
    languageName: {
      fontSize: theme.typography.fontSize.base,
      fontWeight: theme.typography.fontWeight.semibold,
      color: theme.colors.text.primary,
      marginBottom: theme.spacing[1],
    },
    languageNativeName: {
      fontSize: theme.typography.fontSize.sm,
      color: theme.colors.text.secondary,
    },
    infoCard: {
      backgroundColor: theme.colors.primary[50],
      borderRadius: theme.borderRadius.lg,
      padding: theme.spacing[4],
      flexDirection: 'row',
      alignItems: 'flex-start',
    },
    infoIcon: {
      marginRight: theme.spacing[3],
      marginTop: 2,
    },
    infoText: {
      flex: 1,
      fontSize: theme.typography.fontSize.sm,
      color: theme.colors.text.secondary,
      lineHeight: 20,
    },
  }));

  const handleLanguageChange = async (languageCode: string) => {
    await setLanguage(languageCode as any);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Language</Text>
          <Text style={styles.sectionDescription}>
            Choose your preferred language for the app interface. The app will
            restart to apply the changes.
          </Text>

          {languages.map(lang => (
            <TouchableOpacity
              key={lang.code}
              style={[
                styles.languageOption,
                language === lang.code && styles.languageOptionActive,
              ]}
              onPress={() => handleLanguageChange(lang.code)}
            >
              <Text style={styles.flag}>{lang.flag}</Text>
              <View style={styles.languageContent}>
                <Text style={styles.languageName}>{lang.name}</Text>
                <Text style={styles.languageNativeName}>{lang.nativeName}</Text>
              </View>
              {language === lang.code && (
                <Ionicons
                  name="checkmark-circle"
                  size={24}
                  color={colors.primary[500]}
                />
              )}
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.infoCard}>
          <Ionicons
            name="information-circle-outline"
            size={24}
            color={colors.primary[500]}
            style={styles.infoIcon}
          />
          <Text style={styles.infoText}>
            Language changes will be applied immediately. Some content may
            require an app restart to fully update.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
