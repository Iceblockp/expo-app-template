import { Stack } from 'expo-router';
import { useTheme } from '../../../src/theme';

export default function ProfileStackLayout() {
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
          title: 'Profile',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="edit"
        options={{
          title: 'Edit Profile',
          headerShown: true,
          presentation: 'card',
        }}
      />
      <Stack.Screen
        name="preferences"
        options={{
          title: 'Preferences',
          headerShown: true,
          presentation: 'card',
        }}
      />
    </Stack>
  );
}
