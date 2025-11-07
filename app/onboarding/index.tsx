import { View, Text, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useThemedStyles } from '../../src/hooks';

export default function OnboardingScreen() {
  const styles = useThemedStyles(theme => ({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: theme.spacing[4],
      backgroundColor: theme.colors.background,
    },
    title: {
      fontSize: theme.typography.fontSize['2xl'],
      fontWeight: theme.typography.fontWeight.bold,
      color: theme.colors.text.primary,
      marginBottom: theme.spacing[4],
    },
    subtitle: {
      fontSize: theme.typography.fontSize.base,
      color: theme.colors.text.secondary,
      textAlign: 'center',
      marginBottom: theme.spacing[8],
    },
    button: {
      backgroundColor: theme.colors.primary[500],
      paddingHorizontal: theme.spacing[6],
      paddingVertical: theme.spacing[3],
      borderRadius: theme.borderRadius.md,
      marginBottom: theme.spacing[4],
    },
    buttonText: {
      color: theme.colors.text.inverse,
      fontSize: theme.typography.fontSize.base,
      fontWeight: theme.typography.fontWeight.medium,
    },
    skipButton: {
      paddingHorizontal: theme.spacing[4],
      paddingVertical: theme.spacing[2],
    },
    skipButtonText: {
      color: theme.colors.text.tertiary,
      fontSize: theme.typography.fontSize.sm,
    },
  }));

  const handleCompleteOnboarding = () => {
    // TODO: Mark onboarding as completed in app state
    router.replace('/auth/login');
  };

  const handleSkip = () => {
    // TODO: Mark onboarding as completed in app state
    router.replace('/auth/login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome!</Text>
      <Text style={styles.subtitle}>
        This is your onboarding screen. Here you can introduce users to your
        app&apos;s features.
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={handleCompleteOnboarding}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
        <Text style={styles.skipButtonText}>Skip</Text>
      </TouchableOpacity>
    </View>
  );
}
