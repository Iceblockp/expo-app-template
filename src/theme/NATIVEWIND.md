# NativeWind Integration Guide

This document explains how NativeWind is integrated with our theme system and how to use it effectively.

## Overview

NativeWind allows you to use Tailwind CSS classes directly in React Native components, providing a familiar and efficient way to style your app while maintaining theme consistency.

## Installation & Configuration

This template follows the official NativeWind installation guide for Expo projects.

### Dependencies Installed

```bash
npm install nativewind react-native-reanimated@~3.17.4 react-native-safe-area-context@5.4.0
npm install --save-dev tailwindcss@^3.4.17 prettier-plugin-tailwindcss@^0.5.11
```

### Files Structure

```
├── global.css                    # Tailwind CSS imports
├── tailwind.config.js           # Tailwind configuration with theme tokens
├── nativewind-env.d.ts          # TypeScript declarations
├── babel.config.js              # Babel configuration with NativeWind preset
├── metro.config.js              # Metro configuration with NativeWind support
├── app.json                     # Expo configuration with Metro bundler
├── src/theme/nativewind.ts      # NativeWind utilities
└── src/hooks/useNativeWindTheme.ts # Theme-aware hook
```

### Key Features

1. **Theme Integration**: NativeWind classes automatically adapt to light/dark themes
2. **Custom Design Tokens**: All theme tokens are available as Tailwind classes
3. **Responsive Design**: Built-in breakpoints for different screen sizes
4. **TypeScript Support**: Full type safety for custom theme tokens

## Usage

### Basic Usage

```tsx
import React from 'react';
import { View, Text } from 'react-native';

export const MyComponent = () => {
  return (
    <View className="flex-1 bg-white p-4">
      <Text className="text-lg font-bold text-gray-900 mb-2">
        Hello NativeWind!
      </Text>
    </View>
  );
};
```

### Theme-Aware Classes

Use the `useNativeWindTheme` hook for theme-aware styling:

```tsx
import React from 'react';
import { View, Text } from 'react-native';
import { useNativeWindTheme, cn } from '@/hooks/useNativeWindTheme';

export const ThemedComponent = () => {
  const theme = useNativeWindTheme();

  return (
    <View className={cn('flex-1 p-4', theme.bg.background)}>
      <Text className={cn('text-lg font-bold mb-2', theme.text.primary)}>
        Theme-aware text
      </Text>
      <View className={cn('p-4 rounded-lg', theme.card.elevated)}>
        <Text className={cn(theme.text.secondary)}>
          This card adapts to the current theme
        </Text>
      </View>
    </View>
  );
};
```

### Component Variants

Use predefined component variants:

```tsx
import React from 'react';
import { Pressable, Text } from 'react-native';
import { useNativeWindTheme, cn } from '@/hooks/useNativeWindTheme';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onPress?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  onPress,
}) => {
  const theme = useNativeWindTheme();

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const buttonVariant = theme.button[variant];

  return (
    <Pressable
      onPress={onPress}
      className={cn(
        'rounded-md border items-center justify-center',
        sizeClasses[size],
        buttonVariant.base,
        buttonVariant.pressed
      )}
    >
      <Text className={cn('font-medium', buttonVariant.text)}>{children}</Text>
    </Pressable>
  );
};
```

### Responsive Design

Use responsive prefixes for different screen sizes:

```tsx
import React from 'react';
import { View, Text } from 'react-native';

export const ResponsiveComponent = () => {
  return (
    <View className="p-4 sm:p-6 md:p-8">
      <Text className="text-base sm:text-lg md:text-xl lg:text-2xl">
        Responsive text that scales with screen size
      </Text>
      <View className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Grid that adapts to screen size */}
      </View>
    </View>
  );
};
```

## Available Classes

### Colors

All theme colors are available with their full scale:

```css
/* Primary colors */
bg-primary-50, bg-primary-100, ..., bg-primary-950
text-primary-50, text-primary-100, ..., text-primary-950
border-primary-50, border-primary-100, ..., border-primary-950

/* Secondary, success, warning, error, neutral colors */
bg-secondary-500, bg-success-500, bg-warning-500, bg-error-500, bg-neutral-500
text-secondary-500, text-success-500, text-warning-500, text-error-500, text-neutral-500

/* Semantic colors */
bg-background-light, bg-background-dark
bg-surface-light, bg-surface-dark
text-text-primary-light, text-text-primary-dark
```

