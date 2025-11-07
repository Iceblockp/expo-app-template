import { Tabs } from 'expo-router';
import { useThemedStyles } from '../../src/hooks';

export default function TabLayout() {
  const styles = useThemedStyles(theme => ({
    tabBar: {
      backgroundColor: theme.colors.surface,
      borderTopColor: theme.colors.neutral[200],
      borderTopWidth: 1,
    },
    tabBarLabel: {
      fontSize: theme.typography.fontSize.xs,
      fontWeight: theme.typography.fontWeight.medium,
    },
  }));

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#3B82F6', // Primary color - will be theme-aware later
        tabBarInactiveTintColor: '#9CA3AF', // Tertiary text color
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: () => null, // TODO: Replace with actual icon component
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: () => null, // TODO: Replace with actual icon component
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: () => null, // TODO: Replace with actual icon component
        }}
      />
    </Tabs>
  );
}
