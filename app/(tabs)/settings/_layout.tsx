import { Stack } from 'expo-router';
import { useTheme } from '../../../src/theme';

export default function SettingsStackLayout() {
  const { colors } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.surface,
        },
        headerTintColor: colors.text.primary,
        headerTitleStyle: {
          fontWeight: '600',
        },
        animation: 'slide_from_right',
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'Settings',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="appearance"
        options={{
          title: 'Appearance',
          headerShown: true,
          presentation: 'card',
        }}
      />
      <Stack.Screen
        name="language"
        options={{
          title: 'Language',
          headerShown: true,
          presentation: 'card',
        }}
      />
      <Stack.Screen
        name="about"
        options={{
          title: 'About',
          headerShown: true,
          presentation: 'card',
        }}
      />
    </Stack>
  );
}
