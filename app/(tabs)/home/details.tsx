import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useThemedStyles } from '../../../src/hooks';
import { useTheme } from '../../../src/theme';

export default function DetailsScreen() {
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
      marginBottom: theme.spacing[6],
    },
    title: {
      fontSize: theme.typography.fontSize['2xl'],
      fontWeight: theme.typography.fontWeight.bold,
      color: theme.colors.text.primary,
      marginBottom: theme.spacing[2],
    },
    description: {
      fontSize: theme.typography.fontSize.base,
      color: theme.colors.text.secondary,
      lineHeight: 24,
      marginBottom: theme.spacing[4],
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
    card: {
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.lg,
      padding: theme.spacing[4],
      marginBottom: theme.spacing[3],
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    cardTitle: {
      fontSize: theme.typography.fontSize.base,
      fontWeight: theme.typography.fontWeight.semibold,
      color: theme.colors.text.primary,
      marginBottom: theme.spacing[2],
    },
    cardText: {
      fontSize: theme.typography.fontSize.sm,
      color: theme.colors.text.secondary,
      lineHeight: 20,
    },
    infoRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: theme.spacing[2],
    },
    infoLabel: {
      fontSize: theme.typography.fontSize.sm,
      fontWeight: theme.typography.fontWeight.medium,
      color: theme.colors.text.primary,
      marginLeft: theme.spacing[2],
      flex: 1,
    },
    infoValue: {
      fontSize: theme.typography.fontSize.sm,
      color: theme.colors.text.secondary,
    },
    button: {
      backgroundColor: theme.colors.primary[500],
      paddingHorizontal: theme.spacing[4],
      paddingVertical: theme.spacing[3],
      borderRadius: theme.borderRadius.md,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: theme.spacing[4],
    },
    buttonText: {
      color: theme.colors.text.inverse,
      fontSize: theme.typography.fontSize.base,
      fontWeight: theme.typography.fontWeight.medium,
      marginLeft: theme.spacing[2],
    },
  }));

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Details Screen</Text>
          <Text style={styles.description}>
            This is a placeholder details screen demonstrating stack navigation
            within the Home tab. You can customize this screen to display
            detailed information about items from your home screen.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Navigation Features</Text>

          <View style={styles.card}>
            <View style={styles.infoRow}>
              <Ionicons
                name="layers-outline"
                size={20}
                color={colors.primary[500]}
              />
              <Text style={styles.infoLabel}>Stack Navigation</Text>
              <Text style={styles.infoValue}>Active</Text>
            </View>
            <View style={styles.infoRow}>
              <Ionicons
                name="arrow-back-outline"
                size={20}
                color={colors.primary[500]}
              />
              <Text style={styles.infoLabel}>Back Navigation</Text>
              <Text style={styles.infoValue}>Enabled</Text>
            </View>
            <View style={styles.infoRow}>
              <Ionicons
                name="swap-horizontal-outline"
                size={20}
                color={colors.primary[500]}
              />
              <Text style={styles.infoLabel}>Transitions</Text>
              <Text style={styles.infoValue}>Slide Right</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Screen Information</Text>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Purpose</Text>
            <Text style={styles.cardText}>
              This screen demonstrates how to create nested navigation within a
              tab. Each tab can have its own navigation stack, allowing for
              complex navigation patterns while maintaining the tab bar at the
              bottom.
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Implementation</Text>
            <Text style={styles.cardText}>
              The screen is part of the Home stack navigator, which is nested
              inside the tab navigator. This allows you to navigate between
              screens while staying within the Home tab context.
            </Text>
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={20} color="#fff" />
          <Text style={styles.buttonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
