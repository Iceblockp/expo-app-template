import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import {
  useThemedStyles,
  useAppSelector,
  useAppDispatch,
} from '../../../src/hooks';
import { useTheme } from '../../../src/theme';
import { useLocalization } from '../../../src/hooks/useLocalization';
import { selectTheme, logout } from '../../../src/store';

export default function SettingsScreen() {
  const { theme, isDark, colors } = useTheme();
  const dispatch = useAppDispatch();
  const { language } = useLocalization();
  const reduxTheme = useAppSelector(selectTheme);

  // Get language display name
  const getLanguageDisplayName = () => {
    const languageMap: Record<string, string> = {
      en: 'English',
      es: 'Español',
      ar: 'العربية',
    };
    return languageMap[language] || 'English';
  };

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
      fontSize: theme.typography.fontSize.sm,
      fontWeight: theme.typography.fontWeight.semibold,
      color: theme.colors.text.tertiary,
      textTransform: 'uppercase',
      marginBottom: theme.spacing[2],
      paddingHorizontal: theme.spacing[2],
    },
    menuItem: {
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.lg,
      padding: theme.spacing[4],
      marginBottom: theme.spacing[2],
      flexDirection: 'row',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1,
    },
    menuIcon: {
      marginRight: theme.spacing[3],
    },
    menuContent: {
      flex: 1,
    },
    menuTitle: {
      fontSize: theme.typography.fontSize.base,
      fontWeight: theme.typography.fontWeight.medium,
      color: theme.colors.text.primary,
      marginBottom: theme.spacing[1],
    },
    menuDescription: {
      fontSize: theme.typography.fontSize.sm,
      color: theme.colors.text.secondary,
    },
    menuValue: {
      fontSize: theme.typography.fontSize.sm,
      color: theme.colors.text.tertiary,
      marginRight: theme.spacing[2],
    },
    dangerItem: {
      backgroundColor: theme.colors.error[50],
    },
    dangerText: {
      color: theme.colors.error[600],
    },
    versionInfo: {
      alignItems: 'center',
      paddingVertical: theme.spacing[6],
    },
    versionText: {
      fontSize: theme.typography.fontSize.sm,
      color: theme.colors.text.tertiary,
    },
  }));

  const handleLogout = () => {
    dispatch(logout());
    router.replace('/auth/login');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push('/settings/appearance')}
          >
            <Ionicons
              name="color-palette-outline"
              size={24}
              color={colors.primary[500]}
              style={styles.menuIcon}
            />
            <View style={styles.menuContent}>
              <Text style={styles.menuTitle}>Appearance</Text>
              <Text style={styles.menuDescription}>
                Theme and display settings
              </Text>
            </View>
            <Text style={styles.menuValue}>
              {theme} ({isDark ? 'Dark' : 'Light'})
            </Text>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={colors.text.tertiary}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push('/settings/language')}
          >
            <Ionicons
              name="language-outline"
              size={24}
              color={colors.secondary[500]}
              style={styles.menuIcon}
            />
            <View style={styles.menuContent}>
              <Text style={styles.menuTitle}>Language</Text>
              <Text style={styles.menuDescription}>
                App language and region
              </Text>
            </View>
            <Text style={styles.menuValue}>{getLanguageDisplayName()}</Text>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={colors.text.tertiary}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Information</Text>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push('/settings/about')}
          >
            <Ionicons
              name="information-circle-outline"
              size={24}
              color={colors.neutral[500]}
              style={styles.menuIcon}
            />
            <View style={styles.menuContent}>
              <Text style={styles.menuTitle}>About</Text>
              <Text style={styles.menuDescription}>
                App version and information
              </Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={colors.text.tertiary}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>

          <TouchableOpacity
            style={[styles.menuItem, styles.dangerItem]}
            onPress={handleLogout}
          >
            <Ionicons
              name="log-out-outline"
              size={24}
              color={colors.error[600]}
              style={styles.menuIcon}
            />
            <View style={styles.menuContent}>
              <Text style={[styles.menuTitle, styles.dangerText]}>Logout</Text>
              <Text style={styles.menuDescription}>
                Sign out of your account
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.versionInfo}>
          <Text style={styles.versionText}>Version 1.0.0</Text>
          <Text style={styles.versionText}>Redux Theme: {reduxTheme}</Text>
        </View>
      </View>
    </ScrollView>
  );
}
