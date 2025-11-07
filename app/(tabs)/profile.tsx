import { View, Text, TouchableOpacity } from 'react-native';
import { useThemedStyles, useAppSelector } from '../../src/hooks';
import { selectIsAuthenticated } from '../../src/store';

export default function ProfileScreen() {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

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
    info: {
      fontSize: theme.typography.fontSize.sm,
      color: theme.colors.text.tertiary,
      textAlign: 'center',
    },
    button: {
      backgroundColor: theme.colors.primary[500],
      paddingHorizontal: theme.spacing[6],
      paddingVertical: theme.spacing[3],
      borderRadius: theme.borderRadius.md,
      marginTop: theme.spacing[4],
    },
    buttonText: {
      color: theme.colors.text.inverse,
      fontSize: theme.typography.fontSize.base,
      fontWeight: theme.typography.fontWeight.medium,
    },
  }));

  const handleEditProfile = () => {
    // TODO: Navigate to profile edit screen or show edit modal
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Text style={styles.subtitle}>
        This is your profile screen. Here you can display and edit user
        information.
      </Text>

      <Text style={styles.info}>
        Authentication Status:{' '}
        {isAuthenticated ? 'Authenticated' : 'Not Authenticated'}
      </Text>

      <TouchableOpacity style={styles.button} onPress={handleEditProfile}>
        <Text style={styles.buttonText}>Edit Profile (Demo)</Text>
      </TouchableOpacity>
    </View>
  );
}
