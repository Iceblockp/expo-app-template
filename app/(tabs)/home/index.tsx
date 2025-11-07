import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import {
  useThemedStyles,
  useAppSelector,
  useAppDispatch,
} from '../../../src/hooks';
import { useTheme } from '../../../src/theme';
import {
  setTheme as setReduxTheme,
  selectIsAuthenticated,
  logout,
} from '../../../src/store';

export default function HomeScreen() {
  const { setTheme, theme, isDark, colors } = useTheme();
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  const styles = useThemedStyles(theme => ({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    content: {
      flex: 1,
      padding: theme.spacing[4],
    },
    header: {
      marginBottom: theme.spacing[6],
    },
    title: {
      fontSize: theme.typography.fontSize['3xl'],
      fontWeight: theme.typography.fontWeight.bold,
      color: theme.colors.text.primary,
      marginBottom: theme.spacing[2],
    },
    subtitle: {
      fontSize: theme.typography.fontSize.base,
      color: theme.colors.text.secondary,
      lineHeight: 24,
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
    card: {
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.lg,
      padding: theme.spacing[4],
      marginBottom: theme.spacing[3],
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    cardRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    cardLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    cardIcon: {
      marginRight: theme.spacing[3],
    },
    cardTitle: {
      fontSize: theme.typography.fontSize.base,
      fontWeight: theme.typography.fontWeight.medium,
      color: theme.colors.text.primary,
      marginBottom: theme.spacing[1],
    },
    cardDescription: {
      fontSize: theme.typography.fontSize.sm,
      color: theme.colors.text.secondary,
    },
    button: {
      backgroundColor: theme.colors.primary[500],
      paddingHorizontal: theme.spacing[4],
      paddingVertical: theme.spacing[3],
      borderRadius: theme.borderRadius.md,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: theme.spacing[2],
    },
    buttonSecondary: {
      backgroundColor: theme.colors.secondary[500],
    },
    buttonDanger: {
      backgroundColor: theme.colors.error[500],
    },
    buttonText: {
      color: theme.colors.text.inverse,
      fontSize: theme.typography.fontSize.base,
      fontWeight: theme.typography.fontWeight.medium,
      marginLeft: theme.spacing[2],
    },
    statusBadge: {
      paddingHorizontal: theme.spacing[3],
      paddingVertical: theme.spacing[1],
      borderRadius: theme.borderRadius.full,
      backgroundColor: theme.colors.success[100],
    },
    statusText: {
      fontSize: theme.typography.fontSize.xs,
      fontWeight: theme.typography.fontWeight.medium,
      color: theme.colors.success[700],
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
        <View style={styles.header}>
          <Text style={styles.title}>Welcome Back!</Text>
          <Text style={styles.subtitle}>
            Your universal Expo React Native template is ready to use. Explore
            the navigation structure and customize it for your needs.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>

          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push('/home/details')}
          >
            <View style={styles.cardRow}>
              <View style={styles.cardLeft}>
                <Ionicons
                  name="document-text-outline"
                  size={24}
                  color={colors.primary[500]}
                  style={styles.cardIcon}
                />
                <View>
                  <Text style={styles.cardTitle}>View Details</Text>
                  <Text style={styles.cardDescription}>
                    Navigate to details screen
                  </Text>
                </View>
              </View>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={colors.text.tertiary}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push('/home/notifications')}
          >
            <View style={styles.cardRow}>
              <View style={styles.cardLeft}>
                <Ionicons
                  name="notifications-outline"
                  size={24}
                  color={colors.secondary[500]}
                  style={styles.cardIcon}
                />
                <View>
                  <Text style={styles.cardTitle}>Notifications</Text>
                  <Text style={styles.cardDescription}>
                    Check your notifications
                  </Text>
                </View>
              </View>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={colors.text.tertiary}
              />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App Settings</Text>

          <TouchableOpacity style={styles.button} onPress={cycleTheme}>
            <Ionicons name="color-palette-outline" size={20} color="#fff" />
            <Text style={styles.buttonText}>
              Switch Theme (Current: {theme})
            </Text>
          </TouchableOpacity>

          <View style={styles.card}>
            <View style={styles.cardRow}>
              <View>
                <Text style={styles.cardTitle}>Theme Mode</Text>
                <Text style={styles.cardDescription}>
                  {isDark ? 'Dark' : 'Light'} mode active
                </Text>
              </View>
              <View style={styles.statusBadge}>
                <Text style={styles.statusText}>
                  {isAuthenticated ? 'Authenticated' : 'Guest'}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.button, styles.buttonDanger]}
          onPress={handleLogout}
        >
          <Ionicons name="log-out-outline" size={20} color="#fff" />
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
