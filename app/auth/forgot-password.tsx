import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Link, useRouter } from 'expo-router';
import { useThemedStyles, useAuth } from '../../src/hooks';
import { Button, Input } from '../../src/components/ui';
import { validateEmail } from '../../src/utils/validation';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { forgotPassword } = useAuth();
  const router = useRouter();

  const styles = useThemedStyles(theme => ({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    scrollContent: {
      flexGrow: 1,
      justifyContent: 'center',
      padding: theme.spacing[6],
    },
    title: {
      fontSize: theme.typography.fontSize['3xl'],
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
      lineHeight: theme.typography.lineHeight.relaxed,
    },
    form: {
      gap: theme.spacing[4],
    },
    errorText: {
      color: theme.colors.error[500],
      fontSize: theme.typography.fontSize.sm,
      textAlign: 'center',
      marginBottom: theme.spacing[4],
    },
    successContainer: {
      backgroundColor: theme.colors.success[50],
      borderRadius: theme.borderRadius.lg,
      padding: theme.spacing[6],
      marginBottom: theme.spacing[6],
    },
    successTitle: {
      fontSize: theme.typography.fontSize.xl,
      fontWeight: theme.typography.fontWeight.bold,
      color: theme.colors.success[700],
      marginBottom: theme.spacing[2],
      textAlign: 'center',
    },
    successText: {
      fontSize: theme.typography.fontSize.base,
      color: theme.colors.success[600],
      textAlign: 'center',
      lineHeight: theme.typography.lineHeight.relaxed,
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: theme.spacing[6],
      gap: theme.spacing[1],
    },
    footerText: {
      color: theme.colors.text.secondary,
      fontSize: theme.typography.fontSize.sm,
    },
    link: {
      color: theme.colors.primary[500],
      fontSize: theme.typography.fontSize.sm,
      fontWeight: theme.typography.fontWeight.medium,
    },
  }));

  const handleResetPassword = async () => {
    // Clear previous errors
    setEmailError('');
    setErrorMessage('');

    // Validate email
    const emailValidation = validateEmail(email);

    if (!emailValidation.isValid) {
      setEmailError(emailValidation.error || '');
      return;
    }

    // Attempt password reset
    setIsLoading(true);
    const result = await forgotPassword({ email: email.trim() });
    setIsLoading(false);

    if (result.success) {
      setIsSubmitted(true);
    } else {
      setErrorMessage(result.error || 'Failed to send reset email');
    }
  };

  const handleBackToLogin = () => {
    router.push('/auth/login');
  };

  if (isSubmitted) {
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.successContainer}>
            <Text style={styles.successTitle}>Check Your Email</Text>
            <Text style={styles.successText}>
              We&apos;ve sent password reset instructions to {email}. Please
              check your inbox and follow the link to reset your password.
            </Text>
          </View>

          <Button
            title="Back to Sign In"
            onPress={handleBackToLogin}
            fullWidth
          />

          <View style={styles.footer}>
            <Text style={styles.footerText}>Didn&apos;t receive email?</Text>
            <Text
              style={styles.link}
              onPress={() => {
                setIsSubmitted(false);
                setEmail('');
              }}
            >
              Try Again
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Forgot Password?</Text>
        <Text style={styles.subtitle}>
          Enter your email address and we&apos;ll send you instructions to reset
          your password.
        </Text>

        {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}

        <View style={styles.form}>
          <Input
            label="Email"
            placeholder="Enter your email"
            value={email}
            onChangeText={text => {
              setEmail(text);
              setEmailError('');
              setErrorMessage('');
            }}
            error={emailError}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            editable={!isLoading}
          />

          <Button
            title="Send Reset Link"
            onPress={handleResetPassword}
            loading={isLoading}
            disabled={isLoading}
            fullWidth
          />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Remember your password?</Text>
          <Link href="/auth/login">
            <Text style={styles.link}>Sign In</Text>
          </Link>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
