# Theme System

This directory contains the complete theme system for the Expo React Native template, providing consistent design tokens and theming capabilities.

## Features

- 🎨 **Design Tokens**: Comprehensive color scales, typography, spacing, and more
- 🌙 **Dark Mode**: Built-in light/dark theme support with system detection
- 💾 **Persistence**: User theme preferences are saved automatically
- 🔧 **TypeScript**: Fully typed theme system with excellent IntelliSense
- 🎯 **Easy to Use**: Simple hooks and utilities for theme-aware components

## Quick Start

### 1. Wrap your app with ThemeProvider

```tsx
import { ThemeProvider } from './src/theme';

export default function App() {
  return (
    <ThemeProvider>
      <YourAppContent />
    </ThemeProvider>
  );
}
```

### 2. Use the theme in components

```tsx
import { useTheme } from './src/theme';

function MyComponent() {
  const { colors, typography, spacing } = useTheme();

  return (
    <View
      style={{
        backgroundColor: colors.background,
        padding: spacing[4],
      }}
    >
      <Text
        style={{
          color: colors.text.primary,
          fontSize: typography.fontSize.lg,
        }}
      >
        Hello World!
      </Text>
    </View>
  );
}
```

### 3. Use the themed styles hook (recommended)

```tsx
import { useThemedStyles } from './src/hooks';

function MyComponent() {
  const styles = useThemedStyles(theme => ({
    container: {
      backgroundColor: theme.colors.background,
      padding: theme.spacing[4],
    },
    title: {
      color: theme.colors.text.primary,
      fontSize: theme.typography.fontSize.lg,
      fontWeight: theme.typography.fontWeight.bold,
    },
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello World!</Text>
    </View>
  );
}
```

## Theme Structure

### Colors

- **Primary**: Main brand colors with 11 shades (50-950)
- **Secondary**: Secondary brand colors
- **Success/Warning/Error**: Semantic colors for states
- **Neutral**: Grayscale colors for backgrounds and text
- **Text**: Semantic text colors (primary, secondary, tertiary, etc.)

### Typography

- **Font Families**: Heading, body, and monospace fonts
- **Font Sizes**: From xs (12px) to 5xl (48px)
- **Font Weights**: Light to extrabold
- **Line Heights**: Tight, normal, and relaxed
- **Letter Spacing**: Tight, normal, and wide

### Spacing

- **Scale**: 0 to 64 units (0px to 256px)
- **Consistent**: Based on 4px grid system

### Other Tokens

- **Border Radius**: From none to full rounded
- **Shadows**: Platform-appropriate shadow definitions

## Theme Switching

```tsx
import { useTheme } from './src/theme';

function ThemeToggle() {
  const { theme, setTheme, isDark } = useTheme();

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <TouchableOpacity onPress={toggleTheme}>
      <Text>Switch to {isDark ? 'Light' : 'Dark'} Mode</Text>
    </TouchableOpacity>
  );
}
```

## Available Theme Modes

- `'light'`: Force light theme
- `'dark'`: Force dark theme
- `'system'`: Follow system theme (default)

## Component Variants

The theme system includes pre-defined variants for common components:

- **Buttons**: primary, secondary, outline, ghost
- **Inputs**: default, filled
- **Cards**: elevated, outlined, filled

Access these through the component theme utilities:

```tsx
import { createButtonVariants, useTheme } from './src/theme';

function MyButton() {
  const theme = useTheme();
  const buttonVariants = createButtonVariants(theme);

  // Use buttonVariants.primary, buttonVariants.secondary, etc.
}
```
