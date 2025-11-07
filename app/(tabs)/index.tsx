import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import {
  useThemedStyles,
  useAppSelector,
  useAppDispatch,
} from '../../src/hooks';
import { useTheme } from '../../src/theme';
import {
  setTheme as setReduxTheme,
  selectTheme,
  selectIsAuthenticated,
  logout,
} from '../../src/store';

export default function HomeScreen() {
  const { setTheme, theme, isDark } = useTheme();
  const dispatch = useAppDispatch();
  const reduxTheme = useAppSelector(selectTheme);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  const styles = useThemedStyles(theme => ({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    content: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: theme.spacing[4],
    },
    title: {
      fontSize: theme.typography.fontSize['2xl'],
      fontWeight: theme.typography.fontWeight.bold,
      color: theme.colors.text.primary,
      marginBottom: theme.spacing[2],
      textAlign: 'center',
    },
    subtitle: {
      fontSize: theme.typography.fontSize.base,
      color: theme.colors.text.secondary,
      marginBottom: theme.spacing[8],
      textAlign: 'center',
    },
    button: {
      backgroundColor: theme.colors.primary[500],
      paddingHorizontal: theme.spacing[6],
      paddingVertical: theme.spacing[3],
      borderRadius: theme.borderRadius.md,
      marginBottom: theme.spacing[2],
    },
    buttonText: {
      color: theme.colors.text.inverse,
      fontSize: theme.typography.fontSize.base,
      fontWeight: theme.typography.fontWeight.medium,
    },
    logoutButton: {
      backgroundColor: theme.colors.error[500],
      paddingHorizontal: theme.spacing[6],
      paddingVertical: theme.spacing[3],
      borderRadius: theme.borderRadius.md,
      marginTop: theme.spacing[4],
    },
    themeInfo: {
      fontSize: theme.typography.fontSize.sm,
      color: theme.colors.text.tertiary,
      marginTop: theme.spacing[4],
    },
    reduxInfo: {
      fontSize: theme.typography.fontSize.sm,
      color: theme.colors.text.secondary,
      marginTop: theme.spacing[2],
      textAlign: 'center',
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

  const handleLogout = () => {
    dispatch(logout());
    router.replace('/auth/login');
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <View style={styles.content}>
        <Text style={styles.title}>Universal Expo React Native Template</Text>
        <Text style={styles.subtitle}>
          Navigation system with Expo Router working!
        </Text>

        <TouchableOpacity style={styles.button} onPress={cycleTheme}>
          <Text style={styles.buttonText}>Switch Theme (Current: {theme})</Text>
        </TouchableOpacity>

        <Text style={styles.themeInfo}>
          Active theme: {isDark ? 'Dark' : 'Light'} mode
        </Text>

        <Text style={styles.reduxInfo}>
          Redux Theme: {reduxTheme} | Auth: {isAuthenticated ? 'Yes' : 'No'}
        </Text>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.buttonText}>Logout (Demo)</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
