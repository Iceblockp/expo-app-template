import { View, Text, TouchableOpacity } from 'react-native';
import {
  useThemedStyles,
  useAppSelector,
  useAppDispatch,
} from '../../src/hooks';
import { useTheme } from '../../src/theme';
import { setTheme as setReduxTheme, selectTheme } from '../../src/store';

export default function SettingsScreen() {
  const { setTheme, theme, isDark } = useTheme();
  const dispatch = useAppDispatch();
  const reduxTheme = useAppSelector(selectTheme);

  const styles = useThemedStyles(theme => ({
    container: {
      flex: 1,
      padding: theme.spacing[4],
      backgroundColor: theme.colors.background,
    },
    title: {
      fontSize: theme.typography.fontSize['2xl'],
      fontWeight: theme.typography.fontWeight.bold,
      color: theme.colors.text.primary,
      marginBottom: theme.spacing[6],
      textAlign: 'center',
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
    settingItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: theme.spacing[3],
      paddingHorizontal: theme.spacing[4],
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.md,
      marginBottom: theme.spacing[2],
    },
    settingLabel: {
      fontSize: theme.typography.fontSize.base,
      color: theme.colors.text.primary,
    },
    settingValue: {
      fontSize: theme.typography.fontSize.sm,
      color: theme.colors.text.secondary,
    },
    button: {
      backgroundColor: theme.colors.primary[500],
      paddingHorizontal: theme.spacing[4],
      paddingVertical: theme.spacing[2],
      borderRadius: theme.borderRadius.sm,
    },
    buttonText: {
      color: theme.colors.text.inverse,
      fontSize: theme.typography.fontSize.sm,
      fontWeight: theme.typography.fontWeight.medium,
    },
  }));

  const cycleTheme = () => {
    const themes: Array<'light' | 'dark' | 'system'> = [
      'light',
      'dark',
      'system',
    ];
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    const nextTheme = themes[nextIndex];
    if (nextTheme) {
      setTheme(nextTheme);
      dispatch(setReduxTheme(nextTheme));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Appearance</Text>

        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>Theme</Text>
          <TouchableOpacity style={styles.button} onPress={cycleTheme}>
            <Text style={styles.buttonText}>
              {theme} ({isDark ? 'Dark' : 'Light'})
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Debug Info</Text>

        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>Redux Theme</Text>
          <Text style={styles.settingValue}>{reduxTheme}</Text>
        </View>
      </View>
    </View>
  );
}
