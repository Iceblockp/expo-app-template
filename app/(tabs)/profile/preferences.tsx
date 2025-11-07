import { View, Text, ScrollView, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useThemedStyles } from '../../../src/hooks';
import { useTheme } from '../../../src/theme';
import { useState } from 'react';

export default function PreferencesScreen() {
  const { colors } = useTheme();
  const [notifications, setNotifications] = useState(true);
  const [emailUpdates, setEmailUpdates] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [locationServices, setLocationServices] = useState(false);

  const styles = useThemedStyles(theme => ({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    content: {
      padding: theme.spacing[4],
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
    sectionDescription: {
      fontSize: theme.typography.fontSize.sm,
      color: theme.colors.text.secondary,
      marginBottom: theme.spacing[4],
      lineHeight: 20,
    },
    preferenceItem: {
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
    preferenceIcon: {
      marginRight: theme.spacing[3],
    },
    preferenceContent: {
      flex: 1,
    },
    preferenceTitle: {
      fontSize: theme.typography.fontSize.base,
      fontWeight: theme.typography.fontWeight.medium,
      color: theme.colors.text.primary,
      marginBottom: theme.spacing[1],
    },
    preferenceDescription: {
      fontSize: theme.typography.fontSize.sm,
      color: theme.colors.text.secondary,
    },
    infoCard: {
      backgroundColor: theme.colors.primary[50],
      borderRadius: theme.borderRadius.lg,
      padding: theme.spacing[4],
      flexDirection: 'row',
      alignItems: 'flex-start',
    },
    infoIcon: {
      marginRight: theme.spacing[3],
      marginTop: 2,
    },
    infoText: {
      flex: 1,
      fontSize: theme.typography.fontSize.sm,
      color: theme.colors.text.secondary,
      lineHeight: 20,
    },
  }));

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          <Text style={styles.sectionDescription}>
            Manage how you receive notifications and updates from the app.
          </Text>

          <View style={styles.preferenceItem}>
            <Ionicons
              name="notifications-outline"
              size={24}
              color={colors.primary[500]}
              style={styles.preferenceIcon}
            />
            <View style={styles.preferenceContent}>
              <Text style={styles.preferenceTitle}>All Notifications</Text>
              <Text style={styles.preferenceDescription}>
                Enable or disable all notifications
              </Text>
            </View>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{
                false: colors.neutral[300],
                true: colors.primary[500],
              }}
              thumbColor="#fff"
            />
          </View>

          <View style={styles.preferenceItem}>
            <Ionicons
              name="mail-outline"
              size={24}
              color={colors.secondary[500]}
              style={styles.preferenceIcon}
            />
            <View style={styles.preferenceContent}>
              <Text style={styles.preferenceTitle}>Email Updates</Text>
              <Text style={styles.preferenceDescription}>
                Receive updates via email
              </Text>
            </View>
            <Switch
              value={emailUpdates}
              onValueChange={setEmailUpdates}
              trackColor={{
                false: colors.neutral[300],
                true: colors.primary[500],
              }}
              thumbColor="#fff"
            />
          </View>

          <View style={styles.preferenceItem}>
            <Ionicons
              name="phone-portrait-outline"
              size={24}
              color={colors.success[500]}
              style={styles.preferenceIcon}
            />
            <View style={styles.preferenceContent}>
              <Text style={styles.preferenceTitle}>Push Notifications</Text>
              <Text style={styles.preferenceDescription}>
                Receive push notifications on your device
              </Text>
            </View>
            <Switch
              value={pushNotifications}
              onValueChange={setPushNotifications}
              trackColor={{
                false: colors.neutral[300],
                true: colors.primary[500],
              }}
              thumbColor="#fff"
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Privacy</Text>
          <Text style={styles.sectionDescription}>
            Control your privacy settings and data sharing preferences.
          </Text>

          <View style={styles.preferenceItem}>
            <Ionicons
              name="location-outline"
              size={24}
              color={colors.warning[500]}
              style={styles.preferenceIcon}
            />
            <View style={styles.preferenceContent}>
              <Text style={styles.preferenceTitle}>Location Services</Text>
              <Text style={styles.preferenceDescription}>
                Allow app to access your location
              </Text>
            </View>
            <Switch
              value={locationServices}
              onValueChange={setLocationServices}
              trackColor={{
                false: colors.neutral[300],
                true: colors.primary[500],
              }}
              thumbColor="#fff"
            />
          </View>
        </View>

        <View style={styles.infoCard}>
          <Ionicons
            name="information-circle-outline"
            size={24}
            color={colors.primary[500]}
            style={styles.infoIcon}
          />
          <Text style={styles.infoText}>
            These preferences are stored locally on your device. Changes will
            take effect immediately and persist across app sessions.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
