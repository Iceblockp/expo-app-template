# Onboarding Flow

This directory contains documentation for the onboarding flow implementation.

## Overview

The onboarding flow provides a swipeable multi-step introduction to your app's features. Users can navigate through steps, skip the onboarding, or complete it to proceed to authentication.

## Features

- ✅ **Swipeable Steps**: Users can swipe between onboarding screens
- ✅ **Skip Functionality**: Users can skip onboarding at any time
- ✅ **Completion Tracking**: Onboarding completion is tracked in Redux state
- ✅ **Navigation Guards**: Prevents re-showing onboarding after completion
- ✅ **Localization Support**: All text is localized using i18n
- ✅ **Customizable Content**: Easy to modify steps, icons, and content
- ✅ **Responsive Design**: Works on all screen sizes
- ✅ **Pagination Indicators**: Visual dots show current step
- ✅ **Back/Next Navigation**: Buttons for manual navigation

## File Structure

```
app/onboarding/
├── _layout.tsx          # Onboarding stack layout
└── index.tsx            # Main onboarding screen with swipeable steps

src/hooks/
└── useOnboarding.ts     # Custom hook for onboarding state management

src/store/slices/
└── appSettingsSlice.ts  # Redux slice with onboarding state

src/navigation/
└── guards.ts            # Navigation guards for onboarding flow

src/locales/[lang]/
└── onboarding.json      # Translations for onboarding content
```

## Customization Guide

### Adding or Modifying Steps

Edit the `onboardingSteps` array in `app/onboarding/index.tsx`:

```typescript
const onboardingSteps: OnboardingStep[] = [
  {
    id: 'step1',
    titleKey: 'step1.title',
    descriptionKey: 'step1.description',
  },
  {
    id: 'step2',
    titleKey: 'step2.title',
    descriptionKey: 'step2.description',
  },
  // Add more steps as needed
];
```

### Updating Translations

Edit the translation files in `src/locales/[lang]/onboarding.json`:

```json
{
  "step1": {
    "title": "Your Feature Title",
    "description": "Description of your feature"
  },
  "getStarted": "Get Started",
  "skip": "Skip",
  "next": "Next",
  "back": "Back"
}
```

### Customizing Icons

Replace the emoji icon in the `renderSlide` function with your own icons or images:

```typescript
const renderSlide = ({ item }: { item: OnboardingStep }) => (
  <View style={styles.slideContainer}>
    <View style={styles.iconPlaceholder}>
      {/* Replace with your custom icon or image */}
      <Image source={require('./assets/icon.png')} />
    </View>
    <Text style={styles.title}>{t(item.titleKey)}</Text>
    <Text style={styles.description}>{t(item.descriptionKey)}</Text>
  </View>
);
```

### Changing Completion Destination

Modify the `handleCompleteOnboarding` function to redirect to a different screen:

```typescript
const handleCompleteOnboarding = () => {
  completeOnboarding();
  router.replace('/your-destination'); // Change this
};
```

## Usage

### Using the Onboarding Hook

```typescript
import { useOnboarding } from '@/hooks';

function MyComponent() {
  const { isOnboardingCompleted, completeOnboarding, resetOnboarding } =
    useOnboarding();

  // Check if onboarding is completed
  if (!isOnboardingCompleted) {
    // Show onboarding
  }

  // Mark onboarding as completed
  const handleComplete = () => {
    completeOnboarding();
  };

  // Reset onboarding (for testing or user preference)
  const handleReset = () => {
    resetOnboarding();
  };
}
```

### Accessing Onboarding State in Redux

```typescript
import { useAppSelector } from '@/hooks';
import { selectOnboardingCompleted } from '@/store';

function MyComponent() {
  const isCompleted = useAppSelector(selectOnboardingCompleted);
}
```

## Navigation Flow

1. **First Launch**: User sees onboarding screens
2. **During Onboarding**: User can swipe through steps or skip
3. **After Completion**: User is redirected to login screen
4. **Subsequent Launches**: Onboarding is skipped automatically

## State Management

The onboarding completion state is stored in Redux:

```typescript
interface AppSettingsState {
  // ... other settings
  onboardingCompleted: boolean;
}
```

**Note**: Currently, the state is not persisted between app restarts. To add persistence, integrate `redux-persist` or use `AsyncStorage` directly.

## Testing the Onboarding Flow

To test the onboarding flow again after completing it:

1. Reset the Redux state by restarting the app
2. Or use the `resetOnboarding()` function from the `useOnboarding` hook
3. Or add a debug button in development mode:

```typescript
// In your settings screen (development only)
{
  __DEV__ && (
    <Button title="Reset Onboarding" onPress={() => resetOnboarding()} />
  );
}
```

## Accessibility

The onboarding flow includes accessibility features:

- Proper `accessibilityRole` and `accessibilityLabel` attributes
- Screen reader support
- Keyboard navigation support (where applicable)

## Future Enhancements

Consider adding:

- [ ] Video or animation support for steps
- [ ] Progress bar instead of dots
- [ ] Auto-advance with timer
- [ ] Analytics tracking for step completion
- [ ] A/B testing different onboarding flows
- [ ] Redux persistence for onboarding state
