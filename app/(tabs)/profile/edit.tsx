import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import {
  useThemedStyles,
  useAppSelector,
  useAppDispatch,
} from '../../../src/hooks';
import { useTheme } from '../../../src/theme';
import { Input } from '../../../src/components/ui';
import { useState, useEffect, startTransition } from 'react';
import { selectCurrentUser, updateUser } from '../../../src/store';
import { validateEmail, validateName } from '../../../src/utils/validation';

export default function EditProfileScreen() {
  const { colors } = useTheme();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  // Validation errors
  const [errors, setErrors] = useState<{
    firstName?: string;
    lastName?: string;
    email?: string;
  }>({});

  // Load user data on mount
  useEffect(() => {
    if (!user) return;

    // Use startTransition to mark these updates as non-urgent
    startTransition(() => {
      setFirstName(user.firstName ?? '');
      setLastName(user.lastName ?? '');
      setEmail(user.email ?? '');
      setPhone(''); // Phone is not in the User model yet
    });
  }, [user]);

  const styles = useThemedStyles(theme => ({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    content: {
      padding: theme.spacing[4],
    },
    avatarSection: {
      alignItems: 'center',
      marginBottom: theme.spacing[6],
      paddingVertical: theme.spacing[4],
    },
    avatarContainer: {
      width: 100,
      height: 100,
      borderRadius: 50,
      backgroundColor: theme.colors.primary[100],
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: theme.spacing[3],
    },
    avatarText: {
      fontSize: theme.typography.fontSize['3xl'],
      fontWeight: theme.typography.fontWeight.bold,
      color: theme.colors.primary[500],
    },
    changePhotoButton: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: theme.spacing[4],
      paddingVertical: theme.spacing[2],
      borderRadius: theme.borderRadius.md,
      borderWidth: 1,
      borderColor: theme.colors.primary[500],
    },
    changePhotoText: {
      fontSize: theme.typography.fontSize.sm,
      fontWeight: theme.typography.fontWeight.medium,
      color: theme.colors.primary[500],
      marginLeft: theme.spacing[2],
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
    inputGroup: {
      marginBottom: theme.spacing[4],
    },
    label: {
      fontSize: theme.typography.fontSize.sm,
      fontWeight: theme.typography.fontWeight.medium,
      color: theme.colors.text.primary,
      marginBottom: theme.spacing[2],
    },
    buttonContainer: {
      flexDirection: 'row',
      gap: theme.spacing[3],
      marginTop: theme.spacing[4],
    },
    button: {
      flex: 1,
      backgroundColor: theme.colors.primary[500],
      paddingVertical: theme.spacing[3],
      borderRadius: theme.borderRadius.md,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonSecondary: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: theme.colors.neutral[300],
    },
    buttonText: {
      fontSize: theme.typography.fontSize.base,
      fontWeight: theme.typography.fontWeight.medium,
      color: theme.colors.text.inverse,
    },
    buttonTextSecondary: {
      color: theme.colors.text.primary,
    },
  }));

  const validateForm = (): boolean => {
    const newErrors: typeof errors = {};

    // Validate first name
    const firstNameValidation = validateName(firstName, 'First name');
    if (!firstNameValidation.isValid && firstNameValidation.error) {
      newErrors.firstName = firstNameValidation.error;
    }

    // Validate last name
    const lastNameValidation = validateName(lastName, 'Last name');
    if (!lastNameValidation.isValid && lastNameValidation.error) {
      newErrors.lastName = lastNameValidation.error;
    }

    // Validate email
    const emailValidation = validateEmail(email);
    if (!emailValidation.isValid && emailValidation.error) {
      newErrors.email = emailValidation.error;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) {
      Alert.alert('Validation Error', 'Please fix the errors before saving.');
      return;
    }

    // Update user in Redux store
    dispatch(
      updateUser({
        firstName,
        lastName,
        email,
      })
    );

    Alert.alert('Success', 'Profile updated successfully!', [
      { text: 'OK', onPress: () => router.back() },
    ]);
  };

  const getInitials = () => {
    const firstInitial = firstName?.charAt(0) || '';
    const lastInitial = lastName?.charAt(0) || '';
    return (firstInitial + lastInitial).toUpperCase() || 'U';
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.avatarSection}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>{getInitials()}</Text>
          </View>
          <TouchableOpacity
            style={styles.changePhotoButton}
            onPress={() =>
              Alert.alert(
                'Coming Soon',
                'Photo upload feature will be available soon.'
              )
            }
          >
            <Ionicons
              name="camera-outline"
              size={18}
              color={colors.primary[500]}
            />
            <Text style={styles.changePhotoText}>Change Photo</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Information</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>First Name</Text>
            <Input
              value={firstName}
              onChangeText={text => {
                setFirstName(text);
                if (errors.firstName) {
                  // eslint-disable-next-line @typescript-eslint/no-unused-vars
                  const { firstName: _, ...rest } = errors;
                  setErrors(rest);
                }
              }}
              placeholder="Enter your first name"
              {...(errors.firstName && { error: errors.firstName })}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Last Name</Text>
            <Input
              value={lastName}
              onChangeText={text => {
                setLastName(text);
                if (errors.lastName) {
                  // eslint-disable-next-line @typescript-eslint/no-unused-vars
                  const { lastName: _, ...rest } = errors;
                  setErrors(rest);
                }
              }}
              placeholder="Enter your last name"
              {...(errors.lastName && { error: errors.lastName })}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <Input
              value={email}
              onChangeText={text => {
                setEmail(text);
                if (errors.email) {
                  // eslint-disable-next-line @typescript-eslint/no-unused-vars
                  const { email: _, ...rest } = errors;
                  setErrors(rest);
                }
              }}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
              {...(errors.email && { error: errors.email })}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Phone Number</Text>
            <Input
              value={phone}
              onChangeText={setPhone}
              placeholder="Enter your phone number"
              keyboardType="phone-pad"
            />
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.buttonSecondary]}
            onPress={() => router.back()}
          >
            <Text style={[styles.buttonText, styles.buttonTextSecondary]}>
              Cancel
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleSave}>
            <Text style={styles.buttonText}>Save Changes</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