### Typography

```css
/* Font families */
font-heading, font-body, font-mono

/* Font sizes */
text-xs, text-sm, text-base, text-lg, text-xl, text-2xl, text-3xl, text-4xl, text-5xl

/* Font weights */
font-light, font-normal, font-medium, font-semibold, font-bold, font-extrabold
```

### Spacing

```css
/* Padding and margin */
p-0, p-1, p-2, p-3, p-4, p-5, p-6, p-8, p-10, p-12, p-16, p-20, p-24, p-32, p-40, p-48, p-56, p-64
m-0, m-1, m-2, m-3, m-4, m-5, m-6, m-8, m-10, m-12, m-16, m-20, m-24, m-32, m-40, m-48, m-56, m-64

/* Width and height */
w-0, w-1, w-2, ..., h-0, h-1, h-2, ...
```

### Border Radius

```css
rounded-none, rounded-sm, rounded, rounded-md, rounded-lg, rounded-xl, rounded-2xl, rounded-3xl, rounded-full
```

### Shadows

```css
shadow-sm, shadow, shadow-md, shadow-lg, shadow-xl
```

### Responsive Breakpoints

```css
/* Small screens (380px+) */
sm:text-lg, sm:p-6

/* Medium screens (420px+) */
md:text-xl, md:p-8

/* Large screens (680px+) */
lg:text-2xl, lg:grid-cols-3

/* Extra large screens (960px+) */
xl:text-3xl, xl:grid-cols-4
```

## Best Practices

### 1. Use Theme-Aware Classes

Always use the `useNativeWindTheme` hook for components that need to adapt to theme changes:

```tsx
// ✅ Good - theme-aware
const theme = useNativeWindTheme();
<View className={theme.bg.background} />

// ❌ Avoid - hardcoded colors
<View className="bg-white" />
```

### 2. Combine Classes Safely

Use the `cn` utility function to combine classes safely:

```tsx
import { cn } from '@/hooks/useNativeWindTheme';

// ✅ Good - safe class combination
<View className={cn('p-4 rounded-lg', theme.card.elevated, isActive && 'border-2')} />

// ❌ Avoid - manual string concatenation
<View className={`p-4 rounded-lg ${theme.card.elevated} ${isActive ? 'border-2' : ''}`} />
```

### 3. Use Semantic Color Names

Prefer semantic color names over specific color values:

```tsx
// ✅ Good - semantic naming
<Text className={theme.text.primary} />
<View className={theme.bg.surface} />

// ❌ Avoid - specific color values
<Text className="text-neutral-900" />
<View className="bg-white" />
```

### 4. Leverage Responsive Design

Use responsive prefixes for better mobile experience:

```tsx
// ✅ Good - responsive design
<View className="p-4 sm:p-6 md:p-8" />
<Text className="text-base sm:text-lg md:text-xl" />
```

### 5. Create Reusable Component Variants

Define component variants using the theme system:

```tsx
// ✅ Good - reusable variants
const cardVariants = {
  default: theme.card.elevated,
  outlined: theme.card.outlined,
  filled: theme.card.filled,
};

<View className={cn('p-4 rounded-lg', cardVariants[variant])} />;
```

## Troubleshooting

### Common Issues

1. **Classes not applying**: Ensure `global.css` is imported in your root component
2. **TypeScript errors**: Make sure `nativewind-env.d.ts` is included in your `tsconfig.json`
3. **Theme not updating**: Check that components are wrapped in `ThemeProvider`
4. **Metro bundler issues**: Clear Metro cache with `npx expo start --clear`

### Performance Tips

1. Use the `cn` utility for conditional classes to avoid unnecessary re-renders
2. Prefer theme-aware classes over inline styles for better performance
3. Use responsive classes instead of JavaScript-based responsive logic
4. Leverage Tailwind's tree-shaking by only using classes you need

## Migration from StyleSheet

If migrating from React Native StyleSheet:

```tsx
// Before (StyleSheet)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 8,
  },
});

// After (NativeWind)
const theme = useNativeWindTheme();

<View className={cn('flex-1 p-4', theme.bg.background)}>
  <Text className={cn('text-2xl font-bold mb-2', theme.text.primary)}>
    Title
  </Text>
</View>;
```

This integration provides a powerful, flexible, and maintainable styling solution that combines the best of Tailwind CSS with React Native's performance and our custom theme system.
