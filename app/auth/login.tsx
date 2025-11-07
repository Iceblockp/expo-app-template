import { View, Text, TouchableOpacity } from 'react-native';
import { Link, router } from 'expo-router';
import { useThemedStyles } from '../../src/hooks';

export default function LoginScreen() {
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
    link: {
      color: theme.colors.primary[500],
      fontSize: theme.typography.fontSize.sm,
    },
  }));

  const handleLogin = () => {
    // TODO: Implement actual login logic
    router.replace('/(tabs)');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login (Demo)</Text>
      </TouchableOpacity>

      <Link href="/auth/register" style={styles.link}>
        Don&apos;t have an account? Register
      </Link>
    </View>
  );
}
