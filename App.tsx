import './global.css';
import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { ThemeProvider, useTheme } from './src/theme';
import { useThemedStyles } from './src/hooks';
import { NativeWindExample, NativeWindTest } from './src/components/ui';

function AppContent() {
  const { setTheme, theme, isDark } = useTheme();

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
    </ScrollView>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
