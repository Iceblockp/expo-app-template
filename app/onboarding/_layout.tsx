import { Stack } from 'expo-router';
import { useThemedStyles } from '../../src/hooks';

export default function OnboardingLayout() {
  const styles = useThemedStyles(theme => ({
    content: {
      backgroundColor: theme.colors.background,
    },
  }));

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: styles.content,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="index" />
    </Stack>
  );
}
