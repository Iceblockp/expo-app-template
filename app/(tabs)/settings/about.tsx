import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useThemedStyles } from '../../../src/hooks';
import { useTheme } from '../../../src/theme';
import Constants from 'expo-constants';

export default function AboutScreen() {
  const { colors } = useTheme();

  const styles = useThemedStyles(theme => ({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    content: {
      padding: theme.spacing[4],
    },
    header: {
      alignItems: 'center',
      paddingVertical: theme.spacing[8],
      marginBottom: theme.spacing[6],
    },
    appIcon: {
      width: 80,
      height: 80,
      borderRadius: 20,
      backgroundColor: theme.colors.primary[500],
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: theme.spacing[4],
    },
    appIconText: {
      fontSize: theme.typography.fontSize['3xl'],
      fontWeight: theme.typography.fontWeight.bold,
      color: '#fff',
    },
    appName: {
      fontSize: theme.typography.fontSize['2xl'],
      fontWeight: theme.typography.fontWeight.bold,
      color: theme.colors.text.primary,
      marginBottom: theme.spacing[2],
    },
    version: {
      fontSize: theme.typography.fontSize.base,
      color: theme.colors.text.secondary,
    },
    section: {
      marginBottom: theme.spacing[6],
    },
    sectionTitle: {
      fontSize: theme.typography.fontSize.sm,
      fontWeight: theme.typography.fontWeight.semibold,
      color: theme.colors.text.tertiary,
      textTransform: 'uppercase',
      marginBottom: theme.spacing[2],
      paddingHorizontal: theme.spacing[2],
    },
    infoCard: {
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.lg,
      padding: theme.spacing[4],
      marginBottom: theme.spacing[3],
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1,
    },
    infoRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: theme.spacing[2],
    },
    infoLabel: {
      fontSize: theme.typography.fontSize.sm,
      fontWeight: theme.typography.fontWeight.medium,
      color: theme.colors.text.secondary,
    },
    infoValue: {
      fontSize: theme.typography.fontSize.sm,
      color: theme.colors.text.primary,
      fontWeight: theme.typography.fontWeight.medium,
    },
    linkItem: {
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
    linkIcon: {
      marginRight: theme.spacing[3],
    },
    linkContent: {
      flex: 1,
    },
    linkTitle: {
      fontSize: theme.typography.fontSize.base,
      fontWeight: theme.typography.fontWeight.medium,
      color: theme.colors.text.primary,
    },
    description: {
      fontSize: theme.typography.fontSize.sm,
      color: theme.colors.text.secondary,
      lineHeight: 20,
      marginBottom: theme.spacing[4],
    },
  }));

  const appVersion = Constants.expoConfig?.version || '1.0.0';
  const buildNumber = Constants.expoConfig?.ios?.buildNumber || '1';

  const handleOpenLink = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.appIcon}>
            <Text style={styles.appIconText}>UT</Text>
          </View>
          <Text style={styles.appName}>Universal Template</Text>
          <Text style={styles.version}>Version {appVersion}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About This App</Text>
          <View style={styles.infoCard}>
            <Text style={styles.description}>
              A comprehensive, production-ready Expo React Native template
              designed to accelerate mobile app development with modern
              patterns, theming, navigation, and state management.
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App Information</Text>

          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Version</Text>
              <Text style={styles.infoValue}>{appVersion}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Build Number</Text>
              <Text style={styles.infoValue}>{buildNumber}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Expo SDK</Text>
              <Text style={styles.infoValue}>
                {Constants.expoConfig?.sdkVersion || '54.0.0'}
              </Text>
            </View>
            <View style={[styles.infoRow, { marginBottom: 0 }]}>
              <Text style={styles.infoLabel}>Platform</Text>
              <Text style={styles.infoValue}>
                {Constants.platform?.ios ? 'iOS' : 'Android'}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Resources</Text>

          <TouchableOpacity
            style={styles.linkItem}
            onPress={() => handleOpenLink('https://docs.expo.dev')}
          >
            <Ionicons
              name="book-outline"
              size={24}
              color={colors.primary[500]}
              style={styles.linkIcon}
            />
            <View style={styles.linkContent}>
              <Text style={styles.linkTitle}>Documentation</Text>
            </View>
            <Ionicons
              name="open-outline"
              size={20}
              color={colors.text.tertiary}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.linkItem}
            onPress={() => handleOpenLink('https://github.com')}
          >
            <Ionicons
              name="logo-github"
              size={24}
              color={colors.secondary[500]}
              style={styles.linkIcon}
            />
            <View style={styles.linkContent}>
              <Text style={styles.linkTitle}>GitHub Repository</Text>
            </View>
            <Ionicons
              name="open-outline"
              size={20}
              color={colors.text.tertiary}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.linkItem}
            onPress={() => handleOpenLink('https://reactnative.dev')}
          >
            <Ionicons
              name="logo-react"
              size={24}
              color={colors.success[500]}
              style={styles.linkIcon}
            />
            <View style={styles.linkContent}>
              <Text style={styles.linkTitle}>React Native</Text>
            </View>
            <Ionicons
              name="open-outline"
              size={20}
              color={colors.text.tertiary}
            />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
