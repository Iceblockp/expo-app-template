import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useThemedStyles, useAppSelector } from '../../../src/hooks';
import { useTheme } from '../../../src/theme';
import { selectIsAuthenticated, selectCurrentUser } from '../../../src/store';

export default function ProfileScreen() {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const user = useAppSelector(selectCurrentUser);
  const { colors } = useTheme();

  // Get user initials for avatar
  const getInitials = () => {
    if (!user) return 'U';
    const firstInitial = user.firstName?.charAt(0) || '';
    const lastInitial = user.lastName?.charAt(0) || '';
    return (firstInitial + lastInitial).toUpperCase() || 'U';
  };

  // Get full name
  const getFullName = () => {
    if (!user) return 'Guest User';
    return `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'User';
  };

  const styles = useThemedStyles(theme => ({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    content: {
      padding: theme.spacing[4],
    },
    profileHeader: {
      alignItems: 'center',
      marginBottom: theme.spacing[6],
      paddingVertical: theme.spacing[6],
    },
    avatarContainer: {
      width: 100,
      height: 100,
      borderRadius: 50,
      backgroundColor: theme.colors.primary[100],
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: theme.spacing[4],
    },
    avatarText: {
      fontSize: theme.typography.fontSize['3xl'],
      fontWeight: theme.typography.fontWeight.bold,
      color: theme.colors.primary[500],
    },
    name: {
      fontSize: theme.typography.fontSize['2xl'],
      fontWeight: theme.typography.fontWeight.bold,
      color: theme.colors.text.primary,
      marginBottom: theme.spacing[1],
    },
    email: {
      fontSize: theme.typography.fontSize.base,
      color: theme.colors.text.secondary,
    },
    section: {
      marginBottom: theme.spacing[4],
    },
    sectionTitle: {
      fontSize: theme.typography.fontSize.sm,
      fontWeight: theme.typography.fontWeight.semibold,
      color: theme.colors.text.tertiary,
      textTransform: 'uppercase',
      marginBottom: theme.spacing[2],
      paddingHorizontal: theme.spacing[2],
    },
    menuItem: {
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.lg,
      padding: theme.spacing[4],
      marginBottom: theme.spacing[2],
      flexDirection: 'row',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1,
    },
    menuIcon: {
      marginRight: theme.spacing[3],
    },
    menuContent: {
      flex: 1,
    },
    menuTitle: {
      fontSize: theme.typography.fontSize.base,
      fontWeight: theme.typography.fontWeight.medium,
      color: theme.colors.text.primary,
      marginBottom: theme.spacing[1],
    },
    menuDescription: {
      fontSize: theme.typography.fontSize.sm,
      color: theme.colors.text.secondary,
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

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>{getInitials()}</Text>
          </View>
          <Text style={styles.name}>{getFullName()}</Text>
          <Text style={styles.email}>{user?.email || 'guest@example.com'}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push('/profile/edit')}
          >
            <Ionicons
              name="person-outline"
              size={24}
              color={colors.primary[500]}
              style={styles.menuIcon}
            />
            <View style={styles.menuContent}>
              <Text style={styles.menuTitle}>Edit Profile</Text>
              <Text style={styles.menuDescription}>
                Update your personal information
              </Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={colors.text.tertiary}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push('/profile/preferences')}
          >
            <Ionicons
              name="options-outline"
              size={24}
              color={colors.secondary[500]}
              style={styles.menuIcon}
            />
            <View style={styles.menuContent}>
              <Text style={styles.menuTitle}>Preferences</Text>
              <Text style={styles.menuDescription}>
                Manage your app preferences
              </Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={colors.text.tertiary}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Status</Text>

          <View style={styles.menuItem}>
            <Ionicons
              name="shield-checkmark-outline"
              size={24}
              color={colors.success[500]}
              style={styles.menuIcon}
            />
            <View style={styles.menuContent}>
              <Text style={styles.menuTitle}>Authentication Status</Text>
              <Text style={styles.menuDescription}>
                Your account security status
              </Text>
            </View>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>
                {isAuthenticated ? 'Active' : 'Guest'}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
