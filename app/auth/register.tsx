import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Link } from 'expo-router';
import { useThemedStyles, useAuth } from '../../src/hooks';
import { Button, Input } from '../../src/components/ui';
import {
  validateEmail,
  validatePassword,
  validatePasswordConfirmation,
  validateName,
} from '../../src/utils/validation';

export default function RegisterScreen() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const { register, loading, error } = useAuth();

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
    nameRow: {
      flexDirection: 'row',
      gap: theme.spacing[3],
    },
    nameInput: {
      flex: 1,
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

  const handleRegister = async () => {
    // Clear previous errors
    setFirstNameError('');
    setLastNameError('');
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');

    // Validate inputs
    const firstNameValidation = validateName(firstName, 'First name');
    const lastNameValidation = validateName(lastName, 'Last name');
    const emailValidation = validateEmail(email);
    const passwordValidation = validatePassword(password);
    const confirmPasswordValidation = validatePasswordConfirmation(
      password,
      confirmPassword
    );

    let hasError = false;

    if (!firstNameValidation.isValid) {
      setFirstNameError(firstNameValidation.error || '');
      hasError = true;
    }

    if (!lastNameValidation.isValid) {
      setLastNameError(lastNameValidation.error || '');
      hasError = true;
    }

    if (!emailValidation.isValid) {
      setEmailError(emailValidation.error || '');
      hasError = true;
    }

    if (!passwordValidation.isValid) {
      setPasswordError(passwordValidation.error || '');
      hasError = true;
    }

    if (!confirmPasswordValidation.isValid) {
      setConfirmPasswordError(confirmPasswordValidation.error || '');
      hasError = true;
    }

    if (hasError) {
      return;
    }

    // Attempt registration
    await register({
      email: email.trim(),
      password,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
    });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Sign up to get started</Text>

        {error && <Text style={styles.errorText}>{error}</Text>}

        <View style={styles.form}>
          <View style={styles.nameRow}>
            <Input
              label="First Name"
              placeholder="John"
              value={firstName}
              onChangeText={text => {
                setFirstName(text);
                setFirstNameError('');
              }}
              error={firstNameError}
              autoCapitalize="words"
              autoComplete="given-name"
              editable={!loading}
              containerStyle={styles.nameInput}
            />

            <Input
              label="Last Name"
              placeholder="Doe"
              value={lastName}
              onChangeText={text => {
                setLastName(text);
                setLastNameError('');
              }}
              error={lastNameError}
              autoCapitalize="words"
              autoComplete="family-name"
              editable={!loading}
              containerStyle={styles.nameInput}
            />
          </View>

          <Input
            label="Email"
            placeholder="Enter your email"
            value={email}
            onChangeText={text => {
              setEmail(text);
              setEmailError('');
            }}
            error={emailError}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            editable={!loading}
          />

          <Input
            label="Password"
            placeholder="Create a password"
            value={password}
            onChangeText={text => {
              setPassword(text);
              setPasswordError('');
            }}
            error={passwordError}
            secureTextEntry
            autoCapitalize="none"
            autoComplete="password-new"
            editable={!loading}
          />

          <Input
            label="Confirm Password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChangeText={text => {
              setConfirmPassword(text);
              setConfirmPasswordError('');
            }}
            error={confirmPasswordError}
            secureTextEntry
            autoCapitalize="none"
            autoComplete="password-new"
            editable={!loading}
          />

          <Button
            title="Sign Up"
            onPress={handleRegister}
            loading={loading}
            disabled={loading}
            fullWidth
          />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account?</Text>
          <Link href="/auth/login">
            <Text style={styles.link}>Sign In</Text>
          </Link>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
