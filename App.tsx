import './global.css';
import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { ThemeProvider, useTheme } from './src/theme';
import { useThemedStyles, useAppSelector, useAppDispatch } from './src/hooks';
import {
  setTheme as setReduxTheme,
  selectTheme,
  selectIsAuthenticated,
} from './src/store';
import { NativeWindExample, NativeWindTest } from './src/components/ui';
import { ReduxExample } from './src/components/common';
import { StoreProvider } from './src/store';

function AppContent() {
  const { setTheme, theme, isDark } = useTheme();
  const dispatch = useAppDispatch();
  const reduxTheme = useAppSelector(selectTheme);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  const styles = useThemedStyles(theme => ({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
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
    themeButton: {
      backgroundColor: theme.colors.primary[500],
      paddingHorizontal: theme.spacing[6],
      paddingVertical: theme.spacing[3],
      borderRadius: theme.borderRadius.md,
      marginBottom: theme.spacing[2],
    },
    themeButtonText: {
      color: theme.colors.text.inverse,
      fontSize: theme.typography.fontSize.base,
      fontWeight: theme.typography.fontWeight.medium,
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
      // Also update Redux store
      dispatch(setReduxTheme(nextTheme));
    }
  };

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <Text style={styles.title}>Universal Expo React Native Template</Text>
        <Text style={styles.subtitle}>
          Theme system with NativeWind initialized successfully!
        </Text>

        <TouchableOpacity style={styles.themeButton} onPress={cycleTheme}>
          <Text style={styles.themeButtonText}>
            Switch Theme (Current: {theme})
          </Text>
        </TouchableOpacity>

        <Text style={styles.themeInfo}>
          Active theme: {isDark ? 'Dark' : 'Light'} mode
        </Text>

        <Text style={styles.reduxInfo}>
          Redux Theme: {reduxTheme} | Auth: {isAuthenticated ? 'Yes' : 'No'}
        </Text>

        <StatusBar style={isDark ? 'light' : 'dark'} />
      </View>

      {/* NativeWind Test Component */}
      <NativeWindTest />

      {/* NativeWind Example Component */}
      <NativeWindExample
        title="NativeWind Button"
        variant="primary"
        size="md"
        onPress={() => {
          // Handle button press
        }}
      />

      {/* Redux Example Component */}
      <ReduxExample />
    </ScrollView>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </StoreProvider>
  );
}
