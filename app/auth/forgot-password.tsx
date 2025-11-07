import { View, Text, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { useThemedStyles } from '../../src/hooks';

export default function ForgotPasswordScreen() {
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

  const handleResetPassword = () => {
    // TODO: Implement actual password reset logic
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>

      <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
        <Text style={styles.buttonText}>Reset Password (Demo)</Text>
      </TouchableOpacity>

      <Link href="/auth/login" style={styles.link}>
        Back to Login
      </Link>
    </View>
  );
}
