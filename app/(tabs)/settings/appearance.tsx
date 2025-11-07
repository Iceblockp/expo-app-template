import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useThemedStyles, useAppDispatch } from '../../../src/hooks';
import { useTheme } from '../../../src/theme';
import { setTheme as setReduxTheme } from '../../../src/store';

type ThemeOption = 'light' | 'dark' | 'system';

export default function AppearanceScreen() {
  const { setTheme, theme, isDark, colors } = useTheme();
  const dispatch = useAppDispatch();

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
    themeOption: {
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
    themeOptionActive: {
      borderColor: theme.colors.primary[500],
      backgroundColor: theme.colors.primary[50],
    },
    themeIcon: {
      marginRight: theme.spacing[3],
    },
    themeContent: {
      flex: 1,
    },
    themeTitle: {
      fontSize: theme.typography.fontSize.base,
      fontWeight: theme.typography.fontWeight.semibold,
      color: theme.colors.text.primary,
      marginBottom: theme.spacing[1],
    },
    themeDescription: {
      fontSize: theme.typography.fontSize.sm,
      color: theme.colors.text.secondary,
    },
    currentThemeInfo: {
      backgroundColor: theme.colors.primary[50],
      borderRadius: theme.borderRadius.lg,
      padding: theme.spacing[4],
      flexDirection: 'row',
      alignItems: 'center',
    },
    infoIcon: {
      marginRight: theme.spacing[3],
    },
    infoText: {
      flex: 1,
      fontSize: theme.typography.fontSize.sm,
      color: theme.colors.text.secondary,
      lineHeight: 20,
    },
  }));

  const handleThemeChange = (newTheme: ThemeOption) => {
    setTheme(newTheme);
    dispatch(setReduxTheme(newTheme));
  };

  const themeOptions: Array<{
    value: ThemeOption;
    icon: string;
    title: string;
    description: string;
  }> = [
    {
      value: 'light',
      icon: 'sunny-outline',
      title: 'Light',
      description: 'Use light theme at all times',
    },
    {
      value: 'dark',
      icon: 'moon-outline',
      title: 'Dark',
      description: 'Use dark theme at all times',
    },
    {
      value: 'system',
      icon: 'phone-portrait-outline',
      title: 'System',
      description: 'Follow system appearance settings',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Theme Preference</Text>
          <Text style={styles.sectionDescription}>
            Choose how the app should appear. System setting will automatically
            switch between light and dark themes based on your device settings.
          </Text>

          {themeOptions.map(option => (
            <TouchableOpacity
              key={option.value}
              style={[
                styles.themeOption,
                theme === option.value && styles.themeOptionActive,
              ]}
              onPress={() => handleThemeChange(option.value)}
            >
              <Ionicons
                name={option.icon as any}
                size={28}
                color={
                  theme === option.value
                    ? colors.primary[500]
                    : colors.text.secondary
                }
                style={styles.themeIcon}
              />
              <View style={styles.themeContent}>
                <Text style={styles.themeTitle}>{option.title}</Text>
                <Text style={styles.themeDescription}>
                  {option.description}
                </Text>
              </View>
              {theme === option.value && (
                <Ionicons
                  name="checkmark-circle"
                  size={24}
                  color={colors.primary[500]}
                />
              )}
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.currentThemeInfo}>
          <Ionicons
            name="information-circle-outline"
            size={24}
            color={colors.primary[500]}
            style={styles.infoIcon}
          />
          <Text style={styles.infoText}>
            Currently displaying: {isDark ? 'Dark' : 'Light'} mode
            {theme === 'system' && ' (based on system settings)'}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
